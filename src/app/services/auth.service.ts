import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  user = signal<User | null>(null);

  constructor() {
    this.supabase.client.auth.getSession().then(({ data }) => {
      this.user.set(data.session?.user || null);
    });

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user || null);
    });
  }

  async loginWithGoogle() {
    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  }

  async loginWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async registerWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async logout() {
    await this.supabase.client.auth.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.user();
  }
}
