import {Body, Controller, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {StocksService} from "./stocks.service";
import {Stock} from "../models/Stock";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get()
    @HttpCode(200)
    async getAllBrokers(): Promise<Stock[]> {
        return this.stocksService.getAllStocks();
    }

}
