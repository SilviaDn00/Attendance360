import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const activateAuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)

  if (loginService.getRole() === "employee" && state.url === "/dashboard") {
    alert("non hai accesso a questa pagina");
    router.navigate(['/login']);
    return false;
  }

  if (loginService.isLoggedIn()) {
    return true;
  }

  else {
    router.navigate(['/login']);
    return false;
  }
};
