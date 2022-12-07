import * as fs from "fs";
import * as path from "path";
import {Stock} from "../models/Stock";

export class StocksRepository {

    stocksTable: Stock[];
    stocksTablePath: string;
    pathPrefix: string;

    constructor() {
        this.stocksTablePath = "./src/providers/database/stocks.json";
        this.pathPrefix = "./src/providers/jsonstorage/";
        this.stocksTable = this.#loadTable(this.stocksTablePath);
    }

    #loadTable = (tablePath) => {
        return JSON.parse(fs.readFileSync(path.resolve(tablePath)).toString())
    }

    #updateTable = (path, table) => {
        fs.writeFileSync(path, JSON.stringify(table,null,1), 'utf8');
    }

    getAllStocks = () : Stock[] => {
        return this.stocksTable;
    }

    convertDateToTime = (date:string) : number => {
        let parts : string[] = date.split('/');
        return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`).getTime();
    }


}