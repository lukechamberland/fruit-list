"use client";
import { useState, useEffect } from "react";
import { Fruit } from "../interfaces";
import Chart from "./Chart";
import JarList from "./JarList";
import { getRandomColor } from "../helpers";

export default function List() {
  const [list, setList] = useState<Fruit[]>([]);
  const [jar, setJar] = useState<Fruit[]>([]);
  const [listView, setListView] = useState<string>("List");
  const [group, setGroup] = useState<string>("none");
  const [colors, setColors] = useState<string[]>([]);

  useEffect((): void => {
    async function fetchFruits(): Promise<void> {
      try {
        const response = await fetch(
          "https://fruity-proxy.vercel.app/api/fruits",
          {
            headers: {
              "x-api-key": "fruit-api-challenge-2025",
            },
          }
        );

        const parsedData = await response.json();
        setList(parsedData);
      } catch (error) {
        console.error("Failed to fetch fruits:", error);
      }
    }

    fetchFruits();
  }, []);

  // helper function to return grouped structure
  // NOTE: keeping this function here to avoid prop drilling
  function GroupedList({ fruitType }: Readonly<{ fruitType: string }>) {
    type GroupKey = "family" | "order" | "genus";

    const types: GroupKey[] = ["family", "order", "genus"];

    // return nothing if 'none' is the group
    if (!types.includes(fruitType as GroupKey)) return null;

    for (let type of types) {
      if (type === fruitType) {
        let allTypes: any[] = [];
        for (let ele of list) {
          if (!allTypes.includes(ele[type])) {
            allTypes.push(ele[type]);
          }
        }
        return (
          <div>
            {allTypes.map((ele: string, index: number) => (
              <details key={index}>
                <summary className="mb-4 cursor-pointer text-white">
                  <span>{ele}</span>
                </summary>
                <ul className="ml-4">
                  <button
                    className="ml-auto mb-4 cursor-pointer rounded-md p-1.5 hover:bg-gray-100 transition-colors duration-300 text-white"
                    onClick={() => {
                      const length: Fruit[] = list.filter(
                        (fruit: Fruit) => fruit[type] === ele
                      );
                      setJar([...jar, ...length]);
                      setColors([
                        ...colors,
                        ...length.map(() => getRandomColor()),
                      ]);
                    }}
                  >
                    Add All +
                  </button>
                  {list
                    .filter((fruit: Fruit) => fruit[type] === ele)
                    .map((fruit: Fruit) => (
                      <li
                        key={fruit.id}
                        className="flex justify-between border border-white mb-4 h-10 rounded-md items-center p-2 pointer text-white"
                      >
                        <h3>
                          {fruit.name} ({fruit.nutritions.calories})
                        </h3>
                        <button
                          className="cursor-pointer rounded-md p-1.5 hover:bg-gray-200 transition-colors duration-300 text-white"
                          onClick={(): void => {
                            setJar([...jar, fruit]);
                            setColors([...colors, getRandomColor()]);
                          }}
                        >
                          Add +
                        </button>
                      </li>
                    ))}
                </ul>
              </details>
            ))}
          </div>
        );
      }
    }
  }

  function AllFruits() {
    return (
      <div>
        {list.map((fruit: Fruit) => (
          <div
            key={fruit.id}
            className="flex justify-between border border-white mb-4 h-10 rounded-md items-center p-2 text-white"
          >
            <h3>
              {fruit.name} ({fruit.nutritions.calories})
            </h3>
            <button
              className="cursor-pointer rounded-md hover:bg-gray-300 transition-colors duration-300 text-white p-1"
              onClick={(): void => {
                setJar([...jar, fruit]);
                setColors([...colors, getRandomColor()]);
              }}
            >
              Add +
            </button>
          </div>
        ))}
      </div>
    );
  }

  function TableFruits() {
    return (
      <div>
        <table>
          <thead>
            <tr className="text-white">
              <th className="text-left px-2 py-8">Name</th>
              <th className="text-left px-2 py-8">Family</th>
              <th className="text-left px-2 py-8">Order</th>
              <th className="text-left px-2 py-8">Genus</th>
              <th className="text-left px-2 py-8">Calories</th>
            </tr>
          </thead>
          <tbody>
            {list.map((fruit: Fruit) => (
              <tr key={fruit.id} className="text-white mb-4">
                <td className="px-2 py-2">{fruit.name}</td>
                <td className="px-2 py-2">{fruit.family}</td>
                <td className="px-2 py-2">{fruit.order}</td>
                <td className="px-2 py-2">{fruit.genus}</td>
                <td className="px-2 py-2">{fruit.nutritions.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function FruitList() {
    return (
      <div className="flex justify-center border border-white w-full rounded-4xl p-8">
        <div className={`w-${listView === "List" ? "64" : "full"} mt-8`}>
          <div className="mb-4">
            <select
              value={listView}
              name="view"
              id="view"
              className="text-white cursor-pointer"
              onChange={(e): void => {
                if (group === "none") {
                  setListView(e.target.value);
                }
              }}
            >
              <option value="List">List View</option>
              <option value="Table">Table View</option>
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="fruit property" className="text-white">
              Group by
            </label>
            <select
              value={group}
              name="fruit property"
              id="fruit property"
              className="text-white cursor-pointer"
              onChange={(e): void => setGroup(e.target.value)}
            >
              <option value="none">None</option>
              <option value="family">Family</option>
              <option value="order">Order</option>
              <option value="genus">Genus</option>
            </select>
          </div>
          {group === "none" ? (
            <div>{listView === "List" ? <AllFruits /> : <TableFruits />}</div>
          ) : (
            <GroupedList fruitType={group} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {list.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-space-between p-16 gap-16 ">
          <FruitList />
          <JarList jar={jar} colors={colors} />
        </div>
      ) : (
        <span className="text-white">Loading...</span>
      )}
    </div>
  );
}
