import { useState, useEffect } from 'react';
import { Contact, KATEGORI_OPTIONS } from '../types';

interface ContactFormProps {
  contact?: Contact | null;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

const formAwal = {
  nama: '',
  email: '',
  telepon: '',
  alamat: '',
  kategori: 'lainnya' as Contact['kategori'],
};

export default function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
  const [form, setForm] = useState(formAwal);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact) {
      setForm({
        nama: contact.nama,
        email: contact.email,
        telepon: contact.telepon,
        alamat: contact.alamat,
        kategori: contact.kategori,
      });
    } else {
      setForm(formAwal);
    }
    setErrors({});
  }, [contact]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.nama.trim()) newErrors.nama = 'Nama wajib diisi';
    if (!form.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!form.telepon.trim()) newErrors.telepon = 'Nomor telepon wajib diisi';
    if (!form.alamat.trim()) newErrors.alamat = 'Alamat wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const now = new Date().toISOString();
    const kontakBaru: Contact = {
      id: contact?.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
      nama: form.nama.trim(),
      email: form.email.trim(),
      telepon: form.telepon.trim(),
      alamat: form.alamat.trim(),
      kategori: form.kategori,
      tanggalDibuat: contact?.tanggalDibuat || now,
      tanggalDiupdate: now,
    };
    onSave(kontakBaru);
  };

  const inputClass = (field: string) =>
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 hover:bg-white'
    } text-sm transition-all focus:outline-none focus:ring-2 focus:bg-white`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <span>👤</span> Nama Lengkap <span className="text-red-400">*</span>
          </span>
        </label>
        <input
          type="text"
          value={form.nama}
          onChange={e => setForm({ ...form, nama: e.target.value })}
          className={inputClass('nama')}
          placeholder="Masukkan nama lengkap"
        />
        {errors.nama && <p className="text-xs text-red-500 mt-1 ml-1">{errors.nama}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <span>📧</span> Email <span className="text-red-400">*</span>
          </span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className={inputClass('email')}
          placeholder="contoh@email.com"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
      </div>

      {/* Telepon */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <span>📱</span> Telepon <span className="text-red-400">*</span>
          </span>
        </label>
        <input
          type="tel"
          value={form.telepon}
          onChange={e => setForm({ ...form, telepon: e.target.value })}
          className={inputClass('telepon')}
          placeholder="0812-xxxx-xxxx"
        />
        {errors.telepon && <p className="text-xs text-red-500 mt-1 ml-1">{errors.telepon}</p>}
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <span>🏷️</span> Kategori
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {KATEGORI_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, kategori: opt.value })}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                form.kategori === opt.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <span>📍</span> Alamat <span className="text-red-400">*</span>
          </span>
        </label>
        <textarea
          value={form.alamat}
          onChange={e => setForm({ ...form, alamat: e.target.value })}
          className={`${inputClass('alamat')} resize-none`}
          rows={2}
          placeholder="Masukkan alamat lengkap"
        />
        {errors.alamat && <p className="text-xs text-red-500 mt-1 ml-1">{errors.alamat}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2 pb-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {contact ? '💾 Simpan Perubahan' : '➕ Tambah Kontak'}
        </button>
      </div>
    </form>
  );
}
