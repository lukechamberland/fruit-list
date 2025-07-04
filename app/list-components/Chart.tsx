import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Fruit } from "../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({
  jar,
  colors,
}: Readonly<{ jar: Fruit[]; colors: string[] }>) {
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
    responsive: true,

    layout: {
      padding: {
        bottom: 30,
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="relative w-full h-full max-w-[600px] ">
      <Pie data={data} options={options} className="mb-[-50px]" />
    </div>
  );
}
