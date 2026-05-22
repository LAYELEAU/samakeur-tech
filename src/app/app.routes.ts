import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'detail-logement/:id', loadComponent: () => import('./components/detail-logement/detail-logement').then(m => m.DetailLogement) },
  { path: 'ajouter-logement', loadComponent: () => import('./components/ajouter-logement/ajouter-logement').then(m => m.AjouterLogement), canActivate: [authGuard] },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard] },
  { path: 'comment-ca-marche', loadComponent: () => import('./components/how-it-works/how-it-works').then(m => m.HowItWorks) },
  { path: 'aide-faq', loadComponent: () => import('./components/help-faq/help-faq').then(m => m.HelpFaq) },
  { path: '**', redirectTo: '' },
];


