import { Mail, Fish } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Fish className="h-8 w-8 text-cyan-400" />
              <span className="font-bold text-xl">Distribution Benslimane</span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre distributeur de confiance pour poissons frais et produits de la mer.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Accueil</li>
              <li>Catalogue</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <a
              href="mailto:mbenslimane522@gmail.com"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>mbenslimane522@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Distribution Benslimane — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
