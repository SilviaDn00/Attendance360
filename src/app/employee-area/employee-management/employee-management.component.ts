import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { StampService } from '../services/stamp.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Stamp, StampType } from '../../models/stamp';
import { AngularJSUrlCodec } from '@angular/common/upgrade';
import { TableComponent } from '../../table/table.component';
import { User } from '../../models/users';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../login-area/services/login.service';

@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule, TableComponent],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementComponent implements OnInit{

  private _employeeService = inject(StampService);
  public formBuild = inject(FormBuilder);
  public logService = inject(LoginService);


  public stampFormGroup!: FormGroup;

  selected = '';

  formattedDate = inject(DatePipe).transform(new Date(), 'yyyy-MM-dd')!;

  constructor() { }

  ngOnInit(): void {
    this.stampFormGroup = this.formBuild.group({
      date: [this.formattedDate],
      time: [0],
      type: [StampType],
    });
  }
  
  onStamp() {
    if (this.stampFormGroup.valid) {
      this._employeeService.PostStamp(this.stampFormGroup);
    }
  }

  public columns: { key: keyof Stamp, label: string }[] = [
    { key: 'date', label: 'Data' },
    { key: 'time', label: 'Orario' },
    { key: 'type', label: 'Tipo di timbratura' }
  ];

  public rows: Stamp[] = this._employeeService.listaStamp;

}
