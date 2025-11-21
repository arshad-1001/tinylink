import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidShortCode } from "@/lib/validation";

interface Params {
  params: { code: string };
}

export async function GET(_: Request, { params }: Params) {
  const { code } = params;

  // Validate the code format before querying the DB
  if (!isValidShortCode(code)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Fetch the link
  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Update stats asynchronously after redirect
  prisma.link.update({
    where: { shortCode: code },
    data: {
      clicks: link.clicks + 1,
      lastClicked: new Date(),
    },
  }).catch(() => {});

  // Perform redirect
  return NextResponse.redirect(link.originalUrl, 302);
}