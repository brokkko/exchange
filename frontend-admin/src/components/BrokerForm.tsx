import React, {Component} from "react";
import '../style/brokers-form-style.css';
import {Broker} from "../core/models/Broker";
import {Stock} from "../core/models/Stock";

type BrokerFormProps = {
    addState: (broker: Broker | undefined) => void
}

type FormState = {
    id: string;
    name: string;
    lastname: string;
    password_firstTry: string;
    password_secondTry: string;
}

export default class BrokerForm extends Component <BrokerFormProps> {

    state: FormState;

    constructor(props: BrokerFormProps) {
        super(props);
        this.state = {id: "", name: "", lastname: "", password_firstTry: "", password_secondTry: ""};
    }

    createBroker = () => {
        if(this.state.name === "" || this.state.lastname === "" || this.state.password_firstTry === ""
            || this.state.password_secondTry === "") {
            return;
        } else if(this.state.password_firstTry !== this.state.password_secondTry) {
            this.setState({
                password_firstTry: "",
                password_secondTry: ""
            });
            return;
        } else {
            this.setState({
                id: "", name: "", lastname: "", password_firstTry: "", password_secondTry: ""
            })
            this.props.addState({
                id: this.state.id,
                firstname: this.state.name,
                lastname: this.state.lastname,
                founds: 0.0,
                password: this.state.password_firstTry,
                status: 1,
                stokes: []
            });
        }
    }

    handleChangeName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            name: event.currentTarget.value
        })
    }

    handleChangeLastName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            lastname: event.currentTarget.value
        })
    }

    handleChangePassword1 = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password_firstTry: event.currentTarget.value
        })
    }

    handleChangePassword2 = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password_secondTry: event.currentTarget.value
        })
    }

    render() {
        return(
            <div className="brokers-form-wrapper">
                <p className="title-grey-color grey-title">ADD BROKER</p>
                <div className="input-form">
                    <div className="input-form-item-title">
                        <span>First name</span>
                        <span className={this.state.name === "" ? "red-color" : "green-color"}>*</span>
                    </div>
                    <input className="input-form-field" onChange={this.handleChangeName} value={this.state.name}/>
                    <div className="input-form-item-title">
                        <span>Last name</span>
                        <span className={this.state.lastname === "" ? "red-color" : "green-color"}>*</span>
                    </div>
                    <input className="input-form-field" onChange={this.handleChangeLastName} value={this.state.lastname}/>
                    <div className="input-form-item-title">
                        <span>Password</span>
                        <span className={this.state.password_firstTry === "" ? "red-color" : "green-color"}>*</span>
                    </div>
                    <input type="password" className="input-form-field" onChange={this.handleChangePassword1} value={this.state.password_firstTry}/>
                    <div className="input-form-item-title">
                        <span>Password</span>
                        <span className={this.state.password_secondTry === "" ? "red-color" : "green-color"}>*</span>
                    </div>
                    <input type="password" className="input-form-field" onChange={this.handleChangePassword2} value={this.state.password_secondTry}/>
                    <div></div>
                    <div onClick={this.createBroker}>
                        <p className="create-button">Create</p>
                    </div>
                </div>

            </div>
        )
    }
}