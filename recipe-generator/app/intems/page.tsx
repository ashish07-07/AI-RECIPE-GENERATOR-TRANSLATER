"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { setEngine } from "crypto";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import prisma from "../db";
import { join } from "path";
import { Translate } from "@google-cloud/translate/build/src/v2";
import { type } from "os";

export default function Home() {
  const [input, setinput] = useState<string | null>("");
  const [ingredients, setingredients] = useState<string[]>([]);
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );

  async function generaterecipe() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a recipe from the ingredients given only ${ingredients}dont give othe responses plese.  only give recipes only from the given ingredients with big instructions, only dont generate othe recipes and dont use special characters give it in strings dont use # and * and all give it in simple json format everytime  only no json keyword should be used. strict rule generate indian recipe from the given ingredients only dont include outside exta ones `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("contole reached in this function");
    console.log(text);

    console.log("befor to data base recepe");

    const res = await axios.post("/api/translater", text);
    console.log("this is after part 4");
    const data = await res.data;

    // const speeech = data.translation;
    // console.log(typeof speeech);
    // const value = new SpeechSynthesisUtterance(speeech);
    // // value.lang = "kn";

    // window.speechSynthesis.speak(value);
    //////////

    const testText = "ುದತ್ಾಲ ೂಗುಾೀ";
    const testValue = new SpeechSynthesisUtterance(testText);
    // testValue.lang = "kn";
    window.speechSynthesis.speak(testValue);

    // console.log(speeech);
    // const speech1 = JSON.stringify(speeech);
    // // const speech2 = speech1.toString();
    // console.log("befwre 2");
    // console.log(speech1);
    // const value = new SpeechSynthesisUtterance(speech1);
    // value.lang = "kn";
    // window.speechSynthesis.speak(value);

    // if (speeech && typeof speeech === "object" && speeech["ಸೂಚನೆಗಳು"]) {
    //   const instructionsText = speeech["ಸೂಚನೆಗಳು"];

    //   // Create and configure the SpeechSynthesisUtterance instance
    //   const value = new SpeechSynthesisUtterance(instructionsText);
    //   value.lang = "kn"; // Set language code to Kannada

    //   // Log the SpeechSynthesisUtterance object for debugging
    //   console.log("SpeechSynthesisUtterance Object:", value);

    //   // Speak the instructions
    //   window.speechSynthesis.speak(value);
    // } else {
    //   console.error("Invalid or missing 'instructions' data:", speeech);
    // }
  }

  return (
    <div>
      <input
        className="text-fuchsia-600"
        type="text"
        placeholder="enter the ingredients u want to use"
        onChange={function (e) {
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
