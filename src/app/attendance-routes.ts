import { Routes } from '@angular/router';
import { AttendanceIndexComponent } from './attendance-index/attendance-index.component';
import { activateAuthGuard } from './login-area/guards/activate-auth.guard';
import { unsavedChangesGuard } from './employee-area/guards/unsaved-changes.guard';
import { TeamManagementComponent } from './admin-area/team-management/team-management.component';
import { EmployeeDetailsComponent } from './admin-area/employee-details/employee-details.component';

export const attendanceRoutes: Routes = [
  {
    path: '', component: AttendanceIndexComponent, canActivateChild: [activateAuthGuard],

    children: [
      { path: 'dashboard', loadComponent: () => import('./admin-area/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'employee-management', loadComponent: () => import('./employee-area/employee-management/employee-management.component').then(c => c.EmployeeManagementComponent), canDeactivate: [unsavedChangesGuard] },
      {path: 'dashboard/team-management', component: TeamManagementComponent},
      {path: 'dashboard/employee-details/:id', component: EmployeeDetailsComponent},


      { path: 'employee-management/employee-table', loadComponent: () => import('./employee-area/employee-table/employee-table.component').then(c => c.EmployeeTableComponent)},
      { path: 'dashboard/admin-table', loadComponent: () => import('./admin-area/admin-table/admin-table.component').then(c => c.AdminTableComponent)},

    ],
  },
];
