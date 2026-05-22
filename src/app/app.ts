import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { DetailLogement } from './components/detail-logement/detail-logement';
import { AjouterLogement } from './components/ajouter-logement/ajouter-logement';
import { Footer } from './components/footer/footer';
import { RouterLink } from '@angular/router';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('samakeur-tech');
  notificationService = inject(NotificationService);
}
