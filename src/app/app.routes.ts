import { Routes } from '@angular/router';
import { activateAuthGuard } from './login-area/guards/activate-auth.guard';
import { LoginComponent } from './login-area/login/login.component';
import { loginAuthGuard } from './login-area/guards/login-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },

  { path: '', loadChildren: () => import('./children-routes/attendance-routes').then(c => c.attendanceRoutes), canActivate: [activateAuthGuard]},

  { path: '**', redirectTo: '/login' },
  
];
