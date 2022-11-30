import React, {Component} from "react";

type StockDetailsProps = {
    symbol: string
}

export default class StockDetails extends Component<StockDetailsProps> {


    constructor(props: StockDetailsProps) {
        super(props);
    }

    render() {
        return(
            <div>STOCK DETAILS AND DATA FOR : {this.props.symbol}</div>
        )
    }
}