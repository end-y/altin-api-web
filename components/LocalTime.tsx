"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ iso }: { iso: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }));
  }, [iso]);

  if (!time) return null;
  return <>{time}</>;
}
