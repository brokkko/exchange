import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import {RedisProviderService} from "./providers/redis/redis-provider.service";
import {RedisProviderModule} from "./providers/redis/redis-provider.module";
import {BrokersRepository} from "./brokers/brokers.repository";

@Module({
  imports: [
    RedisProviderModule,
  ],
  controllers: [AppController, BrokersController],
  providers: [AppService, BrokersService, RedisProviderService, BrokersRepository],
})
export class AppModule {}
