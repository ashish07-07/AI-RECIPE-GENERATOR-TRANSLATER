import { NextRequest, NextResponse } from "next/server";

import TextToSpeech from "@google-cloud/text-to-speech";
import fs, { readFile } from "fs";
import util from "util";
// import player from "play-sound";
import player from "play-sound";

import { join } from "path";

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY;
  const res = await req.json();
  console.log(typeof res);

  const st = JSON.stringify(res);

  const stringre = st.toString();

  const client = new TextToSpeech.TextToSpeechClient();

  const request = {
    input: { text: stringre },
    voice: { languageCode: "kn-IN", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  const responseData = await response.json();
  console.log(responseData);
  const audioContent = Buffer.from(responseData.audioContent, "base64");

  // console.log(request);
  const writefile = util.promisify(fs.writeFile);
  console.log(writefile);
  await writefile("output.mp3", audioContent, "binary");
  const filePath =
    "D:/AI-RECIPE-GENERATOR-TRANSLATER/recipe-generator/output.mp3";

  player().play(filePath, (err: any) => {
    if (err) {
      console.error("Error playing sound:", err);
    } else {
      console.log("Audio played successfully");
    }
  });

  return new NextResponse(audioContent, {
    headers: {
      "Content-Type": "audio/mp3",
    },
  });
}
