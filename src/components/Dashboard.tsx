import { Contact, getKategoriInfo } from '../types';

interface DashboardProps {
  contacts: Contact[];
}

export default function Dashboard({ contacts }: DashboardProps) {
  const totalKontak = contacts.length;
  const kategoriCount: Record<string, number> = {};
  contacts.forEach(k => {
    kategoriCount[k.kategori] = (kategoriCount[k.kategori] || 0) + 1;
  });

  const stats = [
    {
      label: 'Total Kontak',
      value: totalKontak,
      icon: '👥',
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Keluarga',
      value: kategoriCount['keluarga'] || 0,
      icon: '👨‍👩‍👧‍👦',
      gradient: 'from-red-400 to-red-500',
      bgLight: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      label: 'Teman',
      value: kategoriCount['teman'] || 0,
      icon: '🤝',
      gradient: 'from-green-400 to-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: 'Rekan Kerja',
      value: kategoriCount['rekan_kerja'] || 0,
      icon: '💼',
      gradient: 'from-purple-400 to-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.tanggalDiupdate).getTime() - new Date(a.tanggalDiupdate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.bgLight} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                <span className="text-base sm:text-xl">{stat.icon}</span>
              </div>
            </div>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Kategori Breakdown */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4">📊 Distribusi Kategori</h3>
        <div className="space-y-3">
          {Object.entries(kategoriCount).map(([kat, count]) => {
            const info = getKategoriInfo(kat as Contact['kategori']);
            const percentage = totalKontak > 0 ? (count / totalKontak) * 100 : 0;
            return (
              <div key={kat} className="flex items-center gap-3">
                <span className="text-lg">{info.icon}</span>
                <span className="text-xs sm:text-sm text-gray-600 w-24 sm:w-28 truncate">{info.label}</span>
                <div className="flex-1 h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                      kat === 'keluarga' ? 'from-red-400 to-red-500' :
                      kat === 'teman' ? 'from-green-400 to-green-500' :
                      kat === 'rekan_kerja' ? 'from-blue-400 to-blue-500' :
                      'from-gray-400 to-gray-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 w-12 text-right">{count} ({Math.round(percentage)}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentContacts.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4">🕐 Terakhir Diupdate</h3>
          <div className="space-y-2 sm:space-y-3">
            {recentContacts.map(contact => {
              const info = getKategoriInfo(contact.kategori);
              return (
                <div key={contact.id} className="flex items-center gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {contact.nama.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{contact.nama}</p>
                    <p className="text-xs text-gray-400 truncate">{contact.email}</p>
                  </div>
                  <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-xs border ${info.color}`}>
                    {info.icon} {info.label}
                  </span>
                  <p className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">
                    {new Date(contact.tanggalDiupdate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
