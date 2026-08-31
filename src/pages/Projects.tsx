import { useState } from "react";

import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectForm } from "../components/projects/ProjectForm";
import { useProjectsStore } from "../store/projectsStore";
import type { Project } from "../types";

export default function Projects() {
  const projects = useProjectsStore((state) => state.projects);
  const addProject = useProjectsStore((state) => state.addProject);
  const updateProject = useProjectsStore((state) => state.updateProject);
  const deleteProject = useProjectsStore((state) => state.deleteProject);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | undefined>();

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
    status: Project["status"];
    priority: Project["priority"];
    category: Project["category"];
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

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Proyectos
            </h1>

            <p className="mt-2 text-slate-500">
              Gestión de proyectos, iniciativas e ideas de DBA AI Studio.
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
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
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