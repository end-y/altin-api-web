import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PricesProvider from "@/components/PricesProvider";
import { fetchPrices, type PriceSnapshot } from "@/lib/prices";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "altinapi.online — Türkiye Altın Fiyatları API",
  description:
    "Türkiye'deki altın, gümüş ve döviz fiyatlarını anlık takip eden REST API. Güvenli, hızlı ve kolay entegrasyon.",
  openGraph: {
    title: "altinapi.online",
    description: "Türkiye altın ve döviz fiyatları API",
    url: "https://altinapi.online",
    siteName: "altinapi.online",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialData: PriceSnapshot[] = [];
  try {
    const result = await fetchPrices();
    initialData = result.data ?? [];
  } catch {
    // servis erişilemez
  }

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-200`}
      >
        <PricesProvider initialData={initialData}>
          <Navbar />
          {children}
        </PricesProvider>
      </body>
    </html>
  );
}
