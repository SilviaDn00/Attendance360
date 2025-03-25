import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-attendance-index',
  imports: [DashboardComponent, NavbarComponent],
  templateUrl: './attendance-index.component.html',
  styleUrl: './attendance-index.component.scss'
})
export class AttendanceIndexComponent {

}
