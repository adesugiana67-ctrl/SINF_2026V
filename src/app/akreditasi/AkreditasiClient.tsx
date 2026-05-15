"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Akreditasi } from "@/db/schema";
import Modal from "@/components/Modal";
import TableToolbar from "@/components/TableToolbar";
import SearchBar from "@/components/SearchBar";

const AKREDITASI_OPTIONS = ["A", "B", "C", "TT", "Belum"];

type FormState = {
  npsn: string;
  namaSekolah: string;
  alamatSekolah: string;
  kepalaSekolah: string;
  akreditasi: string;
  tahunAkreditasi: string;
  berakhirTahun: string;
  nomorSk: string;
};

export default function AkreditasiClient({
  initialData,
}: {
  initialData: Akreditasi[];
}) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const emptyForm: FormState = {
    npsn: "",
    namaSekolah: "",
    alamatSekolah: "",
    kepalaSekolah: "",
    akreditasi: "B",
    tahunAkreditasi: String(currentYear),
    berakhirTahun: String(currentYear + 5),
    nomorSk: "",
  };

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
      r.namaSekolah.toLowerCase().includes(q) ||
      r.alamatSekolah.toLowerCase().includes(q) ||
      r.kepalaSekolah.toLowerCase().includes(q) ||
      r.akreditasi.toLowerCase().includes(q) ||
      r.nomorSk.toLowerCase().includes(q)
    );
  });

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpen(true);
  }

  function openEdit(row: Akreditasi) {
    setEditingId(row.id);
    setForm({
      npsn: row.npsn,
      namaSekolah: row.namaSekolah,
      alamatSekolah: row.alamatSekolah,
      kepalaSekolah: row.kepalaSekolah,
      akreditasi: row.akreditasi,
      tahunAkreditasi: String(row.tahunAkreditasi),
      berakhirTahun: String(row.berakhirTahun),
      nomorSk: row.nomorSk,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const url = editingId ? `/api/akreditasi/${editingId}` : "/api/akreditasi";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tahunAkreditasi: Number(form.tahunAkreditasi),
          berakhirTahun: Number(form.berakhirTahun),
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

  async function handleDelete(row: Akreditasi) {
    if (!confirm(`Hapus data "${row.namaSekolah}"?`)) return;
    const res = await fetch(`/api/akreditasi/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Gagal menghapus data");
      return;
    }
    router.refresh();
  }

  const akreditasiColor = (a: string) => {
    if (a === "A") return "text-emerald-600 font-semibold";
    if (a === "B") return "text-blue-600 font-semibold";
    if (a === "C") return "text-amber-600 font-semibold";
    return "text-rose-600 font-semibold";
  };

  const tahunColor = (year: number) => {
    if (year < currentYear) return "bg-rose-200 text-rose-900";
    if (year >= currentYear + 3) return "bg-emerald-200 text-emerald-900";
    return "bg-amber-200 text-amber-900";
  };

  const pdfRows = filteredData.map((row, idx) => ({
    no: idx + 1,
    npsn: row.npsn,
    namaSekolah: row.namaSekolah,
    alamatSekolah: row.alamatSekolah,
    kepalaSekolah: row.kepalaSekolah,
    akreditasi: row.akreditasi,
    tahunAkreditasi: row.tahunAkreditasi,
    berakhirTahun: row.berakhirTahun,
    nomorSk: row.nomorSk,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 print-area">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Data Akreditasi</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan {filteredData.length} dari {initialData.length} lembaga
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Cari NPSN, sekolah, kepala..." />
        <TableToolbar
          onAdd={openAdd}
          printTitle="Data Akreditasi - Dinas Pendidikan Sumedang"
          pdf={{
            title: "DATA AKREDITASI SKB/PKBM TAHUN 2026",
            filename: `data-akreditasi-${new Date().toISOString().slice(0, 10)}.pdf`,
            columns: [
              { header: "No", dataKey: "no" },
              { header: "NPSN", dataKey: "npsn" },
              { header: "Nama Sekolah", dataKey: "namaSekolah" },
              { header: "Alamat Sekolah", dataKey: "alamatSekolah" },
              { header: "Kepala Sekolah", dataKey: "kepalaSekolah" },
              { header: "Akreditasi", dataKey: "akreditasi" },
              { header: "Tahun Akreditasi", dataKey: "tahunAkreditasi" },
              { header: "Berakhir Tahun", dataKey: "berakhirTahun" },
              { header: "Nomor SK", dataKey: "nomorSk" },
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
              <Th>No</Th>
              <Th>NPSN</Th>
              <Th>Nama Sekolah</Th>
              <Th>Alamat Sekolah</Th>
              <Th>Kepala Sekolah</Th>
              <Th>Akreditasi</Th>
              <Th>Tahun Akreditasi</Th>
              <Th>Berakhir Tahun</Th>
              <Th>Nomor SK</Th>
              <Th className="no-print">Aksi</Th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-10 text-slate-400">
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
                  <span className="text-blue-600 font-medium">{row.namaSekolah}</span>
                </Td>
                <Td className="max-w-xs">
                  <span className="text-amber-700">{row.alamatSekolah}</span>
                </Td>
                <Td>{row.kepalaSekolah}</Td>
                <Td>
                  <span className={akreditasiColor(row.akreditasi)}>
                    {row.akreditasi}
                  </span>
                </Td>
                <Td>{row.tahunAkreditasi}</Td>
                <Td>
                  <span
                    className={`inline-block px-3 py-1 rounded font-bold ${tahunColor(
                      row.berakhirTahun
                    )}`}
                  >
                    {row.berakhirTahun}
                  </span>
                </Td>
                <Td>{row.nomorSk}</Td>
                <Td className="no-print">
                  <div className="flex gap-1.5">
                    <ActionButton kind="edit" onClick={() => openEdit(row)} />
                    <ActionButton kind="delete" onClick={() => handleDelete(row)} />
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
        title={editingId ? "Edit Data Akreditasi" : "Input Data Akreditasi"}
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
            <Field label="Nama Sekolah" required>
              <input
                value={form.namaSekolah}
                onChange={(e) => setForm({ ...form, namaSekolah: e.target.value })}
                className="input"
                required
              />
            </Field>
          </div>
          <Field label="Alamat Sekolah" required>
            <textarea
              value={form.alamatSekolah}
              onChange={(e) => setForm({ ...form, alamatSekolah: e.target.value })}
              className="input min-h-[60px]"
              required
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Kepala Sekolah" required>
              <input
                value={form.kepalaSekolah}
                onChange={(e) => setForm({ ...form, kepalaSekolah: e.target.value })}
                className="input"
                required
              />
            </Field>
            <Field label="Akreditasi" required>
              <select
                value={form.akreditasi}
                onChange={(e) => setForm({ ...form, akreditasi: e.target.value })}
                className="input"
                required
              >
                {AKREDITASI_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Tahun Akreditasi" required>
              <input
                type="number"
                min="2000"
                max="2099"
                value={form.tahunAkreditasi}
                onChange={(e) =>
                  setForm({ ...form, tahunAkreditasi: e.target.value })
                }
                className="input"
                required
              />
            </Field>
            <Field label="Berakhir Tahun" required>
              <input
                type="number"
                min="2000"
                max="2099"
                value={form.berakhirTahun}
                onChange={(e) =>
                  setForm({ ...form, berakhirTahun: e.target.value })
                }
                className="input"
                required
              />
            </Field>
          </div>
          <Field label="Nomor SK" required>
            <input
              value={form.nomorSk}
              onChange={(e) => setForm({ ...form, nomorSk: e.target.value })}
              className="input"
              placeholder="Contoh: 602/BAN-PDM/SK/2025"
              required
            />
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

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-3 py-3 font-semibold text-xs uppercase tracking-wide ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

function ActionButton({
  kind,
  onClick,
}: {
  kind: "edit" | "delete";
  onClick: () => void;
}) {
  if (kind === "edit") {
    return (
      <button
        onClick={onClick}
        className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium inline-flex items-center gap-1"
        title="Edit"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Edit
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium inline-flex items-center gap-1"
      title="Hapus"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
      </svg>
      Hapus
    </button>
  );
}
