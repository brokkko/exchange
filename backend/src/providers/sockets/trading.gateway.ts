import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {SchedulerRegistry} from "@nestjs/schedule";
import {StocksService} from "../../stocks/stocks.service";
import {Stock} from "../../models/Stock";
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {cors: "*"})
export class TradingGateway {
    interval: number;
    date: string;
    clients: Socket[];
    sendingHist: boolean;
    ticker: string;

    constructor(private schedulerRegistry: SchedulerRegistry, private readonly stocksService: StocksService) {
        this.interval = 0;
        this.date = "";
        this.clients = [];
        this.sendingHist = false;
        this.ticker = "";
    }

    @WebSocketServer() server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Connected ${client.id}`);
        this.clients.push(client);
    }
    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
        this.clients = this.clients.filter(elem => elem.id !== client.id);
    }

    @SubscribeMessage('start-trading')
    handleStartTrading(@MessageBody() body: any): void {
        this.interval = body.daySpeed;
        this.date = body.date;
        this.addInterval("trading", this.interval*1000);

    }

    @SubscribeMessage('end-trading')
    handleEndTrading(): void {
        console.log("DELETE")
        this.deleteInterval("trading");
        this.clients.forEach(client => {
            client.emit('trading-ended', true);
        });
    }

    @SubscribeMessage('start-sending-hist')
    handleStartSendingHist(@MessageBody() ticker: string) : void {
        console.log("START SENDING HIST")
        console.log(ticker)
        this.sendingHist = true;
        this.ticker = ticker;
        this.clients.forEach(client => {
            client.emit('sending-hist', JSON.stringify(this.stocksService.getHistoricalDataByTicker(this.ticker)));
        });
    }
    @SubscribeMessage('stop-sending-hist')
    handleStopSendingHist() : void {
        this.sendingHist = false;
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    updateTradingStocks() {
        console.log("UPDATING");
        let res : Stock[] = this.stocksService.tradingSelectedStocks(this.date);
        this.clients.forEach(client => {
            client.emit('trading', res);
        });
        if(this.sendingHist && this.ticker !== "") {
            console.log("sending...")
            this.clients.forEach(client => {
                client.emit('sending-hist',  JSON.stringify(this.stocksService.getHistoricalDataByTicker(this.ticker)));
            });
        }

        this.date = this.addDays(this.date, 1).toLocaleDateString("en-US");
    }

    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.updateTradingStocks();
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
        this.updateTradingStocks();
    }

    deleteInterval(name: string) {
        clearInterval(this.schedulerRegistry.getInterval(name));
        this.schedulerRegistry.deleteInterval(name);
    }

}

