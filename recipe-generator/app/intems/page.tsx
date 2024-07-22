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
import { SP } from "next/dist/shared/lib/utils";

export default function Home() {
  const [input, setinput] = useState<string | null>("");
  const [ingredients, setingredients] = useState<string[]>([]);
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );

  async function generaterecipe() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a recipe from the ingredients given only ${ingredients} !.  only give recipes only from the given ingredients with big instructions, only dont generate othe recipes and dont use special characters give it in strings dont use # and * and all give it in simple json format everytime  only no json keyword should be used. strict rule generate indian recipe from the given ingredients only dont include outside exta ones. Generate from given ingredients only dont generae randombly `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("contole reached in this function");
    console.log(text);

    console.log("befor to data base recepe");

    const res = await axios.post("/api/translater", text);
    console.log("this is after part 4");
    const data = await res.data;
    console.log(res.data);

    const speeech = data.translation;
    console.log(speeech);
    console.log(typeof speeech);
    const speechdaa = JSON.parse(speeech);

    const responsee = await axios.post("/api/text-to-speech", speechdaa);
    console.log(typeof responsee);
    // const audioBlob = new Blob([responsee.data], { type: "audio/mp3" });

    // // Create a URL for the Blob
    // const audioUrl = URL.createObjectURL(audioBlob);

    // // Create an audio element and play the audio
    // const audio = new Audio(audioUrl);
    // audio.play();

    // // Optional: Clean up the URL object after usage
    // URL.revokeObjectURL(audioUrl);
    // const base64AudioContent = responsee.data.audioContent;

    // // Decode the base64 string into binary data
    // const binaryString = atob(base64AudioContent);
    // const binaryLen = binaryString.length;
    // const bytes = new Uint8Array(binaryLen);
    // for (let i = 0; i < binaryLen; i++) {
    //   bytes[i] = binaryString.charCodeAt(i);
    // }

    // // Create a Blob from the binary data
    // const audioBlob = new Blob([bytes], { type: "audio/mp3" });

    // // Create a URL for the Blob
    // const audioUrl = URL.createObjectURL(audioBlob);

    // // Create an audio element and play the audio
    // const audio = new Audio(audioUrl);
    // console.log(audio);
    // await audio.play();

    // // Optional: Clean up the URL object after usage
    // URL.revokeObjectURL(audioUrl);

    // const base64AudioContent = responsee.data.audioContent;

    // // Decode the base64 string into binary data
    // const binaryString = window.atob(base64AudioContent);
    // const binaryLen = binaryString.length;
    // const bytes = new Uint8Array(binaryLen);
    // for (let i = 0; i < binaryLen; i++) {
    //   bytes[i] = binaryString.charCodeAt(i);
    // }

    // // Create a Blob from the binary data
    // const audioBlob = new Blob([bytes], { type: "audio/mp3" });

    // // Create a URL for the Blob
    // const audioUrl = URL.createObjectURL(audioBlob);

    // // Create an audio element and play the audio
    // const audio = new Audio(audioUrl);
    // audio.play();

    // const base64AudioContent = responsee.data.audioContent;

    // // Create an audio element
    // const audio = new Audio();

    // // Set the src of the audio element to the base64-encoded audio data
    // audio.src = `data:audio/mp3;base64,${base64AudioContent}`;

    // // Play the audio
    // audio.play();
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
