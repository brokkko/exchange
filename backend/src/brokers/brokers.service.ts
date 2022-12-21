import { Injectable } from '@nestjs/common';
import { Broker } from "../models/Broker";
import { BrokersRepository } from "./brokers.repository";

@Injectable()
export class BrokersService {
  private brokerRepository: BrokersRepository;
  constructor() {
    this.brokerRepository = new BrokersRepository();
  }

  saveBroker(broker: Broker) : Broker {
    return this.brokerRepository.saveBroker(broker);
  }

  async getBrokerById(id: string) : Promise<Broker> {
    return this.brokerRepository.getBrokerById(id);
  }

  getBrokerByCredentials(email: string, password: string) : Broker | null {
    return this.brokerRepository.getBrokerByCredentials(email, password);
  }

  getAllBrokers() : Broker[] {
    return this.brokerRepository.getAllBrokers();
  }

  async update(id: string, updatedBroker: Broker) {
    this.brokerRepository.updateBroker(id, updatedBroker);
    return updatedBroker;
  }

}
