import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// GUARD PARA PROTEGER RUTAS QUE REQUIEREN TOKEN
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // BUSCAMOS EL TOKEN EN LOCALSTORAGE
  const token = localStorage.getItem('token');

  if (token) {
    // SI EXISTE, SE DEJA PASAR
    return true;
  } else {
    // SI NO HAY TOKEN, REDIRIGIMOS AL LOGIN
    router.navigate(['/login']);
    return false;
  }
};
