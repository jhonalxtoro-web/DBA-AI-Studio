import {
  Bot,
  FolderPlus,
  Lightbulb,
  Terminal,
} from "lucide-react";

const actions = [
  {
    title: "Nuevo proyecto",
    description: "Crear una iniciativa",
    icon: FolderPlus,
  },
  {
    title: "Nueva idea",
    description: "Guardar una idea",
    icon: Lightbulb,
  },
  {
    title: "SQL Assistant",
    description: "Analizar SQL",
    icon: Terminal,
  },
  {
    title: "AI Assistant",
    description: "Consultar IA local",
    icon: Bot,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Acciones frecuentes
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-left transition-colors hover:border-cyan-500/30 hover:bg-slate-800"
            >
              <Icon className="h-5 w-5 text-cyan-400" />

              <p className="mt-3 text-sm font-medium text-slate-200">
                {action.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}