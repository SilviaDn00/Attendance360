import { Routes } from '@angular/router';
import { activateAuthGuard } from '../login-area/guards/activate-auth.guard';
import { unsavedUserGuard } from '../admin-area/guards/unsaved-user.guard';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';

export const DashboardRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardIndexComponent, canActivateChild: [activateAuthGuard],
        children: [
            { path: '', loadComponent: () => import('../admin-area/dashboard/dashboard.component').then(c => c.DashboardComponent) },
            { path: 'admin-table', loadComponent: () => import('../admin-area/admin-table/admin-table.component').then(c => c.AdminTableComponent) },
            { path: 'team-management', loadComponent: () => import('../admin-area/team-management/team-management.component').then(c => c.TeamManagementComponent) },
            { path: 'employee-details/:id', loadComponent: () => import('../admin-area/employee-details/employee-details.component').then(c => c.EmployeeDetailsComponent) },
            { path: 'user-form/:id', loadComponent: () => import('../admin-area/user-form/user-form.component').then(c => c.UserFormComponent), canDeactivate: [unsavedUserGuard] },
            { path: 'user-form', loadComponent: () => import('../admin-area/user-form/user-form.component').then(c => c.UserFormComponent), canDeactivate: [unsavedUserGuard] },
            { path: 'stamping-details/:id', loadComponent: () => import('./stamping-details/stamping-details.component').then(c => c.StampingDetailsComponent) },
        ]
    }
]   