// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Translate } from "@google-cloud/translate/build/src/v2";

// export async function POST(req: NextRequest) {
//   const translate = new Translate({
//     key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
//   });

//   console.log("they came till here ");
//   const res = await req.json();
//   //   const data = res.toString();
//   const textToTranslate = res.text;

//   const translatee = await translate.translate(textToTranslate, "kn");
//   console.log(`the translated text is given below re baba ${translate}`);
//   //   return translatee;

//   return NextResponse.json({
//     msg: "heelo ashish 23 u have an interview",
//     translatee,
//   });
// }

// import { NextRequest, NextResponse } from "next/server";
// import { Translate } from "@google-cloud/translate/build/src/v2";

// export async function POST(req: NextRequest) {
//   const translate = new Translate({
//     key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
//   });

//   console.log("Reached the translation endpoint");
//   const res = await req.json();

//   // Ensure 'res' contains the text to be translated as a string
//   const textToTranslate = res.text;
//   if (!textToTranslate || typeof textToTranslate !== "string") {
//     return NextResponse.json(
//       {
//         error: "Invalid input. 'text' should be a non-empty string.",
//       },
//       { status: 400 }
//     );
//   }

//   try {
//     const [translatedText] = await translate.translate(textToTranslate, "kn"); // 'kn' is the language code for Kannada
//     console.log(`Translated text: ${translatedText}`);

//     return NextResponse.json({
//       msg: "Translation successful",
//       translatedText,
//     });
//   } catch (error) {
//     console.error("Translation error:", error);
//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { Translate } from "@google-cloud/translate/build/src/v2";

// export async function POST(req: NextRequest) {
//   const translate = new Translate({
//     key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
//   });

//   try {
//     const res = await req.json();
//     const textToTranslate = res.text;

//     if (!textToTranslate || typeof textToTranslate !== "string") {
//       return NextResponse.json(
//         { error: "Invalid input. 'text' should be a non-empty string." },
//         { status: 400 }
//       );
//     }

//     const [translatedText] = await translate.translate(textToTranslate, "kn"); // 'kn' is the language code for Kannada
//     console.log(`Translated text: ${translatedText}`);

//     return NextResponse.json({
//       msg: "Translation successful",
//       translatedText,
//     });
//   } catch (error) {
//     console.error("Translation error:", error);
//     return NextResponse.json({ msg: "hi" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { Translate } from "@google-cloud/translate/build/src/v2";

// Create a new Translate instance with API key
const translate = new Translate({
  key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const body = await req.json();
    const ab = JSON.stringify(body);
    const sc = ab.toString();

    // const textToTranslate = body.text; // Extract the text field

    // Check if textToTranslate is present and valid
    // if (!textToTranslate) {
    //   return NextResponse.json(
    //     { error: "Text to translate is missing." },
    //     { status: 400 }
    //   );
    // }

    // Translate the text
    const [translation] = await translate.translate(sc, "kn");

    return NextResponse.json({
      msg: "Translation successful",
      translation,
    });
  } catch (error) {
    console.error("Error during translation:", error);
    return NextResponse.json(
      { error: "Failed to translate text." },
      { status: 500 }
    );
  }
}
