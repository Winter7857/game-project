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
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, name, price, image } = body;
  
    if (!id || !name || !price || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
  
    const updatedGame = await prisma.game.update({
      where: { id },
      data: { name, price, image },
    });
  
    return NextResponse.json(updatedGame);
  }
  
export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();
    const body = await req.json();
    const { name } = body;
  
    if (!name) {
      return NextResponse.json({ error: "Missing game name" }, { status: 400 });
    }
  
    try {
      await prisma.game.delete({
        where: { name }, // ✅ this only works if name is unique!
      });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("DELETE failed:", error);
      return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
    }
  }
  