// frontend/src/pages/company/CompanyApplicationsPage.tsx
import { useState } from "react";
import Topbar from "../../layouts/Topbar";

type ApplicationStatus = "Pendiente" | "Entrevista" | "Contratado" | "Descartado";

interface Application {
  id: number;
  repName: string;
  role: "Closer" | "Setter" | "Cold Caller / SDR";
  jobTitle: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore: number; // 0–100
}

const allApplications: Application[] = [
  {
    id: 1,
    repName: "Juan Pérez",
    role: "Closer",
    jobTitle: "Closer para lanzamientos evergreen",
    status: "Entrevista",
    appliedAt: "15 Nov 2025",
    matchScore: 92,
  },
  {
    id: 2,
    repName: "Laura Sánchez",
    role: "Setter",
    jobTitle: "Setter para funnels fríos",
    status: "Pendiente",
    appliedAt: "14 Nov 2025",
    matchScore: 81,
  },
  {
    id: 3,
    repName: "Marco Silva",
    role: "Closer",
    jobTitle: "Closer + seguimiento de clientes",
    status: "Contratado",
    appliedAt: "12 Nov 2025",
    matchScore: 88,
  },
  {
    id: 4,
    repName: "Ana Gómez",
    role: "Cold Caller / SDR",
    jobTitle: "Cold Caller / SDR para prospección",
    status: "Pendiente",
    appliedAt: "11 Nov 2025",
    matchScore: 76,
  },
];

const statusPill = (status: ApplicationStatus) => {
  if (status === "Contratado") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-700 border border-emerald-100">
        {status}
      </span>
    );
  }
  if (status === "Entrevista") {
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

export default function CompanyApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "Todas">(
    "Todas"
  );

  const filtered = allApplications.filter((app) =>
    statusFilter === "Todas" ? true : app.status === statusFilter
  );

  return (
    <div className="space-y-6 mb-10">
      <Topbar
        title="Aplicaciones"
        subtitle="Gestiona a los candidatos que se postulan a tus ofertas"
      />

      {/* FILTROS */}
      <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mt-2">
        <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1 shadow-sm">
          {["Todas", "Pendiente", "Entrevista", "Contratado", "Descartado"].map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setStatusFilter(status as ApplicationStatus | "Todas")
                }
                className={`px-4 py-1.5 text-xs rounded-full transition ${
                  statusFilter === status
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <p className="text-[11px] text-neutral-500">
          En el futuro podrás filtrar también por oferta, rol y rango de
          puntuación de match.
        </p>
      </section>

      {/* LISTA DE APLICACIONES */}
      <section className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">
              Candidatos
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Vista simplificada de las aplicaciones a tus ofertas activas.
            </p>
          </div>
          <span className="text-[11px] text-neutral-400">
            Mostrando {filtered.length} de {allApplications.length}
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
                  {app.repName}
                </p>
                <p className="text-xs text-neutral-500">
                  {app.role} · {app.jobTitle}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Aplicó el {app.appliedAt}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-[11px] text-neutral-400">Match</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {app.matchScore}%
                  </p>
                </div>
                {statusPill(app.status)}
                <button className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] text-neutral-700 hover:bg-neutral-50 transition">
                  Ver perfil
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-neutral-500">
              No hay aplicaciones con este estado todavía.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

