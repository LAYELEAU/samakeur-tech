import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-black text-gray-900 mb-6">Centre d'<span class="text-blue-600">Aide & FAQ</span></h1>
          <p class="text-xl text-gray-600 font-medium">Réponses à vos questions les plus fréquentes.</p>
        </div>

        <div class="space-y-4">
          @for (item of faqs; track item.q) {
            <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all shadow-sm hover:shadow-md">
              <button (click)="item.open = !item.open" class="w-full text-left p-8 flex justify-between items-center gap-4">
                <span class="text-xl font-bold text-gray-900">{{ item.q }}</span>
                <span class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-2xl transition-transform" [class.rotate-45]="item.open">+</span>
              </button>
              <div *ngIf="item.open" class="px-8 pb-8 animate-in slide-in-from-top duration-300">
                <p class="text-gray-600 leading-relaxed text-lg">{{ item.a }}</p>
              </div>
            </div>
          }
        </div>

        <div class="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white shadow-2xl">
          <h2 class="text-3xl font-black mb-6">Encore des questions ?</h2>
          <p class="text-xl text-blue-100 mb-10">Notre équipe de support est là pour vous aider du lundi au samedi, de 08h à 20h.</p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+221330000000" class="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-all">📞 Appelez-nous</a>
            <a href="https://wa.me/221770000000" class="px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black text-xl hover:scale-105 transition-all">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HelpFaq {
  faqs = [
    {
      q: "Est-ce que SamakeurTech est gratuit ?",
      a: "La consultation des annonces est 100% gratuite. Pour les propriétaires, la publication de base est également gratuite. Nous proposons des options de mise en avant (Premium) pour booster la visibilité de vos biens.",
      open: true
    },
    {
      q: "Comment savoir si une annonce est réelle ?",
      a: "Toutes les annonces avec le badge 'Vérifié' ont été inspectées physiquement par nos agents. Pour les autres, nous effectuons une vérification documentaire rigoureuse avant publication.",
      open: false
    },
    {
      q: "Quelles sont les zones couvertes par SamakeurTech ?",
      a: "Actuellement, nous couvrons toute la région de Dakar (Plateau, Almadies, Ngor, Mermoz, Sacré-Cœur, etc.) ainsi que les zones de Saly et Diamniadio. Nous nous étendons progressivement à tout le Sénégal.",
      open: false
    },
    {
      q: "Comment puis-je modifier mon annonce ?",
      a: "Connectez-vous à votre tableau de bord. Vous y trouverez la liste de vos biens. Cliquez sur l'icône de modification pour mettre à jour les photos, le prix ou la description.",
      open: false
    },
    {
      q: "Proposez-vous une assistance juridique ?",
      a: "Oui, via nos partenaires notaires et conseillers juridiques, nous pouvons vous assister dans la rédaction et la vérification des baux locatifs et des contrats de vente pour sécuriser vos transactions.",
      open: false
    }
  ];
}
