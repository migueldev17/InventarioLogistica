import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ENDPOINTS } from '../../constants/endpoint';
import { Product } from '../../models/producto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // LISTA DE PRODUCTOS
    productos: Product[] = [];

    // MENSAJE PARA MOSTRAR ESTADO AL USUARIO (ÉXITO O ERROR)
    mensaje: string = '';

    movimiento ={
    productId: 0,    // ID DEL PRODUCTO
    cantidad: 0,     // CANTIDAD DEL MOVIMIENTO
    type: 'IN',      // "IN" PARA ENTRADA O "OUT" PARA SALIDA
    note: ''         // OPCIONAL: UNA NOTA DEL MOVIMIENTO
    }

  constructor(private http: HttpClient) {}

  // CARGA INICIAL DEL INVENTARIO
  ngOnInit(): void {
    this.cargarInventario();
  }
   // MÉTODO PARA TRAER EL INVENTARIO DESDE EL BACKEND
  private cargarInventario(): void {
    // NO AGREGAMOS HEADERS AQUÍ; EL INTERCEPTOR JWT YA INYECTA EL TOKEN
    this.http.get<Product[]>(ENDPOINTS.inventario).subscribe({
      next: (res) => {
        this.productos = res;                           // GUARDAMOS EL INVENTARIO
        if (!this.movimiento.productId && res.length) { // PRESELECCIONAMOS UN PRODUCTO SI APLICA
          this.movimiento.productId = res[0].id;
        }
      },
      error: (err) => {
        console.error('ERROR CARGANDO INVENTARIO', err);
        this.mensaje = 'NO SE PUDO CARGAR EL INVENTARIO';
      }
    });
  }

  // MÉTODO PARA ENVIAR UN MOVIMIENTO DE ENTRADA/SALIDA
  registrarMovimiento(): void {
    // VALIDACIÓN BÁSICA EN CLIENTE
    if (!this.movimiento.productId || this.movimiento.cantidad <= 0) {
      this.mensaje = 'DEBE SELECCIONAR UN PRODUCTO Y UNA CANTIDAD MAYOR A CERO';
      return;
    }

    this.http.post(ENDPOINTS.movimiento, this.movimiento).subscribe({
      next: (res) => {
        this.mensaje = 'MOVIMIENTO REGISTRADO CORRECTAMENTE';
        // RECARGAMOS INVENTARIO PARA REFLEJAR EL NUEVO STOCK
        this.cargarInventario();
        // LIMPIAMOS EL FORMULARIO (MANTENIENDO EL PRODUCTO SELECCIONADO)
        const pid = this.movimiento.productId;
        this.movimiento = { productId: pid, cantidad: 0, type: 'IN', note: '' };
      },
      error: (err) => {
        console.error('ERROR REGISTRANDO MOVIMIENTO', err);
        this.mensaje = err?.error ?? 'NO SE PUDO REGISTRAR EL MOVIMIENTO';
      }
    });
  }
}
