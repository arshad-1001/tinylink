import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default async function CodeStatsPage({ params }: any) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { shortCode: code },
  });

  if (!link) {
    return (
      <main className="max-w-2xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold text-red-600">404 — Link Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          The shortcode <span className="font-mono">{code}</span> does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded"
        >
          Back to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-16 space-y-8">
      <h1 className="text-3xl font-bold">Stats for <span className="font-mono">{code}</span></h1>

      <section className="p-6 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow-sm space-y-4">

        {/* Original URL */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Original URL</h2>
          <a
            href={link.originalUrl}
            target="_blank"
            className="text-blue-700 dark:text-blue-400 underline break-all"
          >
            {link.originalUrl}
          </a>
        </div>

        {/* Short Code */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Short Code</h2>
          <p className="font-mono text-black dark:text-white">{link.shortCode}</p>
        </div>

        {/* Click Count */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Clicks</h2>
          <p className="text-lg font-medium text-black dark:text-white">{link.clicks}</p>
        </div>

        {/* Last Clicked */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Last Clicked</h2>
          <p className="text-black dark:text-white">
            {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "—"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <CopyButton text={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.shortCode}`} />

          <a
            href={`/${link.shortCode}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Visit Link
          </a>

          <form action={`/api/links/${code}`} method="POST">
            <input type="hidden" name="_method" value="DELETE" />
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </form>

          <Link
            href="/"
            className="px-4 py-2 bg-zinc-700 dark:bg-zinc-200 text-white dark:text-black rounded"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}