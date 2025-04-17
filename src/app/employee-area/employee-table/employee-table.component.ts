import { Component, inject, OnInit } from '@angular/core';
import { IStamp, Stamp } from '../../models/stamp';
import { StampService } from '../services/stamp.service';
import { Column, TableComponent } from '../../table/table.component';
import { LoginService } from '../../login-area/services/login.service';
import { FilterComponent } from '../../filter/filter.component';
import { IFilters } from '../../models/IFilter';
import { WorkedHoursService } from '../../services/worked-hours.service';




@Component({
  selector: 'app-employee-table',
  imports: [TableComponent, FilterComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {
  protected _logService = inject(LoginService);
  private _employeeService = inject(StampService);
  private _workedHoursService = inject(WorkedHoursService);

  public currentFilters: IFilters | null = null;


  public columns: Column<IStamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' },
    { key: 'workedHours', label: 'Ore lavorate', type: 'number' }
  ];

  public allRows: IStamp[] = [];


  ngOnInit(): void {
    const savedFilters = localStorage.getItem('employee-filters');
    if (savedFilters) {
      this.currentFilters = JSON.parse(savedFilters);
    }
  
    const currentUserID = this._logService.getUserID();
  
    this._employeeService.GetStamp().subscribe(response => {
      const userStamps = response.filter(stamp => stamp.userID === currentUserID);

      this.allRows = userStamps.map(stamp => ({...stamp, workedHours: this._workedHoursService.calculateWorkedHoursForUserOnDate( currentUserID!, new Date(stamp.date), userStamps)
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }


  onFiltersChanged(filters: IFilters) {
    console.log('FILTRI CAMBIATI:', filters);
    this.currentFilters = filters;
    localStorage.setItem('employee-filters', JSON.stringify(filters));
  }
  
   
}
