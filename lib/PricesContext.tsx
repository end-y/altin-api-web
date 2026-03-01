"use client";

import { createContext, useContext } from "react";
import type { PriceSnapshot } from "./prices";

export const PricesContext = createContext<PriceSnapshot[]>([]);

export function usePrices() {
  return useContext(PricesContext);
}
