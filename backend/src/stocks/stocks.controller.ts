import {Body, Controller, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {StocksService} from "./stocks.service";
import {Stock} from "../models/Stock";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get()
    @HttpCode(200)
    async getAllStocks(): Promise<Stock[]> {
        return this.stocksService.getAllStocks();
    }

    @Get(':id')
    @HttpCode(200)
    async getHistoricalDataByTicker(@Param('id') ticker: string) : Promise<string> {
        return this.stocksService.getHistoricalDataByTicker(ticker);
    }

    @Put(':id')
    @HttpCode(200)
    async updateBroker(@Param('id') ticker: string, @Body() updatedStock: Stock) : Promise<Stock> {
        return this.stocksService.updateStock(ticker, updatedStock);
    }

}
