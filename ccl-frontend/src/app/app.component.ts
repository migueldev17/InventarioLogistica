import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service'; // IMPORTAMOS EL SERVICIO

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTAMOS LOS COMPONENTES QUE USAREMOS EN EL TEMPLATE
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ccl-frontend';

  // CONSTRUCTOR DENTRO DE LA CLASE
  // INYECTAMOS EL SERVICIO Y EL ROUTER
  constructor(private authService: AuthService, private router: Router) {}
  // MÉTODO PARA HACER CERRAR SESIÓN
  logout() {
    // EJECUTAMOS EL LOGOUT Y LLEVAMOS AL LOGIN
    this.authService.logout();
    // REDIRIGIMOS AL LOGIN
    this.router.navigate(['/login']);
  }
}
