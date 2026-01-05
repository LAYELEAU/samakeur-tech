export interface Logement {
  id: number;
  nom: string;
  ville: string;
  quartier: string;
  prix: number;
  image: string;
  disponible: boolean;
  type: 'Studio' | 'Bureau' | 'Chambre';
}