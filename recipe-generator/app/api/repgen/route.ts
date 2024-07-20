import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  console.log(res.data.recipe);
  return NextResponse.json({
    msg: "tring to put the ai in database",
  });
}
