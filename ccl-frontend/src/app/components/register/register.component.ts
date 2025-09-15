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
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // VARIABLES VINCULADAS AL FORMULARIO
  username: string = '';
  password: string = '';
  role: string = 'Users'; // POR DEFECTO SE ASIGNA EL ROL "Users"
  message: string = '';

  constructor(private authService: AuthService) {}

  // MÉTODO PARA REGISTRAR UN NUEVO USUARIO
  register() {
    const registerData: RegisterRequest = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    // LLAMAMOS AL SERVICIO QUE HACE LA PETICIÓN AL BACKEND
    this.authService.register(registerData).subscribe({
      next: (res: AuthResponse) => {
        // SI SE REGISTRA CORRECTAMENTE
        this.message = `Usuario ${res.username} registrado con rol ${res.role}`;
        // GUARDAMOS TOKEN Y ROL EN LOCALSTORAGE
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      },
      error: () => {
        // SI HAY ERROR EN EL REGISTRO
        this.message = 'No se pudo registrar el usuario, revisa los datos';
      }
    });
  }
}
