import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const games = await prisma.game.findMany();
  return NextResponse.json(games);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, price, image } = body;

  if (!name || !price || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newGame = await prisma.game.create({
    data: {
      name,
      price,
      image, // Directly store the URL
    },
  });

  return NextResponse.json(newGame);
}
