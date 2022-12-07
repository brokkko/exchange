import React, {Component} from "react";
import '../style/brokerslist-style.css'
import BrokerForm from "./BrokerForm";
import RemovedBrokers from "./RemovedBrokers";
import {Broker} from "../core/models/Broker";
import "../../src/core/config/api/api.config.tsx";
import {brokerAPIRoutes, serverURI} from "../core/config/api/api.config";

type BrokersListState = {
    removedBrokers: Broker[],
    availableBrokers: Broker[]
}

export default class BrokersList extends Component {

    state: BrokersListState;

    constructor(props: []) {
        super(props);
        this.#getAllBrokers();
        this.state = {
            removedBrokers: [],
            availableBrokers: []
        }

    }

    #getAllBrokers = ()  => {
        fetch(serverURI + brokerAPIRoutes.prefix, {
            method: 'GET',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if(response.ok) return response.json();
        })
        .then(json => {
            console.log(json)
            this.setState({
                removedBrokers: json.filter((item: Broker) => item.status === 0),
                availableBrokers: json.filter((item: Broker) => item.status === 1)
            });
        });
    }

    #updateBroker = (broker: Broker) => {
        fetch(serverURI + brokerAPIRoutes.getOne(broker.id), {
            method: 'PUT',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(broker),
        }).then(response => {
            if(response.ok) return response.json();
        }).then(json => {
            if(json.status === 0) {
                this.setState({
                    removedBrokers: [...this.state.removedBrokers, json],
                    availableBrokers: this.state.availableBrokers.filter(item => item.id !== json.id)
                });
            } else if (json.status === 1) {
                this.setState({
                    removedBrokers: this.state.removedBrokers.filter(item => item.id !== json.id),
                    availableBrokers: [...this.state.availableBrokers, json]
                });
            }

        });
    }

    #saveBroker = (broker: Broker) => {
        fetch(serverURI + brokerAPIRoutes.prefix, {
            method: 'POST',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(broker),
        }).then(response => {
            if(response.ok) return response.json();
        }).then(json => {
            console.log(json)
            this.setState({
                availableBrokers: [...this.state.availableBrokers, json]
            });

        });
    }

    removeBrokerHandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const brokerId: string = event.currentTarget.id;
        let selectedBroker: Broker | undefined = this.state.availableBrokers.find((broker) => broker.id === brokerId);
        if(selectedBroker !== undefined) {
            selectedBroker.status = 0;
            this.#updateBroker(selectedBroker);
        }
    }

    handleRecoverBroker = (broker: Broker | undefined) => {
        if(broker){
            broker.status = 1;
            this.#updateBroker(broker);
        }
    }

    handleAddNewBroker = (broker: Broker | undefined) => {
        if(broker){
            console.log(broker)
            this.#saveBroker(broker);
        }
    }

    render() {
        return(
            <div className="wrapper">
                <div className="available-brokers-list">
                    <p className="title title-color">AVAILABLE BROKERS LIST</p>
                    <div className="brokers-description">
                        <p className="text">Firstname</p>
                        <p className="text">Lastname</p>
                        <p className="text">Founds</p>
                        <p></p>
                    </div>
                        {this.state.availableBrokers.map((value, index) => (
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