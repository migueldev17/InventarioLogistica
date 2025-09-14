// Modelo para manejar productos en el inventario
export interface Producto {
  id: number;           // ID único del producto
  nombre: string;       // Nombre del producto
  descripcion: string;  // Descripción breve
  precio: number;       // Precio unitario
  stock: number;        // Cantidad disponible
}


