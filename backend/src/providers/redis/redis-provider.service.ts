import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {Broker} from "../../models/Broker";

@Injectable()
export class RedisProviderService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getKeys(key: string): Promise<any> {
      return await this.cacheManager.store.keys(key);
  }

  async getByKey(key) : Promise<Broker> {
    return await this.cacheManager.get(key);
  }

  async save(key: string, value: any, ttl: number): Promise<any> {
      return await this.cacheManager.set(key, value, {
          ttl: ttl,
      });
  }

  async getMultipleKeyData(key: string): Promise<any> {
      const redisKeys = await this.getKeys(key);
      const data: { [key: string]: any } = {};
      for (const key of redisKeys) {
          data[key] = await this.getByKey(key);
      }
      return data;
  }


}
