import { z } from "zod"
import prisma from "@/utils/db"
import { hash } from "bcrypt"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
    try {
      const body = await req.json()
  
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      const parsed = schema.safeParse(body)
  
      if (!parsed.success) {
        console.error("Validation error:", parsed.error.format())
        return new Response("Invalid input", { status: 400 })
      }
  
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
      })
  
      if (existingUser) {
        return new Response("User already exists", { status: 400 })
      }
  
      const hashed = await hash(body.password, 10)
  
      await prisma.user.create({
        data: {
          email: body.email,
          password: hashed,
        },
      })
  
      return new Response("Registered", { status: 200 })
    } catch (error: any) {
      console.error("REGISTER ERROR:", error)
      return new Response("Internal server error", { status: 500 })
    }
  }
  
