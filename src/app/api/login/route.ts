import prisma from "@/utils/db"
import { compare } from "bcrypt"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return new Response("Invalid input", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  })

  if (!user || !(await compare(body.password, user.password))) {
    return new Response("Invalid email or password", { status: 401 })
  }
  

  // ✅ Send back the role as JSON
  return Response.json({
    message: "Login success",
    role: user.role,
  })
}
