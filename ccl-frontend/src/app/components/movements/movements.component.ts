import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../constants/endpoint';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  // LISTA DONDE GUARDAREMOS LOS MOVIMIENTOS
  movimientos: any[] = [];

  // MENSAJE DE ERROR O INFORMACIÓN
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  // MÉTODO PARA CARGAR EL HISTORIAL DE MOVIMIENTOS DESDE EL BACKEND
  private cargarMovimientos(): void {
    this.http.get<any[]>(ENDPOINTS.movimiento).subscribe({
      next: (res) => {
        this.movimientos = res;
        if (res.length === 0) {
          this.mensaje = 'NO HAY MOVIMIENTOS REGISTRADOS';
        }
      },
      error: (err) => {
        console.error('ERROR AL CARGAR MOVIMIENTOS', err);
        this.mensaje = 'ERROR AL CARGAR MOVIMIENTOS';
      }
    });
  }
}
