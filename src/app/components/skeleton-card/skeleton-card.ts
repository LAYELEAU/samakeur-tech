import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-2xl bg-white shadow-lg overflow-hidden animate-pulse">
      <!-- Image Skeleton -->
      <div class="h-72 bg-gray-200"></div>
      <!-- Content Skeleton -->
      <div class="p-6 space-y-4">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="flex justify-between items-center pt-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  `
})
export class SkeletonCard {}
