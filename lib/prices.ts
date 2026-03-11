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

// Öncelikli sıralama — listedekiler önce, geri kalanlar API sırasında
const SOURCE_ORDER = ["yapi-kredi", "teb", "ziraat", "tcmb"];

export function sortSnapshots(snapshots: PriceSnapshot[]): PriceSnapshot[] {
  return [...snapshots].sort((a, b) => {
    const ai = SOURCE_ORDER.indexOf(a.id);
    const bi = SOURCE_ORDER.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });
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
