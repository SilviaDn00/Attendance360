import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule, TableComponent, CommonModule],
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
      date: [new Date().toISOString().split('T')[0], [ Validators.required]],
      time: [0, [ Validators.required]],
      type: [StampType, [ Validators.required]],
      userID: [this.logService.getUserID(), [ Validators.required]]
    });

    this.loadStamps();
    console.log(this.logService.getUsername());
    console.log(this.logService.getUserID());
    
  }

  loadStamps() {
    const currentUserID = this.logService.getUserID();
  
    this._employeeService.GetStamp().subscribe(response => {
      this.rows = response
        .filter(stamp => stamp.userID === currentUserID) 
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        .slice(0, 4);
    });
  }

  onStamp() {
    if (this.stampFormGroup.valid) {
      const newStamp: Stamp = this.stampFormGroup.value;

      this._employeeService.PostStamp(newStamp).subscribe(() => {
        this.loadStamps(); // Ricarica le 4 timbrature dopo aver salvato
      });
    }
  }
  
}
