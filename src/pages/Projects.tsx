import { useMemo, useState } from "react";

import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectForm } from "../components/projects/ProjectForm";
import { useProjectsStore } from "../store/projectsStore";
import type {
  Project,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
} from "../types";

type SortOption =
  | "updated-desc"
  | "created-desc"
  | "name-asc"
  | "priority-desc"
  | "status-asc";

const statusLabels: Record<ProjectStatus, string> = {
  idea: "Idea",
  planned: "Planeado",
  "in-progress": "En progreso",
  paused: "Pausado",
  completed: "Completado",
};

const priorityLabels: Record<ProjectPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

const categoryLabels: Record<ProjectCategory, string> = {
  "sql-server": "SQL Server",
  ai: "IA",
  automation: "Automatización",
  monitoring: "Monitoreo",
  security: "Seguridad",
  etl: "ETL",
  learning: "Aprendizaje",
  other: "Otro",
};

const priorityWeight: Record<ProjectPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

export default function Projects() {
  const projects = useProjectsStore((state) => state.projects);
  const addProject = useProjectsStore((state) => state.addProject);
  const updateProject = useProjectsStore((state) => state.updateProject);
  const deleteProject = useProjectsStore((state) => state.deleteProject);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | undefined>();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] =
    useState<ProjectCategory | "all">("all");
  const [priorityFilter, setPriorityFilter] =
    useState<ProjectPriority | "all">("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("updated-desc");

  function handleCreate() {
    setEditingProject(undefined);
    setShowForm(true);
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProject(undefined);
  }

  function handleSubmit(data: {
    name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    category: ProjectCategory;
    technologies: string[];
    notes: string;
  }) {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }

    handleCancel();
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este proyecto?"
    );

    if (confirmed) {
      deleteProject(id);
    }
  }

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = projects.filter((project) => {
      const searchableText = [
        project.name,
        project.description,
        project.notes,
        project.technologies.join(" "),
        categoryLabels[project.category],
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        project.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        project.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPriority
      );
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "priority-desc":
          return (
            priorityWeight[b.priority] -
            priorityWeight[a.priority]
          );

        case "status-asc":
          return statusLabels[a.status].localeCompare(
            statusLabels[b.status]
          );

        case "created-desc":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
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
    projects,
    search,
    statusFilter,
    categoryFilter,
    priorityFilter,
    sortBy,
  ]);

  const totalProjects = projects.length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "in-progress"
  ).length;

  const plannedProjects = projects.filter(
    (project) => project.status === "planned"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    priorityFilter !== "all";

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Proyectos
            </h1>

            <p className="mt-2 text-slate-500">
              Gestión de proyectos, iniciativas e ideas de DBA AI
              Studio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            + Nuevo proyecto
          </button>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalProjects}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              En progreso
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {inProgressProjects}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Planeados
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {plannedProjects}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Completados
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {completedProjects}
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <label
              htmlFor="project-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Buscar proyectos
            </label>

            <input
              id="project-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nombre, descripción, notas o tecnología..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="status-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Estado
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as ProjectStatus | "all"
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
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
              <label
                htmlFor="category-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Categoría
              </label>

              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value as ProjectCategory | "all"
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
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
              <label
                htmlFor="priority-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Prioridad
              </label>

              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target.value as ProjectPriority | "all"
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
              >
                <option value="all">Todas</option>

                {Object.entries(priorityLabels).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="sort-projects"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Ordenar
              </label>

              <select
                id="sort-projects"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
              >
                <option value="updated-desc">
                  Última modificación
                </option>
                <option value="created-desc">
                  Más recientes
                </option>
                <option value="name-asc">
                  Nombre A-Z
                </option>
                <option value="priority-desc">
                  Mayor prioridad
                </option>
                <option value="status-asc">
                  Estado A-Z
                </option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Mostrando{" "}
              <span className="font-semibold text-slate-700">
                {filteredProjects.length}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-slate-700">
                {totalProjects}
              </span>{" "}
              proyectos
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </section>

        {showForm && (
          <section className="mb-8">
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </section>
        )}

        {projects.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No hay proyectos todavía
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Crea tu primer proyecto para comenzar a construir tu
              ecosistema DBA.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Crear primer proyecto
            </button>
          </section>
        ) : filteredProjects.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No encontramos proyectos
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Prueba cambiando los filtros o el texto de búsqueda.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Limpiar filtros
            </button>
          </section>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}