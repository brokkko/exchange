import { BrokerStatus } from '../enums/BrokerStatus';
import {Stock} from "./Stock";

export class Broker {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  founds: number;
  status: BrokerStatus;
  stocks: string[];
}
