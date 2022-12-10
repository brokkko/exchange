import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {SchedulerRegistry} from "@nestjs/schedule";
import {StocksService} from "../../stocks/stocks.service";
import {Stock} from "../../models/Stock";

@WebSocketGateway(3001, {cors: "*"})
export class TradingGateway {
    interval: number;
    date: string;

    constructor(private schedulerRegistry: SchedulerRegistry, private readonly stocksService: StocksService) {
        this.interval = 0;
        this.date = "";
    }

    @WebSocketServer() server;

    @SubscribeMessage('start-trading')
    handleStartTrading(@MessageBody() body: any): void {
        this.interval = body.daySpeed;
        this.date = body.date;
        this.addInterval("trading", this.interval*1000);

    }

    @SubscribeMessage('end-trading')
    handleEndTrading(): void {
        console.log("delete")
        this.deleteInterval("trading");
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    updateTradingStocks() {
        console.log("UPDATING");
        let res : Stock[] = this.stocksService.tradingSelectedStocks(this.date);
        this.server.emit('trading', res);
        this.date = this.addDays(this.date, 1).toLocaleDateString("en-US");
    }

    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.updateTradingStocks();
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    deleteInterval(name: string) {
        clearInterval(this.schedulerRegistry.getInterval(name));
        this.schedulerRegistry.deleteInterval(name);
    }

}

