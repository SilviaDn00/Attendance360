import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const activateAuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)

  if (loginService.getRole() === "employee" && state.url === "/dashboard") {  //state.url === "/dashboard"  verifica se l'utente sta cercando di navigare alla pagina "/dashboard".
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
