// frontend/src/layouts/Sidebar.tsx
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  userName: string;
  userRole: string;
}

interface MenuItem {
  label: string;
  to: string;
}

const repMenu: MenuItem[] = [
  { label: "Inicio", to: "/rep/home" },
  { label: "Dashboard", to: "/rep/dashboard" },
  { label: "Perfil", to: "/rep/profile" },
  { label: "Ofertas", to: "/rep/offers" },
  { label: "Aplicaciones", to: "/rep/applications" },
  { label: "Formación", to: "/rep/training" },
  { label: "Ajustes", to: "/rep/settings" },
];

const companyMenu: MenuItem[] = [
  { label: "Inicio", to: "/company/home" },
  { label: "Dashboard", to: "/company/dashboard" },
  { label: "Ofertas", to: "/company/jobs" },
  { label: "Aplicaciones", to: "/company/applications" },
  { label: "Ajustes", to: "/company/settings" },
];


export default function Sidebar({ userName, userRole }: SidebarProps) {
  const location = useLocation();

  const isCompany = location.pathname.startsWith("/company");
  const menu = isCompany ? companyMenu : repMenu;

  return (
    <aside className="w-56 bg-white border-r border-neutral-200 flex flex-col justify-between py-6">
      <div>
        {/* Logo + título */}
        <div className="px-5 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-black text-white flex items-center justify-center text-xs font-semibold">
            C
          </div>
          <div>
            <p className="text-xs font-semibold leading-tight">CapitalHub</p>
            <p className="text-[11px] text-neutral-500 leading-tight">
              {isCompany ? "Panel empresa" : "Panel comercial"}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="px-3 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block px-4 py-2.5 text-xs rounded-full transition",
                  isActive
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer usuario */}
      <div className="px-5 pt-4 border-t border-neutral-200">
        <p className="text-[11px] text-neutral-500 mb-1">Sesión iniciada</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium truncate max-w-[120px]">
              {userName}
            </p>
            <p className="text-[11px] text-neutral-500 truncate max-w-[120px]">
              {userRole}
            </p>
          </div>
          <button className="text-[11px] text-neutral-500 hover:text-neutral-900">
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
