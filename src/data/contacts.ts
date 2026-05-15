import { Contact } from '../types';

const STORAGE_KEY = 'kontak_db';

const dataAwal: Contact[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    telepon: '0812-3456-7890',
    alamat: 'Jl. Merdeka No. 10, Jakarta Selatan',
    kategori: 'rekan_kerja',
    tanggalDibuat: '2025-01-15T08:00:00',
    tanggalDiupdate: '2025-01-15T08:00:00',
  },
  {
    id: '2',
    nama: 'Siti Rahayu',
    email: 'siti.rahayu@email.com',
    telepon: '0857-1234-5678',
    alamat: 'Jl. Sudirman No. 25, Bandung',
    kategori: 'keluarga',
    tanggalDibuat: '2025-02-20T10:30:00',
    tanggalDiupdate: '2025-02-20T10:30:00',
  },
  {
    id: '3',
    nama: 'Andi Wijaya',
    email: 'andi.wijaya@email.com',
    telepon: '0878-9012-3456',
    alamat: 'Jl. Gatot Subroto No. 5, Surabaya',
    kategori: 'teman',
    tanggalDibuat: '2025-03-10T14:15:00',
    tanggalDiupdate: '2025-03-10T14:15:00',
  },
  {
    id: '4',
    nama: 'Dewi Lestari',
    email: 'dewi.lestari@email.com',
    telepon: '0821-5678-9012',
    alamat: 'Jl. Diponegoro No. 8, Yogyakarta',
    kategori: 'rekan_kerja',
    tanggalDibuat: '2025-04-05T09:45:00',
    tanggalDiupdate: '2025-04-05T09:45:00',
  },
  {
    id: '5',
    nama: 'Rizky Pratama',
    email: 'rizky.pratama@email.com',
    telepon: '0838-2345-6789',
    alamat: 'Jl. Ahmad Yani No. 15, Semarang',
    kategori: 'teman',
    tanggalDibuat: '2025-05-12T16:00:00',
    tanggalDiupdate: '2025-05-12T16:00:00',
  },
];

export const ambilSemuaKontak = (): Contact[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataAwal));
    return dataAwal;
  }
  return JSON.parse(data);
};

export const simpanKontak = (kontak: Contact): Contact[] => {
  const semuaKontak = ambilSemuaKontak();
  const index = semuaKontak.findIndex(k => k.id === kontak.id);
  if (index >= 0) {
    semuaKontak[index] = { ...kontak, tanggalDiupdate: new Date().toISOString() };
  } else {
    semuaKontak.push(kontak);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(semuaKontak));
  return semuaKontak;
};

export const hapusKontak = (id: string): Contact[] => {
  const semuaKontak = ambilSemuaKontak();
  const filtered = semuaKontak.filter(k => k.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

export const cariKontak = (query: string): Contact[] => {
  const semuaKontak = ambilSemuaKontak();
  const q = query.toLowerCase();
  return semuaKontak.filter(
    k =>
      k.nama.toLowerCase().includes(q) ||
      k.email.toLowerCase().includes(q) ||
      k.telepon.includes(q) ||
      k.alamat.toLowerCase().includes(q)
  );
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const resetDatabase = (): Contact[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataAwal));
  return dataAwal;
};
