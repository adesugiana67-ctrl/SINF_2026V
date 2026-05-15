export interface Contact {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  kategori: 'keluarga' | 'teman' | 'rekan_kerja' | 'lainnya';
  tanggalDibuat: string;
  tanggalDiupdate: string;
}

export type KategoriOption = {
  value: Contact['kategori'];
  label: string;
  color: string;
  icon: string;
};

export const KATEGORI_OPTIONS: KategoriOption[] = [
  { value: 'keluarga', label: 'Keluarga', color: 'bg-red-100 text-red-700 border-red-200', icon: '👨‍👩‍👧‍👦' },
  { value: 'teman', label: 'Teman', color: 'bg-green-100 text-green-700 border-green-200', icon: '🤝' },
  { value: 'rekan_kerja', label: 'Rekan Kerja', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '💼' },
  { value: 'lainnya', label: 'Lainnya', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '📋' },
];

export const getKategoriInfo = (kategori: Contact['kategori']): KategoriOption => {
  return KATEGORI_OPTIONS.find(k => k.value === kategori) || KATEGORI_OPTIONS[3];
};
