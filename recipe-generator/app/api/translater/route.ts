import { NextRequest, NextResponse } from "next/server";
import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate({
  key: process.env.NEXT_PUBLIC_GOOGLEMAPAPI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ab = JSON.stringify(body);
    const sc = ab.toString();

    const [translation] = await translate.translate(sc, "ml");

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
