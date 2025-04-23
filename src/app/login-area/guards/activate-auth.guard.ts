import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { UsersService } from '../../shared/services/users.service';

export const activateAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const userService = inject(UsersService);
  const router = inject(Router);

  const userId = loginService.getUserID(); 

  if (!userId) {
    router.navigate(['/login']);
    return false; 
  }

  return userService.getUserById(userId).pipe(
    map(user => {
      if (!user.enabled) {
        alert("Impossibile effettuare l'accesso: Utente disabilitato");
        router.navigate(['/login']);
        return false; 
      }

      const role = user.role;

      if (role === 'admin' && !state.url.startsWith('/dashboard')) {
        router.navigate(['/dashboard']);
        return false;
      }

      if (role === 'employee' && !state.url.startsWith('/employee-management')) {
        router.navigate(['/employee-management']);
        return false;
      }

      return true;
    })
  );
};