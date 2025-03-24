import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AttendanceIndexComponent } from "./attendance-index/attendance-index.component";

export const attendanceRoutes: Routes = [
    {
        path: '', component: AttendanceIndexComponent,

        children: [
            {path: 'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)}
        ]
    }
]