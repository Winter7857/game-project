import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => new PrismaClient()

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export default prisma
