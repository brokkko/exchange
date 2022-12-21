import React, {Component} from "react";
import '../style/colors.css';
import "../style/watchlist-style.css";
import "../style/exchange-style.css";
import {serverURI, stocksAPIRoutes, webSocketsServerURI} from "../core/config/api/api.config";
import {Stock} from "../core/models/Stock";
import {io, Socket} from "socket.io-client";
import {D} from "chart.js/dist/chunks/helpers.core";

type TradingState = {
    selectedStocks: Stock[],
    stocksList: Stock[],
    tradingSpeed: string,
    isTrading: boolean,
    tradingDate: string
}

export default class Exchange extends Component{

    state: TradingState;
    socket: Socket

    round = (value: number): number => {
        return Math.round(100 * value) / 100;
    };


    constructor(props: []) {
        super(props);
        this.state = {
            selectedStocks: [],
            stocksList: [],
            tradingSpeed: "",
            isTrading: false,
            tradingDate: new Date().toLocaleDateString("en-US")
        }
        this.#getAllStocks();

        this.socket = io(webSocketsServerURI);
    }

    #getAllStocks = ()  => {
        fetch(serverURI + stocksAPIRoutes.prefix, {
            method: 'GET',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.ok) return response.json();
        }).then(json => {
            this.setState({
                stocksList: json,
                selectedStocks: json.filter((item: { selected: any; }) => item.selected)
            });
        });
    }

    #updateStock = (stock: Stock) => {
        fetch(serverURI + stocksAPIRoutes.getOne(stock.ticker), {
            method: 'PUT',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stock),
        }).then(response => {
            if(response.ok) return response.json();
        }).then(json => {
            if(json.selected) {
                this.setState({
                    selectedStocks: [...this.state.selectedStocks, json]
                });
            } else {
                this.setState({
                    selectedStocks: this.state.selectedStocks.filter(item => item.ticker !== json.ticker)
                });
            }

        });
    }

    #getStock = (ticker: string) => {
        return this.state.stocksList.filter(elem => elem.ticker === ticker)[0];
    }

    handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
        let stock: Stock = this.#getStock(event.currentTarget.id);
        if(!stock.selected) {
            stock.selected = true;
            this.#updateStock(stock);
        } else {
            stock.selected = false;
            this.#updateStock(stock);
        }
    }

    handleSelectTradingTime = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if(Number(event.currentTarget.value) >= 0 && Number(event.currentTarget.value) <= 86400 && !this.state.isTrading) {
            this.setState({
                tradingSpeed: event.currentTarget.value
            })
        }
    }

    handleSelectTradingDate = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        let selectedDate = new Date(event.currentTarget.value);
        if(selectedDate >= new Date()) {
            this.setState({
                tradingDate: selectedDate.toLocaleDateString("en-US")
            })
        }
    }

    handleTradingButton = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(this.state.tradingSpeed !== "") {
            if(!this.state.isTrading) {
                this.socket.open();
                this.socket.emit('start-trading', {date: this.state.tradingDate, daySpeed: this.state.tradingSpeed});
                this.socket.on('trading', (data) => {
                    // we get settings data and can do something with it
                    this.setState({
                            selectedStocks: data.filter((item: { selected: any; }) => item.selected)
                    })
                });
            } else{
                this.socket.emit('end-trading');
                this.socket.close();
            }
            this.setState({
                isTrading: !this.state.isTrading
            });

        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return(
            <div className="wrapper">
                <div className="stocks-list">
                    <p className="title title-color">TRADING</p>
                    <div className="description">
                        <p></p>
                        <p className="text">Stocks</p>
                        <p></p>
                        <p></p>
                    </div>
                    {this.state.stocksList.map((value, index) => (
                        <div className="description description-border" >
                            <div className="checkbox bounce">
                                <input
                                    className="checkbox-flip"
                                    id={value.ticker}
                                    type="checkbox"
                                    defaultChecked={value.selected}
                                    onChange={this.handleCheckboxChange}></input>
                                {/*<svg viewBox="0 0 21 21">*/}
                                {/*    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>*/}
                                {/*</svg>*/}
                            </div>
                            <p className="text fullName">{value.name}</p>
                            <p></p>
                            <p></p>
                        </div>
                    ))}
                </div>
                <div className="right-forms">
                    <div className="brokers-form-wrapper">
                        <p className="title-grey-color grey-title">SETTINGS</p>
                        <div className="input-form">
                            <p className="text fullName">Day speed</p>
                            <input
                                className="input-form-field"
                                onChange={this.handleSelectTradingTime}
                                value={this.state.tradingSpeed}/>
                            <span className="datepicker-toggle">
                                <span className="datepicker-toggle-button">Date</span>
                                <input type="date" className="datepicker-input" onChange={this.handleSelectTradingDate}/>
                            </span>
                            <p className="text fullName input-form-field">{this.state.tradingDate}</p>
                            <p></p>
                            <button className={"trading-button"} onClick={this.handleTradingButton}>{this.state.isTrading ? "STOP TRADING" : "START TRADING"}</button>
                        </div>
                    </div>

                    <div className="removed-brokers-list">
                        <p className="title-grey-color grey-title">SELECTED STOCKS</p>
                        <div className="description">
                            <p className="text">Symbol</p>
                            <p></p>
                            <p className="text">Last</p>
                            <p className="text">Change</p>
                        </div>
                        {this.state.selectedStocks.map((value) => (
                            <div className="description description-border" id={value.ticker} >
                                <p className="text symbol">{value.ticker}</p>
                                <p className="text fullName">{value.name}</p>
                                <p className="text fullName">{value.last}</p>
                                <p className={"text " + (this.round(value.open - value.last) > 0 ? "green-color" : "red-color")}>
                                    {this.round(value.open - value.last) > 0 ?
                                        ("+ " + this.round(value.open - value.last)) : "- " + Math.abs(this.round(value.open - value.last))}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
}