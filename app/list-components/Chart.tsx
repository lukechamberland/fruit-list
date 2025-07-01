import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Fruit } from "../interfaces.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function PieChart({ jar }: Readonly<{ jar: Fruit[] }>) {

  const data = {
    labels: [...jar.map((fruit: Fruit) => fruit.name)],
    datasets: [
      {
        label: "Calories",
        data: [...jar.map((fruit) => fruit.nutritions.calories)],
        backgroundColor: [...jar.map(() => getRandomColor())],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
}
