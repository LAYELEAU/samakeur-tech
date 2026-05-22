import { Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private notificationService = inject(NotificationService);

  handleError(error: unknown, userMessage: string = 'Une erreur est survenue.') {
    console.error('Application Error:', error);
    
    // Check if error is an object with a code property
    if (error && typeof error === 'object' && 'code' in error) {
      const err = error as { code: string };
      switch (err.code) {
        case 'permission-denied':
          userMessage = 'Vous n\'avez pas la permission d\'effectuer cette action.';
          break;
        case 'unavailable':
          userMessage = 'Le service est temporairement indisponible. Veuillez réessayer plus tard.';
          break;
      }
    }

    this.notificationService.error(userMessage);
  }
}
