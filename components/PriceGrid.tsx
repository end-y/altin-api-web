import type { PriceSnapshot } from "@/lib/prices";
import PriceCard from "./PriceCard";

export default function PriceGrid({ initial }: { initial: PriceSnapshot[] }) {
  return (
    <section id="prices" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-100">Örnek Fiyatlar</h2>
        <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
          Örnek veri
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initial.map((s) => (
          <PriceCard key={s.id} snapshot={s} />
        ))}
      </div>
    </section>
  );
}
