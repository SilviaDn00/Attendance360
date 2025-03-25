import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const activateAuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)

  // if (loginService.getRole() === "employee" && state.url === "/dashboard") {  //state.url === "/dashboard"  verifica se l'utente sta cercando di navigare alla pagina "/dashboard".
  //   alert("non hai accesso a questa pagina");
  //   router.navigate(['/login']);
  //   return false;
  // }
  const role = loginService.getRole();

  if (role === 'admin' && state.url !== '/dashboard') {
    router.navigate(['/dashboard']);  // Admin deve andare a /dashboard
    return false;
  } else if (role === 'employee' && state.url !== '/employee-management') {
    router.navigate(['/employee-management']);  // Employee deve andare a /employee-area
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
