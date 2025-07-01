"use client";
import { useState, useEffect } from "react";
import { Fruit } from "../interfaces.ts";

export default function List() {
  const [list, setList] = useState<Fruit[]>([]);
  const [jar, setJar] = useState<Fruit[]>([]);
  const [listView, setListView] = useState<boolean>(true);
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
                <summary className="mb-4">{ele}</summary>
                <ul>
                  {list
                    .filter((fruit: Fruit) => fruit[type] === ele)
                    .map((fruit: Fruit) => (
                      <li
                        key={fruit.id}
                        className="flex justify-between border border-blue-500 mb-4 h-10 rounded-md items-center p-2"
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
        {listView ? (
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
              name="view"
              id="view"
              onChange={(): void => setListView(!listView)}
            >
              <option value="List">List View</option>
              <option value="List">Table View</option>
            </select>
          </div>
          <div className="mb-8">
            <label htmlFor="fruit property">Group by</label>
            <select
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
        <div>
          {jar
            ? jar.map((fruit: Fruit) => (
                <div
                  key={fruit.id}
                  className="flex justify-between border border-blue-500 mb-4 h-10 rounded-md items-center p-2"
                >
                  <h3>
                    {fruit.name} ({fruit.nutritions.calories})
                  </h3>
                </div>
              ))
            : null}
        </div>
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
