import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { AuthResponse } from '../../models/auth-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  template: `<h1>REGISTRO USUARIO</h1>`
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'Users'; // Por defecto lo dejamos en "Users"
  message: string = '';

  constructor(private authService: AuthService) {}

  register() {
    const registerData: RegisterRequest = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.authService.register(registerData).subscribe({
      next: (res: AuthResponse) => {
        this.message = `Usuario ${res.username} registrado con rol ${res.role}`;
      },
      error: () => {
        this.message = 'No se pudo registrar el usuario, revisa los datos';
      }
    });
  }
}
