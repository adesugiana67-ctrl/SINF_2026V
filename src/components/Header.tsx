import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onShowAbout: () => void;
}

export default function Header({ onToggleSidebar, onShowAbout }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-lg sm:text-xl">📇</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold leading-tight">Manajemen Kontak</h1>
                <p className="text-[10px] sm:text-xs text-blue-200 hidden sm:block">CRUD App • Responsive</p>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onShowAbout}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <span>ℹ️</span>
              <span>Tentang</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 text-gray-700">
                    <button
                      onClick={() => { onShowAbout(); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm flex items-center gap-2"
                    >
                      <span>ℹ️</span> Tentang Aplikasi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
