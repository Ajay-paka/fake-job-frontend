import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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
                backgroundColor: [
                    "rgba(0,255,128,0.7)",   // Neon green
                    "rgba(255,255,0,0.7)",   // Neon yellow
                    "rgba(255,0,0,0.7)"      // Neon red
                ],
                borderColor: [
                    "rgba(0,255,128,1)",
                    "rgba(255,255,0,1)",
                    "rgba(255,0,0,1)"
                ],
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#00ff88",
                },
            },
            tooltip: {
                titleColor: "#00ff88",
                bodyColor: "#00ff88",
                backgroundColor: "#000",
                borderColor: "#00ff88",
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                ticks: { color: "#00ff88" },
                grid: { color: "rgba(0,255,128,0.1)" }
            },
            y: {
                ticks: { color: "#00ff88" },
                grid: { color: "rgba(0,255,128,0.1)" }
            }
        }
    };

    return (
        <div className="mt-10 bg-black/50 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,128,0.15)]">
            <h3 className="text-xl font-bold text-green-400 mb-4 tracking-wide">
                CYBER RISK ANALYTICS
            </h3>
            <Bar data={data} options={options} />
        </div>
    );
}

export default RiskChart;