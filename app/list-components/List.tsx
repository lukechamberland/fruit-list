"use client";
import { useState, useEffect } from "react";
import { Fruit } from "../interfaces.ts";
import Chart from "./Chart";

export default function List() {
  const [list, setList] = useState<Fruit[]>([]);
  const [jar, setJar] = useState<Fruit[]>([]);
  const [listView, setListView] = useState<string>("List");
  const [group, setGroup] = useState<string>("none");

  useEffect(() => {
    async function fetchFruits(): Promise<Fruit[]> {
      const data = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
        headers: {
          "x-api-key": "fruit-api-challenge-2025",
        },
      });

      const parsedData = await data.json();
      console.log(parsedData);
      setList(parsedData);
    }

    fetchFruits();
  }, []);

  useEffect(() => {
    console.log(group);
  }, [group]);

  // helper function to return grouped structure
  function GroupedList({ fruitType }: Readonly<{ fruitType: string }>) {
    const types = ["family", "order", "genus"];

    // return nothing if 'none' is the group
    if (!types.includes(fruitType)) {
      return null;
    }
    for (let type of types) {
      if (type === fruitType) {
        let allTypes = [];
        for (let ele of list) {
          if (!allTypes.includes(ele[type])) {
            allTypes.push(ele[type]);
          }
        }
        return (
          <div>
            {allTypes.map((ele: string, index: number) => (
              <details key={index}>
                <summary className="mb-4 border border-green-500">
                  <span>{ele}</span>
                </summary>
                <ul>
                  <button
                    className="ml-auto"
                    onClick={() =>
                      setJar([
                        ...jar,
                        ...list.filter((fruit: Fruit) => fruit[type] === ele),
                      ])
                    }
                  >
                    Add All +
                  </button>
                  {list
                    .filter((fruit: Fruit) => fruit[type] === ele)
                    .map((fruit: Fruit) => (
                      <li
                        key={fruit.id}
                        className="flex justify-between border border-blue-500 mb-4 h-10 rounded-md items-center p-2 pointer"
                      >
                        <h3>
                          {fruit.name} ({fruit.nutritions.calories})
                        </h3>
                        <button onClick={(): void => setJar([...jar, fruit])}>
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

  function List() {
    return (
      <div>
        {listView === "List" ? (
          <div>
            {list
              ? list.map((fruit: Fruit) => (
                  <div
                    key={fruit.id}
                    className="flex justify-between border border-blue-500 mb-4 h-10 rounded-md items-center p-2"
                  >
                    <h3>
                      {fruit.name} ({fruit.nutritions.calories})
                    </h3>
                    <button onClick={(): void => setJar([...jar, fruit])}>
                      Add +
                    </button>
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Family</th>
                  <th>Order</th>
                  <th>Genus</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {list.map((fruit: Fruit) => (
                  <tr key={fruit.id}>
                    <td>{fruit.name}</td>
                    <td>{fruit.family}</td>
                    <td>{fruit.order}</td>
                    <td>{fruit.genus}</td>
                    <td>{fruit.nutritions.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function FruitList() {
    return (
      <div className="flex justify-center border border-black-500 w-full items-center">
        <div className="w-75 mt-8">
          <div className="mb-4">
            <select
              value={listView}
              name="view"
              id="view"
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
            <label htmlFor="fruit property">Group by</label>
            <select
              value={group}
              name="fruit property"
              id="fruit property"
              onChange={(e): void => setGroup(e.target.value)}
            >
              <option value="none">None</option>
              <option value="family">Family</option>
              <option value="order">Order</option>
              <option value="genus">Genus</option>
            </select>
          </div>
          {group === "none" ? <List /> : <GroupedList fruitType={group} />}
        </div>
      </div>
    );
  }

  function JarList() {
    return (
      <div className="flex justify-center border border-black-500 w-full">
        <div className="mt-16">
        <h1>Total Calories : {jar ? jar.reduce((total, fruit) => fruit.nutritions.calories + total, 0): 0}</h1>
          {jar
            ?
            jar.map((fruit: Fruit, index: number) => (
                <div
                  // using index since order will never change
                  key={index}
                  className="flex justify-between border border-blue-500 mb-4 h-10 rounded-md items-center p-2"
                >
                  <h3>
                    {fruit.name} ({fruit.nutritions.calories})
                  </h3>
                </div>
              ))
            : null}
        </div>
        <Chart jar={jar} />
      </div>
    );
  }

  return (
    <div className="flex justify-space-between">
      <FruitList />
      <JarList />
    </div>
  );
}
