import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, context: { params: { code: string } }) {
  const { code } = context.params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // increment click count + lastClicked
  await prisma.link.update({
    where: { shortCode: code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  return NextResponse.redirect(link.originalUrl, { status: 302 });
}