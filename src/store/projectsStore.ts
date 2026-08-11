import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Project,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
} from "../types";

export interface CreateProjectInput {
  name: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  category?: ProjectCategory;
  technologies?: string[];
  notes?: string;
}

interface ProjectsState {
  projects: Project[];

  addProject: (input: CreateProjectInput) => void;

  updateProject: (
    id: string,
    changes: Partial<Project>
  ) => void;

  deleteProject: (id: string) => void;

  getProject: (id: string) => Project | undefined;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],

      addProject: (input) => {
        const now = new Date().toISOString();

        const project: Project = {
          id: crypto.randomUUID(),
          name: input.name,
          description: input.description ?? "",
          status: input.status ?? "idea",
          priority: input.priority ?? "medium",
          category: input.category ?? "other",
          technologies: input.technologies ?? [],
          notes: input.notes ?? "",
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          projects: [...state.projects, project],
        }));
      },

      updateProject: (id, changes) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  ...changes,
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(
            (project) => project.id !== id
          ),
        }));
      },

      getProject: (id) => {
        return get().projects.find(
          (project) => project.id === id
        );
      },
    }),
    {
      name: "dba-ai-studio-projects",
    }
  )
);
