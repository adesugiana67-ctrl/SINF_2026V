import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dinas Pendidikan Kabupaten Sumedang - SKB/PKBM",
  description:
    "Standar Pengelolaan Satuan Pendidikan Non Formal - SKB/PKBM Tahun 2026",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-100 text-slate-900 antialiased min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white mt-12 py-6 text-center text-sm text-slate-500">
          © 2026 Dinas Pendidikan Kabupaten Sumedang
        </footer>
      </body>
    </html>
  );
}
