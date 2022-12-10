import React, {Component} from "react";
import "../style/stockdetails-style.css";
import {Period} from "../core/enum/Period";
import {Stock} from "../core/models/Stock";
import {GraphicComponent} from "./GraphicComponent";
import {serverURI, stocksAPIRoutes} from "../core/config/api/api.config";

type StockDetailsProps = {
    stock: Stock
};

type State = {
    selectedStock: Stock,
    selectedPeriod: Period,
    historicalData: []
}

export default class StockDetails extends Component<StockDetailsProps> {

    state: State
    round = (value: number): number => {
        return Math.round(100 * value) / 100;
    };

    constructor(props: StockDetailsProps) {
        super(props);
        this.state = {
            selectedStock: this.props.stock,
            selectedPeriod: Period.ONE_YEAR,
            historicalData: []
        }

        this.#getHistoricalData(this.state.selectedStock.ticker);
    }

    #getHistoricalData = (ticker: string) => {
        fetch(serverURI + stocksAPIRoutes.getOne(ticker), {
            method: 'GET',
            headers:  {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.ok) return response.json();
        }).then(json => {
            console.log("time to update")
            this.setState({
                historicalData: json,
                selectedPeriod: Period.ONE_MONTH,
            })
        });
    }

    #getPeriodNumberOfMonths = (period: Period) => {
        switch (period) {
            case Period.ONE_MONTH: return 1;
            case Period.THREE_MONTHS: return 3;
            case Period.SIX_MONTHS: return 6;
            case Period.ONE_YEAR: return 12;
            case Period.NONE: return 0;

        }
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

    #historyOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.setState({
            selectedPeriod: Period.NONE
        });
    }

    render() {
        return(
            <div>
                <div className="stocks-details-wrapper">
                    <div className="stock-title">
                        <p className="stock-full-name">{this.state.selectedStock?.name}</p>
                        <div className="stock-value">
                            <p className="stock-text none-color">{this.state.selectedStock?.last}</p>
                            <p className="stock-text grey-color">USD</p>
                        </div>
                        <p className={"stock-text " + (this.state.selectedStock?.open
                            -this.state.selectedStock?.last > 0 ? "green-color" : "red-color")}>
                            {this.round(this.state.selectedStock.open - this.state.selectedStock.last) > 0 ?
                                ("+ " + this.round(this.state.selectedStock.open - this.state.selectedStock.last)) :
                                "- " + Math.abs(this.round(this.state.selectedStock.open - this.state.selectedStock.last))}</p>
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
                        {/*<div className="period-item" onClick={this.#historyOnClick}>*/}
                        {/*    <span className={this.state.selectedPeriod === Period.NONE ? "selected-period-long" : ""}>History</span>*/}
                        {/*</div>*/}
                    </div>

                    <div className={this.state.selectedPeriod === Period.NONE ? "display-none" : ""}>
                        <GraphicComponent data={this.state.historicalData} period={this.#getPeriodNumberOfMonths(this.state.selectedPeriod)} key={this.state.selectedPeriod}></GraphicComponent>
                    </div>

                    {/*<div className={this.state.selectedPeriod !== Period.NONE ? "display-none" : ""}>*/}
                    {/*    {this.state.historicalData.map((value:any) => (*/}
                    {/*        <p>test</p>*/}
                    {/*    ))}*/}
                    {/*</div>*/}

                </div>
            </div>

        )
    }
}