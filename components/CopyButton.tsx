"use client";

export default function CopyButton({
  text,
  onCopy,
}: {
  text: string;
  onCopy?: () => void;
}) {
  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Mobile fallback
        const temp = document.createElement("textarea");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }

      onCopy?.();
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
    >
      Copy
    </button>
  );
}