// frontend/src/context/AuthContext.tsx (CORREGIDO)
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Importación de VALORES (funciones)
import { loadSession, saveSession, clearSession } from "../utils/session";
import { login as apiLogin, registerRep as apiRegisterRep } from "../api/auth"; 

// 2. Importación de TIPOS (interfaces)
import type { UserSession } from "../utils/session";
import type { LoginResponse, RegisterRepRequest } from "../api/auth";


// 1. Definición de la interfaz del Contexto
interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  role: UserSession["role"] | null;
  isLoading: boolean;
  // Los tipos de las promesas ya usan LoginResponse y RegisterRepRequest
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (payload: RegisterRepRequest) => Promise<LoginResponse>;
  logout: () => void;
}

// Estado inicial (no autenticado, cargando al inicio)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Proveedor del Contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar sesión inicial al cargar la aplicación
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setUser(session);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await apiLogin(email, password);
      // ✅ UserSession está importado como tipo
      const sessionData: UserSession = { email: response.email, role: response.role };
      
      saveSession(response); // Guarda el token en localStorage
      setUser(sessionData); // Actualiza el estado de React
      
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (payload: RegisterRepRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await apiRegisterRep(payload);
      // ✅ UserSession está importado como tipo
      const sessionData: UserSession = { email: response.email, role: response.role };
      
      saveSession(response); // Guarda el token en localStorage
      setUser(sessionData); // Actualiza el estado de React
      
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    role: user ? user.role : null,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  // 3. Renderizar el proveedor con el valor del contexto
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// 4. Custom Hook para usar el Contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};