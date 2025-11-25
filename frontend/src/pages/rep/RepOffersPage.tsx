// frontend/src/pages/rep/RepOffersPage.tsx
import { useState } from "react";
import Topbar from "../../layouts/Topbar";

type RoleFilter = "all" | "closer" | "setter" | "cold_caller";

interface JobOffer {
  id: number;
  title: string;
  company: string;
  role: "closer" | "setter" | "both" | "cold_caller";
  model: string; // Ej: "Fijo + variable", "Solo variable"
  salaryHint: string;
  type: string; // Remoto, híbrido...
  description: string;
  callTool: "calendly" | "zoom" | "whatsapp";
  callLink: string;
}

const mockOffers: JobOffer[] = [
  {
    id: 1,
    title: "Closer para lanzamientos evergreen",
    company: "Growth Labs",
    role: "closer",
    model: "Solo variable",
    salaryHint: "Comisión 15% · ticket medio 2.000 €",
    type: "Remoto · Europa",
    description:
      "Buscamos closer con experiencia en programas de alto ticket en modelo evergreen. CRM: Close / HubSpot. Scripts y training incluidos.",
    callTool: "calendly",
    callLink: "https://calendly.com/demo-capitalhub/30min",
  },
  {
    id: 2,
    title: "Setter para funnels en frío",
    company: "ScaleUp Media",
    role: "setter",
    model: "Fijo + variable",
    salaryHint: "1.000 €/mes + bonos por show-up",
    type: "Remoto · Latam / España",
    description:
      "Rol 100% setter: contacto en frío, seguimientos y reactivación de leads dormidos. Se valora experiencia previa con llamadas en español neutro.",
    callTool: "zoom",
    callLink: "https://zoom.us",
  },
  {
    id: 3,
    title: "Setter & Closer para agencia boutique",
    company: "Digital Funnels Pro",
    role: "both",
    model: "Solo variable",
    salaryHint: "Comisión combinada · ticket 1.500–3.000 €",
    type: "Remoto · Horario flexible",
    description:
      "Buscamos perfil híbrido que pueda pre-clasificar leads y cerrar en llamada. Ideal para alguien que quiera crecer a Head of Sales.",
    callTool: "whatsapp",
    callLink: "https://wa.me/34600111222",
  },
  {
    id: 4,
    title: "Cold Caller / SDR para campañas de prospección",
    company: "Outbound Heroes",
    role: "cold_caller",
    model: "Fijo + variable",
    salaryHint: "900 €/mes + bonus por llamadas efectivas",
    type: "Remoto · España / Latam",
    description:
      "Buscamos Cold Caller / SDR para generar primeras oportunidades y alimentar el pipeline de closers. Trabajarás con listas, guiones y CRM ya preparados.",
    callTool: "calendly",
    callLink: "https://calendly.com/demo-capitalhub/15min",
  },
];

export default function RepOffersPage() {
  // En el futuro este rol vendrá del backend/JWT
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filteredOffers = mockOffers.filter((offer) => {
    if (roleFilter === "all") return true;
    if (roleFilter === "closer") {
      return offer.role === "closer" || offer.role === "both";
    }
    if (roleFilter === "setter") {
      return offer.role === "setter" || offer.role === "both";
    }
    if (roleFilter === "cold_caller") {
      return offer.role === "cold_caller";
    }
    return true;
  });

  const handleScheduleCall = (offer: JobOffer) => {
    window.open(offer.callLink, "_blank", "noopener,noreferrer");
  };

  const roleLabel = (role: JobOffer["role"]) => {
    if (role === "closer") return "Closer";
    if (role === "setter") return "Setter";
    if (role === "cold_caller") return "Cold Caller / SDR";
    return "Setter + Closer";
  };

  return (
    <>
      <Topbar
        title="Ofertas disponibles"
        subtitle="Encuentra lanzamientos y proyectos que encajen con tu perfil (Closer, Setter o Cold Caller)"
      />

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filtros por rol */}
        <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1 shadow-sm">
          <button
            onClick={() => setRoleFilter("all")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "all"
                ? "bg-black text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setRoleFilter("closer")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "closer"
                ? "bg-black text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Closers
          </button>
          <button
            onClick={() => setRoleFilter("setter")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "setter"
                ? "bg-black text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Setters
          </button>
          <button
            onClick={() => setRoleFilter("cold_caller")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "cold_caller"
                ? "bg-black text-white"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Cold Callers / SDR
          </button>
        </div>

        <p className="text-[11px] text-neutral-500">
          Más adelante filtraremos automáticamente según tu rol configurado en el
          perfil.
        </p>
      </div>

      {/* LISTA DE OFERTAS */}
      <div className="mt-5 space-y-4">
        {filteredOffers.map((offer) => (
          <article
            key={offer.id}
            className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">{offer.title}</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {offer.company} · {offer.type}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Rol: {roleLabel(offer.role)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-neutral-400 mb-1">
                  Modelo de pago
                </p>
                <p className="text-xs font-medium text-neutral-800">
                  {offer.model}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {offer.salaryHint}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed">
              {offer.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-neutral-100">
              <p className="text-[11px] text-neutral-500">
                La empresa ha indicado que las entrevistas se agendan por{" "}
                <span className="font-medium">
                  {offer.callTool === "calendly"
                    ? "Calendly"
                    : offer.callTool === "zoom"
                    ? "Zoom"
                    : "WhatsApp"}
                </span>
                .
              </p>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition">
                  Ver detalles
                </button>
                <button
                  onClick={() => handleScheduleCall(offer)}
                  className="px-3 py-1.5 text-xs rounded-full bg-black text-white hover:bg-neutral-900 transition"
                >
                  Agendar llamada
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredOffers.length === 0 && (
          <div className="bg-white rounded-3xl border border-dashed border-neutral-200 px-6 py-10 text-center">
            <p className="text-sm font-medium text-neutral-700">
              No hay ofertas para este rol todavía
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Cuando las empresas publiquen nuevos lanzamientos, los verás aquí.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
