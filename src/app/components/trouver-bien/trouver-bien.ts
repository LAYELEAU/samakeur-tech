import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLogement } from '../card-logement/card-logement';
import { SkeletonCard } from '../skeleton-card/skeleton-card';
import { LogementService } from '../../services/logement.service';
import { FormsModule } from '@angular/forms';
import { Logement } from '../../models/logement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trouver-bien',
  standalone: true,
  imports: [CommonModule, CardLogement, SkeletonCard, FormsModule],
  templateUrl: './trouver-bien.html',
  styleUrls: ['./trouver-bien.css'],
})
export class TrouverBien implements OnInit {
  public logementService = inject(LogementService);
  private route = inject(ActivatedRoute);

  searchQuartier = signal('');
  searchType = signal('Tout type');
  searchContract = signal('Tous les contrats');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  
  // Amenities filters
  filterWifi = signal(false);
  filterClim = signal(false);
  filterParking = signal(false);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['quartier']) this.searchQuartier.set(params['quartier']);
      if (params['type']) this.searchType.set(params['type']);
      if (params['contract']) this.searchContract.set(params['contract']);
      if (params['minPrice']) this.minPrice.set(Number(params['minPrice']));
      if (params['maxPrice']) this.maxPrice.set(Number(params['maxPrice']));
    });
  }

  logements = this.logementService.logements;

  filteredLogements = computed(() => {
    const q = this.searchQuartier().toLowerCase();
    const t = this.searchType();
    const contract = this.searchContract();
    const minP = this.minPrice();
    const maxP = this.maxPrice();
    
    return this.logements().filter(logement => {
      const matchesQuartier = q ? logement.quartier.toLowerCase().includes(q) : true;
      const matchesType = t && t !== 'Tout type' ? logement.type === t : true;
      const matchesContract = contract && contract !== 'Tous les contrats' ? logement.typeContrat === contract : true;
      const matchesMinPrice = minP !== null ? logement.prix >= minP : true;
      const matchesMaxPrice = maxP !== null ? logement.prix <= maxP : true;
      
      const matchesWifi = this.filterWifi() ? logement.wifi : true;
      const matchesClim = this.filterClim() ? logement.climatisation : true;
      const matchesParking = this.filterParking() ? logement.parking : true;

      return matchesQuartier && matchesType && matchesContract && matchesMinPrice && matchesMaxPrice && matchesWifi && matchesClim && matchesParking;
    });
  });

  groupedLogements = computed(() => {
    const filtered = this.filteredLogements();
    const groups: Record<string, Logement[]> = {
      'Studio': [],
      'Appartement': [],
      'Chambre': [],
      'Bureau': []
    };

    filtered.forEach(l => {
      if (groups[l.type]) {
        groups[l.type].push(l);
      }
    });

    return groups;
  });

  categoryOrder = ['Studio', 'Appartement', 'Chambre', 'Bureau'];

  getCategoryIcon(type: string): string {
    switch (type) {
      case 'Studio': return '🏢';
      case 'Appartement': return '🏠';
      case 'Chambre': return '🛏️';
      case 'Bureau': return '💼';
      default: return '📍';
    }
  }
}
