import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { RegisterRequest } from '../models/register-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // MÉTODO PARA HACER LOGIN
  login(data: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data);
  }

  // MÉTODO PARA HACER REGISTRO
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data);
  }

  // MÉTODO PARA HACER LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // MÉTODO NUEVO: REVISAMOS SI HAY TOKEN EN LOCALSTORAGE
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // DEVUELVE TRUE SI EXISTE EL TOKEN
  }

  // MÉTODO NUEVO: OBTENEMOS EL ROL DEL USUARIO
  getRole(): string | null {
    return localStorage.getItem('role'); // EL ROL LO GUARDAMOS CUANDO SE HACE LOGIN
  }
}
