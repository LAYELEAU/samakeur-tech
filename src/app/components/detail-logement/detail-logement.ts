
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Logement } from '../../models/logement';
import { LogementService } from '../../services/logement.service';


@Component({
  selector: 'app-detail-logement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-logement.html',
  styleUrls: ['./detail-logement.css'],
})
export class DetailLogement implements OnInit {
  logementId: number | null = null;
  infologement: Logement | null = null;

  constructor(private route: ActivatedRoute, private logementService: LogementService) {}


 
 

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.logementId = id ? Number(id) : null;
    if (this.logementId !== null) {
      this.infologement = this.logementService.getById(this.logementId) ?? null;
    }
  }


}
