"use server";

import { prisma } from "@/lib/prisma";

export async function deleteLink(formData: FormData) {
  const code = formData.get("code") as string;

  try {
    await prisma.link.delete({
      where: { shortCode: code },
    });

    return { ok: true };
  } catch {
    return { ok: false, error: "Delete failed" };
  }
}