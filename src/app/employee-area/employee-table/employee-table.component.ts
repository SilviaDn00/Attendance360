import { Component, inject } from '@angular/core';
import { Stamp } from '../../models/stamp';
import { StampService } from '../services/stamp.service';
import { Column, TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-employee-table',
  imports: [TableComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {

  private _employeeService = inject(StampService);

  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];
  
  public rows: Stamp[] = this._employeeService.listaStamp;
}
