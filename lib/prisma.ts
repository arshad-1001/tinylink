import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;

// PrismaNeonHttp (new Prisma 7 signature) accepts only the connection string
const adapter = new PrismaNeonHttp(connectionString);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;