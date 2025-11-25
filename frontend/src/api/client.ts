// frontend/src/api/client.ts

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

export interface ApiError {
  status: number;
  message: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth: boolean = false
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Si la petición requiere auth, añadimos el token si existe
  if (auth) {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = "Error en la comunicación con el servidor";

    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // ignoramos error al parsear
    }

    const error: ApiError = {
      status: res.status,
      message,
    };
    throw error;
  }

  // Si no hay contenido (204, etc.)
  if (res.status === 204) {
    return {} as T;
  }

  return (await res.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, auth: boolean = false) =>
    request<T>(path, { method: "GET" }, auth),

  post: <T>(path: string, body?: any, auth: boolean = false) =>
    request<T>(
      path,
      {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      },
      auth
    ),

  put: <T>(path: string, body?: any, auth: boolean = false) =>
    request<T>(
      path,
      {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
      },
      auth
    ),
};
