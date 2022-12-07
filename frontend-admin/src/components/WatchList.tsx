import React, {Component} from "react";
import '../style/colors.css';
import "../style/watchlist-style.css";
import StockDetails from "./StockDetails";

type Stocks = {
    symbol: string,
    fullName: string
    last: number,
    change: number,
    change_percent: number
}
type WatchListState = {
    currentStock: string
}

export default class WatchList extends Component{

    stocksList: Stocks[];
    state: WatchListState;

    constructor(props: []) {
        super(props);
        this.stocksList = [
            {symbol: "MSFT", fullName: "Microsoft", last: 245.38, change: -6.86, change_percent: 8.5},
            {symbol: "APLE", fullName: "Apple", last: 245.38, change: 6.86, change_percent: 8.5},
            {symbol: "NFLX", fullName: "Netflix", last: 245.38, change: 6.86, change_percent: -8.5},
            {symbol: "TSLA", fullName: "Tesla", last: 245.38, change: 6.86, change_percent: 8.5},
        ]
        this.state = {
            currentStock: this.stocksList[0].symbol
        }
    }

   handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
       event.preventDefault();
       const symbol: string = event.currentTarget.id;
       this.setState({
           currentStock: symbol
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
                        <p className="text">Change%</p>
                    </div>
                    {this.stocksList.map((value, index) => (
                        <div className="description description-border" id={value.symbol} onClick={this.handleClick}>
                            <p className="text symbol">{value.symbol}</p>
                            <p className="text fullName">{value.fullName}</p>
                            <p className="text fullName">{value.last}</p>
                            <p className={"text " + (Number(value.change) > 0 ? "green-color" : "red-color")}>{value.change}</p>
                            <p className={"text " + (Number(value.change_percent) > 0 ? "green-color" : "red-color")}>{value.change_percent}</p>
                        </div>
                    ))}
                </div>
                <div className="stocks-details">
                    <StockDetails symbol={this.state.currentStock} key={this.state.currentStock}></StockDetails>
                </div>
            </div>

        )
    }
}