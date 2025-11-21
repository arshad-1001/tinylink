import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidShortCode } from "@/lib/validation";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params; // 🔥 EXACT FIX

  if (!isValidShortCode(code)) {
    return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
  }

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params; // 🔥 SAME FIX

  if (!isValidShortCode(code)) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  try {
    await prisma.link.delete({ where: { shortCode: code } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}