import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logement } from '../../models/logement';


@Component({
  selector: 'app-card-logement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-logement.html',
  styleUrl: './card-logement.css',
})
export class CardLogement {
  @Input() infologement!: Logement;// Ajout de l'annotation Input pour recevoir un logement en entrée

}
