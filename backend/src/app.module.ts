import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import {RedisProviderService} from "./providers/redis/redis-provider.service";
import {RedisProviderModule} from "./providers/redis/redis-provider.module";
import {BrokersRepository} from "./brokers/brokers.repository";
import {StocksController} from "./stocks/stocks.controller";
import {StocksService} from "./stocks/stocks.service";
import {StocksRepository} from "./stocks/stocks.repository";
import {TradingSocketsModule} from "./providers/sockets/tradingSockets.module";

@Module({
  imports: [
    RedisProviderModule,
    TradingSocketsModule
  ],
  controllers: [AppController, BrokersController, StocksController],
  providers: [AppService, BrokersService, RedisProviderService, BrokersRepository, StocksService, StocksRepository],
})
export class AppModule {}
