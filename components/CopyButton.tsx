"use client";

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      Copy
    </button>
  );
}