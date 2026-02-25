import { ChevronRight, Waves, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export function Home() {
  const { navigateTo } = useNavigation();

  const advantages = [
    {
      icon: Waves,
      title: 'Qualité & fraîcheur',
      description: 'Produits sélectionnés avec soin, livrés dans les meilleures conditions.'
    },
    {
      icon: Shield,
      title: 'Approvisionnement régulier',
      description: 'Stock permanent pour répondre à vos besoins tout au long de l\'année.'
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Service de livraison efficace pour garantir la fraîcheur de vos commandes.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Service client réactif',
      description: 'Une équipe à votre écoute pour vous conseiller et vous accompagner.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <section className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20 sm:py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Distribution Benslimane
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-cyan-50 max-w-3xl mx-auto">
            Votre distributeur de poissons — qualité, fraîcheur, livraison.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center bg-white text-cyan-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Voir le catalogue
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">À propos</h2>
          <div className="w-20 h-1 bg-cyan-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Distribution Benslimane fournit poissons frais et produits de la mer aux restaurants,
            poissonneries et marchés. Nous privilégions la qualité, la régularité et un service fiable.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
            <div className="w-20 h-1 bg-cyan-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gradient-to-br from-cyan-50 to-blue-50"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prêt à commander ?</h2>
          <p className="text-xl mb-8 text-cyan-50">
            Découvrez notre large sélection de poissons et fruits de mer frais.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center bg-white text-cyan-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Parcourir le catalogue
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
