// CompanyJobsPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import Topbar from "../../layouts/Topbar";


type Role = "closer" | "setter" | "cold_caller" | "both";
type Status = "Activa" | "Pausada" | "Cerrada";

interface Job {
  id: number;
  title: string;
  role: Role;
  status: Status;
  location: string;
  model: string; // Fijo + variable, Solo variable, etc.
  salaryHint: string;
  applicationsCount: number;
  createdAt: string;
  callTool: "calendly" | "zoom" | "whatsapp";
  callLink: string;
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Closer para lanzamientos evergreen",
    role: "closer",
    status: "Activa",
    location: "Remoto · Europa",
    model: "Solo variable",
    salaryHint: "15% comisión · ticket 2.000 €",
    applicationsCount: 18,
    createdAt: "10 Nov 2025",
    callTool: "calendly",
    callLink: "https://calendly.com/demo-capitalhub/30min",
  },
  {
    id: 2,
    title: "Setter para funnels fríos",
    role: "setter",
    status: "Activa",
    location: "Remoto · Latam / España",
    model: "Fijo + variable",
    salaryHint: "1.000 €/mes + bonus show-up",
    applicationsCount: 23,
    createdAt: "08 Nov 2025",
    callTool: "zoom",
    callLink: "https://zoom.us",
  },
  {
    id: 3,
    title: "Cold Caller / SDR para prospección",
    role: "cold_caller",
    status: "Pausada",
    location: "Remoto",
    model: "Fijo + variable",
    salaryHint: "900 €/mes + bonus",
    applicationsCount: 9,
    createdAt: "01 Nov 2025",
    callTool: "whatsapp",
    callLink: "https://wa.me/34600111222",
  },
];

const roleLabel = (role: Role) => {
  if (role === "closer") return "Closer";
  if (role === "setter") return "Setter";
  if (role === "cold_caller") return "Cold Caller / SDR";
  return "Setter + Closer";
};

const statusPill = (status: Status) => {
  if (status === "Activa") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-700 border border-emerald-100">
        {status}
      </span>
    );
  }
  if (status === "Pausada") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-[11px] font-medium text-amber-700 border border-amber-100">
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

export default function CompanyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<Role>("closer");
  const [location, setLocation] = useState("Remoto");
  const [model, setModel] = useState("Solo variable");
  const [salaryHint, setSalaryHint] = useState("");
  const [callTool, setCallTool] = useState<"calendly" | "zoom" | "whatsapp">(
    "calendly"
  );
  const [callLink, setCallLink] = useState("");

  const handleCreateJob = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newJob: Job = {
      id: jobs.length + 1,
      title: title.trim(),
      role,
      status: "Activa",
      location: location.trim() || "Remoto",
      model: model.trim(),
      salaryHint: salaryHint.trim() || "A definir en la llamada",
      applicationsCount: 0,
      createdAt: new Date().toLocaleDateString("es-ES"),
      callTool,
      callLink: callLink.trim() || "https://calendly.com",
    };

    setJobs((prev) => [newJob, ...prev]);

    // Reset formulario
    setTitle("");
    setRole("closer");
    setLocation("Remoto");
    setModel("Solo variable");
    setSalaryHint("");
    setCallTool("calendly");
    setCallLink("");
  };

  const handleToggleStatus = (id: number) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== id) return job;
        if (job.status === "Activa") return { ...job, status: "Pausada" };
        if (job.status === "Pausada") return { ...job, status: "Cerrada" };
        return { ...job, status: "Activa" };
      })
    );
  };

  return (
    <div className="space-y-6 mb-10">
      <Topbar
        title="Ofertas"
        subtitle="Publica y gestiona tus ofertas para setters, closers y cold callers"
      />

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
        {/* LISTA DE OFERTAS */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Ofertas publicadas
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Puedes pausar o cerrar una oferta en cualquier momento. En el
                MVP estos datos son locales (mock).
              </p>
            </div>
            <span className="text-[11px] text-neutral-400">
              Total: {jobs.length}
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {job.title}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {roleLabel(job.role)} · {job.location}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {job.model} · {job.salaryHint}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Publicada el {job.createdAt} · {job.applicationsCount}{" "}
                    aplicaciones
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {statusPill(job.status)}
                  <button
                    className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] text-neutral-700 hover:bg-neutral-50 transition"
                    onClick={() => handleToggleStatus(job.id)}
                  >
                    Cambiar estado
                  </button>
                  <button className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] text-neutral-700 hover:bg-neutral-50 transition">
                    Ver aplicaciones
                  </button>
                </div>
              </article>
            ))}

            {jobs.length === 0 && (
              <div className="py-8 text-center text-sm text-neutral-500">
                Todavía no has publicado ninguna oferta. Crea la primera desde
                el panel de la derecha.
              </div>
            )}
          </div>
        </div>

        {/* FORMULARIO CREAR OFERTA */}
        <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 mb-2">
            Crear nueva oferta
          </h2>
          <p className="text-xs text-neutral-500 mb-4">
            Este formulario sigue la lógica de Closify, adaptado a CapitalHub:
            rol, condiciones y enlace para agendar entrevista.
          </p>

          <form className="space-y-3" onSubmit={handleCreateJob}>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Título de la oferta
              </label>
              <input
                className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                placeholder="Ej: Closer para lanzamientos evergreen high-ticket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Rol buscado
                </label>
                <select
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="closer">Closer</option>
                  <option value="setter">Setter</option>
                  <option value="cold_caller">Cold Caller / SDR</option>
                  <option value="both">Setter + Closer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Ubicación / modalidad
                </label>
                <input
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  placeholder="Remoto · Europa / Latam, etc."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Modelo de pago
                </label>
                <select
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option>Solo variable</option>
                  <option>Fijo + variable</option>
                  <option>Fee por cierre</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 mb-1">
                  Detalle económico
                </label>
                <input
                  className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  placeholder="Ej: 15% comisión · ticket 2.000 €"
                  value={salaryHint}
                  onChange={(e) => setSalaryHint(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">
                Herramienta para agendar entrevistas
              </label>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setCallTool("calendly")}
                  className={`rounded-2xl border px-3 py-1.5 ${
                    callTool === "calendly"
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-700 bg-neutral-50"
                  }`}
                >
                  Calendly
                </button>
                <button
                  type="button"
                  onClick={() => setCallTool("zoom")}
                  className={`rounded-2xl border px-3 py-1.5 ${
                    callTool === "zoom"
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-700 bg-neutral-50"
                  }`}
                >
                  Zoom
                </button>
                <button
                  type="button"
                  onClick={() => setCallTool("whatsapp")}
                  className={`rounded-2xl border px-3 py-1.5 ${
                    callTool === "whatsapp"
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-700 bg-neutral-50"
                  }`}
                >
                  WhatsApp
                </button>
              </div>
              <input
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-3 py-2 text-xs bg-neutral-50 outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                placeholder="Pega aquí el enlace a Calendly / Zoom / WhatsApp"
                value={callLink}
                onChange={(e) => setCallLink(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-black text-white text-xs py-2 hover:bg-neutral-900 transition"
            >
              Publicar oferta
            </button>

            <p className="text-[11px] text-neutral-400 mt-2">
              En el MVP, las ofertas se guardan solo en memoria del navegador.
              Más adelante se conectará con el backend y el sistema de matching
              de CapitalHub.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
