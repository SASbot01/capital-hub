import { useState, useMemo } from "react";
import Topbar from "../../layouts/Topbar";
import { useFetch } from "../../hooks/useFetch";
// import { Button } from "../../components/ui/Button"; // Si lo necesitas para acciones futuras

// Tipos coincidentes con ApplicationResponse.java
interface Application {
  id: number;
  jobTitle: string;     // Viene del DTO
  companyName: string;
  repFullName: string;  // Viene del DTO (antes era repName)
  status: "APPLIED" | "INTERVIEW" | "OFFER_SENT" | "HIRED" | "REJECTED" | "WITHDRAWN";
  createdAt: string;    // Fecha de aplicación
  matchScore?: number;  // Opcional (no lo tenemos en el backend aun)
}

// Mapeo de estados del Backend a etiquetas legibles
const STATUS_LABELS: Record<string, string> = {
  APPLIED: "Pendiente",
  INTERVIEW: "Entrevista",
  OFFER_SENT: "Oferta enviada",
  HIRED: "Contratado",
  REJECTED: "Descartado",
  WITHDRAWN: "Retirado",
};

const STATUS_STYLES: Record<string, string> = {
  APPLIED: "bg-neutral-100 text-neutral-700",
  INTERVIEW: "bg-blue-100 text-blue-700",
  OFFER_SENT: "bg-emerald-100 text-emerald-700",
  HIRED: "bg-green-100 text-green-800 ring-1 ring-green-600/20",
  REJECTED: "bg-red-50 text-red-700",
  WITHDRAWN: "bg-gray-100 text-gray-500",
};

export default function CompanyApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("TODAS");

  // 🟢 1. CONEXIÓN REAL AL BACKEND
  const { data: applications, isLoading, error, refetch } = useFetch<Application[]>(
    "/company/applications",
    true
  );

  // 🟢 2. Filtrado y Cálculo de Métricas
  const filtered = useMemo(() => {
    if (!applications) return [];
    if (statusFilter === "TODAS") return applications;
    return applications.filter((app) => app.status === statusFilter);
  }, [applications, statusFilter]);

  // Métricas calculadas en tiempo real
  const metrics = useMemo(() => {
    if (!applications) return { total: 0, interview: 0, hired: 0 };
    return {
      total: applications.length,
      interview: applications.filter(a => a.status === 'INTERVIEW').length,
      hired: applications.filter(a => a.status === 'HIRED').length
    };
  }, [applications]);

  if (isLoading) {
    return (
      <>
        <Topbar title="Candidaturas" subtitle="Cargando datos..." />
        <div className="py-20 text-center text-neutral-500">Cargando candidatos...</div>
      </>
    );
  }

  if (error) {
     return (
      <>
        <Topbar title="Candidaturas" subtitle="Error" />
        <div className="py-20 text-center text-red-500">
           <p>No se pudieron cargar las candidaturas.</p>
           <button onClick={refetch} className="underline mt-2">Reintentar</button>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6 mb-10">
      <Topbar
        title="Candidaturas"
        subtitle="Gestiona a los candidatos que se postulan a tus ofertas"
      />

      {/* KPIs REALES */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
           <p className="text-xs text-neutral-500 mb-1">Total Candidatos</p>
           <p className="text-2xl font-semibold">{metrics.total}</p>
        </div>
        <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
           <p className="text-xs text-neutral-500 mb-1">En Entrevista</p>
           <p className="text-2xl font-semibold">{metrics.interview}</p>
        </div>
        <div className="bg-white rounded-3xl px-5 py-4 border border-neutral-200">
           <p className="text-xs text-neutral-500 mb-1">Contratados</p>
           <p className="text-2xl font-semibold">{metrics.hired}</p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mt-2">
        <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1 shadow-sm overflow-x-auto">
          {["TODAS", "APPLIED", "INTERVIEW", "HIRED", "REJECTED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 text-xs rounded-full transition whitespace-nowrap ${
                statusFilter === status
                  ? "bg-black text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {status === "TODAS" ? "Todas" : STATUS_LABELS[status] || status}
            </button>
          ))}
        </div>
      </section>

      {/* LISTA DE APLICACIONES */}
      <section className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-neutral-900">Candidatos</h2>
          <span className="text-[11px] text-neutral-400">
            {filtered.length} resultados
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {filtered.map((app) => (
            <article
              key={app.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  {app.repFullName || "Candidato Anónimo"}
                </p>
                <p className="text-xs text-neutral-500">
                  Aplica a: <span className="font-medium">{app.jobTitle}</span>
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Fecha: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <span
                  className={`inline-flex px-3 py-1 text-[11px] font-medium rounded-full ${
                    STATUS_STYLES[app.status] || "bg-gray-100"
                  }`}
                >
                  {STATUS_LABELS[app.status] || app.status}
                </span>
                
                <button className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] text-neutral-700 hover:bg-neutral-50 transition">
                  Ver detalles
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-neutral-500">
              No hay candidaturas en este estado.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}