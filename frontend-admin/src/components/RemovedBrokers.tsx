import React, {Component} from "react";
import '../style/removed-brokers-style.css';
import {Broker} from "./interfaces/Broker";

type RemovedBrokersProps = {
    removedBrokers: Broker[],
    recoverState: (recoveringBroker: Broker | undefined) => void;
}

export default class RemovedBrokers extends Component<RemovedBrokersProps>{

    constructor(props: RemovedBrokersProps) {
        super(props);

    }

    #getBrokerById = (id: string) => {
        return this.props.removedBrokers.find((elem) => elem.id === id);
    }

    recoverBrokerHandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        let recoveringBroker: Broker | undefined = this.#getBrokerById(event.currentTarget.id);
        this.props.recoverState(recoveringBroker);
    }

    render() {
        return(
            <div className="removed-brokers-list">
                <p className="title">REMOVED BROKERS LIST</p>
                <div className="brokers-description">
                    <p className="text">Firstname</p>
                    <p className="text">Lastname</p>
                    <p className="text">Founds</p>
                    <p></p>
                </div>
                {this.props.removedBrokers.map((value, index) => (
                    <div className="brokers-description description-border removed-brokers-description">
                        <p className="text fullName">{value.firstname}</p>
                        <p className="text fullName">{value.lastname}</p>
                        <p className="text fullName">{value.founds}</p>
                        <div id={value.id} onClick={this.recoverBrokerHandleClick}>
                            <p className="remove-button">Recover</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}