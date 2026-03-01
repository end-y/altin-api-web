import type { PriceSnapshot } from "@/lib/prices";
import PriceCard from "./PriceCard";

export default function PriceGrid({ initial }: { initial: PriceSnapshot[] }) {
  return (
    <section id="prices" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-100">Fiyatlar</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initial.map((s) => (
          <PriceCard key={s.id} snapshot={s} />
        ))}
      </div>
    </section>
  );
}
