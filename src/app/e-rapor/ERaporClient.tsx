"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ERapor } from "@/db/schema";
import Modal from "@/components/Modal";
import TableToolbar from "@/components/TableToolbar";
import { EditButton, DeleteButton } from "@/components/RowActions";
import SearchBar from "@/components/SearchBar";

const KETERISIAN_OPTIONS = ["LENGKAP", "BELUM LENGKAP"];

type ERaporFormNumeric = {
  skl: string;
  sIsi: string;
  sProses: string;
  sPenilaian: string;
  sPtk: string;
  sSapras: string;
  sPengelolaan: string;
  sPembiayaan: string;
};

const SNP_FIELDS: { key: keyof ERaporFormNumeric; label: string }[] = [
  { key: "skl", label: "SKL" },
  { key: "sIsi", label: "S.Isi" },
  { key: "sProses", label: "S.Proses" },
  { key: "sPenilaian", label: "S.Penilaian" },
  { key: "sPtk", label: "S.PTK" },
  { key: "sSapras", label: "S.Sapras" },
  { key: "sPengelolaan", label: "S.Pengelolaan" },
  { key: "sPembiayaan", label: "S.Pembiayaan" },
];

type FormState = {
  npsn: string;
  namaLembaga: string;
  keterisian: string;
} & ERaporFormNumeric;

const emptyForm: FormState = {
  npsn: "",
  namaLembaga: "",
  skl: "0",
  sIsi: "0",
  sProses: "0",
  sPenilaian: "0",
  sPtk: "0",
  sSapras: "0",
  sPengelolaan: "0",
  sPembiayaan: "0",
  keterisian: "BELUM LENGKAP",
};

export default function ERaporClient({ initialData }: { initialData: ERapor[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [search, setSearch] = useState("");

  const filteredData = initialData.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.npsn.toLowerCase().includes(q) ||
      r.namaLembaga.toLowerCase().includes(q) ||
      r.keterisian.toLowerCase().includes(q)
    );
  });

  function categorize(v: number) {
    if (v >= 80) return { label: "Baik", cls: "bg-emerald-200 text-emerald-900" };
    if (v >= 60) return { label: "Cukup", cls: "bg-amber-100 text-amber-800" };
    if (v >= 40) return { label: "Sedang", cls: "bg-amber-200 text-amber-900" };
    return { label: "Kurang", cls: "bg-rose-200 text-rose-900" };
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpen(true);
  }
  function openEdit(row: ERapor) {
    setEditingId(row.id);
    setForm({
      npsn: row.npsn,
      namaLembaga: row.namaLembaga,
      skl: String(row.skl),
      sIsi: String(row.sIsi),
      sProses: String(row.sProses),
      sPenilaian: String(row.sPenilaian),
      sPtk: String(row.sPtk),
      sSapras: String(row.sSapras),
      sPengelolaan: String(row.sPengelolaan),
      sPembiayaan: String(row.sPembiayaan),
      keterisian: row.keterisian,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const url = editingId ? `/api/e-rapor/${editingId}` : "/api/e-rapor";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skl: Number(form.skl),
          sIsi: Number(form.sIsi),
          sProses: Number(form.sProses),
          sPenilaian: Number(form.sPenilaian),
          sPtk: Number(form.sPtk),
          sSapras: Number(form.sSapras),
          sPengelolaan: Number(form.sPengelolaan),
          sPembiayaan: Number(form.sPembiayaan),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Gagal menyimpan");
      }
      setOpen(false);
      setEditingId(null);
      setForm(emptyForm);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(row: ERapor) {
    if (!confirm(`Hapus data E-Rapor "${row.namaLembaga}"?`)) return;
    const res = await fetch(`/api/e-rapor/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Gagal menghapus data");
      return;
    }
    router.refresh();
  }

  const pdfRows = filteredData.map((row, idx) => ({
    no: idx + 1,
    npsn: row.npsn,
    namaLembaga: row.namaLembaga,
    skl: `${row.skl}%`,
    sIsi: `${row.sIsi}%`,
    sProses: `${row.sProses}%`,
    sPenilaian: `${row.sPenilaian}%`,
    sPtk: `${row.sPtk}%`,
    sSapras: `${row.sSapras}%`,
    sPengelolaan: `${row.sPengelolaan}%`,
    sPembiayaan: `${row.sPembiayaan}%`,
    keterisian: row.keterisian,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 print-area">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Data E-Rapor 8 SNP SKB/PKBM
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan {filteredData.length} dari {initialData.length} lembaga
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari NPSN atau lembaga..." />
        <TableToolbar
          onAdd={openAdd}
          printTitle="Data E-Rapor 8 SNP - Dinas Pendidikan Sumedang"
          pdf={{
            title: "DATA E-RAPOR 8 SNP SKB/PKBM TAHUN 2026",
            filename: `data-e-rapor-${new Date().toISOString().slice(0, 10)}.pdf`,
            columns: [
              { header: "No", dataKey: "no" },
              { header: "NPSN", dataKey: "npsn" },
              { header: "Nama Lembaga", dataKey: "namaLembaga" },
              { header: "SKL", dataKey: "skl" },
              { header: "S.Isi", dataKey: "sIsi" },
              { header: "S.Proses", dataKey: "sProses" },
              { header: "S.Penilaian", dataKey: "sPenilaian" },
              { header: "S.PTK", dataKey: "sPtk" },
              { header: "S.Sapras", dataKey: "sSapras" },
              { header: "S.Pengelolaan", dataKey: "sPengelolaan" },
              { header: "S.Pembiayaan", dataKey: "sPembiayaan" },
              { header: "Keterisian", dataKey: "keterisian" },
            ],
            rows: pdfRows,
          }}
        />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-left">
              <Th rowSpan={2}>No</Th>
              <Th rowSpan={2}>NPSN</Th>
              <Th rowSpan={2}>Nama Lembaga</Th>
              <th
                colSpan={8}
                className="px-3 py-2 font-semibold text-xs uppercase tracking-wide text-center border-b border-slate-200"
              >
                Standar Nasional Pendidikan
              </th>
              <Th rowSpan={2}>Keterisian 8 SNP SKB/PKBM</Th>
              <Th rowSpan={2} className="no-print">Aksi</Th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 text-left">
              {SNP_FIELDS.map((f) => (
                <Th key={f.key}>{f.label}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={13} className="text-center py-10 text-slate-400">
                  {initialData.length === 0
                    ? "Belum ada data. Klik \"+ Input Data\" untuk menambahkan."
                    : "Tidak ada data yang cocok dengan pencarian."}
                </td>
              </tr>
            )}
            {filteredData.map((row, idx) => (
              <tr key={row.id} className="border-t border-slate-100 align-top">
                <Td>{idx + 1}</Td>
                <Td>{row.npsn}</Td>
                <Td>
                  <span className="text-blue-600 font-medium">{row.namaLembaga}</span>
                </Td>
                {SNP_FIELDS.map((f) => {
                  const v = row[f.key as keyof ERapor] as number;
                  const c = categorize(v);
                  return (
                    <Td key={f.key}>
                      <span className={`px-2 py-1 rounded font-semibold ${c.cls}`}>
                        {v}% ({c.label})
                      </span>
                    </Td>
                  );
                })}
                <Td>
                  <span
                    className={`px-3 py-1 rounded font-bold text-xs ${
                      row.keterisian === "LENGKAP"
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-rose-200 text-rose-900"
                    }`}
                  >
                    {row.keterisian}
                  </span>
                </Td>
                <Td className="no-print">
                  <div className="flex gap-1.5">
                    <EditButton onClick={() => openEdit(row)} />
                    <DeleteButton onClick={() => handleDelete(row)} />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? "Edit Data E-Rapor 8 SNP" : "Input Data E-Rapor 8 SNP"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="NPSN" required>
              <input
                value={form.npsn}
                onChange={(e) => setForm({ ...form, npsn: e.target.value })}
                className="input"
                required
              />
            </Field>
            <Field label="Nama Lembaga" required>
              <input
                value={form.namaLembaga}
                onChange={(e) => setForm({ ...form, namaLembaga: e.target.value })}
                className="input"
                required
              />
            </Field>
          </div>
          <div className="border border-slate-200 rounded p-4">
            <div className="text-sm font-semibold text-slate-700 mb-3">
              Standar Nasional Pendidikan (0–100%)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SNP_FIELDS.map((f) => (
                <Field key={f.key} label={f.label}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value } as FormState)
                    }
                    className="input"
                  />
                </Field>
              ))}
            </div>
          </div>
          <Field label="Keterisian 8 SNP" required>
            <select
              value={form.keterisian}
              onChange={(e) => setForm({ ...form, keterisian: e.target.value })}
              className="input"
              required
            >
              {KETERISIAN_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          {error && (
            <div className="text-sm bg-rose-50 text-rose-700 border border-rose-200 rounded px-3 py-2">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function Th({
  children,
  rowSpan,
  className = "",
}: {
  children: React.ReactNode;
  rowSpan?: number;
  className?: string;
}) {
  return (
    <th
      rowSpan={rowSpan}
      className={`px-3 py-3 font-semibold text-xs uppercase tracking-wide border-b border-slate-200 ${className}`}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-3 py-3 text-slate-700 ${className}`}>{children}</td>;
}
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
