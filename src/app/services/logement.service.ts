import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Logement } from '../models/logement';

@Injectable({ providedIn: 'root' })
export class LogementService {
  private supabase = inject(SupabaseService);
  logements = signal<Logement[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    this.fetchLogements();
  }

  async fetchLogements() {
    this.isLoading.set(true);
    const { data, error } = await this.supabase.client
      .from('logements')
      .select('*')
      .order('dateAjout', { ascending: false });

    this.isLoading.set(false);
    if (error) {
      console.error('Error fetching logements:', error);
    } else {
      this.logements.set(data as Logement[]);
    }
  }

  async uploadImage(file: File): Promise<string> {
    // Sanitize filename and create a clean path
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${Date.now()}_${sanitizedName}`;
    
    const { data, error } = await this.supabase.client.storage
      .from('logements')
      .upload(filePath, file);

    if (error) throw error;
    
    const { data: urlData } = this.supabase.client.storage
      .from('logements')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  }

  async addLogement(logement: Omit<Logement, 'id'>) {
    console.log('Sending to Supabase:', logement);
    const { error } = await this.supabase.client
      .from('logements')
      .insert(logement);

    if (error) {
      console.error('Supabase Error Details:', JSON.stringify(error, null, 2));
      throw error;
    }
    await this.fetchLogements(); 
  }

  async updateLogement(id: string, updatedLogement: Partial<Logement>) {
    const { error } = await this.supabase.client
      .from('logements')
      .update(updatedLogement)
      .eq('id', id);

    if (error) throw error;
    await this.fetchLogements();
  }

  async deleteLogement(id: string) {
    const { error } = await this.supabase.client
      .from('logements')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await this.fetchLogements();
  }

  async incrementViewCount(id: string) {
    const { data } = await this.supabase.client
      .from('logements')
      .select('views')
      .eq('id', id)
      .single();

    const currentViews = data?.views || 0;

    await this.supabase.client
      .from('logements')
      .update({ views: currentViews + 1 })
      .eq('id', id);
  }

  getById(id: string): Logement | undefined {
    return this.logements().find(l => String(l.id) === id);
  }

  getAll(): Logement[] {
    return this.logements();
  }

  getSupabaseClient() {
    return this.supabase.client;
  }
}
