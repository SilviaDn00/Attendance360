import { Routes } from "@angular/router";
import { EmployeeIndexComponent } from "./employee-index/employee-index.component";
import { activateAuthGuard } from "../login-area/guards/activate-auth.guard";
import { unsavedStampGuard } from "./guards/unsaved-stamp.guard";

export const EmployeeRoutes: Routes = [
    {
        path: 'employee-management', component: EmployeeIndexComponent, canActivateChild: [activateAuthGuard],
        children: [
            { path: '', loadComponent: () => import('./employee-management/employee-management.component').then(c => c.EmployeeManagementComponent), canDeactivate: [unsavedStampGuard] },
            { path: 'employee-table', loadComponent: () => import('./employee-table/employee-table.component').then(c => c.EmployeeTableComponent) },
            { path: 'stamping-details/:id/:username', loadComponent: () => import('../admin-area/stamping-details/stamping-details.component').then(c => c.StampingDetailsComponent) },
        ]
    }
]  