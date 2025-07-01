import Chart from "./Chart";
import { Fruit } from "../interfaces";

export default function JarList({
  jar,
  colors,
}: Readonly<{ jar: Fruit[]; colors: string[] }>) {
  return (
    <div className="flex justify-center border border-white border rounded-4xl w-full">
      <div className="mt-16 items-center text-white">
        <h1 className="mb-4">
          Total Calories :{" "}
          {jar
            ? jar.reduce((total, fruit) => fruit.nutritions.calories + total, 0)
            : 0}
        </h1>
        {jar
          ? jar.map((fruit: Fruit, index: number) => (
              <div
                // using index since order will never change
                key={index}
                className="flex justify-between border border-white mb-4 h-10 rounded-md items-center p-2 w-full max-w-[200px]"
              >
                <h3>
                  {fruit.name} ({fruit.nutritions.calories})
                </h3>
              </div>
            ))
          : null}
        <div className="mt-16">
          <Chart jar={jar} colors={colors} />
        </div>
      </div>
    </div>
  );
}
