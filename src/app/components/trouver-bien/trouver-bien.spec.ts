import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { TrouverBien } from './trouver-bien';
import { LogementService } from '../../services/logement.service';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('TrouverBien', () => {
  let component: TrouverBien;
  let mockLogementService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockLogementService = {
      logements: signal([
        { id: '1', type: 'Studio', quartier: 'Dakar', prix: 1000, wifi: true, climatisation: true, parking: true },
        { id: '2', type: 'Appartement', quartier: 'Mermoz', prix: 2000, wifi: false, climatisation: true, parking: true },
        { id: '3', type: 'Studio', quartier: 'Almadies', prix: 1500, wifi: true, climatisation: false, parking: false },
        { id: '4', type: 'Bureau', quartier: 'Plateau', prix: 3000, wifi: true, climatisation: true, parking: true },
      ]),
      isLoading: signal(false)
    };

    mockActivatedRoute = {
      queryParams: of({})
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: LogementService, useValue: mockLogementService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        TrouverBien
      ]
    });

    component = TestBed.inject(TrouverBien);
  });

  it('should group logements by category', () => {
    const groups = component.groupedLogements();
    expect(groups['Studio'].length).toBe(2);
    expect(groups['Appartement'].length).toBe(1);
    expect(groups['Bureau'].length).toBe(1);
    expect(groups['Chambre'].length).toBe(0);
  });

  it('should filter logements by quartier', () => {
    component.searchQuartier.set('Mermoz');
    const filtered = component.filteredLogements();
    expect(filtered.length).toBe(1);
    expect(filtered[0].quartier).toBe('Mermoz');
  });

  it('should filter logements by type', () => {
    component.searchType.set('Studio');
    const filtered = component.filteredLogements();
    expect(filtered.length).toBe(2);
    expect(filtered.every(l => l.type === 'Studio')).toBe(true);
  });
});
