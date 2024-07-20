import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json({
    msg: "heelo ashish 23 u have an interview",
  });
}
