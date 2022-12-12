import {v4 as uuidv4} from 'uuid';
import {Broker} from "../models/Broker";
import * as fs from "fs";
import * as path from "path";
import {AuthBroker} from "../models/AuthBroker";

export class BrokersRepository {
    brokersTable: Broker[];

    constructor() {
        this.brokersTable = this.#loadTable();
    }

    #loadTable = () => {
        return JSON.parse(fs.readFileSync(path.resolve("./src/providers/database/brokers.json")).toString())
    }

    #updateTable = () => {
        fs.writeFileSync("./src/providers/database/brokers.json", JSON.stringify(this.brokersTable,null,1), 'utf8');
    }

    saveBroker = (broker: Broker) : Broker | null => {
        broker.id = uuidv4();
        this.brokersTable.push(broker);
        this.#updateTable();
        return this.getBrokerById(broker.id);
    }

    getBrokerById = (id: string) : Broker | null => {
        return this.brokersTable.filter((elem:Broker) => elem.id === id)[0];
    }

    getBrokerByCredentials(email: string, password: string) : Broker | null {
        return this.brokersTable.filter((elem: Broker) => elem.email === email && elem.password === password)[0];
    }

    updateBroker = (id: string, updatedBroker: Broker) => {
        for(let i=0; i<this.brokersTable.length; i++) {
            if(this.brokersTable[i].id === id) {
                this.brokersTable[i] = updatedBroker;
            }
        }
        this.#updateTable();
    }

    getAllBrokers = () : Broker[] => {
        let brokers: Broker[] = [];
        this.brokersTable.forEach(elem => {
            brokers.push(elem);
        });
        return brokers;
    }
}