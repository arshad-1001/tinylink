import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { code: string } }
) {
  const { code } = context.params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return new NextResponse("Not found", { status: 404 });
  }

  await prisma.link.update({
    where: { shortCode: code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  return NextResponse.redirect(link.originalUrl, 302);
}