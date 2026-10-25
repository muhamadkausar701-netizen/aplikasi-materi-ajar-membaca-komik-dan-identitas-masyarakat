import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView } from '../data/budayaData';

interface TopBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const NAV_ITEMS: { view: AppView; label: string }[] = [
  { view: AppView.Home, label: 'Beranda' },
  { view: AppView.Comic, label: 'Komik Edukasi' },
  { view: AppView.Explorer, label: 'Pakaian & Budaya' },
  { view: AppView.Quiz, label: 'Kuis Evaluasi' },
];

export const TopBar: React.FC<TopBarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelect(AppView.Home)}
          className="font-display text-lg font-bold tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 rounded"
        >
          Jelajah Budaya Nusantara
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-7 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleSelect(item.view)}
                className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                  isActive
                    ? 'border-sky-700 text-sky-800 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect(AppView.Quiz)}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Mulai Kuis
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-sky-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Seluler"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleSelect(item.view)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
