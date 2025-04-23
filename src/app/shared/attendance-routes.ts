import { Routes } from '@angular/router';
import { AttendanceIndexComponent } from './attendance-index/attendance-index.component';
import { activateAuthGuard } from '../login-area/guards/activate-auth.guard';

export const attendanceRoutes: Routes = [
  {
    path: '', component: AttendanceIndexComponent, canActivateChild: [activateAuthGuard],

    children: [
      { path: '', loadChildren: () => import('../admin-area/dashboard-routes').then(c => c.DashboardRoutes), canActivate: [activateAuthGuard] },
      { path: '', loadChildren: () => import('../employee-area/employee-routes').then(c => c.EmployeeRoutes), canActivate: [activateAuthGuard] },
    ],
  },

];
