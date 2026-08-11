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
