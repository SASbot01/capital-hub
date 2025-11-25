// frontend/src/api/auth.ts
import { apiClient } from "./client";

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  // si tu backend devuelve más (rol, email, etc.), se puede añadir
  role?: "REP" | "COMPANY" | "ADMIN";
}

export interface RegisterRepRequest {
  fullName: string;
  email: string;
  password: string;
  mainRole: "CLOSER" | "SETTER" | "COLD_CALLER" | "BOTH";
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  // Asumimos endpoint backend: POST /api/auth/login
  // Si en tu backend se llama distinto (/api/auth/authenticate, por ejemplo),
  // aquí es donde habría que cambiar la ruta.
  return apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
}

export async function registerRep(payload: RegisterRepRequest): Promise<void> {
  // Asumimos endpoint backend: POST /api/auth/register
  // Si el backend requiere más campos (ej: phone, country, etc.), se añaden aquí.
  await apiClient.post<void>("/auth/register", {
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password,
    mainRole: payload.mainRole,
    userType: "REP", // para que el backend sepa que es un comercial
  });
}
