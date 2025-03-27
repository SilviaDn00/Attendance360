import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const activateAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const role = loginService.getRole();

  const router = inject(Router);

  if (role === 'admin' && state.url !== '/dashboard') {
    console.log(role);
    router.navigate(['/dashboard']); // Admin deve andare a /dashboard
    return false;
  } 
  else if (role === 'employee' && state.url !== '/employee-management') {
    console.log(role);
    router.navigate(['/employee-management']); // Employee deve andare a /employee-area
    return false;
  }

  if (loginService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
