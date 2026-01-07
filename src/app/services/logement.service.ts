import { Injectable } from '@angular/core';
import { Logement } from '../models/logement';

@Injectable({ providedIn: 'root' })
export class LogementService {
  private logements: Logement[] = [
    {
      id: 1,
      nom: 'Studio Moderne',
      ville: 'Dakar',
      quartier: 'Almadies',
      prix: 300000,
      image: 'assets/images/logement1.png',
      disponible: true,
      type: 'Studio',
      description: 'Studio moderne avec vue sur la ville',
      wifi: true,
      parking: false,
      climatisation: true,
      piscine: false,
      dateAjout: new Date(2024, 1, 15)
    },
    {
      id: 2,
      nom: 'Bureau Spacieux',
      ville: 'Dakar',
      quartier: 'Plateau',
      prix: 500000,
      image: 'assets/images/logement2.png',
      disponible: false,
      type: 'Bureau',
      description: 'Bureau spacieux au cœur du quartier des affaires',
      wifi: true,
      parking: false,
      climatisation: true,
      piscine: false,
      dateAjout: new Date(2024, 2, 5)
    },
    {
      id: 3,
      nom: 'Chambre Confortable',
      ville: 'Dakar',
      quartier: 'Mermoz',
      prix: 200000,
      image: 'assets/images/logement3.png',
      disponible: true,
      type: 'Chambre',
      description: 'Chambre confortable proche des commodités',
      wifi: false,
      parking: true,
      climatisation: false,
      piscine: true,
      dateAjout: new Date(2024, 3, 10)
    },
    {
      id: 4,
      nom: 'Studio Lumineux',
      ville: 'Dakar',
      quartier: 'Yoff',
      prix: 350000,
      image: 'assets/images/logement4.png',
      disponible: true,
      type: 'Studio',
      description: 'Studio lumineux avec vue sur la mer',
      wifi: true,
      parking: false,
      climatisation: true,
      piscine: false,
      dateAjout: new Date(2024, 4, 2)
    },
    {
      id: 5,
      nom: 'Bureau Central',
      ville: 'Dakar',
      quartier: 'Gorée',
      prix: 450000,
      image: 'assets/images/logement5.png',
      disponible: true,
      type: 'Bureau',
      description: 'Bureau central au cœur de Gorée',
      wifi: true,
      parking: true,
      climatisation: false,
      piscine: true,
      dateAjout: new Date(2024, 4, 20)
    },
    {
      id: 6,
      nom: 'Chambre Élégante',
      ville: 'Dakar',
      quartier: 'Ngor',
      prix: 250000,
      image: 'assets/images/logement6.png',
      disponible: false,
      type: 'Chambre',
      description: 'Chambre élégante avec accès à la piscine',
      wifi: false,
      parking: false,
      climatisation: true,
      piscine: true,
      dateAjout: new Date(2024, 5, 15)
    }
  ];

  getAll(): Logement[] {
    return this.logements;
  }

  getById(id: number): Logement | undefined {
    return this.logements.find(l => l.id === id);
  }
}
