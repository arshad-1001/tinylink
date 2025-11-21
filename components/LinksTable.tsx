import CopyButton from "./CopyButton";

export default function LinksTable({ links, onDelete }: any) {
  if (links.length === 0) {
    return <p className="text-gray-500 mt-4">No links yet.</p>;
  }

  return (
    <table className="w-full mt-6 border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Code</th>
          <th className="p-2 text-left">URL</th>
          <th className="p-2 text-left">Clicks</th>
          <th className="p-2 text-left">Last Clicked</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {links.map((l: any) => (
          <tr key={l.shortCode} className="border-t">
            <td className="p-2 font-mono">{l.shortCode}</td>

            <td className="p-2 max-w-sm truncate text-blue-700">
              {l.originalUrl}
            </td>

            <td className="p-2">{l.clicks}</td>

            <td className="p-2 text-sm">
              {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "—"}
            </td>

            <td className="p-2 flex gap-2">
              <CopyButton text={`${process.env.NEXT_PUBLIC_BASE_URL}/${l.shortCode}`} />

              <form action={onDelete}>
                <input type="hidden" name="code" value={l.shortCode} />
                <button className="px-2 py-1 bg-red-500 text-white rounded text-sm">
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