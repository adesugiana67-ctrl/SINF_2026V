interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onReset: () => void;
}

export default function Sidebar({ isOpen, onClose, currentPage, onNavigate, onReset }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', desc: 'Ringkasan data' },
    { id: 'contacts', label: 'Daftar Kontak', icon: '👥', desc: 'Kelola semua kontak' },
    { id: 'about', label: 'Tentang', icon: 'ℹ️', desc: 'Info aplikasi & MySQL' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 bg-white border-r border-gray-100 shadow-xl lg:shadow-none z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        {/* Logo Area */}
        <div className="p-4 sm:p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl">📇</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">Kontak App</h2>
              <p className="text-[10px] text-gray-400">v1.0 • Responsive</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-xl text-left transition-all ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg sm:text-xl">{item.icon}</span>
              <div>
                <p className={`text-sm font-medium ${currentPage === item.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 sm:p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => { onReset(); onClose(); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <span>🔄</span>
            <span>Reset Database</span>
          </button>
          <div className="text-center py-2">
            <p className="text-[10px] text-gray-300">Dibuat dengan ❤️ React + Tailwind</p>
          </div>
        </div>
      </aside>
    </>
  );
}
