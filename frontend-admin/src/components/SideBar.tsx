import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../style/colors.css';
import "../style/sidebar-style.css";
import brokersListLogo from"../assets/sidebar/users-icon.svg";
import exchangeLogo from"../assets/sidebar/auction-icon.svg";
import listLogo from"../assets/sidebar/list-icon.svg";
import {Config} from "../core/config/Config";
import configJSON from "../core/config/config.json";

type SideBarState = {
    currentUri: string
}
export default class SideBar extends Component {
    private config: Config;
    state: SideBarState;

    constructor(props: []) {
        super(props);
        this.config = configJSON;
        this.state = {
            currentUri: document.location.pathname
        }
    }

    listLinkOnClick = () => {
        this.setState(() => ({
            currentUri: this.config.uriPathWatchList
        }));
    }

    brokersLinkOnClick = () => {
        this.setState(() => ({
            currentUri: this.config.uriPathBrokersList
        }));
    }

    exchangeLinkOnClick = () => {
        this.setState(() => ({
            currentUri: this.config.uriPathExchange
        }));
    }

    render() {
        return (
            <>
                <div className="sidebar">
                    <Link to={this.config.uriPathWatchList}
                          className={"sidebar-icon " + (this.state.currentUri === this.config.uriPathWatchList ? "blue-selected-color" : "")}
                          onClick={this.listLinkOnClick}>
                        <img src={listLogo} alt=""/>
                    </Link>

                    <Link to={this.config.uriPathBrokersList}
                          className={"sidebar-icon " + (this.state.currentUri === this.config.uriPathBrokersList ? "blue-selected-color" : "")}
                          onClick={this.brokersLinkOnClick}>
                        <img src={brokersListLogo} alt=""/>
                    </Link>
                    <Link to={this.config.uriPathExchange}
                          className={"sidebar-icon " + (this.state.currentUri === this.config.uriPathExchange ? "blue-selected-color" : "")}
                          onClick={this.exchangeLinkOnClick}>
                        <img src={exchangeLogo} alt=""/>
                    </Link>
                </div>
            </>
        );
    }

}