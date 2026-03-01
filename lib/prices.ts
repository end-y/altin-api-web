export interface PriceItem {
  item_id: string;
  label: string;
  buy?: number;
  sell?: number;
  currency: string;
}

export interface PriceSnapshot {
  id: string;
  source: string;
  source_url: string;
  status: string;
  items: PriceItem[];
  fetched_at?: string;
}

export interface PricesResponse {
  data: PriceSnapshot[];
}

export async function fetchPrices(): Promise<PricesResponse> {
  const res = await fetch(`${process.env.GO_API_URL}/prices`, {
    headers: { "X-API-Key": process.env.GO_API_KEY! },
    next: { revalidate: 30 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`fetchPrices failed: ${res.status}`);
  }

  return res.json();
}
