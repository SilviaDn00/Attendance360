import { Routes } from '@angular/router';
import { activateAuthGuard } from './login-area/guards/activate-auth.guard';
import { LoginComponent } from './login-area/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: '', loadChildren: () => import('./attendance-routes').then(c => c.attendanceRoutes), canActivate: [activateAuthGuard], canDeactivate: [] },
];
