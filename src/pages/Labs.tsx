import { useMemo, useState } from "react";

import { LabCard } from "../components/labs/LabCard";
import { LabForm } from "../components/labs/LabForm";

import { useLabsStore } from "../store/labsStore";
import { useProjectsStore } from "../store/projectsStore";

import type {
  Lab,
  LabCategory,
  LabDifficulty,
  LabStatus,
} from "../types";

type SortOption =
  | "updated-desc"
  | "created-desc"
  | "name-asc"
  | "difficulty-desc"
  | "status-asc";

const statusLabels: Record<LabStatus, string> = {
  idea: "Idea",
  preparation: "Preparación",
  running: "Ejecutando",
  analysis: "Análisis",
  completed: "Completado",
};

const difficultyLabels: Record<LabDifficulty, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  expert: "Experto",
};

const categoryLabels: Record<LabCategory, string> = {
  performance: "Performance",
  concurrency: "Concurrencia",
  internals: "Internals",
  "ha-dr": "HA / DR",
  security: "Seguridad",
  etl: "ETL",
  automation: "Automatización",
  other: "Otro",
};

const difficultyWeight: Record<LabDifficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const statusWeight: Record<LabStatus, number> = {
  idea: 1,
  preparation: 2,
  running: 3,
  analysis: 4,
  completed: 5,
};

export default function Labs() {
  const labs = useLabsStore((state) => state.labs);
  const addLab = useLabsStore((state) => state.addLab);
  const updateLab = useLabsStore((state) => state.updateLab);
  const deleteLab = useLabsStore((state) => state.deleteLab);

  const projects = useProjectsStore((state) => state.projects);

  const [showForm, setShowForm] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | undefined>();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<LabStatus | "all">("all");

  const [categoryFilter, setCategoryFilter] =
    useState<LabCategory | "all">("all");

  const [difficultyFilter, setDifficultyFilter] =
    useState<LabDifficulty | "all">("all");

  const [projectFilter, setProjectFilter] = useState("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("updated-desc");

  const projectMap = useMemo(
    () =>
      new Map(
        projects.map((project) => [project.id, project.name])
      ),
    [projects]
  );

  const filteredLabs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = labs.filter((lab) => {
      const projectName =
        projectMap.get(lab.projectId) ?? "";

      const searchableText = [
        lab.name,
        lab.description,
        lab.environment,
        lab.expectedResult,
        lab.actualResult,
        lab.conclusion,
        projectName,
        ...lab.objectives,
        ...lab.prerequisites,
        ...lab.technologies,
        ...lab.bestPractices,
        ...lab.references,
        statusLabels[lab.status],
        difficultyLabels[lab.difficulty],
        categoryLabels[lab.category],
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        lab.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        lab.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === "all" ||
        lab.difficulty === difficultyFilter;

      const matchesProject =
        projectFilter === "all" ||
        lab.projectId === projectFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesDifficulty &&
        matchesProject
      );
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "created-desc":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );

        case "name-asc":
          return a.name.localeCompare(b.name);

        case "difficulty-desc":
          return (
            difficultyWeight[b.difficulty] -
            difficultyWeight[a.difficulty]
          );

        case "status-asc":
          return (
            statusWeight[a.status] -
            statusWeight[b.status]
          );

        case "updated-desc":
        default:
          return (
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
          );
      }
    });
  }, [
    labs,
    projectMap,
    search,
    statusFilter,
    categoryFilter,
    difficultyFilter,
    projectFilter,
    sortBy,
  ]);

  const totalLabs = labs.length;

  const runningLabs = labs.filter(
    (lab) => lab.status === "running"
  ).length;

  const analysisLabs = labs.filter(
    (lab) => lab.status === "analysis"
  ).length;

  const completedLabs = labs.filter(
    (lab) => lab.status === "completed"
  ).length;

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    difficultyFilter !== "all" ||
    projectFilter !== "all";

  function handleCreate() {
    setEditingLab(undefined);
    setShowForm(true);
  }

  function handleEdit(lab: Lab) {
    setEditingLab(lab);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingLab(undefined);
    setShowForm(false);
  }

  function handleSubmit(data: {
    projectId: string;
    name: string;
    description: string;
    status: LabStatus;
    difficulty: LabDifficulty;
    category: LabCategory;
    objectives: string[];
    prerequisites: string[];
    technologies: string[];
    environment: string;
    setupScript: string;
    executionScript: string;
    diagnosticScript: string;
    expectedResult: string;
    actualResult: string;
    conclusion: string;
    bestPractices: string[];
    references: string[];
  }) {
    if (editingLab) {
      updateLab(editingLab.id, data);
    } else {
      addLab(data);
    }

    handleCancel();
  }

  function handleDelete(id: string) {
    const lab = labs.find((item) => item.id === id);

    if (!lab) {
      return;
    }

    if (
      !window.confirm(
        `¿Eliminar el laboratorio "${lab.name}"?`
      )
    ) {
      return;
    }

    deleteLab(id);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setDifficultyFilter("all");
    setProjectFilter("all");
    setSortBy("updated-desc");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Labs
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Laboratorios prácticos para experimentar,
              diagnosticar y documentar escenarios de DBA.
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={handleCreate}
              disabled={projects.length === 0}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Nuevo laboratorio
            </button>
          )}
        </div>

        {showForm ? (
          <LabForm
            lab={editingLab}
            projects={projects}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {projects.length === 0 && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  No hay proyectos disponibles.
                </p>

                <p className="mt-1 text-sm text-amber-700">
                  Crea primero un proyecto para poder asociarle
                  laboratorios.
                </p>
              </div>
            )}

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Total Labs", totalLabs],
                ["Ejecutando", runningLabs],
                ["En análisis", analysisLabs],
                ["Completados", completedLabs],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-slate-500">
                    {label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Buscar
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Nombre, objetivo, tecnología..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Estado
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as LabStatus | "all"
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="all">Todos</option>

                    {Object.entries(statusLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Categoría
                  </label>

                  <select
                    value={categoryFilter}
                    onChange={(event) =>
                      setCategoryFilter(
                        event.target.value as LabCategory | "all"
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="all">Todas</option>

                    {Object.entries(categoryLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Dificultad
                  </label>

                  <select
                    value={difficultyFilter}
                    onChange={(event) =>
                      setDifficultyFilter(
                        event.target.value as
                          | LabDifficulty
                          | "all"
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="all">Todas</option>

                    {Object.entries(difficultyLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Proyecto
                  </label>

                  <select
                    value={projectFilter}
                    onChange={(event) =>
                      setProjectFilter(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="all">Todos</option>

                    {projects.map((project) => (
                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:max-w-xs">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Ordenar
                  </label>

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value as SortOption
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="updated-desc">
                      Última actualización
                    </option>

                    <option value="created-desc">
                      Más recientes
                    </option>

                    <option value="name-asc">
                      Nombre A-Z
                    </option>

                    <option value="difficulty-desc">
                      Mayor dificultad
                    </option>

                    <option value="status-asc">
                      Estado
                    </option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {labs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h2 className="text-lg font-semibold text-slate-900">
                  Aún no tienes laboratorios
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Crea tu primer laboratorio práctico de DBA.
                </p>
              </div>
            ) : filteredLabs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h2 className="text-lg font-semibold text-slate-900">
                  No encontramos laboratorios
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Prueba cambiando los filtros o el texto de búsqueda.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredLabs.map((lab) => (
                  <LabCard
                    key={lab.id}
                    lab={lab}
                    projectName={projectMap.get(lab.projectId)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {labs.length > 0 && (
              <p className="mt-6 text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-medium text-slate-700">
                  {filteredLabs.length}
                </span>{" "}
                de{" "}
                <span className="font-medium text-slate-700">
                  {labs.length}
                </span>{" "}
                laboratorios.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}