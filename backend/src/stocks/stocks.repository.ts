import * as fs from "fs";
import * as path from "path";
import {Stock} from "../models/Stock";

export class StocksRepository {

    stocksTable: Stock[];
    stocksTablePath: string;
    pathPrefix: string;

    constructor() {
        this.stocksTablePath = "./src/providers/database/stocks.json";
        this.pathPrefix = "./src/providers/jsonstorage/";
        this.stocksTable = this.#loadTable(this.stocksTablePath);
    }

    #loadTable = (tablePath) => {
        return JSON.parse(fs.readFileSync(path.resolve(tablePath)).toString())
    }

    #updateTable = (path, table) => {
        fs.writeFileSync(path, JSON.stringify(table,null,1), 'utf8');
    }

    getAllStocks = () : Stock[] => {
        this.stocksTable = this.#loadTable(this.stocksTablePath);
        return this.stocksTable;
    }

    #getStockByTicker = (ticker: string) : Stock => {
        this.stocksTable = this.#loadTable(this.stocksTablePath);
        return this.stocksTable.filter(item => item.ticker === ticker)[0];
    }

    getHistoricalDataByTicker = (ticker: string) => {
        return this.#loadTable(this.pathPrefix + ticker + ".json");
    }

    updateStock = (ticker: string, updatedStock: Stock) : Stock => {
        this.stocksTable = this.#loadTable(this.stocksTablePath);
        for(let i=0; i<this.stocksTable.length; i++) {
            if(this.stocksTable[i].ticker === ticker) {
                this.stocksTable[i] = updatedStock;
                break;
            }
        }
        this.#updateTable(this.stocksTablePath, this.stocksTable);
        return this.#getStockByTicker(ticker);
    }

    getRandomArbitrary = (min, max) => {
        return this.round(Math.random() * (max - min) + min);
    }

    round = (value: number): number => {
        return Math.round(100 * value) / 100;
    };

    tradingSelectedStocks = (date: string) : Stock[] => {
        this.stocksTable = this.#loadTable(this.stocksTablePath);
        let selected: Stock[] = this.stocksTable.filter(item => item.selected === true);
        selected.forEach((stock) => {
            let data = this.getHistoricalDataByTicker(stock.ticker);
            let last = this.getRandomArbitrary(Number(stock.last) - 10, Number(stock.last) + 10);
            while(last === Number(stock.last)) last = this.getRandomArbitrary(Number(stock.last) - 10, Number(stock.last) + 10);
            let high = this.getRandomArbitrary(Number(stock.last) - 10, Number(stock.last) + 10);
            let low = this.getRandomArbitrary(Number(stock.last) - 10, high);
            let open = stock.last.toString();
            data = data.reverse();
            data.push({
                "Date": date,
                "Close": {
                    "Last": last.toString()
                },
                "Volume": 69346520,
                "Open": open,
                "High": high.toString(),
                "Low": low.toString()
            })
            data = data.reverse();
            this.#updateTable(this.pathPrefix + stock.ticker + ".json", data);

            // update table value and return it
            for(let i=0; i< this.stocksTable.length; i++){
                if(stock.ticker === this.stocksTable[i].ticker) {
                    this.stocksTable[i].last = last.toString();
                    this.stocksTable[i].low = low.toString();
                    this.stocksTable[i].high = high.toString();
                    this.stocksTable[i].date = date;
                    this.stocksTable[i].open = open.toString();
                }
            }
        });
        this.#updateTable(this.stocksTablePath, this.stocksTable);
        return this.stocksTable;
    }


}