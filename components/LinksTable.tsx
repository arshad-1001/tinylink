"use client";

import CopyButton from "./CopyButton";
import SafeDate from "./SafeDate";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

export default function LinksTable({
  links,
  onDelete,
}: any) {
  const router = useRouter();
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function handleDelete(formData: FormData) {
    try {
      await onDelete(formData);
      showToast("Link deleted");
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast("Delete failed");
    }
  }

  if (!links || links.length === 0) {
    return <p className="text-gray-500 mt-4 dark:text-gray-400">No links yet.</p>;
  }

  return (
    <>
      {toast && <Toast message={toast} />}

      <table className="w-full mt-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-800">
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-left">Clicks</th>
            <th className="p-2 text-left">Last Clicked</th>
            <th className="p-2"></th>
          </tr>
        </thead>

        <tbody>
          {links.map((l: any) => (
            <tr
              key={l.shortCode}
              className="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900"
            >
              <td className="p-2 font-mono text-black dark:text-white">
                {l.shortCode}
              </td>

              <td className="p-2 max-w-sm truncate">
                <a
                  href={l.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 dark:text-blue-400 underline"
                >
                  {l.originalUrl}
                </a>
              </td>

              <td className="p-2 text-black dark:text-white">{l.clicks}</td>

              <td className="p-2 text-sm text-black dark:text-white">
                {l.lastClicked ? <SafeDate date={l.lastClicked} /> : "—"}
              </td>

              <td className="p-2 flex gap-2">
                <CopyButton
                  text={`${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "")}/${l.shortCode}`}
                  onCopy={() => showToast("Copied!")}
                />

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    await handleDelete(fd);
                  }}
                >
                  <input type="hidden" name="code" value={l.shortCode} />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}