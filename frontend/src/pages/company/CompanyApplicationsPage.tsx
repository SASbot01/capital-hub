import Topbar from "../../layouts/Topbar";

type ApplicationStatus = "nuevo" | "entrevista" | "oferta" | "rechazado";

interface Application {
  id: number;
  repName: string;
  role: "closer" | "setter" | "cold_caller";
  offerTitle: string;
  appliedAt: string;
  status: ApplicationStatus;
  notes?: string;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  nuevo: "Nuevo",
  entrevista: "Entrevista",
  oferta: "Oferta enviada",
  rechazado: "Rechazado",
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  nuevo: "bg-neutral-100 text-neutral-700",
  entrevista: "bg-blue-100 text-blue-700",
  oferta: "bg-emerald-100 text-emerald-700",
  rechazado: "bg-red-100 text-red-700",
};

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    repName: "Juan Pérez",
    role: "closer",
    offerTitle: "Closer para lanzamientos evergreen",
    appliedAt: "12 Nov 2025",
    status: "entrevista",
    notes: "Buena experiencia en high ticket.",
  },
  {
    id: 2,
    repName: "Ana García",
    role: "setter",
    offerTitle: "Setter remoto para agencia SMMA",
    appliedAt: "10 Nov 2025",
    status: "nuevo",
  },
  {
    id: 3,
    repName: "Carlos López",
    role: "cold_caller",
    offerTitle: "Cold caller mercado UK",
    appliedAt: "08 Nov 2025",
    status: "oferta",
    notes: "Oferta enviada, pendiente de firma.",
  },
  {
    id: 4,
    repName: "Lucía Romero",
    role: "closer",
    offerTitle: "Closer + seguimiento en funnels",
    appliedAt: "05 Nov 2025",
    status: "rechazado",
    notes: "No encaja con el rango de ticket.",
  },
];

export default function CompanyApplicationsPage() {
  // En el MVP son datos mock; más adelante aquí conectaremos con la API.
  const total = MOCK_APPLICATIONS.length;
  const interviews = MOCK_APPLICATIONS.filter(
    (a) => a.status === "entrevista"
  ).length;
  const offers = MOCK_APPLICATIONS.filter((a) => a.status === "oferta").length;
  const rejected = MOCK_APPLICATIONS.filter(
    (a) => a.status === "rechazado"
  ).length;

  return (
    <>
      <Topbar
        title="Candidaturas"
        subtitle="Seguimiento de los reps que han aplicado a tus ofertas"
      />

      <div className="space-y-6">
        {/* Resumen de métricas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-1">Candidaturas totales</p>
            <p className="text-2xl font-semibold">{total}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Últimos 30 días
            </p>
          </div>

          <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-1">Entrevistas</p>
            <p className="text-2xl font-semibold">{interviews}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Programadas o realizadas
            </p>
          </div>

          <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-1">Ofertas enviadas</p>
            <p className="text-2xl font-semibold">{offers}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Pendientes de firma
            </p>
          </div>

          <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-1">Rechazados</p>
            <p className="text-2xl font-semibold">{rejected}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Incluye descartes de empresa
            </p>
          </div>
        </section>

        {/* Lista de aplicaciones */}
        <section className="bg-white rounded-3xl border border-neutral-200">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Historial de aplicaciones</h2>
              <p className="text-xs text-neutral-500 mt-1">
                Reps que han aplicado a tus distintos puestos.
              </p>
            </div>
            {/* Filtro simple para el MVP */}
            <button
              type="button"
              className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 transition"
            >
              Filtros (MVP)
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {MOCK_APPLICATIONS.map((app) => (
              <div
                key={app.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium">{app.repName}</p>
                  <p className="text-xs text-neutral-500">
                    {app.role === "closer"
                      ? "Closer"
                      : app.role === "setter"
                      ? "Setter"
                      : "Cold caller"}{" "}
                    · {app.offerTitle}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Aplicó el {app.appliedAt}
                  </p>
                  {app.notes && (
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Nota interna: {app.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <span
                    className={`inline-flex px-3 py-1 text-[11px] font-medium rounded-full ${STATUS_STYLES[app.status]}`}
                  >
                    {STATUS_LABELS[app.status]}
                  </span>

                  <button
                    type="button"
                    className="text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-2"
                  >
                    Ver perfil
                  </button>
                </div>
              </div>
            ))}

            {MOCK_APPLICATIONS.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-neutral-500">
                Aún no has recibido candidaturas. Cuando publiques ofertas,
                aparecerán aquí los reps interesados.
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
