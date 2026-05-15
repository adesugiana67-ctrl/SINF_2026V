import { useState, useEffect, useCallback } from 'react';
import { Contact } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import AboutPage from './components/AboutPage';
import {
  ambilSemuaKontak,
  simpanKontak,
  hapusKontak,
  resetDatabase,
} from './data/contacts';

type Halaman = 'dashboard' | 'contacts' | 'about';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [halaman, setHalaman] = useState<Halaman>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('semua');

  // Load contacts
  const loadContacts = useCallback(() => {
    const data = ambilSemuaKontak();
    setContacts(data);
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Filtered contacts
  const filteredContacts = contacts.filter(c => {
    const matchSearch = searchQuery
      ? c.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.telepon.includes(searchQuery) ||
        c.alamat.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchFilter = filterKategori === 'semua' ? true : c.kategori === filterKategori;
    return matchSearch && matchFilter;
  });

  // Handlers
  const handleTambahBaru = () => {
    setSelectedContact(null);
    setFormModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setFormModalOpen(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  const handleSave = (contact: Contact) => {
    const updated = simpanKontak(contact);
    setContacts(updated);
    setFormModalOpen(false);
    setSelectedContact(null);
  };

  const handleConfirmDelete = () => {
    if (selectedContact) {
      const updated = hapusKontak(selectedContact.id);
      setContacts(updated);
      setDeleteModalOpen(false);
      setSelectedContact(null);
    }
  };

  const handleReset = () => {
    const data = resetDatabase();
    setContacts(data);
    setSearchQuery('');
    setFilterKategori('semua');
    setHalaman('dashboard');
  };

  const handleNavigate = (page: string) => {
    setHalaman(page as Halaman);
  };

  const getKategoriEmoji = (kat: string) => {
    switch (kat) {
      case 'keluarga': return '👨‍👩‍👧‍👦';
      case 'teman': return '🤝';
      case 'rekan_kerja': return '💼';
      default: return '📋';
    }
  };

  const getKategoriLabel = (kat: string) => {
    switch (kat) {
      case 'keluarga': return 'Keluarga';
      case 'teman': return 'Teman';
      case 'rekan_kerja': return 'Rekan Kerja';
      default: return 'Lainnya';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={halaman}
        onNavigate={handleNavigate}
        onReset={handleReset}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onShowAbout={() => setHalaman('about')}
        />

        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Page */}
            {halaman === 'dashboard' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">📊 Dashboard</h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Ringkasan data kontak Anda</p>
                </div>
                <Dashboard contacts={contacts} />
              </div>
            )}

            {/* Contacts Page */}
            {halaman === 'contacts' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">👥 Daftar Kontak</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{contacts.length} kontak tersimpan</p>
                  </div>
                  <button
                    onClick={handleTambahBaru}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl text-sm font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 active:scale-[0.98] transition-all self-start sm:self-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Tambah Kontak</span>
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <SearchBar
                    onSearch={setSearchQuery}
                    onFilterKategori={setFilterKategori}
                    activeFilter={filterKategori}
                  />
                </div>

                <ContactList
                  contacts={filteredContacts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  searchQuery={searchQuery}
                />
              </div>
            )}

            {/* About Page */}
            {halaman === 'about' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">ℹ️ Tentang Aplikasi</h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Informasi & panduan integrasi MySQL</p>
                </div>
                <AboutPage />
              </div>
            )}
          </div>
        </main>

        {/* Floating Add Button (Mobile) */}
        {halaman === 'contacts' && (
          <button
            onClick={handleTambahBaru}
            className="sm:hidden fixed bottom-5 right-5 z-30 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-xl shadow-blue-300 flex items-center justify-center hover:shadow-2xl active:scale-90 transition-all"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={formModalOpen}
        onClose={() => { setFormModalOpen(false); setSelectedContact(null); }}
        title={selectedContact ? '✏️ Edit Kontak' : '➕ Tambah Kontak Baru'}
      >
        <ContactForm
          contact={selectedContact}
          onSave={handleSave}
          onCancel={() => { setFormModalOpen(false); setSelectedContact(null); }}
        />
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => { setDetailModalOpen(false); setSelectedContact(null); }}
        title="👤 Detail Kontak"
        size="sm"
      >
        {selectedContact && (
          <div className="space-y-4">
            {/* Avatar & Name */}
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl mx-auto shadow-lg">
                {selectedContact.nama.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-3">{selectedContact.nama}</h3>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-600 border border-blue-100 mt-1">
                {getKategoriEmoji(selectedContact.kategori)} {getKategoriLabel(selectedContact.kategori)}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg">📧</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="text-sm text-blue-600 hover:underline break-all">
                    {selectedContact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg">📱</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Telepon</p>
                  <a href={`tel:${selectedContact.telepon}`} className="text-sm text-blue-600 hover:underline">
                    {selectedContact.telepon}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Alamat</p>
                  <p className="text-sm text-gray-700">{selectedContact.alamat}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg">📅</span>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Dibuat</p>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedContact.tanggalDibuat).toLocaleDateString('id-ID', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setDetailModalOpen(false); handleEdit(selectedContact); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <span>✏️</span> Edit
              </button>
              <button
                onClick={() => { setDetailModalOpen(false); handleDelete(selectedContact); }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <span>🗑️</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setSelectedContact(null); }}
        title="⚠️ Konfirmasi Hapus"
        size="sm"
      >
        {selectedContact && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🗑️</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus kontak<br />
              <strong className="text-gray-800">"{selectedContact.nama}"</strong>?
            </p>
            <p className="text-xs text-red-400">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setDeleteModalOpen(false); setSelectedContact(null); }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-md"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
