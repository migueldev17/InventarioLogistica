import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ENDPOINTS } from '../../constants/endpoint';
import { Product } from '../../models/producto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  productos: Product[] = [];
  mensaje: string = '';

  // Objeto para registrar movimientos
  movimiento = {
    productId: 0,
    cantidad: 0,
    type: 'IN',
    note: ''
  };

  // Usuario actual
  currentUser: string | null = null;
  role: string | null = null;

  // Lista de movimientos
  movimientos: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarInventario();

    this.currentUser = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    console.log(`Usuario actual: ${this.currentUser} - Rol: ${this.role}`);

    // Si es admin, cargar los movimientos
    if (this.role?.toLowerCase() === 'admin') {
      this.cargarMovimientos();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private cargarInventario(): void {
    this.http.get<Product[]>(ENDPOINTS.inventario).subscribe({
      next: (res) => {
        this.productos = res;
        if (!this.movimiento.productId && res.length) {
          this.movimiento.productId = res[0].id;
        }
      },
      error: (err) => {
        console.error('Error cargando inventario', err);
        this.mensaje = 'No se pudo cargar el inventario';
      }
    });
  }

  private cargarMovimientos(): void {
    this.http.get<any[]>(ENDPOINTS.movimientos).subscribe({
      next: (res) => {
        this.movimientos = res;
      },
      error: (err) => {
        console.error('Error cargando movimientos', err);
        this.mensaje = 'No se pudo cargar los movimientos';
      }
    });
  }

  registrarMovimiento(): void {
    if (!this.movimiento.productId || this.movimiento.cantidad <= 0) {
      this.mensaje = 'Debe seleccionar un producto y una cantidad mayor a cero';
      return;
    }

    this.http.post(ENDPOINTS.movimiento, this.movimiento).subscribe({
      next: () => {
        this.mensaje = 'Movimiento registrado correctamente';
        this.cargarInventario();
        const pid = this.movimiento.productId;
        this.movimiento = { productId: pid, cantidad: 0, type: 'IN', note: '' };

        if (this.role?.toLowerCase() === 'admin') {
          this.cargarMovimientos();
        }
      },
      error: (err) => {
        console.error('Error registrando movimiento', err);
        this.mensaje = err?.error ?? 'No se pudo registrar el movimiento';
      }
    });
  }
}
