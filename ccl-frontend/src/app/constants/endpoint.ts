// URL BASE DE TU BACKEND
export const API_BASE_URL = 'https://localhost:7006/api';
// ENDPOINTS AGRUPADOS EN UN OBJETO
export const ENDPOINTS = {
  // AUTENTICACIÓN
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,

  // PRODUCTOS
  inventario: `${API_BASE_URL}/productos/inventario`,
  movimiento: `${API_BASE_URL}/productos/movimiento`,

  // MOVIMIENTOS (SOLO ADMIN)
  movimientos: `${API_BASE_URL}/movements`
};
