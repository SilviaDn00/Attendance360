import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const activateAuthGuard: CanActivateFn = (route, state) => {

  console.log("Guardia attivata per", state.url);

  const loginService = inject(LoginService);
  const router = inject(Router);

  // Recupera il ruolo dell'utente
  const role = loginService.getRole();
  console.log("Ruolo dell'utente:", role);

  // Se l'utente è admin e non è già su /dashboard, lo reindirizziamo a /dashboard
  if (role === 'admin') {
    if (!state.url.startsWith('/dashboard')) {
      console.log("Admin non su /dashboard, lo reindirizzo");
      router.navigate(['/dashboard']);  // Admin deve andare su /dashboard
      return false;  // Blocca l'accesso a qualsiasi altra rotta
    }
  }

  // Se l'utente è employee e non è già su /employee-management, lo reindirizziamo a /employee-management
  else if (role === 'employee') {
    if (!state.url.startsWith('/employee-management')) {
      console.log("Employee non su /employee-management, lo reindirizzo");
      router.navigate(['/employee-management']);  // Employee deve andare su /employee-management
      return false;  // Blocca l'accesso a qualsiasi altra rotta
    }
  }



  // Se l'utente è loggato e ha il ruolo corretto, permettiamo l'accesso alla rotta
  return true;
};