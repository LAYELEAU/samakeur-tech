import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);

  const { data } = await supabase.client.auth.getUser();
  
  if (data.user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
