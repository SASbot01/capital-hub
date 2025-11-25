// frontend/src/pages/rep/RepProfilePage.tsx
import Topbar from "../../layouts/Topbar";

type Specialty = string;

interface Metric {
  label: string;
  value: string;
  hint?: string;
}

interface Review {
  company: string;
  rating: number; // 1–5
  date: string;
  text: string;
}

interface DemoVideo {
  title: string;
  description: string;
}

export default function RepProfilePage() {
  // Datos mock para el MVP (luego vendrán del backend)
  const name = "Juan Pérez";
  const role = "Closer Senior";
  const location = "Madrid, España";
  const experience = "5+ años en ventas B2B SaaS";
  const memberSince = "Oct 2024";

  const specialties: Specialty[] = [
    "B2B SaaS",
    "Enterprise Sales",
    "Consultative Selling",
    "Account Management",
    "Cold Calling",
    "Closing remoto",
  ];

  const metrics: Metric[] = [
    {
      label: "Llamadas totales (30 días)",
      value: "1.247",
      hint: "+12% vs mes anterior",
    },
    {
      label: "Tasa de cierre",
      value: "34%",
      hint: "Promedio últimos 90 días",
    },
    {
      label: "Ticket promedio",
      value: "1.250 €",
      hint: "Solo contratos cerrados",
    },
    {
      label: "Ingresos generados",
      value: "38.400 €",
      hint: "En los últimos 6 meses",
    },
  ];

  const reviews: Review[] = [
    {
      company: "TechCorp SA",
      rating: 5,
      date: "15 Nov 2025",
      text: "Excelente closer, muy profesional y efectivo. Superó todas nuestras expectativas en el lanzamiento.",
    },
    {
      company: "StartupXYZ",
      rating: 4,
      date: "10 Nov 2025",
      text: "Buen desempeño, resultados consistentes. Comunicación clara con el equipo interno.",
    },
    {
      company: "InnovateLab",
      rating: 5,
      date: "05 Nov 2025",
      text: "Top performer. Cierre de deals complejos en mercados internacionales.",
    },
  ];

  const demoVideos: DemoVideo[] = [
    {
      title: "Roleplay cierre en llamada fría",
      description: "Demostración de cómo manejo objeciones y cierro en la primera llamada.",
    },
    {
      title: "Seguimiento de leads tibios",
      description: "Ejemplo de secuencia de seguimiento y cierre en campañas evergreen.",
    },
  ];

  const averageRating = "4.7 / 5";
  const totalReviews = `${reviews.length} reviews`;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={
              index < rating
                ? "text-yellow-400"
                : "text-neutral-300"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Topbar
        title="Perfil"
        subtitle="Tu carta de presentación para empresas"
      />

      {/* CABECERA PERFIL */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
        {/* Info principal */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-lg font-semibold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {name}
                </h2>
                <p className="text-sm text-neutral-500 mt-0.5">
                  {role} · {location}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Miembro desde {memberSince}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2">
                {renderStars(5)}
                <span className="text-sm font-medium text-neutral-800">
                  {averageRating}
                </span>
              </div>
              <p className="text-xs text-neutral-500">{totalReviews}</p>
              <button
                type="button"
                className="mt-1 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
              >
                Editar perfil
              </button>
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-4">
            <h3 className="text-sm font-medium text-neutral-900 mb-1.5">
              Sobre mí
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Closer con más de {experience}, especializado en lanzamientos
              evergreen y venta consultiva. Me enfoco en entender las
              necesidades reales del cliente, construir relaciones de confianza
              y ofrecer soluciones que generen ingresos recurrentes para la
              empresa.
            </p>
          </div>
        </div>

        {/* Métricas clave */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-4">
            Métricas principales
          </h3>
          <dl className="space-y-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-baseline justify-between"
              >
                <dt className="text-xs text-neutral-500 pr-4">
                  {m.label}
                </dt>
                <dd className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {m.value}
                  </div>
                  {m.hint && (
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {m.hint}
                    </div>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ESPECIALIDADES + VIDEOS */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
        {/* Especialidades */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-3">
            Especialidades
          </h3>
          <p className="text-xs text-neutral-500 mb-3">
            Estas etiquetas ayudan a las empresas a saber en qué contexto
            rindes mejor como closer / setter.
          </p>
          <div className="flex flex-wrap gap-2">
            {specialties.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Videos demostrativos */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-3">
            Videos demostrativos
          </h3>
          <p className="text-xs text-neutral-500 mb-3">
            En el futuro estos vídeos vendrán de tu biblioteca en CapitalHub
            (MinIO). Por ahora son solo un ejemplo visual.
          </p>
          <div className="space-y-3">
            {demoVideos.map((video, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-neutral-200 px-3 py-3 hover:border-neutral-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                  Vid {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {video.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {video.description}
                  </p>
                </div>
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-800">
                  Ver
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5 mb-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium text-neutral-900">
              Reviews de empresas
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Feedback real que aumenta tu credibilidad frente a nuevos
              clientes.
            </p>
          </div>
          <button className="text-xs font-medium text-neutral-500 hover:text-neutral-800">
            Ver todas
          </button>
        </div>

        <div className="divide-y divide-neutral-100">
          {reviews.map((review, index) => (
            <div
              key={`${review.company}-${index}`}
              className="py-3 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-neutral-900">
                    {review.company}
                  </span>
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs text-neutral-500 mb-1">
                  {review.text}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

