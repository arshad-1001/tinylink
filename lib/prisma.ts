import { PrismaClient } from "./generated/prisma/client";
import { Pool } from "@neondatabase/serverless";
import { NeonHTTPAdapter } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });

const adapter = new NeonHTTPAdapter({ pool });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // Prisma 7 required
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;