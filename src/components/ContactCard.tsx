import { Contact, getKategoriInfo } from '../types';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onView: (contact: Contact) => void;
}

export default function ContactCard({ contact, onEdit, onDelete, onView }: ContactCardProps) {
  const info = getKategoriInfo(contact.kategori);

  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer"
      onClick={() => onView(contact)}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0 shadow-sm">
          {contact.nama.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{contact.nama}</h3>
            <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs border ${info.color} flex-shrink-0`}>
              {info.icon} {info.label}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 truncate flex items-center gap-1">
            <span className="flex-shrink-0">📧</span> {contact.email}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 truncate flex items-center gap-1 mt-0.5">
            <span className="flex-shrink-0">📱</span> {contact.telepon}
          </p>
          <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
            <span className="flex-shrink-0">📍</span> {contact.alamat}
          </p>
          {/* Mobile kategori */}
          <span className={`sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border mt-1.5 ${info.color}`}>
            {info.icon} {info.label}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onEdit(contact)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(contact)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
            title="Hapus"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
