import {
  Database,
  FolderKanban,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

import MetricCard from "../components/dashboard/MetricCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityPanel from "../components/dashboard/ActivityPanel";

import { useProjectsStore } from "../store/projectsStore";

export default function Dashboard() {
  const projects = useProjectsStore(
    (state) => state.projects
  );

  return (
    <div className="min-h-full bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">

        <div>
          <p className="text-sm font-medium text-cyan-400">
            DBA AI STUDIO
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Centro de operaciones
          </h1>

          <p className="mt-2 text-slate-400">
            Administra tus proyectos, conocimiento, SQL Server e
            iniciativas de Inteligencia Artificial desde un solo lugar.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="SQL Servers"
            value={0}
            description="Instancias registradas"
            icon={Database}
          />

          <MetricCard
            title="Projects"
            value={projects.length}
            description="Proyectos registrados"
            icon={FolderKanban}
          />

          <MetricCard
            title="Ideas"
            value={0}
            description="Ideas pendientes"
            icon={Lightbulb}
          />

          <MetricCard
            title="Study Progress"
            value="0%"
            description="Progreso de aprendizaje"
            icon={GraduationCap}
          />

        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <ActivityPanel />
          </div>

          <div>
            <QuickActions />
          </div>

        </div>

      </div>
    </div>
  );
}
