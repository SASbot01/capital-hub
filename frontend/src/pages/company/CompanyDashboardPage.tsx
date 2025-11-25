// frontend/src/pages/company/CompanyDashboardPage.tsx
import Topbar from "../../layouts/Topbar";
import StatCard from "../../components/ui/StatCard";

interface PipelineStep {
  label: string;
  value: number;
  total: number;
}

interface RecentHire {
  name: string;
  role: string;
  startDate: string;
  status: "Activo" | "Prueba" | "Finalizado";
}

interface RecentApplication {
  repName: string;
  role: string;
  jobTitle: string;
  status: "Pendiente" | "Entrevista" | "Contratado" | "Descartado";
  appliedAt: string;
}

export default function CompanyDashboardPage() {
  // Datos mock para MVP — luego vendrán del backend
  const kpis = [
    {
      label: "Lanzamientos activos",
      value: "3",
      hint: "Evergreen + lanzamientos puntuales",
    },
    {
      label: "Comerciales activos",
      value: "7",
      hint: "Entre setters y closers",
    },
    {
      label: "Entrevistas esta semana",
      value: "12",
      hint: "Incluye re-agendadas",
    },
    {
      label: "Contrataciones este mes",
      value: "4",
      hint: "En periodo de prueba",
    },
  ];

  const projectedRevenue = "82.500 €";
  const confirmedRevenue = "46.300 €";

  const pipeline: PipelineStep[] = [
    { label: "Leads recibidos", value: 420, total: 420 },
    { label: "Llamadas agendadas", value: 180, total: 420 },
    { label: "Llamadas realizadas", value: 150, total: 180 },
    { label: "Ofertas enviadas", value: 60, total: 150 },
    { label: "Cierres", value: 28, total: 60 },
  ];

  const recentHires: RecentHire[] = [
    {
      name: "Ana Gómez",
      role: "Closer Evergreen",
      startDate: "01 Nov 2025",
      status: "Activo",
    },
    {
      name: "Carlos Ruiz",
      role: "Setter SDR",
      startDate: "15 Oct 2025",
      status: "Prueba",
    },
    {
      name: "María López",
      role: "Closer High Ticket",
      startDate: "20 Sep 2025",
      status: "Finalizado",
    },
  ];

  const recentApplications: RecentApplication[] = [
    {
      repName: "Juan Pérez",
      role: "Closer",
      jobTitle: "Closer para evergreen high-ticket",
      status: "Entrevista",
      appliedAt: "15 Nov 2025",
    },
    {
      repName: "Laura Sánchez",
      role: "Setter",
      jobTitle: "Setter remoto para funnels fríos",
      status: "Pendiente",
      appliedAt: "14 Nov 2025",
    },
    {
      repName: "Marco Silva",
      role: "Closer",
      jobTitle: "Closer + seguimiento de clientes",
      status: "Contratado",
      appliedAt: "12 Nov 2025",
    },
  ];

  const statusPill = (status: RecentHire["status"] | RecentApplication["status"]) => {
    if (status === "Activo" || status === "Contratado") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-700 border border-emerald-100">
          {status}
        </span>
      );
    }
    if (status === "Prueba" || status === "Entrevista") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-[11px] font-medium text-amber-700 border border-amber-100">
          {status}
        </span>
      );
    }
    if (status === "Pendiente") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-700 border border-neutral-200">
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-50 text-[11px] font-medium text-neutral-500 border border-neutral-200">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 mb-10">
      <Topbar
        title="Dashboard empresa"
        subtitle="Resumen de tus lanzamientos, equipo de ventas y aplicaciones"
      />

      {/* KPIs PRINCIPALES */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            hint={kpi.hint}
          />
        ))}
      </section>

      {/* INGRESOS + PIPELINE */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
        {/* INGRESOS */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 mb-1.5">
              Ingresos proyectados vs confirmados
            </h2>
            <p className="text-xs text-neutral-500 mb-4">
              Datos agregados de tus lanzamientos activos en CapitalHub (MVP
              simulado).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] text-neutral-500 mb-1">
                Ingresos proyectados (mensual)
              </p>
              <div className="flex items-center justify-between mb-1">
                <p className="text-lg font-semibold text-neutral-900">
                  {projectedRevenue}
                </p>
                <span className="text-[11px] text-neutral-500">
                  Basado en tu funnel actual
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full bg-neutral-900" style={{ width: "100%" }} />
              </div>
            </div>

            <div>
              <p className="text-[11px] text-neutral-500 mb-1">
                Ingresos confirmados (mensual)
              </p>
              <div className="flex items-center justify-between mb-1">
                <p className="text-lg font-semibold text-neutral-900">
                  {confirmedRevenue}
                </p>
                <span className="text-[11px] text-neutral-500">
                  Actualizados a esta semana
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-neutral-900"
                  style={{ width: "56%" }} // ejemplo visual
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-neutral-400">
            Más adelante conectaremos estos datos con tu CRM y los contratos
            reales cerrados por tu equipo.
          </p>
        </div>

        {/* PIPELINE RESUMIDO */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1.5">
            Funnel de ventas (resumen)
          </h2>
          <p className="text-xs text-neutral-500 mb-4">
            Vista simplificada de tu funnel actual. Perfecto para explicar el
            contexto a nuevos closers y setters.
          </p>

          <div className="space-y-3">
            {pipeline.map((step) => {
              const ratio =
                step.total > 0 ? Math.round((step.value / step.total) * 100) : 0;
              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-neutral-700">{step.label}</p>
                    <p className="text-[11px] text-neutral-500">
                      {step.value} · {ratio}%
                    </p>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-neutral-900"
                      style={{ width: `${Math.min(ratio, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTRATACIONES RECIENTES + APLICACIONES RECIENTES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CONTRATACIONES */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Contrataciones recientes
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Setters y closers que han empezado a trabajar contigo.
              </p>
            </div>
            <button className="text-[11px] text-neutral-500 hover:text-neutral-900">
              Ver equipo completo
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentHires.map((hire, index) => (
              <div
                key={hire.name + index}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {hire.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {hire.role} · Inicio {hire.startDate}
                  </p>
                </div>
                <div>{statusPill(hire.status)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* APLICACIONES RECIENTES */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Aplicaciones recientes
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Comerciales que se han postulado a tus ofertas.
              </p>
            </div>
            <button className="text-[11px] text-neutral-500 hover:text-neutral-900">
              Ver todas las aplicaciones
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentApplications.map((app, index) => (
              <div
                key={app.repName + index}
                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">
                    {app.repName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {app.role} · {app.jobTitle}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Aplicado el {app.appliedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  {statusPill(app.status)}
                  <button className="text-[11px] px-3 py-1 rounded-full border border-neutral-200 hover:bg-neutral-50">
                    Ver perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

