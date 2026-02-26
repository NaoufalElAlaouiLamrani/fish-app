import { Fish, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../context/NavigationContext';
import { useNavigation } from '../context/useNavigation';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useNavigation();

  const navItems: Array<{ id: Page; label: string }> = [
    { id: 'home', label: 'Accueil' },
    { id: 'catalog', label: 'Catalogue' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-2 text-cyan-700 hover:text-cyan-800 transition-colors"
          >
            <Fish className="h-8 w-8" />
            <span className="font-bold text-xl hidden sm:inline">Distribution Benslimane</span>
            <span className="font-bold text-xl sm:hidden">DB</span>
          </button>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-700 border-b-2 border-cyan-700'
                    : 'text-gray-700 hover:text-cyan-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-cyan-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-700 bg-cyan-50'
                    : 'text-gray-700 hover:text-cyan-700 hover:bg-gray-50'
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
