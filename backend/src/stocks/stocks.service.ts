import { Injectable } from '@nestjs/common';
import {StocksRepository} from "./stocks.repository";
import {Stock} from "../models/Stock";

@Injectable()
export class StocksService {
    private stocksRepository: StocksRepository;

    constructor() {
        this.stocksRepository = new StocksRepository();
    }

    getAllStocks() : Stock[] {
        return this.stocksRepository.getAllStocks();
    }

    getHistoricalDataByTicker(ticker: string) : string {
        return this.stocksRepository.getHistoricalDataByTicker(ticker);
    }

    updateStock(ticker: string, updatedStock: Stock) : Stock {
        return this.stocksRepository.updateStock(ticker, updatedStock);
    }

    tradingSelectedStocks(date: string) : Stock[] {
        return this.stocksRepository.tradingSelectedStocks(date);
    }


}
