import { ArrowLeft, MapPin, Package, Anchor, Mail } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { fishCatalog } from '../data/catalog';

export function FishDetail() {
  const { selectedFishId, navigateTo } = useNavigation();

  const fish = fishCatalog.find((f) => f.id === selectedFishId);

  if (!fish) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-cyan-700 hover:text-cyan-800 font-medium"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigateTo('catalog')}
          className="flex items-center text-cyan-700 hover:text-cyan-800 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour au catalogue
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <img
                src={fish.image}
                alt={fish.nom}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    fish.disponibilite === 'En stock'
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 text-white'
                  }`}
                >
                  {fish.disponibilite}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{fish.nom}</h1>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-cyan-700">{fish.prixIndicatif}</span>
                <span className="ml-2 text-gray-500">prix indicatif</span>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{fish.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Origine</p>
                    <p className="text-gray-600">{fish.origine}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Anchor className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Mode</p>
                    <p className="text-gray-600">{fish.mode}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Package className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Conditionnement</p>
                    <p className="text-gray-600">{fish.conditionnement}</p>
                  </div>
                </div>

                {fish.calibre && (
                  <div className="flex items-start">
                    <Package className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Calibre</p>
                      <p className="text-gray-600">{fish.calibre}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contacter le distributeur
                </button>

                <a
                  href="mailto:contact@distribution-benslimane.ma"
                  className="block text-center mt-4 text-cyan-700 hover:text-cyan-800 font-medium"
                >
                  ou envoyer un e-mail directement
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fishCatalog
              .filter((f) => f.type === fish.type && f.id !== fish.id)
              .slice(0, 4)
              .map((similarFish) => (
                <div
                  key={similarFish.id}
                  onClick={() => navigateTo('fish-detail', similarFish.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    <img
                      src={similarFish.image}
                      alt={similarFish.nom}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{similarFish.nom}</h3>
                    <p className="text-cyan-700 font-semibold">{similarFish.prixIndicatif}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
