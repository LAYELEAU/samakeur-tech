import { Component, OnInit, HostListener, signal, inject, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Logement } from '../../models/logement';
import { LogementService } from '../../services/logement.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-detail-logement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-logement.html',
  styleUrls: ['./detail-logement.css'],
})
export class DetailLogement implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private logementService = inject(LogementService);
  private map: L.Map | undefined;

  infologement = signal<Logement | null>(null);
  
  logementsSimilaires = computed(() => {
    const current = this.infologement();
    if (!current) return [];
    return this.logementService.logements()
      .filter(l => l.type === current.type && l.id !== current.id)
      .slice(0, 3);
  });

  isLightboxOpen = signal(false);
  currentImageIndex = signal(0);
  isContactModalOpen = signal(false);
  isSent = signal(false);
  
  galerieImages = computed(() => {
    const images = this.infologement()?.images || [];
    const fallbacks = [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600'
    ];
    return images.length > 0 ? images : fallbacks;
  });

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        // Attempt to get from signal first
        let logement = this.logementService.getById(id);
        
        // If not in signal (e.g., refresh), fetch individually from Supabase
        if (!logement) {
          const { data, error } = await this.logementService.getSupabaseClient()
            .from('logements')
            .select('*')
            .eq('id', id)
            .single();
            
          if (!error && data) {
            logement = data as Logement;
          }
        }
        
        this.infologement.set(logement ?? null);
        this.logementService.incrementViewCount(id);
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 500);
  }

  private initMap(): void {
    const logement = this.infologement();
    if (logement && logement.lat && logement.lng) {
      this.map = L.map('map').setView([logement.lat, logement.lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      L.marker([logement.lat, logement.lng]).addTo(this.map)
        .bindPopup(logement.nom)
        .openPopup();
    }
  }

  openLightbox(index: number) {
    this.currentImageIndex.set(index);
    this.isLightboxOpen.set(true);
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex.update(i => (i + 1) % this.galerieImages().length);
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex.update(i => (i - 1 + this.galerieImages().length) % this.galerieImages().length);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isLightboxOpen()) {
      if (event.key === 'Escape') this.closeLightbox();
      if (event.key === 'ArrowRight') this.nextImage(event);
      if (event.key === 'ArrowLeft') this.prevImage(event);
    }
  }

  openContactForm() {
    this.isContactModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeContactForm() {
    this.isContactModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  envoyerDemande() {
    this.isSent.set(true);
    setTimeout(() => {
      this.closeContactForm();
      setTimeout(() => this.isSent.set(false), 500);
    }, 3000);
  }
}
