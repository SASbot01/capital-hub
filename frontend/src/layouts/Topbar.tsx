import { useNavigate } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
// 🟢 Importamos el hook useAuth
import { useAuth } from "../context/AuthContext"; 

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  // 🟢 Obtenemos el usuario y la función logout del contexto
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };
  
  // 🟡 Adaptamos la información mostrada para reflejar el estado real
  const userFullName = user ? user.email.split('@')[0] : "Invitado";
  const userRole = user ? user.role : "Desconocido";

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {/* Mostramos la info solo si el usuario existe */}
        {user && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium">
                {/* 🟢 Mostramos la primera parte del email como nombre de usuario */}
                {userFullName}
            </span>
            <span className="text-[11px] text-neutral-500">
                {/* 🟢 Mostramos el rol del backend (REP, COMPANY, ADMIN) */}
                {userRole}
            </span>
          </div>
        )}
        
        {/* Avatar siempre se muestra (usando iniciales, asumiendo que el componente Avatar lo soporta) */}
        <Avatar initials={userFullName.substring(0, 2).toUpperCase()} />
        
        {/* 🟢 Botón de Cerrar Sesión (solo visible si hay sesión) */}
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition"
            title="Cerrar Sesión"
          >
            {/* Usamos un ícono o solo el texto para el botón de logout */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h6a1 1 0 110 2H4v14h14v-6a1 1 0 112 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h6a1 1 0 110 2H4v14h14V4h-6a1 1 0 110-2h6a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M16 10a1 1 0 01-1 1H7.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 011 1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
