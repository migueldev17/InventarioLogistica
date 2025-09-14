import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { AuthResponse } from '../../models/auth-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // NECESARIO EN PROYECTOS STANDALONE
  imports: [CommonModule, FormsModule], // IMPORTAMOS MODULOS
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // OPCIONAL PARA ESTILOS
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  login() {
    const loginData: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      // RESPUESTA EXITOSA
      next: (res: AuthResponse) => {
        localStorage.setItem('token', res.token);
        this.message = `Bienvenido ${res.username}, rol asignado: ${res.role}`;
      },
      // ERROR EN LOGIN
      error: () => {
        this.message = 'Usuario o clave incorrectos, revisa bien compa';
      }
    });
  }
}
