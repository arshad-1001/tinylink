import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateShortCode, validateUrl } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Accept BOTH formats (spec & dashboard)
    const url = body.url || body.originalUrl;
    const shortCode = body.shortCode;

    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    if (!validateUrl(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (shortCode && !validateShortCode(shortCode)) {
      return NextResponse.json(
        { error: "Short code must match [A-Za-z0-9]{6,8}" },
        { status: 400 }
      );
    }

    // Duplicate error must be 409 per spec
    if (shortCode) {
      const exists = await prisma.link.findUnique({
        where: { shortCode },
      });

      if (exists) {
        return NextResponse.json(
          { error: "Short code already exists" },
          { status: 409 }
        );
      }
    }

    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}