import { prisma } from "@/lib/prisma";

export async function tryCreateLink(data: {
  shortCode: string;
  originalUrl: string;
}) {
  try {
    const link = await prisma.link.create({ data });
    return { ok: true, link };
  } catch (err: any) {
    // Unique constraint or other DB error is fine - return generic message
    if (err.code === "P2002") {
      return { ok: false, conflict: true };
    }
    return { ok: false, error: "Database error" };
  }
}

export async function tryDeleteLink(shortCode: string) {
  try {
    await prisma.link.delete({
      where: { shortCode },
    });

    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Not found" };
  }
}