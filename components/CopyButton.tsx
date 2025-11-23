"use client";

export default function CopyButton({
  text,
  onCopy,
}: {
  text: string;
  onCopy?: () => void;
}) {
  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        onCopy?.();
        return;
      }
    } catch {}

    fallbackCopy();
  }

  function fallbackCopy() {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      onCopy?.();
    } catch {
      alert("Copy failed");
    }

    document.body.removeChild(textarea);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="px-2 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-800"
    >
      Copy
    </button>
  );
}