"use client";

import { useState, useMemo } from "react";
import { usePrices } from "@/lib/PricesContext";
import { sortSnapshots } from "@/lib/prices";

function fmt(val: number, currency: string) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(val);
}

export default function HesaplaPage() {
  const snapshots = usePrices();
  const [bankId, setBankId] = useState("");
  const [itemId, setItemId] = useState("");
  const [qty, setQty] = useState("1");

  const okBanks = useMemo(
    () => sortSnapshots(snapshots.filter((s) => s.status === "ok" && s.items.length > 0)),
    [snapshots]
  );

  const selectedBank = okBanks.find((s) => s.id === bankId);
  const selectedItem = selectedBank?.items.find((i) => i.item_id === itemId);
  const quantity = parseFloat(qty) || 0;

  function handleBankChange(id: string) {
    setBankId(id);
    setItemId("");
  }

  const buyTotal = selectedItem?.buy != null ? selectedItem.buy * quantity : null;
  const sellTotal = selectedItem?.sell != null ? selectedItem.sell * quantity : null;
  const currency = selectedItem?.currency ?? "TRY";

  return (
    <div className="min-h-[calc(100vh-53px)] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Fiyat Hesaplama</h1>
          <p className="text-slate-400 text-sm">
            Banka ve ürün seçerek adet bazlı alış/satış tutarını hesaplayın.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-5">

          {/* Banka seç */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Banka / Kaynak</label>
            <select
              value={bankId}
              onChange={(e) => handleBankChange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="">Seçin...</option>
              {okBanks.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.source}
                </option>
              ))}
            </select>
          </div>

          {/* Ürün seç */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Ürün</label>
            <select
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              disabled={!selectedBank}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-40"
            >
              <option value="">Seçin...</option>
              {selectedBank?.items.map((item) => (
                <option key={item.item_id} value={item.item_id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Adet */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Adet / Miktar</label>
            <input
              type="number"
              min="0"
              step="any"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="1"
            />
          </div>

          {/* Sonuç */}
          {selectedItem && quantity > 0 ? (
            <div className="border-t border-slate-700 pt-5 grid grid-cols-2 gap-3">
              {buyTotal != null && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <p className="text-xs text-emerald-400 mb-1">Alış Toplam</p>
                  <p className="text-lg font-bold text-emerald-400 tabular-nums">
                    {fmt(buyTotal, currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {fmt(selectedItem.buy!, currency)} × {quantity}
                  </p>
                </div>
              )}
              {sellTotal != null && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                  <p className="text-xs text-rose-400 mb-1">Satış Toplam</p>
                  <p className="text-lg font-bold text-rose-400 tabular-nums">
                    {fmt(sellTotal, currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {fmt(selectedItem.sell!, currency)} × {quantity}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border-t border-slate-700 pt-5 text-center text-xs text-slate-600">
              Banka, ürün ve miktar seçin
            </div>
          )}
        </div>

        {/* Kaynak bilgisi */}
        {selectedBank && (
          <p className="mt-4 text-xs text-slate-600 text-center">
            Kaynak:{" "}
            <a
              href={selectedBank.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 underline underline-offset-2 transition-colors"
            >
              {selectedBank.source}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
