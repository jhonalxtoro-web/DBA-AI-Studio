import { useEffect, useState } from "react";

import type {
  Project,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
} from "../../types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: {
    name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    category: ProjectCategory;
    technologies: string[];
    notes: string;
  }) => void;
  onCancel: () => void;
}

const statusOptions: {
  value: ProjectStatus;
  label: string;
}[] = [
  { value: "idea", label: "Idea" },
  { value: "planned", label: "Planeado" },
  { value: "in-progress", label: "En progreso" },
  { value: "paused", label: "Pausado" },
  { value: "completed", label: "Completado" },
];

const priorityOptions: {
  value: ProjectPriority;
  label: string;
}[] = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
  { value: "critical", label: "Crítica" },
];

const categoryOptions: {
  value: ProjectCategory;
  label: string;
}[] = [
  { value: "sql-server", label: "SQL Server" },
  { value: "ai", label: "IA" },
  { value: "automation", label: "Automatización" },
  { value: "monitoring", label: "Monitoreo" },
  { value: "security", label: "Seguridad" },
  { value: "etl", label: "ETL" },
  { value: "learning", label: "Aprendizaje" },
  { value: "other", label: "Otro" },
];

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(
    project?.description ?? ""
  );
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "idea"
  );
  const [priority, setPriority] = useState<ProjectPriority>(
    project?.priority ?? "medium"
  );
  const [category, setCategory] = useState<ProjectCategory>(
    project?.category ?? "other"
  );
  const [technologies, setTechnologies] = useState(
    project?.technologies.join(", ") ?? ""
  );
  const [notes, setNotes] = useState(project?.notes ?? "");

  useEffect(() => {
    setName(project?.name ?? "");
    setDescription(project?.description ?? "");
    setStatus(project?.status ?? "idea");
    setPriority(project?.priority ?? "medium");
    setCategory(project?.category ?? "other");
    setTechnologies(project?.technologies.join(", ") ?? "");
    setNotes(project?.notes ?? "");
  }, [project]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit({
      name: trimmedName,
      description: description.trim(),
      status,
      priority,
      category,
      technologies: technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      notes: notes.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {project ? "Editar proyecto" : "Nuevo proyecto"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Define la información principal del proyecto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nombre *
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej. SQL Server Performance Lab"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Descripción
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe el objetivo del proyecto..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Estado
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ProjectStatus)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Prioridad
          </label>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as ProjectPriority)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Categoría
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as ProjectCategory)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tecnologías
          </label>

          <input
            type="text"
            value={technologies}
            onChange={(event) => setTechnologies(event.target.value)}
            placeholder="SQL Server, PowerShell, Ollama"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <p className="mt-1 text-xs text-slate-400">
            Separa las tecnologías con comas.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notas
          </label>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Notas adicionales..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {project ? "Guardar cambios" : "Crear proyecto"}
        </button>
      </div>
    </form>
  );
}