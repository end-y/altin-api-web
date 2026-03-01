"use client";

import { useState } from "react";

const CURL_EXAMPLE = `curl https://altinapi.online/api/prices \\
  -H "X-API-Key: YOUR_API_KEY"`;

const JS_EXAMPLE = `const res = await fetch("https://altinapi.online/api/prices", {
  headers: { "X-API-Key": "YOUR_API_KEY" },
});
const { data } = await res.json();
console.log(data);`;

const RESPONSE_EXAMPLE = `{
  "data": [
    {
      "id": "source-id",
      "source": "Kaynak Adı",
      "status": "ok",
      "items": [
        {
          "item_id": "altin-gram",
          "label": "Altın (Gram)",
          "buy": 3850.25,
          "sell": 3855.00,
          "currency": "TRY"
        }
      ],
      "fetched_at": "2025-01-01T12:00:00Z"
    }
  ]
}`;

type Tab = "curl" | "js" | "response";

export default function ApiDocs() {
  const [tab, setTab] = useState<Tab>("curl");

  const tabs: { key: Tab; label: string }[] = [
    { key: "curl", label: "cURL" },
    { key: "js", label: "JavaScript" },
    { key: "response", label: "Yanıt" },
  ];

  const code = tab === "curl" ? CURL_EXAMPLE : tab === "js" ? JS_EXAMPLE : RESPONSE_EXAMPLE;

  return (
    <section id="docs" className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-slate-100 mb-2">API Kullanımı</h2>
      <p className="text-slate-400 text-sm mb-8">
        Tüm isteklerde <code className="bg-slate-700 px-1 rounded text-amber-300">X-API-Key</code> header&apos;ı zorunludur.
      </p>

      {/* Endpoints */}
      <div className="mb-8 flex flex-col gap-3">
        {[
          { method: "GET", path: "/api/prices", desc: "Tüm kaynakların güncel fiyatları" },
          { method: "GET", path: "/api/prices/:id", desc: "Tek kaynak fiyatı" },
        ].map((ep) => (
          <div key={ep.path} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              {ep.method}
            </span>
            <code className="text-slate-200 text-sm">{ep.path}</code>
            <span className="text-slate-500 text-xs ml-auto">{ep.desc}</span>
          </div>
        ))}
      </div>

      {/* Code tabs */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="flex border-b border-slate-700">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "text-amber-400 border-b-2 border-amber-400 bg-slate-700/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <pre className="p-4 text-xs text-slate-300 overflow-x-auto leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}
