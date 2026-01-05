import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,Navbar,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('samakeur-tech');
}
