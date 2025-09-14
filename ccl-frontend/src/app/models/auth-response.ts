// Respuesta que devuelve el backend cuando haces login o register
export interface AuthResponse {
  token: string;       // Token JWT firmado
  username: string;    // Nombre de usuario autenticado
  role: string;        // Rol asignado (admin, user, etc.)
  expiresAt: string;   // Fecha de expiración del token
}
