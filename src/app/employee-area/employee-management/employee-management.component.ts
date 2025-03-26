import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-employee-management',
  imports: [MatRadioModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementComponent {

}

