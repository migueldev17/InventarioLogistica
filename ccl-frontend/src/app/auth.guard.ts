import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // REVISAMOS SI EXISTE TOKEN EN LOCALSTORAGE
    const token = localStorage.getItem('token');

    if (token) {
      return true; // SI EXISTE, DEJAMOS PASAR
    } else {
      // SI NO HAY TOKEN, REDIRIGIMOS AL LOGIN
      this.router.navigate(['/login']);
      return false;
    }
  }
}
