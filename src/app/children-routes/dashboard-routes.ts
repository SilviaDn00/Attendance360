import { Routes } from '@angular/router';
import { DashboardIndexComponent } from '../index/dashboard-index/dashboard-index.component';
import { activateAuthGuard } from '../login-area/guards/activate-auth.guard';

export const DashboardRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardIndexComponent, canActivateChild: [activateAuthGuard],
        children: [
            { path: '', loadComponent: () => import('../admin-area/dashboard/dashboard.component').then(c => c.DashboardComponent) },
            { path: 'admin-table', loadComponent: () => import('../admin-area/admin-table/admin-table.component').then(c => c.AdminTableComponent) },
            { path: 'team-management', loadComponent: () => import('../admin-area/team-management/team-management.component').then(c => c.TeamManagementComponent) },
            { path: 'employee-details/:id', loadComponent: () => import('../admin-area/employee-details/employee-details.component').then(c => c.EmployeeDetailsComponent) },
            { path: 'user-form/:id', loadComponent: () => import('../admin-area/user-form/user-form.component').then(c => c.UserFormComponent) },
            { path: 'user-form', loadComponent: () => import('../admin-area/user-form/user-form.component').then(c => c.UserFormComponent) },
            { path: 'stamping-details/:id/:username', loadComponent: () => import('../stamping-details/stamping-details.component').then(c => c.StampingDetailsComponent) },
        ]
    }
]   