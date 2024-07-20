"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { setEngine } from "crypto";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import prisma from "../db";
import { join } from "path";
import { Translate } from "@google-cloud/translate/build/src/v2";

export default function Home() {
  const [input, setinput] = useState<string | null>("");
  const [ingredients, setingredients] = useState<string[]>([]);
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );
  //   const translate = new Translate({
  //     key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
  //   });

  //   async function Translatext(
  //     text: string[],
  //     langauge: string
  //   ): Promise<string[]> {
  //     const translatee = await translate.translate(text, langauge);
  //     console.log(`the translated text is given below re baba ${translate}`);
  //     return translatee;
  //   }

  async function generaterecipe() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a recipe from the ingredients given only ${ingredients}dont give othe responswe plese  only give recipes only from the given ingredients only dont generate othe rrecipes`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("contole reached in this function");
    console.log(text);
    console.log(typeof text);
    const dataa = toString();
    console.log("befor to data base recepe");
    // const dataa = await JSON.parse(text);
    // console.log(dataa);
    // await axios.post("/api/repgen", text);

    // await Translatext(texte, "Kannada");
  }

  //   useEffect(() => {

  //     console.log(
  //       `ingredients has changed so please have alook at it ${ingredients}`
  //     );
  //   }, [ingredients]);

  return (
    <div>
      <input
        className="text-fuchsia-600"
        type="text"
        placeholder="enter the ingredients u want to use"
        onChange={function (e) {
          //   setinput(e.target.value);
          setinput(e.currentTarget.value);
        }}
      ></input>

      <button
        onClick={async function submitre() {
          try {
            if (input) {
              const engar = input.split(",");
              console.log(engar);
              setingredients(engar);

              const res = await axios.post("/api/items", ingredients);
              console.log(res.data.items);
              await generaterecipe();
            } else {
              alert("enter the ingredients to make a recipe dude");
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
