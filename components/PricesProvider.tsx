"use client";

import { PricesContext } from "@/lib/PricesContext";
import type { PriceSnapshot } from "@/lib/prices";

export default function PricesProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: PriceSnapshot[];
}) {
  return (
    <PricesContext.Provider value={initialData}>
      {children}
    </PricesContext.Provider>
  );
}
