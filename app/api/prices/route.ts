import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.GO_API_URL}/prices`, {
    headers: { "X-API-Key": process.env.GO_API_KEY! },
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "upstream error" }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
