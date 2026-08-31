import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const statusLabels: Record<Project["status"], string> = {
  idea: "Idea",
  planned: "Planeado",
  "in-progress": "En progreso",
  paused: "Pausado",
  completed: "Completado",
};

const priorityLabels: Record<Project["priority"], string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

const categoryLabels: Record<Project["category"], string> = {
  "sql-server": "SQL Server",
  ai: "IA",
  automation: "Automatización",
  monitoring: "Monitoreo",
  security: "Seguridad",
  etl: "ETL",
  learning: "Aprendizaje",
  other: "Otro",
};

export function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {project.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {categoryLabels[project.category]}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {statusLabels[project.status]}
        </span>
      </div>

      {project.description && (
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {project.description}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
          Prioridad: {priorityLabels[project.priority]}
        </span>

        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
          >
            {technology}
          </span>
        ))}
      </div>

      {project.notes && (
        <div className="mb-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Notas
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {project.notes}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(project.id)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}