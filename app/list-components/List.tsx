"use client";
import { useState, useEffect } from "react";
import { Fruit } from "../interfaces.ts";

export default function List() {
  const [list, setList] = useState<Fruit[]>([]);
  const [jar, setJar] = useState<Fruit[]>([]);
  const [listView, setListView] = useState<boolean>(true);

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


  // helper function to return grouped structure
  function ReturnByType({ fruitType }: Readonly<{ fruitType: string }>) {
    const types = ["family", "order", "genus"];
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
              <div key={index}>
                <h1>{ele}</h1>
                {list.filter((fruit: Fruit) => fruit[type] === ele).map((fruit: Fruit) => (
                  <h2 key={fruit.id}>{fruit.name} ({fruit.nutritions.calories})</h2>
                ))}
              </div>
            ))}
          </div>
        );
      }
    }
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
            <select name="fruit property" id="fruit property">
              <option value="None">None</option>
              <option value="Family">Family</option>
              <option value="Order">Order</option>
              <option value="Genus">Genus</option>
            </select>
          </div>
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
          {/* fix this */}
          <div>
            <ReturnByType fruitType={"family"} />
          </div>
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
