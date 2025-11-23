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
      // Modern API (works in Chrome, Edge, Android)
      await navigator.clipboard.writeText(text);
      onCopy?.();
    } catch {
      // iOS Safari fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      onCopy?.();
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 active:scale-95"
    >
      Copy
    </button>
  );
}