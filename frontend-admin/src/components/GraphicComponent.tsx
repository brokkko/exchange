import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from "chart.js";
import {Component} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface Price {
    Date: string;
    Open: string;
    [key: string]: any
}

interface Props {
    data: Array<Price>;
    period: number;
}

export class GraphicComponent extends Component<Props>{

    labelList: string[];
    openList: string[];

    constructor(props: Props) {
        super(props);

        let currentDate = new Date();
        let data = props.data.filter(elem => {
            return this.#monthDiff(new Date(elem.Date), currentDate) <= this.props.period;
        })

        this.labelList = data.map((price) => price.Date).reverse();
        this.openList = data.map((price) => price.Open).reverse();


        // for(let i=0; i<this.labelList.length; i++) {
        //     let dt = new Date(this.labelList[i]);
        //     this.labelList[i] = dt.getDate() + "/" + (dt.getMonth() + 1);
        // }
    }

    #monthDiff = (d1: Date, d2: Date) => {
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    setData = () => {
        return {
            labels: this.labelList,
            datasets: [
                {
                    label: "Last",
                    data: this.openList,
                    fill: "start",
                    backgroundColor: (context: ScriptableContext<"line">) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                        gradient.addColorStop(0, "rgb(50,243,250)");
                        gradient.addColorStop(1, "rgba(102,139,255,0)");
                        return gradient;
                    },
                    borderColor: "rgba(75,192,192,1)"
                }
            ]
        };
    };

    setOptions = () => {
        return {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.35
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            interaction: {
                intersect: true
            },
            // animation: {
            //     duration: 0
            // }
        };
    }

    render() {
        return(
            <div className="graphic" style={{height: "550px", width: "98%"}}>
                <Line data={this.setData()} options={this.setOptions()} />
            </div>
        )
    }

}