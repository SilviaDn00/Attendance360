import { Component, inject, OnInit } from '@angular/core';
import { Stamp } from '../../models/stamp';
import { StampService } from '../services/stamp.service';
import { Column, TableComponent } from '../../table/table.component';
import { LoginService } from '../../login-area/services/login.service';
import { FilterComponent } from '../../filter/filter.component';
import { IFilters } from '../../models/IFilter';




@Component({
  selector: 'app-employee-table',
  imports: [TableComponent, FilterComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {
  loginService = inject(LoginService);
  private _employeeService = inject(StampService);
  public currentFilters: IFilters | null = null;


  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public allRows: Stamp[] = [];


  ngOnInit(): void {
    const currentUserID = this.loginService.getUserID();

    this._employeeService.GetStamp().subscribe(response => {
      this.allRows = response
        .filter(stamp => stamp.userID === currentUserID)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  onFiltersChanged(filters: IFilters) {
    this.currentFilters = filters;
  } 
}
