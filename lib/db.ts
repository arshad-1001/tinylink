import { prisma } from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

export async function tryCreateLink(data: {
  shortCode: string;
  originalUrl: string;
}) {
  try {
    const link = await prisma.link.create({ data });
    return { ok: true, link };
  } catch (err: any) {
    // Unique constraint violation
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { ok: false, conflict: true };
      }
    }
    return { ok: false, conflict: false };
  }
}