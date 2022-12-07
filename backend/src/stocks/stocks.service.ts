import { Injectable } from '@nestjs/common';
import {StocksRepository} from "./stocks.repository";
import {Stock} from "../models/Stock";

@Injectable()
export class StocksService {
    private stocksRepository: StocksRepository;

    constructor() {
        this.stocksRepository = new StocksRepository();
    }

    getAllStocks() : Stock[] {
        return this.stocksRepository.getAllStocks();
    }


}
