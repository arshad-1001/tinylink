import { prisma } from "@/lib/prisma";
import StatItem from "@/components/StatItem";
import Link from "next/link";

interface Params {
  params: { code: string };
}

export default async function StatsPage({ params }: Params) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return (
      <main className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Link Not Found</h1>
        <p className="text-gray-500 mb-6">
          The short code <span className="font-mono">{code}</span> does not
          exist.
        </p>

        <Link
          href="/"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Back to Dashboard
        </Link>
      </main>
    );
  }

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return (
    <main className="max-w-3xl mx-auto py-12 space-y-10">
      <h1 className="text-3xl font-semibold">Stats for "{code}"</h1>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatItem label="Short Code" value={link.shortCode} />

        <StatItem
          label="Short URL"
          value={`${BASE_URL}/${link.shortCode}`}
        />

        <StatItem
          label="Original URL"
          value={
            <a
              href={link.originalUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              {link.originalUrl}
            </a>
          }
        />

        <StatItem label="Total Clicks" value={link.clicks} />

        <StatItem
          label="Last Clicked"
          value={
            link.lastClicked
              ? new Date(link.lastClicked).toLocaleString()
              : "Never"
          }
        />

        <StatItem
          label="Created At"
          value={new Date(link.createdAt).toLocaleString()}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <a
          href={link.originalUrl}
          target="_blank"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Visit Target URL
        </a>

        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}