import type { Lab } from "../../types";

interface LabCardProps {
  lab: Lab;
  projectName?: string;
  onEdit: (lab: Lab) => void;
  onDelete: (id: string) => void;
}

const statusLabels: Record<Lab["status"], string> = {
  idea: "Idea",
  preparation: "Preparación",
  running: "Ejecutando",
  analysis: "Análisis",
  completed: "Completado",
};

const difficultyLabels: Record<Lab["difficulty"], string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  expert: "Experto",
};

const categoryLabels: Record<Lab["category"], string> = {
  performance: "Performance",
  concurrency: "Concurrencia",
  internals: "Internals",
  "ha-dr": "HA / DR",
  security: "Seguridad",
  etl: "ETL",
  automation: "Automatización",
  other: "Otro",
};

export function LabCard({
  lab,
  projectName,
  onEdit,
  onDelete,
}: LabCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900">
            {lab.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {categoryLabels[lab.category]}
            {" · "}
            {difficultyLabels[lab.difficulty]}
          </p>

          {projectName && (
            <p className="mt-1 text-xs text-slate-400">
              Proyecto: {projectName}
            </p>
          )}
        </div>

        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {statusLabels[lab.status]}
        </span>
      </div>

      {lab.description && (
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {lab.description}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {lab.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
          >
            {technology}
          </span>
        ))}
      </div>

      {lab.objectives.length > 0 && (
        <div className="mb-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Objetivos
          </p>

          <ul className="mt-2 space-y-1">
            {lab.objectives.slice(0, 3).map((objective, index) => (
              <li
                key={`${objective}-${index}`}
                className="text-sm text-slate-600"
              >
                • {objective}
              </li>
            ))}
          </ul>

          {lab.objectives.length > 3 && (
            <p className="mt-2 text-xs text-slate-400">
              +{lab.objectives.length - 3} objetivos adicionales
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
        <div>
          <span className="font-medium text-slate-600">
            Preparación
          </span>
          <p className="mt-1">
            {lab.setupScript ? "Configurada" : "Pendiente"}
          </p>
        </div>

        <div>
          <span className="font-medium text-slate-600">
            Diagnóstico
          </span>
          <p className="mt-1">
            {lab.diagnosticScript ? "Configurado" : "Pendiente"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(lab)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(lab.id)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
