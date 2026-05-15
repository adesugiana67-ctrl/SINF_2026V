"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PesertaDidik } from "@/db/schema";
import Modal from "@/components/Modal";
import TableToolbar from "@/components/TableToolbar";
import { EditButton, DeleteButton } from "@/components/RowActions";
import SearchBar from "@/components/SearchBar";

const KECAMATAN_OPTIONS = [
  "Sumedang Utara",
  "Sumedang Selatan",
  "Cimalaka",
  "Tanjungsari",
  "Jatinangor",
  "Cisarua",
  "Paseh",
  "Conggeang",
  "Buahdua",
  "Situraja",
  "Wado",
  "Tomo",
  "Ujungjaya",
];

const VERVAL_OPTIONS = ["Sudah", "Belum"];

type FormState = {
  npsn: string;
  namaSekolah: string;
  alamatSekolah: string;
  wilKecamatan: string;
  zonasiKelDesa: string;
  lakiLaki: string;
  perempuan: string;
  verval: string;
};

const emptyForm: FormState = {
  npsn: "",
  namaSekolah: "",
  alamatSekolah: "",
  wilKecamatan: "Sumedang Utara",
  zonasiKelDesa: "",
  lakiLaki: "0",
  perempuan: "0",
  verval: "Belum",
};

export default function PesertaDidikClient({
  initialData,
}: {
  initialData: PesertaDidik[];
}) {
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
      r.namaSekolah.toLowerCase().includes(q) ||
      r.alamatSekolah.toLowerCase().includes(q) ||
      r.wilKecamatan.toLowerCase().includes(q) ||
      r.zonasiKelDesa.toLowerCase().includes(q) ||
      r.verval.toLowerCase().includes(q)
    );
  });

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpen(true);
  }
  function openEdit(row: PesertaDidik) {
    setEditingId(row.id);
    setForm({
      npsn: row.npsn,
      namaSekolah: row.namaSekolah,
      alamatSekolah: row.alamatSekolah,
      wilKecamatan: row.wilKecamatan,
      zonasiKelDesa: row.zonasiKelDesa,
      lakiLaki: String(row.lakiLaki),
      perempuan: String(row.perempuan),
      verval: row.verval,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const url = editingId ? `/api/peserta-didik/${editingId}` : "/api/peserta-didik";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lakiLaki: Number(form.lakiLaki),
          perempuan: Number(form.perempuan),
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

  async function handleDelete(row: PesertaDidik) {
    if (!confirm(`Hapus data peserta didik "${row.namaSekolah}"?`)) return;
    const res = await fetch(`/api/peserta-didik/${row.id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Gagal menghapus data");
      return;
    }
    router.refresh();
  }

  const pdfRows = filteredData.map((row, idx) => ({
    no: idx + 1,
    npsn: row.npsn,
    namaSekolah: row.namaSekolah,
    alamatSekolah: row.alamatSekolah,
    wilKecamatan: row.wilKecamatan,
    zonasiKelDesa: row.zonasiKelDesa,
    lakiLaki: row.lakiLaki,
    perempuan: row.perempuan,
    jumlah: row.lakiLaki + row.perempuan,
    verval: row.verval,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 print-area">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Data Peserta Didik SPMB ATS/APS Pendidikan Non Formal 2026
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan {filteredData.length} dari {initialData.length} lembaga
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari NPSN, sekolah, kecamatan..." />
        <TableToolbar
          onAdd={openAdd}
          printTitle="Data Peserta Didik SPMB ATS-APS - Dinas Pendidikan Sumedang"
          pdf={{
            title: "DATA PESERTA DIDIK SPMB ATS/APS PENDIDIKAN NON FORMAL 2026",
            filename: `data-peserta-didik-${new Date().toISOString().slice(0, 10)}.pdf`,
            columns: [
              { header: "No", dataKey: "no" },
              { header: "NPSN", dataKey: "npsn" },
              { header: "Nama Sekolah", dataKey: "namaSekolah" },
              { header: "Alamat Sekolah", dataKey: "alamatSekolah" },
              { header: "Kecamatan", dataKey: "wilKecamatan" },
              { header: "Zonasi Kel/Desa", dataKey: "zonasiKelDesa" },
              { header: "L", dataKey: "lakiLaki" },
              { header: "P", dataKey: "perempuan" },
              { header: "Jumlah", dataKey: "jumlah" },
              { header: "Verval", dataKey: "verval" },
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
              <Th rowSpan={2}>Nama Sekolah</Th>
              <Th rowSpan={2}>Alamat Sekolah</Th>
              <Th rowSpan={2}>Wil. Kecamatan</Th>
              <Th rowSpan={2}>Zonasi Kel/Desa</Th>
              <th
                colSpan={2}
                className="px-3 py-2 font-semibold text-xs uppercase tracking-wide text-center border-b border-slate-200"
              >
                Peserta Didik
              </th>
              <Th rowSpan={2}>Jumlah</Th>
              <Th rowSpan={2}>Verval</Th>
              <Th rowSpan={2} className="no-print">Aksi</Th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 text-left">
              <Th>Laki-Laki</Th>
              <Th>Perempuan</Th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-10 text-slate-400">
                  {initialData.length === 0
                    ? "Belum ada data. Klik \"+ Input Data\" untuk menambahkan."
                    : "Tidak ada data yang cocok dengan pencarian."}
                </td>
              </tr>
            )}
            {filteredData.map((row, idx) => {
              const total = row.lakiLaki + row.perempuan;
              const sudah = row.verval.toLowerCase() === "sudah";
              return (
                <tr key={row.id} className="border-t border-slate-100 align-top">
                  <Td>{idx + 1}</Td>
                  <Td>
                    <span className="text-blue-600 font-medium">{row.npsn}</span>
                  </Td>
                  <Td>{row.namaSekolah}</Td>
                  <Td className="max-w-xs">{row.alamatSekolah}</Td>
                  <Td>
                    <span className="bg-amber-200 text-amber-900 px-2 py-1 rounded font-semibold">
                      {row.wilKecamatan}
                    </span>
                  </Td>
                  <Td>
                    <span className="bg-amber-100 text-rose-700 px-2 py-1 rounded font-semibold">
                      {row.zonasiKelDesa}
                    </span>
                  </Td>
                  <Td>{row.lakiLaki}</Td>
                  <Td>{row.perempuan}</Td>
                  <Td>
                    <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded font-bold">
                      {total}
                    </span>
                  </Td>
                  <Td>
                    <span
                      className={`px-3 py-1 rounded font-semibold text-xs ${
                        sudah
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-rose-200 text-rose-800"
                      }`}
                    >
                      {row.verval}
                    </span>
                  </Td>
                  <Td className="no-print">
                    <div className="flex gap-1.5">
                      <EditButton onClick={() => openEdit(row)} />
                      <DeleteButton onClick={() => handleDelete(row)} />
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? "Edit Data Peserta Didik" : "Input Data Peserta Didik"}
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
            <Field label="Wilayah Kecamatan" required>
              <select
                value={form.wilKecamatan}
                onChange={(e) => setForm({ ...form, wilKecamatan: e.target.value })}
                className="input"
                required
              >
                {KECAMATAN_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Zonasi Kelurahan/Desa" required>
              <input
                value={form.zonasiKelDesa}
                onChange={(e) =>
                  setForm({ ...form, zonasiKelDesa: e.target.value })
                }
                className="input"
                placeholder="Contoh: Mulyasari Sirnamulya"
                required
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Laki-Laki">
              <input
                type="number"
                min="0"
                value={form.lakiLaki}
                onChange={(e) => setForm({ ...form, lakiLaki: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Perempuan">
              <input
                type="number"
                min="0"
                value={form.perempuan}
                onChange={(e) => setForm({ ...form, perempuan: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Verval" required>
              <select
                value={form.verval}
                onChange={(e) => setForm({ ...form, verval: e.target.value })}
                className="input"
              >
                {VERVAL_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>
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
