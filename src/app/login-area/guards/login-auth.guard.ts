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
      router.navigate(['/dashboard'])
      
    } else if (role === 'employee') {
      router.navigate(['/employee-management']);
    }

    // se il ruolo non è admin o employee, reindirizza alla pagina di login
    return false;
  }

  return true;
};
