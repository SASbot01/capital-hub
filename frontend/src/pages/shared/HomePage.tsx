// frontend/src/pages/shared/HomePage.tsx
import Topbar from "../../layouts/Topbar";

type HomePageProps = {
  userType: "rep" | "company";
};

export default function HomePage({ userType }: HomePageProps) {
  const isRep = userType === "rep";

  const title = isRep ? "Inicio comercial" : "Inicio empresa";
  const subtitle = isRep
    ? "Tu panel para encontrar mejores oportunidades y crecer como closer / setter."
    : "Tu panel para encontrar talento comercial y hacer que tu facturación crezca.";

  const primaryCta = isRep ? "Buscar ofertas activas" : "Publicar nueva oferta";
  const secondaryCta = isRep ? "Completar mi perfil" : "Ver aplicaciones recientes";

  const primaryDescription = isRep
    ? "Explora lanzamientos, ofertas evergreen y equipos que buscan closers, setters y cold callers. Filtra por tipo de rol, idioma y comisiones."
    : "Crea ofertas de trabajo para tus lanzamientos evergreen, marca el número de plazas y deja que los mejores comerciales se postulen.";

  const secondaryDescription = isRep
    ? "Un perfil completo (vídeos, métricas y reviews) multiplica tus probabilidades de ser contratado."
    : "Revisa perfiles verificados, organiza entrevistas con Calendly y gestiona tus procesos desde un solo lugar.";

  const highlights = isRep
    ? [
        {
          label: "Talento",
          value: "Setters, Closers y Cold Callers",
          text: "Perfiles enfocados en venta consultiva, lanzamientos y funnels evergreen.",
        },
        {
          label: "Objetivo",
          value: "Ganar más dinero",
          text: "Conectar con equipos serios, procesos claros y comisiones atractivas.",
        },
        {
          label: "Ventaja",
          value: "Todo en un solo lugar",
          text: "Ofertas, aplicaciones, formación y métricas en un mismo panel.",
        },
      ]
    : [
        {
          label: "Empresas",
          value: "Agencias & Infoproductores",
          text: "Agencias de marketing/venta e infoproductores que venden de forma recurrente.",
        },
        {
          label: "Objetivo",
          value: "Vender más",
          text: "Conectar con comerciales preparados para escalar tus lanzamientos.",
        },
        {
          label: "Ventaja",
          value: "Proceso simple",
          text: "Publica tu oferta, recibe aplicaciones y contrata en pocos pasos.",
        },
      ];

  return (
    <>
      <Topbar title={title} subtitle={subtitle} />

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-[2fr,1.4fr] gap-6">
        {/* Columna principal */}
        <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                Bienvenido a <span className="font-bold">CapitalHub</span>
              </h2>
              <p className="text-sm text-neutral-500 mt-1 max-w-xl">
                Misión: ayudar a las personas a ganar dinero conectando con oportunidades
                reales (setters, closers, cold callers) y a las empresas a captar más
                ingresos con equipos comerciales eficaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-900 transition">
                {primaryCta}
              </button>
              <button className="px-4 py-2 rounded-full bg-neutral-100 text-sm font-medium hover:bg-neutral-200 transition">
                {secondaryCta}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
              <h3 className="text-sm font-semibold mb-1">
                {isRep ? "Conecta con oportunidades reales" : "Publica tu primera oferta"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {primaryDescription}
              </p>
              <p className="text-[11px] text-neutral-400 mt-2">
                En el MVP todo estará basado en datos estáticos/mock, pero con el diseño
                y la UX preparados para conectar con el backend.
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
              <h3 className="text-sm font-semibold mb-1">
                {isRep ? "Haz que tu perfil venda por ti" : "Gestiona tus contrataciones"}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {secondaryDescription}
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-neutral-500">
                {isRep ? (
                  <>
                    <li>• Añade vídeos demo y resultados de campañas.</li>
                    <li>• Pide reviews a las empresas tras cada colaboración.</li>
                    <li>• Accede a formación semanal para mejorar tus métricas.</li>
                  </>
                ) : (
                  <>
                    <li>• Define rol, idioma, CRM y tipo de comisión.</li>
                    <li>• Conecta tu Calendly para entrevistas rápidas.</li>
                    <li>• Ten visibilidad clara del pipeline de candidatos.</li>
                  </>
                )}
              </ul>
            </article>
          </div>
        </section>

        {/* Columna lateral: visión + highlights */}
        <aside className="space-y-4">
          <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
            <h3 className="text-sm font-semibold mb-1">Visión de CapitalHub</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Convertirnos en la plataforma líder de conexión entre empresas e
              investigadores de alto rendimiento, ofreciendo herramientas simples y
              visuales que automaticen el reclutamiento, la gestión de contrataciones y la
              optimización de resultados.
            </p>
            <div className="mt-3 rounded-2xl bg-neutral-900 text-white text-[11px] px-4 py-3">
              <p className="font-medium">
                Próximo paso del MVP:
              </p>
              <p className="mt-1 text-neutral-200">
                Conectar este panel con el backend (jobs, aplicaciones, métricas) y
                empezar a usar datos reales de pruebas internas.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
            <h3 className="text-sm font-semibold mb-3">
              {isRep ? "¿Qué te ofrece CapitalHub?" : "¿Qué consigues como empresa?"}
            </h3>

            <div className="space-y-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-neutral-50 px-4 py-3"
                >
                  <div>
                    <p className="text-[11px] text-neutral-500 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold">{item.value}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-neutral-500">
                  Video de bienvenida (próximamente)
                </p>
                <p className="text-xs text-neutral-700">
                  Aquí incrustaremos un Loom explicando qué es CapitalHub y cómo sacarle
                  el máximo partido.
                </p>
              </div>
              <div className="w-16 h-11 rounded-2xl bg-neutral-900/90 flex items-center justify-center text-[10px] text-white">
                Loom
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
