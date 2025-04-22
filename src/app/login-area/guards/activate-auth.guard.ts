import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { UsersService } from '../../services/users.service';

export const activateAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const userService = inject(UsersService);
  const router = inject(Router);

  const userId = loginService.getUserID(); 

  if (!userId) {
    router.navigate(['/login']);
    return of(false); 
  }

  return userService.getUserById(userId).pipe(
    switchMap(user => {
      if (!user.enabled) {
        alert("Impossibile effettuare l'accesso: Utente disabilitato");
        router.navigate(['/login']);
        return of(false); 
      }

      const role = user.role;

      if (role === 'admin' && !state.url.startsWith('/dashboard')) {
        router.navigate(['/dashboard']);
        return of(false);
      }

      if (role === 'employee' && !state.url.startsWith('/employee-management')) {
        router.navigate(['/employee-management']);
        return of(false);
      }

      return of(true);
    })
  );
};