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
}

export class GraphicComponent extends Component<Props>{

    labelList: string[];
    openList: string[];

    constructor(props: Props) {
        super(props);
        this.labelList = props.data.map((price) => price.Date);
        this.openList = props.data.map((price) => price.Open);
    }

    setData = () => {
        return {
            labels: this.labelList,
            datasets: [
                {
                    label: "price",
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
            maintainAspectRatio: true,
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
            animation: {
                duration: 0
            }
        };
    }

    render() {
        return(
            <div className="graphic">
                <Line data={this.setData()} options={this.setOptions()} />
            </div>
        )
    }

}