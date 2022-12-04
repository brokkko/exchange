import {Stock} from "./Stock";

export interface Broker {
    id: string;
    firstname: string;
    lastname: string;
    founds: number;
    password: string;
    stokes: Stock[];
}