// src/app/services/filter.service.ts

import { Injectable } from '@angular/core';
import { IFilters } from '../../shared/models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly storageKey = 'admin-filters';

  constructor() {}

  public saveFilters(filters: IFilters): void {
    localStorage.setItem(this.storageKey, JSON.stringify(filters));
  }

  public loadFilters(): IFilters | null {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return null;

    const parsed: IFilters = JSON.parse(saved);
    return {
      start: parsed.start ? new Date(parsed.start) : null,
      end: parsed.end ? new Date(parsed.end) : null,
      type: parsed.type ?? null,
    };
  }
}
