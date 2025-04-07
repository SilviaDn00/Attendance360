import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginAuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const role = loginService.getRole();
  const user = localStorage.getItem('id');

  if (user) {
    if (role === 'admin') {
      // Se è admin, reindirizza alla dashboard
      router.navigate(['/dashboard'])
      
    } else if (role === 'employee') {
      // Se è un employee, reindirizza a employee-management
      router.navigate(['/employee-management']);
    }

    // Blocca l'accesso alla pagina di login
    return false;
  }

  return true;
};
