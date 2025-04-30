import { Component, inject, OnInit } from '@angular/core';
import { Column, TableComponent } from '../../shared/components/table/table.component';
import { IEnrichedStamp } from '../../shared/models/enrichedStamp.interface';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { IFilters } from '../../shared/models/filter.interface';
import { Router, RouterLink } from '@angular/router';
import { EnrichedStampService } from '../services/enriched-stamp.service';
import { CommandService } from '../services/commands.service';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-admin-table',
  imports: [TableComponent, FilterComponent, RouterLink],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent implements OnInit {

  private _router = inject(Router);
  private _enrichedStampService = inject(EnrichedStampService);
  private _filterService = inject(FilterService);

  public currentFilters: IFilters | null = null;

  public columns: Column<IEnrichedStamp>[] = [
    { key: 'username', label: 'Dipendente', type: 'string' },
    { key: 'department', label: 'Reparto', type: 'string' },
    { key: 'role', label: 'Ruolo', type: 'string' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo', type: 'stampType' },
    { key: 'button', label: 'Azione', type: 'button' },
  ];

  public rows: IEnrichedStamp[] = [];

  constructor() {
    const commandService = inject(CommandService);

    commandService.registerCommand('navigateToStampDetails', {
      icon: 'bi bi-person-vcard-fill',
      action: (stamp: IEnrichedStamp) => this.navigateToStampDetails(stamp.id!, stamp.username!),
      family: 'stamp'
    });
  }

  public ngOnInit(): void {
    this.restoreSavedFilters();
    this.loadData();
  }

  private loadData(): void {
    this._enrichedStampService.getEnrichedStamps().subscribe((enrichedStamps: IEnrichedStamp[]) => {
      this.rows = enrichedStamps.map(stamp => ({
        ...stamp
      }));
    });
  }

  public navigateToStampDetails(id: string, username: string): void {
    this._router.navigate([`/dashboard/stamping-details/${id}`]);
  }


  public onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
    this._filterService.saveFilters(filters);
  }
  

  private restoreSavedFilters(): void {
    this.currentFilters = this._filterService.loadFilters();
  }
  
}
