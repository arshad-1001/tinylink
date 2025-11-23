import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { code: string } }
) {
  const { code } = context.params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { code: string } }
) {
  const { code } = context.params;

  const existing = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.link.delete({
    where: { shortCode: code },
  });

  return NextResponse.json({ ok: true });
}