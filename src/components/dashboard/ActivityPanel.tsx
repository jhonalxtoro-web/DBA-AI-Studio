import {
  Activity,
  Brain,
  Database,
  FolderKanban,
} from "lucide-react";

const activities = [
  {
    title: "DBA AI Studio iniciado",
    description: "Entorno local preparado",
    icon: Activity,
  },
  {
    title: "SQL Server",
    description: "Módulo preparado para integración",
    icon: Database,
  },
  {
    title: "AI",
    description: "Integración con Ollama pendiente",
    icon: Brain,
  },
  {
    title: "Projects",
    description: "Gestión de proyectos preparada",
    icon: FolderKanban,
  },
];

export default function ActivityPanel() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Actividad reciente de la plataforma
      </p>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-start gap-3"
            >
              <div className="rounded-lg bg-slate-800 p-2">
                <Icon className="h-4 w-4 text-cyan-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-300">
                  {activity.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}