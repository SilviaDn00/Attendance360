import { Routes } from '@angular/router';
import { AttendanceIndexComponent } from './attendance-index/attendance-index.component';

export const attendanceRoutes: Routes = [
  {
    path: '',
    component: AttendanceIndexComponent,

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin-area/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'employee-management',
        loadComponent: () =>
          import(
            './employee-area/employee-management/employee-management.component'
          ).then((c) => c.EmployeeManagementComponent),
      },
    ],
  },
];
