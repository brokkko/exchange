import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import {BrokersRepository} from "./brokers/brokers.repository";
import {StocksController} from "./stocks/stocks.controller";
import {StocksService} from "./stocks/stocks.service";
import {StocksRepository} from "./stocks/stocks.repository";
import {TradingSocketsModule} from "./providers/sockets/tradingSockets.module";

@Module({
  imports: [
    TradingSocketsModule
  ],
  controllers: [AppController, BrokersController, StocksController],
  providers: [AppService, BrokersService, BrokersRepository, StocksService, StocksRepository],
})
export class AppModule {}
