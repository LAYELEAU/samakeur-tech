import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogementService } from '../../services/logement.service';
import { NotificationService } from '../../services/notification.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AuthService } from '../../services/auth.service';
import { Logement } from '../../models/logement';

@Component({
  selector: 'app-ajouter-logement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-logement.html',
  styleUrl: './ajouter-logement.css',
})
export class AjouterLogement {
  private fb = inject(FormBuilder);
  private logementService = inject(LogementService);
  private notificationService = inject(NotificationService);
  private errorHandler = inject(ErrorHandlerService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = signal<number>(1);
  imagePreviews = signal<string[]>([]);
  selectedFiles = signal<File[]>([]);
  isUploading = signal<boolean>(false);
  
  logementForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    ville: ['Dakar', Validators.required],
    quartier: ['', Validators.required],
    prix: [null, [Validators.required, Validators.min(0)]],
    type: ['Studio', Validators.required],
    typeContrat: ['location', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    images: [[]],
    coords: [null],
    whatsappNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{9,}$/)]],
    telephone: ['', [Validators.pattern(/^\+?[0-9]{9,}$/)]],
    wifi: [false],
    parking: [false],
    climatisation: [false],
    piscine: [false],
    reservoirsEau: [false],
    groupeElectrogene: [false],
    chambres: [1, [Validators.min(0)]],
    sallesDeBain: [1, [Validators.min(0)]],
    surface: [null, [Validators.required, Validators.min(1)]],
    disponible: [true]
  });

  isGeocoding = signal<boolean>(false);

  constructor() {
    this.logementForm.get('type')?.valueChanges.subscribe(value => {
      if (value === 'Bureau') {
        this.logementForm.patchValue({ chambres: 0, sallesDeBain: 0 });
      }
    });
  }

  async fetchCoordinates() {
    const quartier = this.logementForm.get('quartier')?.value;
    const ville = this.logementForm.get('ville')?.value;
    if (!quartier) return;

    this.isGeocoding.set(true);
    const query = `${quartier}, ${ville}, Senegal`;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        this.logementForm.patchValue({
          coords: { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
        });
        this.notificationService.success('Localisation trouvée !');
      }
    } catch (error) {
      this.errorHandler.handleError(error, 'Impossible de trouver la localisation');
    } finally {
      this.isGeocoding.set(false);
    }
  }

  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.update((s: number) => s + 1);
      setTimeout(() => this.scrollToTop(), 0);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s: number) => s - 1);
      setTimeout(() => this.scrollToTop(), 0);
    }
  }

  private scrollToTop() {
    const element = document.getElementById('form-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  removeImage(index: number) {
    this.imagePreviews.update(prev => prev.filter((_, i) => i !== index));
    this.selectedFiles.update(prev => prev.filter((_, i) => i !== index));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      
      for (const file of files) {
        this.selectedFiles.update(prev => [...prev, file]);
        
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          if (result) {
            this.imagePreviews.update(prev => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async onSubmit() {
    if (this.logementForm.valid) {
      this.isUploading.set(true);
      try {
        let imageUrls: string[] = [];

        // Only upload if files are selected
        if (this.selectedFiles().length > 0) {
          const uploadPromises = this.selectedFiles().map(file => 
            this.logementService.uploadImage(file)
          );
          imageUrls = await Promise.all(uploadPromises);
        } else {
          imageUrls = ['https://via.placeholder.com/400x300?text=Pas+d+image'];
        }

        const { coords, ...logementData } = this.logementForm.value;

        const newLogement = {
          ...logementData,
          lat: coords?.lat || null,
          lng: coords?.lng || null,
          userId: this.authService.user()?.id,
          dateAjout: new Date(),
          status: 'disponible',
          isVerified: false,
          createdAt: new Date(),
          images: imageUrls
        };

        await this.logementService.addLogement(newLogement);
        this.notificationService.success('Logement ajouté avec succès !');
        this.router.navigate(['/']);
      } catch (error) {
        this.errorHandler.handleError(error, 'Erreur lors de l\'ajout du logement');
      } finally {
        this.isUploading.set(false);
      }
    } else {
      Object.keys(this.logementForm.controls).forEach(key => {
        this.logementForm.get(key)?.markAsTouched();
      });
    }
  }
}

