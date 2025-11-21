"use server";

import { prisma } from "@/lib/prisma";

export async function deleteLink(shortCode: string) {
  try {
    await prisma.link.delete({
      where: { shortCode },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Not found" };
  }
}