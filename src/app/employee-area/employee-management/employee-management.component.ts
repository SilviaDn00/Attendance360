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

@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule, TableComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementComponent implements OnInit{

  private _employeeService = inject(StampService);

  public formBuild = inject(FormBuilder);


  stampFormGroup: FormGroup;

  selected = '';

  constructor() {
    this.stampFormGroup = this.formBuild.group({
      data: [''],
      time: [''],
      type: [''],
    });
  }
  ngOnInit(): void {
    this._employeeService.GetStamp();
    console.log(this._employeeService.listaStamp);
    
  }

  onStamp() {
    if (this.stampFormGroup.value.data && this.stampFormGroup.value.type) {
      this._employeeService.PostStamp(this.stampFormGroup.value);
      this._employeeService.GetStamp();
    }
  }

  public columns: { key: keyof Stamp, label: string }[] = [
    { key: 'date', label: 'Data' },
    { key: 'time', label: 'Orario' },
    { key: 'type', label: 'Tipo di timbratura' }
  ];

  // public rows : { data: Stamp }[] = [
  //   { data: this._employeeService.listaStamp[0] },
  //   { data: this._employeeService.listaStamp[1] },
  //   // { data: this._employeeService.listaStamp[2] }
  // ];

  public rows: Stamp[] = this._employeeService.listaStamp;
  
}
