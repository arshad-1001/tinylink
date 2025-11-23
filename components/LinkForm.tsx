"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}

export default function LinkForm({
  onSubmit,
}: {
  onSubmit: (fd: FormData) => Promise<any>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  const codeRegex = /^[A-Za-z0-9]{6,8}$/;

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const fd = new FormData(e.target);
    const url = fd.get("originalUrl") as string;
    const code = fd.get("shortCode") as string;

    if (!isValidUrl(url)) {
      setError("Invalid URL format.");
      return;
    }

    if (code && !codeRegex.test(code)) {
      setError("Short code must be 6–8 letters/digits.");
      return;
    }

    setLoading(true);
    const res = await onSubmit(fd);

    if (!res.ok) {
      setError(res.error);
    } else {
      showToast("Link created!");
      e.target.reset();
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <>
      {toast && <Toast message={toast} />}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow"
      >
        <div>
          <label className="block text-sm font-medium">Original URL</label>
          <input
            name="originalUrl"
            required
            type="text"
            placeholder="https://example.com"
            className="w-full border p-2 rounded bg-white dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Short Code (optional)</label>
          <input
            name="shortCode"
            type="text"
            placeholder="Leave empty for auto-generate"
            className="w-full border p-2 rounded bg-white dark:bg-zinc-800"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Link"}
        </button>
      </form>
    </>
  );
}