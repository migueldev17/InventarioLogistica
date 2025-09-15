import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// GUARD PARA RESTRINGIR ACCESO SEGÚN EL ROL DEL USUARIO
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // OBTENEMOS EL ROL QUE LA RUTA REQUIERE (VIENE DESDE ROUTES)
  const expectedRole = route.data?.['role'];

  // REVISAMOS SI EL USUARIO ESTÁ LOGUEADO
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // SI NO SE CONFIGURÓ UN ROL ESPECÍFICO, PERMITIMOS EL ACCESO
  if (!expectedRole) {
    return true;
  }

  // VALIDAMOS EL ROL DEL USUARIO
  const userRole = authService.getRole();
  if (userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/dashboard']); // LO SACAMOS A UNA RUTA SEGURA
    return false;
  }
};
