// frontend/src/api/auth.ts
import { apiClient } from "./client";

// DTO del lado del Frontend para la respuesta de Login/Registro
export interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer"; // Añadido para coincidir con el backend
  email: string;
  role: "REP" | "COMPANY" | "ADMIN"; // Tipo de rol que devuelve el backend
}

// DTO para la petición de Registro (Adaptado al SignupRequest.java)
export interface RegisterRepRequest {
  firstName: string; // ✅ CORREGIDO: Usar firstName
  lastName: string;  // ✅ CORREGIDO: Usar lastName
  email: string;
  password: string;
  // mainRole y userType ya NO son necesarios, el backend asigna el rol 'REP' automáticamente
}

// ----------------------------------------------------------------------------------

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  // ✅ CORREGIDO: La ruta es /auth/login (el /api ya lo añade client.ts)
  return apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
}

// ✅ CORREGIDO: La función ahora devuelve el token (LoginResponse)
export async function registerRep(payload: RegisterRepRequest): Promise<LoginResponse> {
  
  // ✅ CORREGIDO: Endpoint correcto según el AuthController.java del backend
  const response = await apiClient.post<LoginResponse>("/auth/signup/rep", {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
    // Eliminamos 'mainRole' y 'userType' ya que el backend lo gestiona automáticamente al llamar a /signup/rep
  });

  return response;
}