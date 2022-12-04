import React, {Component} from "react";
import '../style/brokerslist-style.css'
import BrokerForm from "./BrokerForm";
import RemovedBrokers from "./RemovedBrokers";
import {Broker} from "./interfaces/Broker";

type BrokersListState = {
    removedBrokers: Broker[]
}

export default class BrokersList extends Component {

    state: BrokersListState;
    brokersList: Broker[];

    constructor(props: []) {
        super(props);
        this.brokersList = [{id: "1", firstname: "Jack", lastname: "Minor", founds: 900.0, password: "password", stokes: []},
            {id: "2", firstname: "Natali", lastname: "Haffman", founds: 1000.0, password: "password", stokes: []},
            {id: "3", firstname: "Sirena", lastname: "Wonderwoodson", founds: 4500.0, password: "password", stokes: []},
            {id: "4", firstname: "Emily", lastname: "Clark", founds: 70.0, password: "password", stokes: []},
            {id: "5", firstname: "Zak", lastname: "Braun", founds: 5509.03, password: "password", stokes: []},];

        this.state = {
            removedBrokers: []
        }
    }

    removeBrokerHandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const brokerId: string = event.currentTarget.id;
        let selectedBroker: Broker | undefined = this.brokersList.find((broker) => broker.id === brokerId);
        if(selectedBroker !== undefined) {
            this.setState({
                removedBrokers:  [...this.state.removedBrokers, selectedBroker]
            });
            this.brokersList = this.brokersList.filter((elem) => elem !== selectedBroker);
        }
    }

    handleRecoverBroker = (broker: Broker | undefined) => {
        if(broker){
            this.brokersList.push(broker);
            this.setState({
                removedBrokers:  this.state.removedBrokers.filter((elem) => elem !== broker)
            });
        }

    }

    handleAddNewBroker = (broker: Broker | undefined) => {
        if(broker){
            this.brokersList.push(broker);
        }

    }

    render() {
        return(
            <div className="wrapper">
                <div className="available-brokers-list">
                    <p className="title">AVAILABLE BROKERS LIST</p>
                    <div className="brokers-description">
                        <p className="text">Firstname</p>
                        <p className="text">Lastname</p>
                        <p className="text">Founds</p>
                        <p></p>
                    </div>
                        {this.brokersList.map((value, index) => (
                            <div className="brokers-description description-border">
                                <p className="text fullName">{value.firstname}</p>
                                <p className="text fullName">{value.lastname}</p>
                                <p className="text fullName">{value.founds}</p>
                                <div id={value.id} onClick={this.removeBrokerHandleClick}>
                                    <p className="remove-button">Remove</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="right-forms">
                    <BrokerForm addState={this.handleAddNewBroker}></BrokerForm>
                    <RemovedBrokers removedBrokers={this.state.removedBrokers} recoverState={this.handleRecoverBroker}></RemovedBrokers>
                </div>

            </div>
        )
    }
}