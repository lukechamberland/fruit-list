import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Fruit } from "../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ jar, colors }: Readonly<{ jar: Fruit[], colors: string[] }>) {

  const data = {
    labels: [...jar.map((fruit: Fruit) => fruit.name)],
    datasets: [
      {
        label: "Calories",
        data: [...jar.map((fruit) => fruit.nutritions.calories)],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
        },
      },
    },
    layout: {
      padding: {
        bottom: 30,
      },
    },
    responsive: true,
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
