export interface Logement {
  id: number;
  nom: string;
  ville: string;
  quartier: string;
  prix: number;
  image: string;
  dateAjout?: Date;
  disponible: boolean;
  description: string;
  wifi: boolean;
  parking: boolean;
  climatisation: boolean;
  piscine: boolean;
  type: 'Studio' | 'Bureau' | 'Chambre' | 'Appartement';
}