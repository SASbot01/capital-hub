// frontend/src/pages/rep/RepSettingsPage.tsx
import Topbar from "../../layouts/Topbar";

export default function RepSettingsPage() {
  return (
    <div className="space-y-6 mb-10">
      <Topbar
        title="Configuración"
        subtitle="Gestiona tu cuenta, seguridad y preferencias"
      />

      {/* GRID PRINCIPAL */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* INFORMACIÓN PERSONAL */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-6">
          <h2 className="text-sm font-semibold mb-4 text-neutral-900">
            Información personal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Nombre
              </label>
              <input
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                defaultValue="Juan"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Apellidos
              </label>
              <input
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                defaultValue="Pérez"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                defaultValue="juan@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Teléfono
              </label>
              <input
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                defaultValue="+34 600 123 456"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                País
              </label>
              <input
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                defaultValue="España"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Zona horaria
              </label>
              <select className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50">
                <option>Europa/Madrid (CET)</option>
                <option>Europa/Lisboa (WET)</option>
                <option>América/Bogotá (COT)</option>
                <option>América/México_City (CST)</option>
              </select>
            </div>
          </div>

          <button className="mt-4 px-4 py-2 text-xs rounded-full bg-black text-white hover:bg-neutral-900 transition">
            Guardar cambios
          </button>
        </div>

        {/* SEGURIDAD + NOTIFICACIONES */}
        <div className="space-y-6">
          {/* SEGURIDAD */}
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-6">
            <h2 className="text-sm font-semibold mb-4 text-neutral-900">
              Seguridad
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
                />
              </div>
            </div>

            <button className="mt-4 px-4 py-2 text-xs rounded-full border border-neutral-200 text-neutral-800 hover:bg-neutral-50 transition">
              Actualizar contraseña
            </button>

            <p className="mt-3 text-[11px] text-neutral-400">
              En el MVP esta acción no cambia nada real todavía. Más adelante se
              conectará con el backend de seguridad de CapitalHub.
            </p>
          </div>

          {/* NOTIFICACIONES */}
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-6">
            <h2 className="text-sm font-semibold mb-3 text-neutral-900">
              Notificaciones
            </h2>
            <p className="text-[11px] text-neutral-500 mb-3">
              Configura qué tipo de emails quieres recibir. Más adelante esto
              también se sincronizará con la configuración real del backend.
            </p>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs">
                <span className="text-neutral-700">
                  Invitaciones de nuevas empresas
                </span>
                <input type="checkbox" defaultChecked className="accent-black" />
              </label>

              <label className="flex items-center justify-between text-xs">
                <span className="text-neutral-700">
                  Recordatorios de entrevistas
                </span>
                <input type="checkbox" defaultChecked className="accent-black" />
              </label>

              <label className="flex items-center justify-between text-xs">
                <span className="text-neutral-700">
                  Resumen semanal de actividad
                </span>
                <input type="checkbox" className="accent-black" />
              </label>

              <label className="flex items-center justify-between text-xs">
                <span className="text-neutral-700">
                  Novedades de formación y cursos
                </span>
                <input type="checkbox" className="accent-black" />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ZONA DE CUENTA / DESACTIVACIÓN (MVP SOLO VISUAL) */}
      <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
        <h2 className="text-sm font-semibold mb-2 text-neutral-900">
          Cuenta
        </h2>
        <p className="text-[11px] text-neutral-500 mb-3">
          En el futuro aquí podrás descargar tus datos, pausar tu cuenta o
          solicitar eliminación. En el MVP es solo una zona informativa.
        </p>
        <button className="px-4 py-2 text-xs rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition">
          Solicitar cierre de cuenta (placeholder)
        </button>
      </section>
    </div>
  );
}

