import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
}
