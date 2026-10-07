import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js";
import { corCi } from "../utils/formatadores";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function RankingChart({ ranking }) {
  const data = {
    labels: ranking.map((r) => `${r.nome} (${r.uf})`),
    datasets: [{ data: ranking.map((r) => r.ci), backgroundColor: ranking.map((r) => corCi(r.ci)), borderRadius: 3 }],
  };
  const options = { indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 1, title: { display: true, text: "Coeficiente de proximidade (Ci)" } } } };
  return <Bar data={data} options={options} aria-label="Gráfico do ranking TOPSIS" />;
}
