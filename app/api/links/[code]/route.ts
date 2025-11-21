import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidShortCode } from "@/lib/validation";

interface Params {
  params: { code: string };
}

export async function GET(_: Request, { params }: Params) {
  const { code } = params;

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


export async function DELETE(_: Request, { params }: Params) {
    const { code } = params;
  
    if (!isValidShortCode(code)) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
  
    try {
      await prisma.link.delete({
        where: { shortCode: code },
      });
  
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
  