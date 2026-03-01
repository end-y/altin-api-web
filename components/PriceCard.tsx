import type { PriceSnapshot } from "@/lib/prices";

function fmt(val: number | undefined, currency: string) {
  if (val == null) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(val);
}

export default function PriceCard({ snapshot }: { snapshot: PriceSnapshot }) {
  const ts = snapshot.fetched_at
    ? new Date(snapshot.fetched_at).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="bg-slate-800 rounded-xl p-5 flex flex-col gap-3 border border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-100 text-sm">{snapshot.source}</h3>
        {ts && (
          <span className="text-xs text-slate-500">{ts}</span>
        )}
      </div>

      {snapshot.status !== "ok" ? (
        <p className="text-xs text-red-400">Veri alınamadı</p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {snapshot.items.map((item) => (
            <li key={item.item_id} className="py-2 flex items-center justify-between gap-4">
              <span className="text-slate-400 text-xs truncate">{item.label}</span>
              <span className="flex gap-3 text-xs tabular-nums">
                {item.buy != null && (
                  <span className="text-emerald-400">{fmt(item.buy, item.currency)}</span>
                )}
                {item.sell != null && (
                  <span className="text-rose-400">{fmt(item.sell, item.currency)}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
