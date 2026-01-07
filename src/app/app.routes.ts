import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DetailLogement } from './components/detail-logement/detail-logement';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'detail-logement/:id', component: DetailLogement },
  { path: '**', redirectTo: '' },
];


