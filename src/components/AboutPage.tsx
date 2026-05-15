export default function AboutPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">📇 Aplikasi Manajemen Kontak</h2>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
          Aplikasi CRUD (Create, Read, Update, Delete) yang responsif dan dapat diakses di semua perangkat — 
          dari smartphone hingga desktop.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">⚛️ React</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">⚡ Vite</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">🎨 Tailwind CSS</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">📱 Responsive</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">🗄️ TypeScript</span>
        </div>
      </div>

      {/* Fitur */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">✨ Fitur Utama</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '➕', title: 'Tambah Kontak', desc: 'Buat kontak baru dengan data lengkap' },
            { icon: '👁️', title: 'Lihat Detail', desc: 'Tampilkan informasi kontak secara detail' },
            { icon: '✏️', title: 'Edit Kontak', desc: 'Ubah data kontak yang sudah ada' },
            { icon: '🗑️', title: 'Hapus Kontak', desc: 'Hapus kontak yang tidak diperlukan' },
            { icon: '🔍', title: 'Pencarian', desc: 'Cari kontak berdasarkan nama, email, dll' },
            { icon: '🏷️', title: 'Filter Kategori', desc: 'Filter berdasarkan kategori kontak' },
            { icon: '📊', title: 'Dashboard', desc: 'Ringkasan statistik kontak' },
            { icon: '📱', title: 'Responsive', desc: 'Tampilan optimal di semua ukuran layar' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MySQL Integration Guide */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">🗄️ Integrasi dengan MySQL</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Aplikasi ini saat ini menggunakan <strong>localStorage</strong> sebagai penyimpanan data lokal di browser.
          Untuk menghubungkan ke MySQL, Anda memerlukan backend server. Berikut panduan singkatnya:
        </p>

        {/* Step 1 */}
        <div className="space-y-4">
          <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/50">
            <h4 className="text-sm font-bold text-blue-700 mb-2">📋 Langkah 1: Buat Tabel MySQL</h4>
            <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto font-mono">
{`CREATE DATABASE kontak_db;
USE kontak_db;

CREATE TABLE kontak (
  id VARCHAR(36) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telepon VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  kategori ENUM('keluarga','teman','rekan_kerja','lainnya'),
  tanggal_dibuat DATETIME DEFAULT CURRENT_TIMESTAMP,
  tanggal_diupdate DATETIME DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);`}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="border border-green-100 rounded-xl p-4 bg-green-50/50">
            <h4 className="text-sm font-bold text-green-700 mb-2">🔧 Langkah 2: Buat REST API (Node.js + Express)</h4>
            <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto font-mono">
{`// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'kontak_db'
});

// GET semua kontak
app.get('/api/kontak', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM kontak');
  res.json(rows);
});

// POST kontak baru
app.post('/api/kontak', async (req, res) => {
  await pool.query('INSERT INTO kontak SET ?', req.body);
  res.json({ success: true });
});

// PUT update kontak
app.put('/api/kontak/:id', async (req, res) => {
  await pool.query('UPDATE kontak SET ? WHERE id = ?',
    [req.body, req.params.id]);
  res.json({ success: true });
});

// DELETE kontak
app.delete('/api/kontak/:id', async (req, res) => {
  await pool.query('DELETE FROM kontak WHERE id = ?',
    [req.params.id]);
  res.json({ success: true });
});

app.listen(3001);`}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="border border-purple-100 rounded-xl p-4 bg-purple-50/50">
            <h4 className="text-sm font-bold text-purple-700 mb-2">🌐 Langkah 3: Hubungkan Frontend ke API</h4>
            <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto font-mono">
{`// Ganti fungsi di src/data/contacts.ts:

// Ambil semua kontak dari API
export const ambilSemuaKontak = async () => {
  const res = await fetch('http://localhost:3001/api/kontak');
  return res.json();
};

// Simpan kontak via API
export const simpanKontak = async (kontak) => {
  const method = kontak.id ? 'PUT' : 'POST';
  const url = kontak.id
    ? \`http://localhost:3001/api/kontak/\${kontak.id}\`
    : 'http://localhost:3001/api/kontak';
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kontak)
  });
};

// Hapus kontak via API
export const hapusKontak = async (id) => {
  await fetch(\`http://localhost:3001/api/kontak/\${id}\`, {
    method: 'DELETE'
  });
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Responsive Info */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">📱 Responsif di Semua Perangkat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '📱', device: 'Smartphone', size: '< 640px', features: 'Layout 1 kolom, sidebar slide, bottom sheet modal' },
            { icon: '📟', device: 'Tablet', size: '640px - 1024px', features: 'Layout 2 kolom, sidebar toggle, modal center' },
            { icon: '🖥️', device: 'Desktop', size: '> 1024px', features: 'Layout 3 kolom, sidebar tetap, full features' },
          ].map(item => (
            <div key={item.device} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-center">
              <span className="text-3xl">{item.icon}</span>
              <h4 className="font-bold text-gray-700 mt-2">{item.device}</h4>
              <p className="text-xs text-blue-500 font-mono mt-1">{item.size}</p>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.features}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
