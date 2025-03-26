import { Component } from '@angular/core';
import { DashboardComponent } from '../admin-area/dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-attendance-index',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './attendance-index.component.html',
  styleUrl: './attendance-index.component.scss',
})
export class AttendanceIndexComponent {}
