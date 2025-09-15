import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// INTERCEPTOR FUNCIONAL QUE AGREGA EL TOKEN Y MANEJA ERRORES 401
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  // TOMAMOS EL TOKEN DEL LOCALSTORAGE
  const token = localStorage.getItem('token');

  // SI EXISTE, CLONAMOS LA REQUEST Y LE AGREGAMOS EL HEADER
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // PASAMOS LA REQUEST Y CAPTURAMOS ERRORES
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // TOKEN INVÁLIDO O EXPIRADO
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
