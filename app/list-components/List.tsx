"use client";
import { useState, useEffect } from "react";
import { Fruit } from "../interfaces.ts";

export default function List() {
  useEffect(() => {
    async function fetchFruits(): Promise<Fruit[]> {
      const data = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
        headers: {
          "x-api-key": "fruit-api-challenge-2025",
        },
      });

      const parsedData = await data.json();
      console.log(parsedData);
    }

    fetchFruits();
  }, []);

  function FruitList() {
    return (
      <div className="flex justify-center border border-black-500 w-full">
        <div>
          <label htmlFor="fruit property">Group by</label>
          <select name="fruit property" id="fruit property">
            <option value="None">None</option>
            <option value="Family">Family</option>
            <option value="Order">Order</option>
            <option value="Genus">Genus</option>
          </select>
          <select name="view" id="view">
            <option value="List">List View</option>
            <option value="List">Table View</option>
          </select>
        </div>
      </div>
    );
  }

  function JarList() {
    return (
      <div className="flex justify-center border border-black-500 w-full">
        this is the jar
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
