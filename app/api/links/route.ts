import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateShortCode, validateUrl } from "@/lib/validation";

// Helper: auto-generate random shortcode if none provided
function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const { url, shortCode } = await req.json();

    // URL validation
    if (!validateUrl(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    let code = shortCode || generateCode();

    // Validate shortCode format
    if (!validateShortCode(code)) {
      return NextResponse.json(
        { error: "Short code must match [A-Za-z0-9]{6,8}" },
        { status: 400 }
      );
    }

    // Check duplicate
    const exists = await prisma.link.findUnique({
      where: { shortCode: code },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Short code already exists" },
        { status: 409 }
      );
    }

    // Create entry
    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        shortCode: code,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (err) {
    console.error("POST /api/links error:", err);
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