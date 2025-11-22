"use client";

import { useState } from "react";

export default function LinkForm({
  onSubmit,
}: {
  onSubmit: (fd: FormData) => Promise<any>;
}) {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 shadow-sm"
    >
      {/* Original URL */}
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-1">
          Original URL
        </label>
        <input
          name="originalUrl"
          required
          type="text"
          placeholder="https://example.com"
          className="w-full border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 text-black dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Short Code */}
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-1">
          Short Code (optional)
        </label>
        <input
          name="shortCode"
          type="text"
          placeholder="Leave empty for auto-generate"
          className="w-full border border-zinc-300 dark:border-zinc-700 rounded px-3 py-2 text-black dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black dark:bg-white text-white dark:text-black font-medium px-4 py-2 rounded hover:opacity-80 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
}