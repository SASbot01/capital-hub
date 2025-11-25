// frontend/src/pages/rep/RepApplicationsPage.tsx
import Topbar from "../../layouts/Topbar";
import StatCard from "../../components/ui/StatCard";

const mockApplications = [
  {
    company: "Growth Labs",
    role: "Closer remoto",
    status: "Entrevista agendada",
    date: "15 Nov 2025",
  },
  {
    company: "ScaleUp Media",
    role: "Setter / SDR",
    status: "En revisión",
    date: "12 Nov 2025",
  },
  {
    company: "Digital Funnels Pro",
    role: "Closer + seguimiento",
    status: "Aplicado",
    date: "10 Nov 2025",
  },
];

export default function RepApplicationsPage() {
  return (
    <>
      <Topbar
        title="Aplicaciones"
        subtitle="Seguimiento de tus postulaciones activas"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Aplicaciones totales"
          value={mockApplications.length.toString()}
          hint="Últimos 30 días"
        />
        <StatCard label="Entrevistas" value="2" hint="Programadas" />
        <StatCard label="Ofertas recibidas" value="1" hint="Pendiente de firma" />
        <StatCard label="Rechazos" value="0" hint="Nada por ahora 👌" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold mb-4">Historial de aplicaciones</h2>

        <div className="divide-y divide-neutral-100">
          {mockApplications.map((app, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2"
            >
              <div>
                <p className="text-sm font-medium">{app.company}</p>
                <p className="text-xs text-neutral-500">
                  {app.role} · {app.date}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-700">
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
