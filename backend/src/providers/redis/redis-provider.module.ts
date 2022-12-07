import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisProviderService } from './redis-provider.service';

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }),
    ],
    controllers: [],
    providers: [RedisProviderService],
    exports: [RedisProviderService]
})
export class RedisProviderModule {}