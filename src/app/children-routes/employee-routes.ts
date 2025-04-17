import { Routes } from "@angular/router";
import { EmployeeIndexComponent } from "../index/employee-index/employee-index.component";
import { activateAuthGuard } from "../login-area/guards/activate-auth.guard";
import { unsavedChangesGuard } from "../employee-area/guards/unsaved-changes.guard";

export const EmployeeRoutes: Routes = [
    {
        path: 'employee-management', component: EmployeeIndexComponent, canActivateChild: [activateAuthGuard],
        children: [
            { path: '', loadComponent: () => import('../employee-area/employee-management/employee-management.component').then(c => c.EmployeeManagementComponent), canDeactivate: [unsavedChangesGuard] },
            { path: 'employee-table', loadComponent: () => import('../employee-area/employee-table/employee-table.component').then(c => c.EmployeeTableComponent) },
            { path: 'stamping-details/:id', loadComponent: () => import('../stamping-details/stamping-details.component').then(c => c.StampingDetailsComponent) },
        ]
    }
]  