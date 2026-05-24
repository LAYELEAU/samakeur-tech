import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Renderer2, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLogement } from '../card-logement/card-logement';
import { SkeletonCard } from '../skeleton-card/skeleton-card';
import { Logement } from '../../models/logement';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { LogementService } from '../../services/logement.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardLogement, SkeletonCard, FormsModule, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  public logementService = inject(LogementService);
  private renderer = inject(Renderer2);
  private router = inject(Router);

  searchQuartier = signal('');
  searchType = signal('Type de logement');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  searchContract = signal('Tous les contrats');
  
  // Amenities filters
  filterWifi = signal(false);
  filterClim = signal(false);
  filterParking = signal(false);

  // New features for UI
  categories = [
    { name: 'Studio', icon: '🏢', count: computed(() => this.logements().filter(l => l.type === 'Studio').length) },
    { name: 'Appartement', icon: '🏠', count: computed(() => this.logements().filter(l => l.type === 'Appartement').length) },
    { name: 'Bureau', icon: '💼', count: computed(() => this.logements().filter(l => l.type === 'Bureau').length) },
    { name: 'Chambre', icon: '🛏️', count: computed(() => this.logements().filter(l => l.type === 'Chambre').length) }
  ];

  stats = [
    { label: 'Biens disponibles', value: '500+' },
    { label: 'Clients satisfaits', value: '1.2k' },
    { label: 'Villes couvertes', value: '12' },
    { label: 'Agents experts', value: '25' }
  ];

  showSuggestions = signal(false);

  @ViewChild('sliderSection') sliderSection!: ElementRef;
  @ViewChild('resultsSection') resultsSection!: ElementRef;

  logements = this.logementService.logements;

  scrollToResults() {
    this.router.navigate(['/trouver-un-bien'], {
      queryParams: {
        quartier: this.searchQuartier(),
        type: this.searchType() === 'Type de logement' ? 'Tout type' : this.searchType(),
        contract: this.searchContract()
      }
    });
  }

  selectCategory(categoryName: string) {
    this.router.navigate(['/trouver-un-bien'], {
      queryParams: { type: categoryName }
    });
  }

  filteredLogements = computed(() => {
    const q = this.searchQuartier().toLowerCase();
    const t = this.searchType();
    const minP = this.minPrice();
    const maxP = this.maxPrice();
    const contract = this.searchContract();
    
    return this.logements().filter(logement => {
      const matchesQuartier = q ? logement.quartier.toLowerCase().includes(q) : true;
      const matchesType = t && t !== 'Type de logement' ? logement.type === t : true;
      const matchesMinPrice = minP !== null ? logement.prix >= minP : true;
      const matchesMaxPrice = maxP !== null ? logement.prix <= maxP : true;
      const matchesContract = contract && contract !== 'Tous les contrats' ? logement.typeContrat === contract : true;
      
      const matchesWifi = this.filterWifi() ? logement.wifi : true;
      const matchesClim = this.filterClim() ? logement.climatisation : true;
      const matchesParking = this.filterParking() ? logement.parking : true;

      return matchesQuartier && matchesType && matchesMinPrice && matchesMaxPrice && matchesContract && matchesWifi && matchesClim && matchesParking;
    });
  });

  // Slider state
  currentSlide = signal(1);
  autoplayInterval: ReturnType<typeof setInterval> | null = null;
  isPlaying = signal(true);
  totalSlides = 4;
  slideInterval = 3000; // ms

  private removeMouseEnter?: () => void;
  private removeMouseLeave?: () => void;

  ngAfterViewInit(): void {
    // Initialize slider after view is ready
    this.initialize();

    // Pause on hover (using renderer to be safe)
    if (this.sliderSection && this.sliderSection.nativeElement) {
      this.removeMouseEnter = this.renderer.listen(this.sliderSection.nativeElement, 'mouseenter', () => {
        if (this.isPlaying()) this.stopAutoplay();
      });

      this.removeMouseLeave = this.renderer.listen(this.sliderSection.nativeElement, 'mouseleave', () => {
        if (this.isPlaying()) this.startAutoplay();
      });
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    if (this.removeMouseEnter) this.removeMouseEnter();
    if (this.removeMouseLeave) this.removeMouseLeave();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    } else if (e.key === ' ') {
      e.preventDefault();
      this.toggleAutoplay();
    }
  }

  // Slider methods
  goToSlide(slideNumber: number) {
    const root = this.sliderSection ? this.sliderSection.nativeElement : document;

    // Remove active from slides and dots
    const slides = root.querySelectorAll('.slide');
    slides.forEach((s: Element) => s.classList.remove('active'));

    const dots = root.querySelectorAll('.dot');
    dots.forEach((d: Element) => d.classList.remove('active'));

    const targetSlide = root.querySelector(`.slide[data-slide="${slideNumber}"]`);
    const targetDot = root.querySelector(`.dot[data-dot="${slideNumber}"]`);

    if (targetSlide) targetSlide.classList.add('active');
    if (targetDot) targetDot.classList.add('active');

    this.currentSlide.set(slideNumber);
    this.resetProgressBar();

    if (this.isPlaying()) this.startAutoplay();
  }

  nextSlide() {
    const next = this.currentSlide() >= this.totalSlides ? 1 : this.currentSlide() + 1;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev = this.currentSlide() <= 1 ? this.totalSlides : this.currentSlide() - 1;
    this.goToSlide(prev);
  }

  toggleAutoplay() {
    this.isPlaying.update(p => !p);
    if (this.isPlaying()) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
    this.resetProgressBar();
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
    // Reset progress bar when stopped
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  }

  resetProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.transition = `width ${this.slideInterval}ms linear`;
      progressBar.style.width = '100%';
    }, 100);
  }

  initialize() {
    this.goToSlide(1);
    if (this.isPlaying()) this.startAutoplay();
  }
}
