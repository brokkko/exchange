import React, {Component} from "react";
import "../style/stockdetails-style.css";
import {Period} from "./enum/Period";

type StockDetailsProps = {
    symbol: string
};
type Stock = {
    symbol: string,
    fullName: string
    last: number,
    change: number,
    change_percent: number
};

type State = {
    selectedStock: Stock | undefined,
    selectedPeriod: Period
}

export default class StockDetails extends Component<StockDetailsProps> {

    stocksList: Stock[];
    state: State

    constructor(props: StockDetailsProps) {
        super(props);
        this.stocksList = [
            {symbol: "MSFT", fullName: "Microsoft", last: 245.38, change: -6.86, change_percent: 8.5},
            {symbol: "APLE", fullName: "Apple", last: 245.38, change: 6.86, change_percent: 8.5},
            {symbol: "NFLX", fullName: "Netflix", last: 245.38, change: 6.86, change_percent: -8.5},
            {symbol: "TSLA", fullName: "Tesla", last: 245.38, change: 6.86, change_percent: 8.5},
        ];
        this.state = {
            selectedStock: this.#getSelectedStock(),
            selectedPeriod: Period.ONE_MONTH
        }
    }

    #getSelectedStock = () => {
        return this.stocksList.find(obj => obj.symbol === this.props.symbol);
    }

    #getOpenValue = (selectedStock: Stock) => {
        return 102.08;
    }

    #getHighValue = (selectedStock: Stock) => {
        return 102.08;
    }

    #getLowValue = (selectedStock: Stock) => {
        return 102.08;
    }

    #oneMonthPeriodOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            selectedPeriod: Period.ONE_MONTH
        });
    }

    #threeMonthPeriodOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            selectedPeriod: Period.THREE_MONTHS
        });
    }

    #sixMonthPeriodOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            selectedPeriod: Period.SIX_MONTHS
        });
    }

    #oneYearPeriodOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            selectedPeriod: Period.ONE_YEAR
        });
    }

    render() {
        return(
            <div>
                <div className="stocks-details-wrapper">
                    <div className="stock-title">
                        <p className="stock-full-name">{this.state.selectedStock?.fullName}</p>
                        <div className="stock-value">
                            <p className="stock-text none-color">{this.state.selectedStock?.last}</p>
                            <p className="stock-text grey-color">USD</p>
                        </div>
                        <p className={"stock-text " + (Number(this.state.selectedStock?.change) > 0 ? "green-color" : "red-color")}>{this.state.selectedStock?.change}</p>
                    </div>
                    <div className="period-selector">
                        <div className="period-item" onClick={this.#oneMonthPeriodOnClick}>
                            <span className={this.state.selectedPeriod === Period.ONE_MONTH ? "selected-period" : ""}>{Period.ONE_MONTH}</span>
                        </div>
                        <div className="period-item" onClick={this.#threeMonthPeriodOnClick}>
                            <span className={this.state.selectedPeriod === Period.THREE_MONTHS ? "selected-period" : ""}>{Period.THREE_MONTHS}</span>
                        </div>
                        <div className="period-item" onClick={this.#sixMonthPeriodOnClick}>
                            <span className={this.state.selectedPeriod === Period.SIX_MONTHS ? "selected-period" : ""}>{Period.SIX_MONTHS}</span>
                        </div>
                        <div className="period-item" onClick={this.#oneYearPeriodOnClick}>
                            <span className={this.state.selectedPeriod === Period.ONE_YEAR ? "selected-period" : ""}>{Period.ONE_YEAR}</span>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}