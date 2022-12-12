import {Body, Controller, Get, HttpCode, Param, Post, Put, Query} from '@nestjs/common';
import {BrokersService} from './brokers.service';
import {Broker} from "../models/Broker";
import {AuthBroker} from "../models/AuthBroker";

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Get('/auth?')
  @HttpCode(200)
  getBrokerByCredentials(@Query('email') email: string, @Query('password') password: string): Broker | null {
    return this.brokersService.getBrokerByCredentials(email, password);
  }

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
