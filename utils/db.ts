import { PrismaClient } from "@prisma/client";

// Declare the global `prisma` property on `globalThis`
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // For development, reuse the Prisma Client to avoid new instances on every request
  if (globalThis.prisma) {
    prisma = globalThis.prisma;
  } else {
    prisma = new PrismaClient();
    globalThis.prisma = prisma; // Save the Prisma client instance to globalThis
  }
}

export default prisma;
