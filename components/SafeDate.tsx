"use client";

import { useEffect, useState } from "react";

export default function SafeDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("…");

  useEffect(() => {
    if (!date) {
      setFormatted("—");
      return;
    }

    const utc = new Date(date);

    // Convert UTC → IST (UTC + 5:30)
    const ist = new Date(utc.getTime() + 5.5 * 60 * 60 * 1000);

    setFormatted(
      ist.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
    );
  }, [date]);

  return <span>{formatted}</span>;
}