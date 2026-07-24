import { Fish, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../context/NavigationContext';
import { useNavigation } from '../context/useNavigation';
import { Language } from '../i18n';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useNavigation();

  const navItems: Array<{ id: Page; label: string }> = [
    { id: 'home', label: language === 'en' ? 'Home' : 'Accueil' },
    { id: 'catalog', label: language === 'en' ? 'Products' : 'Produits' },
    { id: 'contact', label: language === 'en' ? 'Request a quote' : 'Demander un devis' },
  ];

  return (
    <header className="bg-slate-950/95 text-white shadow-lg sticky top-0 z-50 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 text-white hover:text-cyan-300 transition-colors"
            aria-label="Distribution Benslimane — Home"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <Fish className="h-7 w-7" />
            </span>
            <span className="text-left">
              <span className="font-bold text-base sm:text-lg block leading-tight">Distribution Benslimane</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 hidden sm:block">
                {language === 'en' ? 'Moroccan seafood supply' : 'Produits de la mer du Maroc'}
              </span>
            </span>
          </button>

          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-300'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-700 p-1" aria-label="Language">
              {(['en', 'fr'] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => onLanguageChange(item)}
                  className={`rounded px-2.5 py-1 text-xs font-bold transition-colors ${
                    language === item ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                  aria-pressed={language === item}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-100 transition-colors"
            >
              {language === 'en' ? 'Get a quote' : 'Obtenir un devis'}
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:text-cyan-300 hover:bg-slate-800"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 border-t border-slate-800 pt-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-300 bg-slate-900'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
