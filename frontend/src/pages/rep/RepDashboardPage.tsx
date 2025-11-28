import Topbar from "../../layouts/Topbar";
import StatCard from "../../components/ui/StatCard";
// 🟢 Importamos el hook de conexión y el contexto de autenticación
import { useFetch } from '../../hooks/useFetch'; 
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// 🟢 Definición de Tipos de Datos del Backend
interface DashboardData {
    monthlyStats: {
        callsMade: number;
        closures: number;
        avgTicket: number;
        estimatedCommission: number;
    };
    latestProcesses: LatestProcess[];
}

interface LatestProcess {
    id: number;
    companyName: string;
    jobTitle: string;
    status: 'APPLIED' | 'INTERVIEW' | 'OFFER_SENT' | 'HIRED' | 'REJECTED';
}

const ACTIVIDAD: { label: string; value: string; hint: string }[] = [
    { label: "Llamadas esta semana", value: "38", hint: "Objetivo: 45" },
    { label: "Reuniones agendadas", value: "12", hint: "+3 vs semana pasada" },
    { label: "Ofertas enviadas", value: "9", hint: "5 pendientes de respuesta" },
];

export default function RepDashboardPage() {
    useAuth();
    
    // 🟢 1. Conexión al Backend
    // CORREGIDO: Usamos la ruta relativa limpia. El client.ts añadirá /api si falta.
    const { data, isLoading, error, refetch } = useFetch<DashboardData>(
        '/rep/dashboard/stats', 
        true
    );
    
    // 🟢 2. Mapeo de Datos Dinámicos
    const dynamicStats = data?.monthlyStats ? [
        { label: "Llamadas este mes", value: data.monthlyStats.callsMade.toString(), hint: "Datos de CRM" },
        { label: "Cierres", value: data.monthlyStats.closures.toString(), hint: "Tasa de cierre calculada" },
        { label: "Ticket medio", value: `${data.monthlyStats.avgTicket.toFixed(0)} €`, hint: "Solo contratos cerrados" },
        { label: "Comisión estimada", value: `${data.monthlyStats.estimatedCommission.toFixed(0)} €`, hint: "Pendiente de confirmar" },
    ] : [];

    const latestProcesses = data?.latestProcesses || [];

    if (isLoading) {
        return (
            <>
                <Topbar title="Dashboard" subtitle="Cargando tu resumen..." /> 
                <div className="text-center py-10 text-neutral-500">Cargando datos del servidor...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Topbar title="Dashboard" subtitle="Error de conexión" />
                <div className="text-center py-10">
                    <p className="text-red-600 mb-4">Error al cargar el dashboard: {error}</p>
                    <button onClick={refetch} className="text-blue-600 underline">
                        Reintentar conexión
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Topbar
                title="Dashboard"
                subtitle="Resumen de tu actividad como closer / setter"
            />

            <div className="space-y-6">
                {/* MÉTRICAS PRINCIPALES */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dynamicStats.map((s) => (
                        <StatCard
                            key={s.label}
                            label={s.label}
                            value={s.value}
                            hint={s.hint}
                        />
                    ))}
                </section>

                {/* BLOQUE CENTRAL */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-200 px-6 py-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-sm font-semibold">Procesos en curso</h2>
                                <p className="text-xs text-neutral-500 mt-1">
                                    Seguimiento rápido de tus oportunidades activas.
                                </p>
                            </div>
                            <Link
                                to="/rep/applications"
                                className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 transition"
                            >
                                Ver todas las aplicaciones
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {latestProcesses.map((p) => (
                                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 bg-neutral-50/60">
                                    <div>
                                        <p className="text-sm font-medium">{p.companyName}</p>
                                        <p className="text-xs text-neutral-500 mt-0.5">{p.jobTitle}</p>
                                    </div>
                                    <span className="text-[11px] px-3 py-1 rounded-full bg-black text-white">
                                        {p.status.replaceAll('_', ' ')}
                                    </span>
                                </div>
                            ))}
                            {latestProcesses.length === 0 && (
                                <p className="text-xs text-neutral-500 text-center py-6">
                                    No tienes procesos activos.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actividad semanal */}
                    <div className="bg-white rounded-3xl border border-neutral-200 px-6 py-5 flex flex-col">
                        <h2 className="text-sm font-semibold mb-1">Actividad de esta semana</h2>
                        <p className="text-xs text-neutral-500 mb-4">Mini resumen operativo.</p>
                        <div className="space-y-3 mb-4">
                            {ACTIVIDAD.map((a) => (
                                <div key={a.label} className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-2.5">
                                    <div>
                                        <p className="text-xs text-neutral-500">{a.label}</p>
                                        <p className="text-[11px] text-neutral-400 mt-0.5">{a.hint}</p>
                                    </div>
                                    <p className="text-base font-semibold">{a.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <div className="text-[11px] text-neutral-500 mb-2">Ritmo semanal</div>
                            <div className="h-24 rounded-2xl bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center text-[11px] text-neutral-400">
                                Gráficos próximamente
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}