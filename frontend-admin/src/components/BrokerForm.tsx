import {Component} from "react";
import '../style/brokers-form-style.css';
import {Broker} from "./interfaces/Broker";

type BrokerFormProps = {
    addState: (broker: Broker | undefined) => void
}

export default class BrokerForm extends Component <BrokerFormProps>{
    constructor(props: BrokerFormProps) {
        super(props);
    }


    render() {
        return(
            <div className="brokers-form-wrapper">
                <p>BROKER FORM</p>
            </div>
        )
    }
}