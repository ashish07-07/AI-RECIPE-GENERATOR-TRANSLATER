"use client";

import axios from "axios";
import { setEngine } from "crypto";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function Home() {
  const [input, setinput] = useState<string | null>();
  const [ingredients, setingredients] = useState<string[]>([]);

  return (
    <div>
      <input
        className="text-fuchsia-600"
        type="text"
        placeholder="enter the ingredients u want to use"
        onChange={function (e) {
          setinput(e.target.value);
        }}
      ></input>

      <button
        onClick={async function submitre() {
          try {
            if (input) {
              const engar = input.split(",");
              setingredients(engar);
              const res = await axios.post("/api/items", ingredients);
              console.log(res.data.items);

              return NextResponse.json({
                msg: "items added to database successfully",
                ingredients,
              });
            } else {
              return NextResponse.json({
                msg: "please enter  details ingredients",
              });
            }
          } catch (e) {
            return NextResponse.json({
              msg: "error while adding the item",
            });
          }
        }}
      >
        {" "}
        CLick me baba
      </button>
    </div>
  );
}
