import { Fish } from '../types/fish';
import { useNavigation } from '../context/NavigationContext';
import { MapPin, Package } from 'lucide-react';

interface FishCardProps {
  fish: Fish;
}

export function FishCard({ fish }: FishCardProps) {
  const { navigateTo } = useNavigation();

  return (
    <div
      onClick={() => navigateTo('fish-detail', fish.id)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={fish.image}
          alt={fish.nom}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              fish.disponibilite === 'En stock'
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 text-white'
            }`}
          >
            {fish.disponibilite}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{fish.nom}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{fish.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-cyan-600" />
          <span>{fish.origine}</span>
          <span className="mx-2">•</span>
          <span className="text-cyan-700 font-medium">{fish.type}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Package className="h-4 w-4 mr-1 text-cyan-600" />
          <span>{fish.conditionnement}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-bold text-cyan-700">{fish.prixIndicatif}</span>
          <span className="text-sm text-gray-500">{fish.mode}</span>
        </div>
      </div>
    </div>
  );
}
