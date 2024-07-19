"use client";

import { useState } from "react";

export default function Home() {
  const [input, setinput] = useState("");
  const [ingredients, setingredients] = useState([]);

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
        onClick={function submitre() {
          console.log("curser reached here baba");
          const engarray = input.split(",");
          console.log(engarray);
        }}
      >
        {" "}
        CLick me baba
      </button>
    </div>
  );
}
