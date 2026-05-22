import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isDarkMode = false;
  mobileMenuOpen = signal(false);
  authService = inject(AuthService);

  constructor() {
    this.checkInitialTheme();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v: boolean) => !v);
    this.applyScrollLock();
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    this.applyScrollLock();
  }

  private applyScrollLock() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : 'auto';
    }
  }

  checkInitialTheme() {
    if (typeof window !== 'undefined') {
      this.isDarkMode =
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.applyTheme();
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    this.applyTheme();
  }

  applyTheme() {
    if (typeof document !== 'undefined') {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
