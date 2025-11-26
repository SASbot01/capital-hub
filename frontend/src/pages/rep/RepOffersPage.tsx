import { useState, useMemo } from "react";
import Topbar from "../../layouts/Topbar";
// 🟢 Importamos el hook de conexión
import { useFetch } from '../../hooks/useFetch'; 
import Button from "../../components/ui/Button"; // Asumo que necesitas el botón

// ---------------------------------------------------
// 🟢 Definición de Tipos de Datos (Sincronizado con JobOfferResponse.java)
// ---------------------------------------------------
type RoleFilter = "all" | "closer" | "setter" | "cold_caller";

interface JobOffer {
  id: number;
  title: string;
  companyName: string; // ✅ Adaptado al DTO del backend
  role: "SETTER" | "CLOSER" | "BOTH" | "COLD_CALLER"; // ✅ Roles en mayúsculas como en Java Enum
  model: string; 
  salaryHint: string; 
  type: string; 
  description: string;
  callTool: "calendly" | "zoom" | "whatsapp";
  callLink: string;
  // Añade aquí cualquier otro campo que venga del backend (ej: commissionPercent, estimatedMonthlyEarnings)
}

export default function RepOffersPage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  // 🟢 1. Conexión al Backend usando useFetch
  // La ruta asume que el backend tiene un endpoint para listar todas las ofertas
  const { data: offers, isLoading, error, refetch } = useFetch<JobOffer[]>(
    '/api/rep/jobs', 
    true
  );
  
  // 🟢 2. Filtro de Ofertas con datos reales (o null si aún cargan)
  const filteredOffers = useMemo(() => {
    // Si no hay datos (cargando o error), devolvemos un array vacío para evitar fallos.
    if (!offers) return []; 

    return offers.filter((offer) => {
      // 💡 Nota: offer.role viene ahora en MAYÚSCULAS (SETTER, CLOSER, etc.)
      const lowerCaseRole = offer.role.toLowerCase();

      if (roleFilter === "all") return true;
      if (roleFilter === "closer") {
        return lowerCaseRole.includes("closer") || lowerCaseRole === "both";
      }
      if (roleFilter === "setter") {
        return lowerCaseRole.includes("setter") || lowerCaseRole === "both";
      }
      if (roleFilter === "cold_caller") {
        return lowerCaseRole === "cold_caller";
      }
      return true;
    });
  }, [offers, roleFilter]); // Recalcula si cambian las ofertas o el filtro

  // Función para mostrar el rol en formato legible
  const roleLabel = (role: JobOffer["role"]) => {
    const r = role.toLowerCase();
    if (r === "closer") return "Closer";
    if (r === "setter") return "Setter";
    if (r === "cold_caller") return "Cold Caller / SDR";
    if (r === "both") return "Setter + Closer";
    return role; // Devuelve el original si no coincide
  };

  const handleScheduleCall = (offer: JobOffer) => {
    window.open(offer.callLink, "_blank", "noopener,noreferrer");
  };
  
  // ---------------------------------------------------
  // 🟢 Manejo de Estado (Loading y Error)
  // ---------------------------------------------------
  
  if (isLoading) {
      return (
          <>
              <Topbar title="Ofertas disponibles" subtitle="Cargando oportunidades..." />
              <div className="text-center py-10 text-neutral-500">Cargando ofertas disponibles...</div>
          </>
      );
  }

  if (error) {
      return (
          <>
              <Topbar title="Ofertas disponibles" subtitle="Error de conexión" />
              <div className="text-center py-10">
                  <p className="text-red-600 mb-4">Error al cargar ofertas: {error}</p>
                  <Button onClick={refetch}>Reintentar conexión</Button>
              </div>
          </>
      );
  }

  // ---------------------------------------------------
  // Renderizado con Datos
  // ---------------------------------------------------

  return (
    <>
      <Topbar
        title="Ofertas disponibles"
        subtitle={`Mostrando ${filteredOffers.length} oportunidades que coinciden con tu perfil.`}
      />

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filtros por rol */}
        <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1 shadow-sm">
          {/* ... (Tus botones de filtro son correctos) */}
          <button
            onClick={() => setRoleFilter("all")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "all" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setRoleFilter("closer")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "closer" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Closers
          </button>
          <button
            onClick={() => setRoleFilter("setter")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "setter" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            Setters
          </button>
          <button
            onClick={() => setRoleFilter("cold_caller")}
            className={`px-4 py-1.5 text-xs rounded-full transition ${
              roleFilter === "cold_caller" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"
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
        {/* 🟢 Usamos filteredOffers (que ahora vienen del backend) */}
        {filteredOffers.map((offer) => (
          <article
            key={offer.id}
            className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 shadow-sm flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">{offer.title}</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {offer.companyName} · {offer.type} {/* Usamos companyName del DTO */}
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
                  {/* ... (Lógica de callTool es correcta) */}
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

        {filteredOffers.length === 0 && !isLoading && (
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