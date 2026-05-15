"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SumedangLogo from "./SumedangLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkCls = (href: string) =>
    `px-4 py-2 rounded transition-colors text-sm font-medium ${
      pathname === href
        ? "bg-slate-700 text-white"
        : "text-white hover:bg-slate-700"
    }`;

  const informasiActive =
    pathname.startsWith("/akreditasi") ||
    pathname.startsWith("/peserta-didik") ||
    pathname.startsWith("/e-rapor");

  return (
    <nav className="bg-slate-900 border-b-4 border-blue-500 shadow">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        <Link href="/" className="flex items-center gap-3 mr-6">
          <SumedangLogo className="w-11 h-11 drop-shadow" />
          <div className="hidden sm:block text-white text-xs leading-tight">
            <div className="font-bold">DISDIK SUMEDANG</div>
            <div className="text-slate-300 text-[10px]">SKB/PKBM 2026</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className={linkCls("/")}>
            Beranda
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                informasiActive
                  ? "bg-slate-700 text-white"
                  : "text-white hover:bg-slate-700"
              }`}
            >
              Informasi <span className="ml-1 text-xs">▼</span>
            </button>
            {open && (
              <div className="absolute left-0 mt-1 w-72 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
                <Link
                  href="/akreditasi"
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-b border-slate-100"
                >
                  Data Akreditasi
                </Link>
                <Link
                  href="/peserta-didik"
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-b border-slate-100"
                >
                  Data Peserta Didik SPMB ATS/APS
                </Link>
                <Link
                  href="/e-rapor"
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Data E-Rapor 8 SNP SKB/PKBM
                </Link>
              </div>
            )}
          </div>

          <Link href="/keterangan" className={linkCls("/keterangan")}>
            Keterangan
          </Link>
        </div>

        <button
          className="md:hidden ml-auto text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/" className="px-3 py-2 rounded text-white hover:bg-slate-700 text-sm">
              Beranda
            </Link>
            <div className="px-3 py-1 text-xs text-slate-400 uppercase mt-2">Informasi</div>
            <Link href="/akreditasi" className="px-3 py-2 rounded text-white hover:bg-slate-700 text-sm">
              Data Akreditasi
            </Link>
            <Link href="/peserta-didik" className="px-3 py-2 rounded text-white hover:bg-slate-700 text-sm">
              Data Peserta Didik SPMB ATS/APS
            </Link>
            <Link href="/e-rapor" className="px-3 py-2 rounded text-white hover:bg-slate-700 text-sm">
              Data E-Rapor 8 SNP SKB/PKBM
            </Link>
            <Link href="/keterangan" className="px-3 py-2 rounded text-white hover:bg-slate-700 text-sm">
              Keterangan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
