import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // ensures no caching
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  // Update click count + lastClicked timestamp
  await prisma.link.update({
    where: { shortCode: code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  // 302 redirect (required by spec)
  return NextResponse.redirect(link.originalUrl, {
    status: 302,
  });
}