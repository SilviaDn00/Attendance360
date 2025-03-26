import { Routes } from '@angular/router';
import { activateAuthGuard } from './login-area/guards/activate-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-area/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('./attendance-routes').then((c) => c.attendanceRoutes),
    canActivate: [activateAuthGuard],
    canDeactivate: [],
  },
];
