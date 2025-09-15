// MODELO DE PRODUCTO EN ANGULAR
export interface Product {
  id: number;        // ID DEL PRODUCTO
  sku: string;       // CÓDIGO SKU
  name: string;      // NOMBRE DEL PRODUCTO
  stock: number;     // CANTIDAD ACTUAL EN INVENTARIO
  minStock?: number; // STOCK MÍNIMO (PUEDE SER OPCIONAL)
  active: boolean;   // SI EL PRODUCTO ESTÁ ACTIVO O NO
}
