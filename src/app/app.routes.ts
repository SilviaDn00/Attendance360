import { Routes } from '@angular/router';
import { activateAuthGuard } from './login-area/guards/activate-auth.guard';
import { LoginComponent } from './login-area/login/login.component';
import { loginAuthGuard } from './login-area/guards/login-auth.guard';
import { LogoutComponent } from './login-area/logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },

  { path: '', loadChildren: () => import('./shared/attendance-routes').then(c => c.attendanceRoutes), canActivate: [activateAuthGuard] },

  { path: 'logout', component: LogoutComponent },


  { path: '**', redirectTo: '/login' },

];
