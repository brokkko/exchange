import { Module } from '@nestjs/common';
import {TradingGateway} from "./trading.gateway";
import {ScheduleModule} from "@nestjs/schedule";
import {StocksRepository} from "../../stocks/stocks.repository";
import {StocksService} from "../../stocks/stocks.service";

@Module({
    imports: [
        ScheduleModule.forRoot()
    ],
    providers: [TradingGateway, StocksRepository, StocksService]
})
export class TradingSocketsModule {}