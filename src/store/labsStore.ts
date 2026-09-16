import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Lab,
  LabCategory,
  LabDifficulty,
  LabStatus,
} from "../types";

export interface CreateLabInput {
  projectId: string;

  name: string;
  description?: string;

  status?: LabStatus;
  difficulty?: LabDifficulty;
  category?: LabCategory;

  objectives?: string[];
  prerequisites?: string[];
  technologies?: string[];

  environment?: string;

  setupScript?: string;
  executionScript?: string;
  diagnosticScript?: string;

  expectedResult?: string;
  actualResult?: string;
  conclusion?: string;

  bestPractices?: string[];
  references?: string[];
}

interface LabsState {
  labs: Lab[];

  addLab: (input: CreateLabInput) => void;

  updateLab: (
    id: string,
    changes: Partial<Lab>
  ) => void;

  deleteLab: (id: string) => void;

  getLab: (id: string) => Lab | undefined;

  getLabsByProject: (projectId: string) => Lab[];
}

export const useLabsStore = create<LabsState>()(
  persist(
    (set, get) => ({
      labs: [],

      addLab: (input) => {
        const now = new Date().toISOString();

        const lab: Lab = {
          id: crypto.randomUUID(),

          projectId: input.projectId,

          name: input.name,
          description: input.description ?? "",

          status: input.status ?? "idea",
          difficulty: input.difficulty ?? "beginner",
          category: input.category ?? "other",

          objectives: input.objectives ?? [],
          prerequisites: input.prerequisites ?? [],
          technologies: input.technologies ?? [],

          environment: input.environment ?? "",

          setupScript: input.setupScript ?? "",
          executionScript: input.executionScript ?? "",
          diagnosticScript: input.diagnosticScript ?? "",

          expectedResult: input.expectedResult ?? "",
          actualResult: input.actualResult ?? "",
          conclusion: input.conclusion ?? "",

          bestPractices: input.bestPractices ?? [],
          references: input.references ?? [],

          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          labs: [...state.labs, lab],
        }));
      },

      updateLab: (id, changes) => {
        set((state) => ({
          labs: state.labs.map((lab) =>
            lab.id === id
              ? {
                  ...lab,
                  ...changes,
                  updatedAt: new Date().toISOString(),
                }
              : lab
          ),
        }));
      },

      deleteLab: (id) => {
        set((state) => ({
          labs: state.labs.filter(
            (lab) => lab.id !== id
          ),
        }));
      },

      getLab: (id) => {
        return get().labs.find(
          (lab) => lab.id === id
        );
      },

      getLabsByProject: (projectId) => {
        return get().labs.filter(
          (lab) => lab.projectId === projectId
        );
      },
    }),
    {
      name: "dba-ai-studio-labs",
    }
  )
);
