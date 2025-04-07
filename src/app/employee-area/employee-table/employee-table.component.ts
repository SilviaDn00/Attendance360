import { Component, inject } from '@angular/core';
import { Stamp } from '../../models/stamp';
import { StampService } from '../services/stamp.service';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-employee-table',
  imports: [TableComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {

  private _employeeService = inject(StampService);


    public columns: { key: keyof Stamp, label: string }[] = [
      { key: 'date', label: 'Data' },
      { key: 'time', label: 'Orario' },
      { key: 'type', label: 'Tipo di timbratura' }
    ];
  
    public rows: Stamp[] = this._employeeService.listaStamp;
}
