import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  productos: any[] = []; // LISTA DONDE GUARDAREMOS LOS PRODUCTOS

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // AL INICIAR EL COMPONENTE, BUSCAMOS EL TOKEN EN LOCALSTORAGE
    const token = localStorage.getItem('token');
    if (token) {
      // AGREGAMOS EL TOKEN EN EL HEADER PARA AUTENTICAR LA PETICIÓN
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // LLAMAMOS AL BACKEND PARA TRAER LOS PRODUCTOS PROTEGIDOS
      this.http.get<any[]>('http://localhost:5062/api/Productos', { headers })
        .subscribe({
          next: (res) => this.productos = res,  // SI SALE BIEN, GUARDAMOS EL RESULTADO
          error: (err) => console.error('ERROR CARGANDO PRODUCTOS', err) // SI FALLA, MOSTRAMOS EL ERROR EN CONSOLA
        });
    }
  }
}
