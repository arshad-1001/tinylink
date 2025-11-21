import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;

// Minimal options for Neon HTTP driver
const httpOptions = {
  fetchOptions: {},
};

const adapter = new PrismaNeonHttp(connectionString, httpOptions);

const prisma =
  (globalThis as any).prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}

export { prisma };