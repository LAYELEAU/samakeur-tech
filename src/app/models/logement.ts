export interface Logement {
  id: string;
  nom: string;
  ville: string;
  quartier: string;
  prix: number;
  images: string[];
  dateAjout: Date;
  disponible: boolean;
  description: string;
  
  wifi: boolean;
  parking: boolean;
  climatisation: boolean;
  piscine: boolean;
  reservoirsEau: boolean;
  groupeElectrogene: boolean;
  type: 'Studio' | 'Bureau' | 'Chambre' | 'Appartement';
  typeContrat: 'location' | 'vente' | 'nuitee';
  status?: 'disponible' | 'indisponible';
  whatsappNumber?: string;
  telephone?: string;
  lat?: number;
  lng?: number;
  chambres?: number;
  sallesDeBain?: number;
  surface?: number;
  
  // New fields for management and UX
  isVerified?: boolean;
  userId?: string; // To simulate multiple agents later
  createdAt?: Date;
}
