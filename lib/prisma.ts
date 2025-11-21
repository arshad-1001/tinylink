import { PrismaClient } from "./generated/prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });

const adapter = new PrismaNeonHttp(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;