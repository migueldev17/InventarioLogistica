import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // IMPORTAMOS EL SERVICIO

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ccl-frontend';
  role: string | null = null;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // LEER EL ESTADO INICIAL DESDE LOCALSTORAGE
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!localStorage.getItem('token');

    // SI IMPLEMENTAMOS authStatus$ en AuthService, ESCUCHAMOS CAMBIOS
    if ((this.authService as any).authStatus$) {
      (this.authService as any).authStatus$.subscribe((status: boolean) => {
        this.isLoggedIn = status;
        this.role = localStorage.getItem('role');
      });
    }
  }

  // MÉTODO PARA CERRAR SESIÓN
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.role = null;
    this.router.navigate(['/login']);
  }
}
