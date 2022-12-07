import React, {Component} from "react";
import "../style/stockdetails-style.css";
import {Period} from "../core/enum/Period";
import {Stock} from "../core/models/Stock";
import {GraphicComponent} from "./GraphicComponent";

import data from "./data";

type StockDetailsProps = {
    stock: Stock
};

type State = {
    selectedStock: Stock,
    selectedPeriod: Period
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
            selectedPeriod: Period.ONE_MONTH
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
                    </div>

                    <GraphicComponent data={data}></GraphicComponent>

                </div>
            </div>

        )
    }
}