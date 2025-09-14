// Lo que envías al backend cuando registras un nuevo usuario
export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
}
