// frontend/src/pages/rep/RepTrainingPage.tsx
import Topbar from "../../layouts/Topbar";

interface Lesson {
  title: string;
  duration: string;
  status: "completed" | "in-progress" | "locked";
}

interface Course {
  id: string;
  title: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  focus: string;
  progress: number; // 0–100
  lessons: Lesson[];
}

export default function RepTrainingPage() {
  // Datos mock para que se vea vivo (luego irán al backend)
  const courses: Course[] = [
    {
      id: "evergreen-closer",
      title: "Cierre en lanzamientos evergreen",
      level: "Intermedio",
      focus: "Closer",
      progress: 72,
      lessons: [
        {
          title: "Framework de llamada de cierre",
          duration: "14 min",
          status: "completed",
        },
        {
          title: "Gestión de objeciones frecuentes",
          duration: "18 min",
          status: "completed",
        },
        {
          title: "Cierre en una sola llamada",
          duration: "22 min",
          status: "in-progress",
        },
        {
          title: "Seguimiento post-llamada y upsell",
          duration: "16 min",
          status: "locked",
        },
      ],
    },
    {
      id: "setter-pro",
      title: "Prospección y agendas para Setters",
      level: "Básico",
      focus: "Setter",
      progress: 35,
      lessons: [
        {
          title: "Mentalidad del setter de alto rendimiento",
          duration: "10 min",
          status: "completed",
        },
        {
          title: "Script base de llamadas frías",
          duration: "15 min",
          status: "in-progress",
        },
        {
          title: "Uso del CRM y seguimiento diario",
          duration: "20 min",
          status: "locked",
        },
      ],
    },
    {
      id: "call-caller",
      title: "Optimización de call calling en campañas frías",
      level: "Avanzado",
      focus: "Setter / Closer",
      progress: 10,
      lessons: [
        {
          title: "KPIs clave en call calling",
          duration: "12 min",
          status: "in-progress",
        },
        {
          title: "Patrones de voz y ritmo",
          duration: "19 min",
          status: "locked",
        },
        {
          title: "Sistemas de seguimiento y batches",
          duration: "17 min",
          status: "locked",
        },
      ],
    },
  ];

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const avgProgress =
    Math.round(
      courses.reduce((acc, c) => acc + c.progress, 0) / courses.length
    ) || 0;

  const activeCourse = courses[0];

  const badgeColor = (level: Course["level"]) => {
    switch (level) {
      case "Básico":
        return "bg-neutral-100 text-neutral-700";
      case "Intermedio":
        return "bg-black text-white";
      case "Avanzado":
        return "bg-neutral-900 text-white";
    }
  };

  const pillForStatus = (status: Lesson["status"]) => {
    if (status === "completed") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-medium text-emerald-700">
          Completada
        </span>
      );
    }
    if (status === "in-progress") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-medium text-amber-700">
          En curso
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-medium text-neutral-500">
        Bloqueada
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Topbar
        title="Formación"
        subtitle="Cursos para mejorar tu performance como setter / closer"
      />

      {/* RESUMEN SUPERIOR */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-5 py-4">
          <p className="text-xs text-neutral-500 mb-1">Cursos activos</p>
          <p className="text-2xl font-semibold tracking-tight">
            {totalCourses}
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            Cursos asignados para tu rol actual.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-5 py-4">
          <p className="text-xs text-neutral-500 mb-1">
            Cursos completados
          </p>
          <p className="text-2xl font-semibold tracking-tight">
            {completedCourses}
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            Cuando llegues al 100% generaremos tu certificado.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-5 py-4">
          <p className="text-xs text-neutral-500 mb-1">
            Progreso promedio
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold tracking-tight">
              {avgProgress}%
            </p>
            <div className="w-24 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full bg-neutral-900"
                style={{ width: `${avgProgress}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Suma de todos tus cursos activos.
          </p>
        </div>
      </section>

      {/* GRID PRINCIPAL: CURSO ACTIVO + LISTA CURSOS */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 mb-10">
        {/* CURSO ACTIVO */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-1.5">
            Curso en progreso
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Continúa donde lo dejaste. Más adelante esta sección se conectará
            con tu progreso real.
          </p>

          <div className="rounded-2xl border border-neutral-200 px-4 py-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-neutral-500 mb-1">
                  {activeCourse.focus}
                </p>
                <h4 className="text-base font-semibold text-neutral-900">
                  {activeCourse.title}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium " +
                      badgeColor(activeCourse.level)
                    }
                  >
                    {activeCourse.level}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {activeCourse.lessons.length} lecciones
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">
                    Progreso
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {activeCourse.progress}%
                  </span>
                </div>
                <div className="w-40 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-neutral-900"
                    style={{ width: `${activeCourse.progress}%` }}
                  />
                </div>
                <button className="mt-1 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                  Reanudar curso
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-3">
              <p className="text-xs font-medium text-neutral-900 mb-2">
                Lecciones
              </p>
              <div className="space-y-2">
                {activeCourse.lessons.map((lesson, index) => (
                  <div
                    key={lesson.title}
                    className="flex items-center justify-between text-xs py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-400 w-4">
                        {index + 1}.
                      </span>
                      <span className="text-neutral-800">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-neutral-400">
                        {lesson.duration}
                      </span>
                      {pillForStatus(lesson.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400">
            Cuando termines todas las lecciones de un curso, podrás descargar
            tu certificado en PDF desde esta misma página.
          </p>
        </div>

        {/* LISTA DE CURSOS */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 px-6 py-5">
          <h3 className="text-sm font-medium text-neutral-900 mb-1.5">
            Catálogo asignado
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Estos cursos están preparados para roles de Setter, Closer y
            Call Caller dentro de CapitalHub.
          </p>

          <div className="space-y-3">
            {courses.map((course) => (
              <button
                key={course.id}
                type="button"
                className="w-full text-left rounded-2xl border border-neutral-200 px-4 py-3 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-neutral-500 mb-0.5">
                      {course.focus}
                    </p>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {course.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium " +
                          badgeColor(course.level)
                        }
                      >
                        {course.level}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {course.lessons.length} lecciones
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-neutral-500">
                      Progreso
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {course.progress}%
                    </span>
                    <div className="w-24 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-neutral-900"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
