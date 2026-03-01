"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#prices", label: "Fiyatlar" },
  { href: "/#docs", label: "API Docs" },
  { href: "/hesapla", label: "Hesaplama Aracı" },
  { href: "/#contact", label: "İletişim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 px-4 py-3 bg-slate-900/95 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-amber-400 font-bold text-sm tracking-tight"
        >
          altinapi<span className="text-slate-400">.online</span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-5 text-xs text-slate-400">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-slate-200 ${
                pathname === l.href.split("#")[0] && l.href !== "/"
                  ? "text-amber-400"
                  : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1 text-slate-400 hover:text-slate-200 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menüyü aç"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-slate-800 mt-3 pt-3 pb-1 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
