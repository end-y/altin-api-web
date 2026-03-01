"use client";

export default function LocalTime({ iso }: { iso: string }) {
  return (
    <>{new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</>
  );
}
