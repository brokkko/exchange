import React, {Component} from "react";

type StockDetailsProps = {
    symbol: string
}

export default class StockDetails extends Component<StockDetailsProps> {

    stock: StockDetailsProps;

    constructor(props: StockDetailsProps) {
        super(props);
        this.stock = props;

    }

    render() {
        return(
            <div>STOCK DETAILS AND DATA FOR : {this.stock.symbol}</div>
        )
    }
}