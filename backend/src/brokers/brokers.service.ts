import { Injectable } from '@nestjs/common';
import { RedisProviderService } from '../providers/redis/redis-provider.service';
import { Broker } from "../models/Broker";
import { BrokersRepository } from "./brokers.repository";
import {AuthBroker} from "../models/AuthBroker";

@Injectable()
export class BrokersService {
  private brokerRepository: BrokersRepository;
  private packageTTL: number;
  constructor(private redisProvider: RedisProviderService) {
    this.brokerRepository = new BrokersRepository();
    this.packageTTL = 60 * 15; // 15 minutes
  }

  saveBroker(broker: Broker) : Broker {
    return this.brokerRepository.saveBroker(broker);
  }

  async getBrokerById(id: string) : Promise<Broker> {
    let res = await this.redisProvider.getByKey(id);
    if(res === null) {
      res = this.brokerRepository.getBrokerById(id);
      await this.redisProvider.save(res.id, res, this.packageTTL);
      return res;
    } else {
      return res;
    }
  }

  getBrokerByCredentials(email: string, password: string) : Broker | null {
    return this.brokerRepository.getBrokerByCredentials(email, password);
  }

  getAllBrokers() : Broker[] {
    return this.brokerRepository.getAllBrokers();
  }

  async update(id: string, updatedBroker: Broker) {
    console.log("in updating")
    this.brokerRepository.updateBroker(id, updatedBroker);
    let res = await this.redisProvider.getByKey(id);
    console.log(res)
    if(res === null) {
      console.log("updating")
      await this.redisProvider.save(id, updatedBroker, this.packageTTL);
    }
    return updatedBroker;
  }

}
