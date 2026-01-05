import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLogement } from '../card-logement/card-logement';
import { Logement } from '../../models/logement';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardLogement],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('sliderSection') sliderSection!: ElementRef;
  @Input() logements: Logement[] = [
    {
      id: 1,
      nom: 'Studio Moderne',
      ville: 'Dakar',
      quartier: 'Almadies',
      prix: 300000,
      image: 'assets/images/studio1.jpg',
      disponible: true,
      type: 'Studio',
    },
    {
      id: 2,
      nom: 'Bureau Spacieux',
      ville: 'Dakar',
      quartier: 'Plateau',
      prix: 500000,
      image: 'assets/images/bureau1.jpg',
      disponible: false,
      type: 'Bureau',
    },
    {
      id: 3,
      nom: 'Chambre Confortable',
      ville: 'Dakar',
      quartier: 'Mermoz',
      prix: 200000,
      image: 'assets/images/chambre1.jpg',
      disponible: true,
      type: 'Chambre',
    },
    {
      id: 4,
      nom: 'Studio Lumineux',
      ville: 'Dakar',
      quartier: 'Yoff',
      prix: 350000,
      image: 'assets/images/studio2.jpg',
      disponible: true,
      type: 'Studio',
    },
    {
      id: 5,
      nom: 'Bureau Central',
      ville: 'Dakar',
      quartier: 'Gorée',
      prix: 450000,
      image: 'assets/images/bureau2.jpg',
      disponible: true,
      type: 'Bureau',
    },
    {
      id: 6,
      nom: 'Chambre Élégante',
      ville: 'Dakar',
      quartier: 'Ngor',
      prix: 250000,
      image: 'assets/images/chambre2.jpg',
      disponible: false,
      type: 'Chambre',
    },
  ];

  // Slider state
  currentSlide = 1;
  autoplayInterval: any = null;
  isPlaying = true;
  totalSlides = 4;
  slideInterval = 5000; // ms

  private removeMouseEnter?: () => void;
  private removeMouseLeave?: () => void;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Initialize slider after view is ready
    this.initialize();

    // Pause on hover (using renderer to be safe)
    if (this.sliderSection && this.sliderSection.nativeElement) {
      this.removeMouseEnter = this.renderer.listen(this.sliderSection.nativeElement, 'mouseenter', () => {
        if (this.isPlaying) this.stopAutoplay();
      });

      this.removeMouseLeave = this.renderer.listen(this.sliderSection.nativeElement, 'mouseleave', () => {
        if (this.isPlaying) this.startAutoplay();
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

    this.currentSlide = slideNumber;
    this.resetProgressBar();

    if (this.isPlaying) this.startAutoplay();
  }

  nextSlide() {
    const next = this.currentSlide >= this.totalSlides ? 1 : this.currentSlide + 1;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev = this.currentSlide <= 1 ? this.totalSlides : this.currentSlide - 1;
    this.goToSlide(prev);
  }

  toggleAutoplay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
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
    if (this.isPlaying) this.startAutoplay();
  }
}
