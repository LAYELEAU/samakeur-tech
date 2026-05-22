import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-black text-gray-900">{{ isRegistering ? 'Inscription' : 'Connexion' }}</h2>
        </div>
        
        <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <input type="email" formControlName="email" placeholder="Email" class="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 outline-none">
          <input type="password" formControlName="password" placeholder="Mot de passe" class="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 outline-none">
          
          <button type="submit" class="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">
            {{ isRegistering ? 'S\'inscrire' : 'Se connecter' }}
          </button>

          <button type="button" (click)="isRegistering = !isRegistering" class="w-full text-sm text-gray-500 hover:underline">
            {{ isRegistering ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Inscrivez-vous' }}
          </button>
        </form>

        <div class="mt-8 border-t pt-6">
          <button (click)="authService.loginWithGoogle()" 
            class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl font-bold hover:bg-gray-50">
            Connexion Google
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  public authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);

  isRegistering = false;
  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      try {
        if (this.isRegistering) {
          await this.authService.registerWithEmail(email, password);
        } else {
          await this.authService.loginWithEmail(email, password);
        }
        this.router.navigate(['/dashboard']);
      } catch (error) {
        this.errorHandler.handleError(error, 'Échec de l\'authentification');
      }
    }
  }
}
