import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogementService } from '../../services/logement.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Logement } from '../../models/logement';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-4xl font-black text-gray-900">Tableau de bord</h1>
            <p class="text-gray-500 font-medium">Gérez vos annonces immobilières en toute simplicité.</p>
          </div>
          <a routerLink="/ajouter-logement" class="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg">
            + Nouveau bien
          </a>
        </div>

        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div class="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Vos Annonces</div>
            <div class="text-4xl font-black text-gray-900">{{myLogements().length}}</div>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div class="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Vues Totales</div>
            <div class="text-4xl font-black text-blue-600">0</div>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div class="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Contacts Reçus</div>
            <div class="text-4xl font-black text-green-600">0</div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Bien</th>
                <th class="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Quartier</th>
                <th class="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Prix</th>
                <th class="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Statut</th>
                <th class="px-6 py-4 text-sm font-bold text-gray-700 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (logement of myLogements(); track logement.id) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <img [src]="logement.images[0]" class="w-12 h-12 rounded-xl object-cover">
                      <span class="font-bold text-gray-900">{{logement.nom}}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-600 font-medium">{{logement.quartier}}</td>
                  <td class="px-6 py-4 font-bold text-[#190487]">{{logement.prix | number}} FCFA</td>
                  <td class="px-6 py-4">
                    <span [class]="logement.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{logement.disponible ? 'Actif' : 'Indisponible'}}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-2">
                      <button (click)="toggleStatus(logement)" class="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Changer statut">
                        🔄
                      </button>
                      <button (click)="delete(logement.id)" class="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Supprimer">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="px-6 py-20 text-center text-gray-500 font-medium">
                    Vous n'avez pas encore d'annonces.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class Dashboard {
  private logementService = inject(LogementService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  
  myLogements = computed(() => {
    const user = this.authService.user();
    if (!user) return [];
    return this.logementService.logements().filter(l => l.userId === user.id);
  });

  async toggleStatus(logement: Logement) {
    try {
      await this.logementService.updateLogement(logement.id, {
        disponible: !logement.disponible
      });
      this.notificationService.show('Statut mis à jour');
    } catch (error) {
      this.notificationService.error('Erreur lors de la mise à jour');
    }
  }

  async delete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await this.logementService.deleteLogement(id);
        this.notificationService.show('Annonce supprimée', 'info');
      } catch (error) {
        this.notificationService.error('Erreur lors de la suppression');
      }
    }
  }
}
