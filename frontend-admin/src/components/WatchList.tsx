import React, {Component} from "react";
import '../style/colors.css';
import "../style/watchlist-style.css";
import StockDetails from "./StockDetails";
import {brokerAPIRoutes, serverURI, stocksAPIRoutes} from "../core/config/api/api.config";
import {Stock} from "../core/models/Stock";

type WatchListState = {
    currentStock: Stock,
    stocksList: Stock[]
}

export default class WatchList extends Component{

    state: WatchListState;

    round = (value: number): number => {
        return Math.round(100 * value) / 100;
    };

    constructor(props: []) {
        super(props);
        this.state = {
            currentStock: new Stock(),
            stocksList: []
        }
        this.#getAllStocks();
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
                currentStock: json[0],
                stocksList: json
            });
        });
    }

   handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
       event.preventDefault();
       const symbol: string = event.currentTarget.id;
       this.setState({
           currentStock: this.state.stocksList.find((elem) => elem.ticker === symbol)
       });
   }

    render() {
        return(
            <div className="wrapper">
                <div className="stocks-list">
                    <p className="title title-color">WATCHLIST</p>
                    <div className="description">
                        <p className="text">Symbol</p>
                        <p></p>
                        <p className="text">Last</p>
                        <p className="text">Change</p>
                    </div>
                    {this.state.stocksList.map((value, index) => (
                        <div className="description description-border" id={value.ticker} onClick={this.handleClick}>
                            <p className="text symbol">{value.ticker}</p>
                            <p className="text fullName">{value.name}</p>
                            <p className="text fullName">{value.last}</p>
                            <p className={"text " + (this.round(value.open - value.last) > 0 ? "green-color" : "red-color")}>
                                {this.round(value.open - value.last) > 0 ?
                                    ("+ " + this.round(value.open - value.last)) : "- " + Math.abs(this.round(value.open - value.last))}</p>
                        </div>
                    ))}
                </div>
                <div className="stocks-details">
                    <StockDetails stock={this.state.currentStock} key={this.state.currentStock.ticker}></StockDetails>
                </div>
            </div>

        )
    }
}