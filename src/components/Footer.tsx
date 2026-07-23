import { Mail, Fish, Phone, ExternalLink } from 'lucide-react';
import { useNavigation } from '../context/useNavigation';
import { Language } from '../i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const { navigateTo } = useNavigation();
  const isEnglish = language === 'en';

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                <Fish className="h-7 w-7" />
              </span>
              <span className="font-bold text-xl">Distribution Benslimane</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {isEnglish
                ? 'Moroccan supplier of frozen sardine fillets and marinated sardine and anchovy products for professional buyers.'
                : 'Fournisseur marocain de filets de sardines congelés et de produits marinés à base de sardines et d’anchois.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{isEnglish ? 'Navigation' : 'Navigation'}</h3>
            <div className="space-y-2 text-slate-400 text-sm">
              <button onClick={() => navigateTo('home')} className="block hover:text-cyan-300">{isEnglish ? 'Home' : 'Accueil'}</button>
              <button onClick={() => navigateTo('catalog')} className="block hover:text-cyan-300">{isEnglish ? 'Products' : 'Produits'}</button>
              <button onClick={() => navigateTo('contact')} className="block hover:text-cyan-300">{isEnglish ? 'Request a quote' : 'Demander un devis'}</button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{isEnglish ? 'Commercial contact' : 'Contact commercial'}</h3>
            <a
              href="mailto:naoufalelalaouilamrani@gmail.com"
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>naoufalelalaouilamrani@gmail.com</span>
            </a>
            <a href="tel:+212663200846" className="mt-3 flex items-center space-x-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm">
              <Phone className="h-4 w-4" />
              <span>+212 663 20 08 46</span>
            </a>
            <a href="https://wa.me/212663200846" target="_blank" rel="noreferrer" className="mt-3 flex items-center space-x-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm">
              <ExternalLink className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Distribution Benslimane — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
