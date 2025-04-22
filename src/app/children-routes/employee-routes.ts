import { Routes } from "@angular/router";
import { EmployeeIndexComponent } from "../index/employee-index/employee-index.component";
import { activateAuthGuard } from "../login-area/guards/activate-auth.guard";
import { unsavedStampGuard } from "../employee-area/guards/unsaved-stamp.guard";

export const EmployeeRoutes: Routes = [
    {
        path: 'employee-management', component: EmployeeIndexComponent, canActivateChild: [activateAuthGuard],
        children: [
            { path: '', loadComponent: () => import('../employee-area/employee-management/employee-management.component').then(c => c.EmployeeManagementComponent), canDeactivate: [unsavedStampGuard] },
            { path: 'employee-table', loadComponent: () => import('../employee-area/employee-table/employee-table.component').then(c => c.EmployeeTableComponent) },
            { path: 'stamping-details/:id/:username', loadComponent: () => import('../stamping-details/stamping-details.component').then(c => c.StampingDetailsComponent) },
        ]
    }
]  