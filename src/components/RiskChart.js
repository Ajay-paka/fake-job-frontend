import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function RiskChart({ history }) {
    const low = history.filter(item => item.risk === "Low").length;
    const medium = history.filter(item => item.risk === "Medium").length;
    const high = history.filter(item => item.risk === "High").length;

    const data = {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                label: "Risk Distribution",
                data: [low, medium, high],
                backgroundColor: ["green", "orange", "red"]
            }
        ]
    };

    return (
        <div style={{ marginTop: "40px" }}>
            <h3>Risk Distribution</h3>
            <Bar data={data} />
        </div>
    );
}

export default RiskChart;