import { Component, inject, OnInit } from '@angular/core';
import { IStamp } from '../../shared/models/stamp.interface';
import { StampService } from '../services/stamp.service';
import { LoginService } from '../../login-area/services/login.service';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { IFilters } from '../../shared/models/filter.interface';
import { Column, TableComponent } from '../../shared/components/table/table.component';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-employee-table',
  imports: [TableComponent, FilterComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {
  
  public allRows: IStamp[] = [];

  public readonly columns: Column<IStamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public currentFilters: IFilters | null = null;

  protected readonly _logService = inject(LoginService);

  private readonly _employeeService = inject(StampService);

  private readonly _filterService = inject(FilterService);

  public ngOnInit(): void {

    const currentUserID = this._logService.getUserID();

    this._employeeService.GetStamp().subscribe(response => {
      this.allRows = response
        .filter(stamp => stamp.userID === currentUserID)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    this.restoreSavedFilters();
  }

  public onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
    this._filterService.saveFilters(filters);
  }

  private restoreSavedFilters(): void {
    this.currentFilters = this._filterService.loadFilters();
  }
}
