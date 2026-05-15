import { Contact } from '../types';
import ContactCard from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onView: (contact: Contact) => void;
  searchQuery: string;
}

export default function ContactList({ contacts, onEdit, onDelete, onView, searchQuery }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl sm:text-5xl">🔍</span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
          {searchQuery ? 'Tidak Ditemukan' : 'Belum Ada Kontak'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xs">
          {searchQuery
            ? `Tidak ada kontak yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
            : 'Mulai tambahkan kontak baru dengan menekan tombol "+" di bawah.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <p className="text-xs text-gray-400 px-1">
        Menampilkan {contacts.length} kontak
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
}
