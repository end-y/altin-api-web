import { fetchPrices, type PriceSnapshot } from "@/lib/prices";
import PriceGrid from "@/components/PriceGrid";
import ApiDocs from "@/components/ApiDocs";

export default async function Home() {
  let snapshots: PriceSnapshot[] = [];
  try {
    const result = await fetchPrices();
    snapshots = result.data ?? [];
  } catch {
    // Go servisi erişilemez durumdaysa boş göster
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-amber-400 font-bold text-sm tracking-tight"
          >
            altinapi<span className="text-slate-400">.online</span>
          </a>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href="#prices"
              className="hover:text-slate-200 transition-colors"
            >
              Fiyatlar
            </a>
            <a href="#docs" className="hover:text-slate-200 transition-colors">
              API Docs
            </a>
            <a
              href="#contact"
              className="hover:text-slate-200 transition-colors"
            >
              İletişim
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 text-center max-w-2xl mx-auto">
        <div className="inline-block bg-amber-400/10 text-amber-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          REST API · JSON · X-API-Key
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 leading-tight">
          Türkiye&apos;nin Altın Fiyatları API&apos;si
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Altın, gümüş ve döviz fiyatlarını tek bir endpoint&apos;ten çekin.
          Birden fazla kaynaktan anlık veri, kolay entegrasyon.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#docs"
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Başla
          </a>
          <a
            href="#prices"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-lg text-sm transition-colors border border-slate-700"
          >
            Örnek Fiyatlar ↓
          </a>
        </div>
      </header>

      {/* Live Prices */}
      <PriceGrid initial={snapshots} />

      {/* API Docs */}
      <ApiDocs />

      {/* Contact */}
      <section id="contact" className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-slate-100 mb-2">İletişim</h2>
        <p className="text-slate-400 text-sm mb-6">
          API anahtarı talebi, hata bildirimi için bize ulaşın.
        </p>
        <a
          href="mailto:contact@altinapi.com"
          className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-200 hover:text-amber-400 px-5 py-3 rounded-lg text-sm transition-colors"
        >
          contact@altinapi.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-600">
        <p>altinapi.online &mdash; Veri yalnızca bilgilendirme amaçlıdır.</p>
      </footer>
    </div>
  );
}
