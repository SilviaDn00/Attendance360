import { Routes } from '@angular/router';
import { AttendanceIndexComponent } from '../index/attendance-index/attendance-index.component';
import { activateAuthGuard } from '../login-area/guards/activate-auth.guard';

export const attendanceRoutes: Routes = [
  {
    path: '', component: AttendanceIndexComponent, canActivateChild: [activateAuthGuard],

    children: [
      { path: '', loadChildren: () => import('./dashboard-routes').then(c => c.DashboardRoutes), canActivate: [activateAuthGuard]},
      { path: '', loadChildren: () => import('./employee-routes').then(c => c.EmployeeRoutes), canActivate: [activateAuthGuard]},
    ],
  },
];
