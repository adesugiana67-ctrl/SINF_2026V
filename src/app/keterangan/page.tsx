export const dynamic = "force-dynamic";

export default function KeteranganPage() {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
        Keterangan Sistem
      </h1>

      <section className="space-y-6 text-slate-700 text-sm leading-relaxed">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Tentang Sistem</h2>
          <p>
            Sistem informasi pengelolaan satuan pendidikan non formal SKB/PKBM
            tahun 2026 di lingkungan Dinas Pendidikan Kabupaten Sumedang. Sistem ini
            mendukung Manajemen Berbasis Sekolah (MBS) dan pengelolaan data secara
            digital (digitalisasi) untuk tiga kategori laporan utama.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Kategori Data</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Data Akreditasi</strong> – Daftar status akreditasi seluruh
              lembaga PKBM/SKB beserta tahun berlaku dan nomor SK.
            </li>
            <li>
              <strong>Data Peserta Didik SPMB ATS/APS</strong> – Rekapitulasi
              peserta didik baru jalur Anak Tidak Sekolah / Anak Putus Sekolah,
              termasuk komposisi gender dan status verval.
            </li>
            <li>
              <strong>Data E-Rapor 8 SNP SKB/PKBM</strong> – Capaian 8 Standar
              Nasional Pendidikan (SKL, Isi, Proses, Penilaian, PTK, Sapras,
              Pengelolaan, Pembiayaan).
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Legenda Warna</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Legend color="bg-emerald-200 text-emerald-900" label="Baik / Sudah / Berlaku" />
            <Legend color="bg-amber-200 text-amber-900" label="Cukup / Sedang" />
            <Legend color="bg-rose-200 text-rose-900" label="Kurang / Belum / Habis Berlaku" />
            <Legend color="bg-blue-100 text-blue-700" label="Informasi / Tautan" />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Cara Menambah Data</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Pilih menu pada navbar <em>Informasi</em> kemudian pilih kategori data.</li>
            <li>Klik tombol <strong className="text-blue-600">+ Input Data</strong> di pojok kanan atas tabel.</li>
            <li>Lengkapi seluruh isian formulir; gunakan opsi pilihan (dropdown) untuk akreditasi, kecamatan, verval, dan keterisian.</li>
            <li>Klik <strong>Simpan</strong>. Data akan langsung tampil di tabel dan grafik beranda diperbarui otomatis.</li>
          </ol>
        </div>

        <div className="text-xs text-slate-500 pt-6 border-t border-slate-200">
          Sumber referensi: BAN-PDM / Pusat Data Pokok Pendidikan – Dinas Pendidikan Kabupaten Sumedang © 2026.
        </div>
      </section>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${color}`}>
        ●
      </span>
      <span>{label}</span>
    </div>
  );
}
