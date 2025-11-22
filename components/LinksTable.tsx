import CopyButton from "./CopyButton";

export default function LinksTable({ links, onDelete }: any) {
  if (links.length === 0) {
    return <p className="text-gray-500 mt-4 dark:text-gray-400">No links yet.</p>;
  }

  return (
    <table className="w-full mt-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-100 dark:bg-zinc-800">
          <th className="p-2 text-left text-black dark:text-white">Code</th>
          <th className="p-2 text-left text-black dark:text-white">URL</th>
          <th className="p-2 text-left text-black dark:text-white">Clicks</th>
          <th className="p-2 text-left text-black dark:text-white">Last Clicked</th>
          <th className="p-2 text-left"></th>
        </tr>
      </thead>

      <tbody>
        {links.map((l: any) => (
          <tr
            key={l.shortCode}
            className="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900"
          >
            {/* Short Code */}
            <td className="p-2 font-mono text-black dark:text-white">
              {l.shortCode}
            </td>

            {/* URL */}
            <td className="p-2 max-w-sm truncate">
              <a
                href={l.originalUrl}
                target="_blank"
                className="text-blue-700 dark:text-blue-400 underline"
              >
                {l.originalUrl}
              </a>
            </td>

            {/* Click Count */}
            <td className="p-2 text-black dark:text-white">{l.clicks}</td>

            {/* Last Clicked */}
            <td className="p-2 text-sm text-black dark:text-white">
              {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "—"}
            </td>

            {/* Actions */}
            <td className="p-2 flex gap-2">
              <CopyButton
                text={`${process.env.NEXT_PUBLIC_BASE_URL}/${l.shortCode}`}
              />

              <form action={onDelete}>
                <input type="hidden" name="code" value={l.shortCode} />
                <button className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}