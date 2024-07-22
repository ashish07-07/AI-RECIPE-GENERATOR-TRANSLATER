// import { NextRequest, NextResponse } from "next/server";
// import textToSpeech from "@google-cloud/text-to-speech";

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the incoming JSON request
//     const { text } = await req.json();

//     // Initialize the Text-to-Speech client
//     const client = new textToSpeech.TextToSpeechClient();

//     // Construct the request for Google Cloud TTS
//     const request = {
//       input: { text: text }, // Ensure the property name is `text`
//       voice: { languageCode: "kn-IN", ssmlGender: "NEUTRAL" },
//       audioConfig: { audioEncoding: "MP3" },
//     };

//     // Perform the Text-to-Speech request
//     const [response] = await client.synthesizeSpeech(request);

//     // Extract the audio content from the response
//     const audioContent = response.audioContent;

//     // Return the audio content as a base64-encoded string
//     return new NextResponse(
//       JSON.stringify({ audioContent: audioContent.toString("base64") }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error during TTS request:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// import TextToSpeech from "@google-cloud/text-to-speech";
// import { NextRequest } from "next/server";
// import * as fs from 'fs/promises';

// // import fs from "fs";
// import util from "util";
// export async function POST(req: NextRequest) {
//   const client = new TextToSpeech.TextToSpeechClient();

//   const res = await req.json();
//   const str = JSON.stringify(res);
//   const text = str.toString();

//   const request:any = {
//     input: { text: text },
//     // Select the language and SSML voice gender (optional)
//     voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
//     // select the type of audio encoding
//     audioConfig: { audioEncoding: "MP3" },

//     const [response] = await client.synthesizeSpeech(request);
//     await fs.writeFile('output.mp3', response.audioContent, 'binary');
//     console.log('Audio content written to file: output.mp3');

// }

// import { TextToSpeechClient } from "@google-cloud/text-to-speech";
// import { NextRequest, NextResponse } from "next/server";
// import * as fs from "fs/promises";

// export async function POST(req: NextRequest) {
//   const client = new TextToSpeechClient();

//   const requestBody = await req.json();
//   const text = requestBody.text;

//   const request = {
//     input: { text: text },
//     voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
//     audioConfig: { audioEncoding: "MP3" },
//   };

//   const [response] = await client.synthesizeSpeech(request);
//   const outputFile = "output.mp3";
//   await fs.writeFile(outputFile, response.audioContent, "binary");

//   return NextResponse.json({
//     message: `Audio content written to file: ${outputFile}`,
//   });
// }

import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import TextToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";

export async function POST(req: NextRequest) {
  const client = new TextToSpeech.TextToSpeechClient();

  const res = await req.json();
  const s1 = JSON.stringify(res);
  const text = s1.toString();

  const request = {
    input: { text },
    voice: { languageCode: "kn-IN", ssmlGender: "NEUTRAL" },
    audioconfig: { audioConfig: "MP3" },
  };

  const [response] = client.synthesizeSpeech(request);

  const writefile = util.promisify(fs.writeFile);
  await writefile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");
}
