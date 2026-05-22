import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-black text-gray-900 mb-6">Comment ça <span class="text-blue-600">marche ?</span></h1>
          <p class="text-xl text-gray-600 font-medium">Votre parcours vers votre nouveau chez-vous simplifié.</p>
        </div>

        <div class="space-y-12">
          <!-- Section Locataire -->
          <div class="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
            <h2 class="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
              <span class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">🏠</span>
              Pour les Locataires / Acheteurs
            </h2>
            <div class="grid gap-8">
              <div class="flex gap-6">
                <div class="text-4xl font-black text-blue-200 shrink-0">01</div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Recherche & Filtrage</h4>
                  <p class="text-gray-500">Explorez des milliers d'annonces vérifiées. Filtrez par budget, commodités et quartier pour trouver la perle rare.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="text-4xl font-black text-blue-200 shrink-0">02</div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Prise de Contact Directe</h4>
                  <p class="text-gray-500">Appelez l'agent ou envoyez un message WhatsApp en un clic pour organiser une visite immédiate.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="text-4xl font-black text-blue-200 shrink-0">03</div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Visite & Conclusion</h4>
                  <p class="text-gray-500">Visitez le bien avec nos experts. Nous vous accompagnons dans la lecture du contrat pour une signature sereine.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Propriétaire -->
          <div class="bg-[#190487] rounded-[3rem] p-10 shadow-xl text-white">
            <h2 class="text-3xl font-black mb-8 flex items-center gap-4">
              <span class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📢</span>
              Pour les Propriétaires / Agents
            </h2>
            <div class="grid gap-8">
              <div class="flex gap-6">
                <div class="text-4xl font-black text-white/20 shrink-0">01</div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Publication Gratuite</h4>
                  <p class="text-blue-100">Remplissez notre formulaire en 3 étapes. Ajoutez vos photos et descriptions détaillées.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="text-4xl font-black text-white/20 shrink-0">02</div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Vérification de l'Annonce</h4>
                  <p class="text-blue-100">Notre équipe examine votre annonce pour garantir sa qualité et sa véracité avant publication.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="text-4xl font-black text-white/20 shrink-0">03</div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Gestion des Contacts</h4>
                  <p class="text-blue-100">Recevez des appels et messages de prospects qualifiés directement sur votre tableau de bord.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HowItWorks {}
