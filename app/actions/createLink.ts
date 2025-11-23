"use server";

import { prisma } from "@/lib/prisma";
import { validateUrl, validateShortCode } from "@/lib/validation";

export async function createLink(formData: FormData) {
  const originalUrl = formData.get("originalUrl") as string;
  const shortCode = formData.get("shortCode") as string | undefined;

  if (!validateUrl(originalUrl)) {
    return { ok: false, error: "Invalid URL format" };
  }

  if (shortCode && !validateShortCode(shortCode)) {
    return { ok: false, error: "Invalid short code format" };
  }

  try {
    const link = await prisma.link.create({
      data: { originalUrl, shortCode },
    });

    return { ok: true, link };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { ok: false, error: "Short code already exists" };
    }
    return { ok: false, error: "Server error" };
  }
}