import prisma from "@/utils/db";
import { compare } from "bcrypt";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return new Response("Invalid input", { status: 400 });
  }

  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // ❌ If user not found or password mismatch
  if (!user || !(await compare(password, user.password))) {
    await new Promise((r) => setTimeout(r, 500)); // 🛡️ Delay to prevent brute-force
    return new Response("Invalid email or password", { status: 401 });
  }

  // ✅ Success: return user role and email
  return Response.json({
    message: "Login success",
    email: user.email,
    role: user.role,
  });
}
