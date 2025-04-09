import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../login-area/services/login.service';
import { Stamp, StampType } from '../../models/stamp';
import { Column, TableComponent } from '../../table/table.component';
import { StampService } from '../services/stamp.service';

@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule, TableComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss'
})
export class EmployeeManagementComponent implements OnInit {

  private _employeeService = inject(StampService);
  public formBuild = inject(FormBuilder);
  public logService = inject(LoginService);

  public stampFormGroup!: FormGroup;

  selected = '';

  ngOnInit(): void {
    // Imposta la data iniziale formattata
    this.stampFormGroup = this.formBuild.group({
      date: [new Date().toISOString().split('T')[0]],
      time: [0],
      type: [StampType],
    });

    this.rows = this.getLastFourStamps();
  }

  getLastFourStamps(): Stamp[] {
    return [...this._employeeService.listaStamp]
      .sort((a, b) => {
        const dateA = new Date(`${a.date}`);
        const dateB = new Date(`${b.date}`);
        return dateB.getTime() - dateA.getTime(); // Ordina dalla più recente
      })
      .slice(0, 4); // Prendi le prime 4
  }

onStamp() {
  if (this.stampFormGroup.valid) {
    const formValue = this.stampFormGroup.value;

    const newStamp: Stamp = {
      date: formValue.date,
      time: formValue.time,
      type: formValue.type
    };

    // Salviamo nel servizio
    this._employeeService.listaStamp.push(newStamp);

    // Aggiorniamo solo le righe visibili (4 più recenti)
    this.rows = this.getLastFourStamps();
  }
} 

  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  public rows: Stamp[] = this._employeeService.listaStamp;
}