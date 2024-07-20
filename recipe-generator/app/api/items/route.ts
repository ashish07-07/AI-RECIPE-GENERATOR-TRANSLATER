import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export async function POST(req: NextRequest) {
  const items = await req.json();
  console.log(typeof items);
  console.log("before putting it into the database");
  console.log(
    items.map(function (item: any) {
      console.log(item);
    })
  );

  await prisma.item.create({
    data: {
      ingredients: items,
    },
  });

  return NextResponse.json(
    {
      msg: "success",
      items,
    },
    {
      status: 200,
    }
  );
}
