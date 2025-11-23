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
      // Modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        onCopy?.();
        return;
      }

      // Fallback for iOS / older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      onCopy?.();
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      type="button"
    >
      Copy
    </button>
  );
}