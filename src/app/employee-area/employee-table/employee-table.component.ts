import { Component, inject, OnInit } from '@angular/core';
import { IStamp } from '../../shared/models/stamp.interface';
import { StampService } from '../services/stamp.service';
import { LoginService } from '../../login-area/services/login.service';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { IFilters } from '../../shared/models/filter.interface';
import { Column, TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-employee-table',
  imports: [TableComponent, FilterComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {
  protected _logService = inject(LoginService);
  private _employeeService = inject(StampService);

  public currentFilters: IFilters | null = null;

  public columns: Column<IStamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public allRows: IStamp[] = [];

  ngOnInit(): void {
    const savedFilters = localStorage.getItem('employee-filters');
    if (savedFilters) {
      this.currentFilters = JSON.parse(savedFilters);
    }

    const currentUserID = this._logService.getUserID();

    this._employeeService.GetStamp().subscribe(response => {
      this.allRows = response
        .filter(stamp => stamp.userID === currentUserID)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
    localStorage.setItem('employee-filters', JSON.stringify(filters));
  }
}
