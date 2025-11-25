import Topbar from "../../layouts/Topbar";
import StatCard from "../../components/ui/StatCard";

interface StatItem {
  label: string;
  value: string;
  hint: string;
}

interface ProcessItem {
  company: string;
  role: string;
  status: string;
}

interface ActivityItem {
  label: string;
  value: string;
  hint: string;
}

const STATS: StatItem[] = [
  {
    label: "Llamadas este mes",
    value: "124",
    hint: "+18 vs mes anterior",
  },
  {
    label: "Cierres",
    value: "32",
    hint: "Tasa de cierre 25.8%",
  },
  {
    label: "Ticket medio",
    value: "1.250 €",
    hint: "Solo contratos cerrados",
  },
  {
    label: "Comisión estimada",
    value: "3.480 €",
    hint: "Pendiente de confirmar por empresa",
  },
];

const PROCESOS: ProcessItem[] = [
  {
    company: "Agency Growth",
    role: "Setter remoto",
    status: "Entrevista agendada",
  },
  {
    company: "Digital Funnels Pro",
    role: "Closer + seguimiento",
    status: "Aplicado",
  },
];

const ACTIVIDAD: ActivityItem[] = [
  {
    label: "Llamadas esta semana",
    value: "38",
    hint: "Objetivo: 45",
  },
  {
    label: "Reuniones agendadas",
    value: "12",
    hint: "+3 vs semana pasada",
  },
  {
    label: "Ofertas enviadas",
    value: "9",
    hint: "5 pendientes de respuesta",
  },
];

export default function RepDashboardPage() {
  return (
    <>
      {/* Barra superior */}
      <Topbar
        title="Dashboard"
        subtitle="Resumen de tu actividad como closer / setter"
      />

      <div className="space-y-6">
        {/* MÉTRICAS PRINCIPALES */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              hint={s.hint}
            />
          ))}
        </section>

        {/* BLOQUE CENTRAL: PROCESOS + ACTIVIDAD */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Procesos en curso */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-200 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold">Procesos en curso</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Seguimiento rápido de tus oportunidades activas.
                </p>
              </div>

              <button
                type="button"
                className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 transition"
              >
                Ver todas las aplicaciones
              </button>
            </div>

            <div className="space-y-3">
              {PROCESOS.map((p) => (
                <div
                  key={p.company}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 bg-neutral-50/60"
                >
                  <div>
                    <p className="text-sm font-medium">{p.company}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {p.role}
                    </p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-black text-white">
                    {p.status}
                  </span>
                </div>
              ))}

              {PROCESOS.length === 0 && (
                <p className="text-xs text-neutral-500 text-center py-6">
                  No tienes procesos activos. Cuando apliques a nuevos puestos,
                  aparecerán aquí.
                </p>
              )}
            </div>
          </div>

          {/* Actividad semanal */}
          <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 flex flex-col">
            <h2 className="text-sm font-semibold mb-1">
              Actividad de esta semana
            </h2>
            <p className="text-xs text-neutral-500 mb-4">
              Mini resumen operativo de tus números.
            </p>

            <div className="space-y-3 mb-4">
              {ACTIVIDAD.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-2.5"
                >
                  <div>
                    <p className="text-xs text-neutral-500">{a.label}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {a.hint}
                    </p>
                  </div>
                  <p className="text-base font-semibold">{a.value}</p>
                </div>
              ))}
            </div>

            {/* Placeholder gráfico (futuro charts) */}
            <div className="mt-auto">
              <div className="text-[11px] text-neutral-500 mb-2">
                Ritmo semanal (placeholder)
              </div>
              <div className="h-24 rounded-2xl bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center text-[11px] text-neutral-400">
                Aquí iremos poniendo gráficos reales en siguientes fases
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE INFERIOR: RECOMENDACIONES / TIPS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Empresas recomendadas (placeholder MVP) */}
          <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5">
            <h2 className="text-sm font-semibold">Empresas recomendadas</h2>
            <p className="text-xs text-neutral-500 mb-4 mt-1">
              Pronto añadiremos matching real según tu perfil y resultados.
            </p>

            <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/60 px-4 py-6 text-xs text-neutral-500">
              Este bloque será tu radar de oportunidades: empresas que encajan
              con tu experiencia, ticket medio y tasas de cierre.
            </div>
          </div>

          {/* Tips de mejora / formación */}
          <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5">
            <h2 className="text-sm font-semibold">Siguiente paso recomendado</h2>
            <p className="text-xs text-neutral-500 mb-4 mt-1">
              Micro-acciones para mejorar tus resultados cada semana.
            </p>

            <ul className="space-y-3 text-xs text-neutral-600">
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                Revisa 3 llamadas recientes y anota patrones de objeciones.
              </li>
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                Mejora tu ratio de shows enviando un recordatorio 2h antes de
                cada llamada.
              </li>
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                Mira una lección de formación sobre manejo de objeciones de
                precio.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
