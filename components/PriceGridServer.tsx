import { fetchPrices, type PriceSnapshot } from "@/lib/prices";
import PriceGrid from "./PriceGrid";

export default async function PriceGridServer() {
  let snapshots: PriceSnapshot[] = [];
  try {
    const result = await fetchPrices();
    snapshots = result.data ?? [];
  } catch {
    // Go servisi erişilemez durumdaysa boş göster
  }

  return <PriceGrid initial={snapshots} />;
}
