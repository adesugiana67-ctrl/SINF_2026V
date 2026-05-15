"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type PdfColumn = { header: string; dataKey: string };
export type PdfExportConfig = {
  title: string;
  filename: string;
  columns: PdfColumn[];
  rows: Record<string, string | number>[];
};

export default function TableToolbar({
  onAdd,
  pdf,
  printTitle,
}: {
  onAdd: () => void;
  pdf: PdfExportConfig;
  printTitle?: string;
}) {
  function handlePrint() {
    if (printTitle && typeof document !== "undefined") {
      const original = document.title;
      document.title = printTitle;
      window.print();
      setTimeout(() => {
        document.title = original;
      }, 500);
    } else {
      window.print();
    }
  }

  function handleDownloadCsv() {
    const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
    const header = pdf.columns.map((c) => escape(c.header)).join(",");
    const body = pdf.rows
      .map((r) => pdf.columns.map((c) => escape(String(r[c.dataKey] ?? ""))).join(","))
      .join("\n");
    const csv = "\uFEFF" + header + "\n" + body; // BOM for Excel
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdf.filename.replace(/\.pdf$/i, ".csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleDownloadPdf() {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("DINAS PENDIDIKAN KABUPATEN SUMEDANG", pageWidth / 2, 32, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.text(pdf.title, pageWidth / 2, 50, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Dicetak: ${new Date().toLocaleString("id-ID")}`,
      pageWidth - 40,
      66,
      { align: "right" }
    );

    autoTable(doc, {
      startY: 80,
      head: [pdf.columns.map((c) => c.header)],
      body: pdf.rows.map((r) =>
        pdf.columns.map((c) => String(r[c.dataKey] ?? ""))
      ),
      styles: { fontSize: 8, cellPadding: 4, valign: "middle" },
      headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [241, 245, 249] },
      margin: { left: 24, right: 24 },
    });

    doc.save(pdf.filename);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 no-print">
      <button
        onClick={handlePrint}
        className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-2 rounded text-sm font-medium shadow inline-flex items-center gap-1.5"
        title="Cetak"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-12 0v4h12v-4M6 18h12" />
        </svg>
        Cetak
      </button>
      <button
        onClick={handleDownloadCsv}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm font-medium shadow inline-flex items-center gap-1.5"
        title="Unduh CSV (Excel)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17l-3-3m0 0l3-3m-3 3h12M3 7l9-4 9 4v10l-9 4-9-4V7z" />
        </svg>
        CSV
      </button>
      <button
        onClick={handleDownloadPdf}
        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded text-sm font-medium shadow inline-flex items-center gap-1.5"
        title="Unduh PDF"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
        </svg>
        Unduh PDF
      </button>
      <button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium shadow inline-flex items-center gap-1.5"
      >
        <span className="text-lg leading-none">+</span> Input Data
      </button>
    </div>
  );
}
