"use client";

import { useEffect, useState } from "react";

export default function SafeDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("…");

  useEffect(() => {
    if (!date) {
      setFormatted("—");
      return;
    }

    const d = new Date(date);
    // Use a deterministic locale/format on the client
    setFormatted(
      d.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
  }, [date]);

  return <span>{formatted}</span>;
}