"use server";

import { prisma } from "@/lib/prisma";
import { isValidShortCode, isValidUrl } from "@/lib/validation";
import { generateShortCode } from "@/lib/generator";

export async function createLink(formData: FormData) {
  const originalUrl = formData.get("originalUrl") as string;
  let shortCode = formData.get("shortCode") as string;

  if (!isValidUrl(originalUrl)) {
    return { ok: false, error: "Invalid URL" };
  }

  if (shortCode && !isValidShortCode(shortCode)) {
    return { ok: false, error: "Short code must be 6–8 alphanumeric chars" };
  }

  // Auto-generate if none provided
  if (!shortCode) {
    shortCode = generateShortCode(6); // <-- FIXED
  }

  try {
    const link = await prisma.link.create({
      data: { originalUrl, shortCode },
    });
    return { ok: true, link };
  } catch (err: any) {
    return { ok: false, error: "Short code already exists" };
  }
}