import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateUrl, validateShortCode } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const { originalUrl, shortCode } = await req.json();

    if (!validateUrl(originalUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (shortCode && !validateShortCode(shortCode)) {
      return NextResponse.json(
        { error: "Short code must match [A-Za-z0-9]{6,8}" },
        { status: 400 }
      );
    }

    // Check duplicate code
    if (shortCode) {
      const existing = await prisma.link.findUnique({
        where: { shortCode },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Short code already exists" },
          { status: 409 }
        );
      }
    }

    const link = await prisma.link.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
