import {Body, Controller, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {BrokersService} from './brokers.service';
import {Broker} from "../models/Broker";

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Get(':id')
  @HttpCode(200)
  async getBrokerById(@Param('id') id: string): Promise<Broker> {
    return this.brokersService.getBrokerById(id);
  }

  @Post()
  @HttpCode(201)
  saveBroker(@Body() broker: Broker): Broker {
    return this.brokersService.saveBroker(broker);
  }

  @Get()
  @HttpCode(200)
  async getAllBrokers(): Promise<Broker[]> {
    return this.brokersService.getAllBrokers();
  }

  @Put(':id')
  @HttpCode(200)
  async updateBroker(@Param('id') id: string, @Body() updatedBroker: Broker) : Promise<Broker> {
    return this.brokersService.update(id, updatedBroker);
  }
}
