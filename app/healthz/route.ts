import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      version: "1.0",
      uptime: process.uptime(), // optional
      timestamp: new Date().toISOString(), // optional
    },
    { status: 200 }
  );
}