import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logement } from '../../models/logement';
import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-card-logement',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './card-logement.html',
  styleUrls: ['./card-logement.css'],
})
export class CardLogement {
  @Input() infologement!: Logement;// Ajout de l'annotation Input pour recevoir un logement en entrée

}
