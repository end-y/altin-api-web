export default function PriceGridSkeleton() {
  return (
    <section id="prices" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-100">Fiyatlar</h2>
        <div className="h-6 w-20 bg-slate-700 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800 rounded-xl p-5 flex flex-col gap-3 border border-slate-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
              <div className="h-3 w-10 bg-slate-700 rounded animate-pulse" />
            </div>

            {/* Rows */}
            <ul className="divide-y divide-slate-700">
              {Array.from({ length: 3 }).map((_, j) => (
                <li key={j} className="py-2 flex items-center justify-between gap-4">
                  <div className="h-3 w-24 bg-slate-700 rounded animate-pulse" />
                  <div className="flex gap-3">
                    <div className="h-3 w-16 bg-slate-700 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-slate-700 rounded animate-pulse" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
