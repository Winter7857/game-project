import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/db"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuid } from "uuid"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("image") as File
  const name = formData.get("name") as string
  const price = parseInt(formData.get("price") as string)

  if (!file || !name || isNaN(price)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuid()}-${file.name}`
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename)

  await writeFile(uploadPath, buffer)

  const newGame = await prisma.game.create({
    data: {
      name,
      price,
      image: `/uploads/${filename}`, // ⬅️ store image path
    },
  })

  return NextResponse.json({ message: "Game created", game: newGame }, { status: 201 })
}
