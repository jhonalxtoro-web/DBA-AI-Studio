export type ProjectStatus =
  | "idea"
  | "planned"
  | "in-progress"
  | "paused"
  | "completed";

export type ProjectPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type ProjectCategory =
  | "sql-server"
  | "ai"
  | "automation"
  | "monitoring"
  | "security"
  | "etl"
  | "learning"
  | "other";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  category: ProjectCategory;
  technologies: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type LabStatus =
  | "idea"
  | "preparation"
  | "running"
  | "analysis"
  | "completed";

export type LabDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type LabCategory =
  | "performance"
  | "concurrency"
  | "internals"
  | "ha-dr"
  | "security"
  | "etl"
  | "automation"
  | "other";

export interface Lab {
  id: string;
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

  createdAt: string;
  updatedAt: string;
}
