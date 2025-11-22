"use client";

import { useState } from "react";

export default function LinkForm({ onSubmit }: { onSubmit: (fd: FormData) => Promise<any> }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const res = await onSubmit(formData);

    if (!res.ok) {
      setError(res.error);
    } else {
      e.target.reset();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded bg-white dark:bg-zinc-900">
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">Original URL</label>
        <input
          name="originalUrl"
          required
          type="text"
          className="w-full border rounded px-3 py-2 text-black dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Short Code (optional)
        </label>
        <input
          name="shortCode"
          type="text"
          placeholder="Leave empty for auto-generate"
          className="w-full border rounded px-3 py-2 text-black dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
}