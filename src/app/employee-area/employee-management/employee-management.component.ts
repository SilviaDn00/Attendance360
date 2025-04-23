import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../login-area/services/login.service';
import { Stamp, StampType } from '../../shared/models/stamp';
import { StampService } from '../services/stamp.service';
import { CommonModule } from '@angular/common';
import { TodayStampsPipe } from '../../shared/pipes/today-stamps.pipe';
import { Column, TableComponent } from '../../shared/table/table.component';


@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule, TableComponent, CommonModule, TodayStampsPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss'
})
export class EmployeeManagementComponent implements OnInit {

  private _employeeService = inject(StampService);
  public formBuild = inject(FormBuilder);
  public logService = inject(LoginService);

  public stampFormGroup!: FormGroup;
  public rows: Stamp[] = [];

  public columns: Column<Stamp>[] = [
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'time', label: 'Orario', type: 'string' },
    { key: 'type', label: 'Tipo di timbratura', type: 'string' }
  ];

  ngOnInit(): void {
    this.stampFormGroup = this.formBuild.group({
      date: [new Date().toISOString().split('T')[0]],
      time: [0],
      type: [StampType],
      userID: [this.logService.getUserID()]
    });

    this.loadStamps();
  }

  loadStamps() {
    const currentUserID = this.logService.getUserID();

    this._employeeService.GetStamp().subscribe(response => {
      this.rows = response
        .filter(stamp => stamp.userID === currentUserID)
    });
  }

  onStamp() {
    if (this.stampFormGroup.valid) {
      const newStamp: Stamp = this.stampFormGroup.value;

      this._employeeService.PostStamp(newStamp).subscribe(() => {
        this.loadStamps();
      });
    }
  }

  hourOptions: string[] = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

}
