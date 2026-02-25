export interface Fish {
  id: string;
  nom: string;
  description: string;
  image: string;
  origine: 'Atlantique' | 'Méditerranée' | 'Élevage';
  type: 'Poisson' | 'Fruits de mer';
  disponibilite: 'En stock' | 'Sur commande';
  prixIndicatif: string;
  conditionnement: string;
  calibre?: string;
  mode: 'Pêche' | 'Élevage';
}
