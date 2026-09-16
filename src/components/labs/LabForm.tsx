import { useEffect, useState } from "react";

import type {
  Lab,
  LabCategory,
  LabDifficulty,
  LabStatus,
  Project,
} from "../../types";

interface LabFormProps {
  lab?: Lab;
  projects: Project[];
  onSubmit: (lab: {
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
  }) => void;
  onCancel: () => void;
}

const statusOptions: {
  value: LabStatus;
  label: string;
}[] = [
  { value: "idea", label: "Idea" },
  { value: "preparation", label: "Preparación" },
  { value: "running", label: "Ejecutando" },
  { value: "analysis", label: "Análisis" },
  { value: "completed", label: "Completado" },
];

const difficultyOptions: {
  value: LabDifficulty;
  label: string;
}[] = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Experto" },
];

const categoryOptions: {
  value: LabCategory;
  label: string;
}[] = [
  { value: "performance", label: "Performance" },
  { value: "concurrency", label: "Concurrencia" },
  { value: "internals", label: "Internals" },
  { value: "ha-dr", label: "HA / DR" },
  { value: "security", label: "Seguridad" },
  { value: "etl", label: "ETL" },
  { value: "automation", label: "Automatización" },
  { value: "other", label: "Otro" },
];

function arrayToText(values: string[]): string {
  return values.join("\n");
}

function textToArray(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function LabForm({
  lab,
  projects,
  onSubmit,
  onCancel,
}: LabFormProps) {
  const [projectId, setProjectId] = useState(lab?.projectId ?? "");
  const [name, setName] = useState(lab?.name ?? "");
  const [description, setDescription] = useState(
    lab?.description ?? ""
  );

  const [status, setStatus] = useState<LabStatus>(
    lab?.status ?? "idea"
  );

  const [difficulty, setDifficulty] = useState<LabDifficulty>(
    lab?.difficulty ?? "beginner"
  );

  const [category, setCategory] = useState<LabCategory>(
    lab?.category ?? "performance"
  );

  const [objectives, setObjectives] = useState(
    arrayToText(lab?.objectives ?? [])
  );

  const [prerequisites, setPrerequisites] = useState(
    arrayToText(lab?.prerequisites ?? [])
  );

  const [technologies, setTechnologies] = useState(
    lab?.technologies.join(", ") ?? ""
  );

  const [environment, setEnvironment] = useState(
    lab?.environment ?? ""
  );

  const [setupScript, setSetupScript] = useState(
    lab?.setupScript ?? ""
  );

  const [executionScript, setExecutionScript] = useState(
    lab?.executionScript ?? ""
  );

  const [diagnosticScript, setDiagnosticScript] = useState(
    lab?.diagnosticScript ?? ""
  );

  const [expectedResult, setExpectedResult] = useState(
    lab?.expectedResult ?? ""
  );

  const [actualResult, setActualResult] = useState(
    lab?.actualResult ?? ""
  );

  const [conclusion, setConclusion] = useState(
    lab?.conclusion ?? ""
  );

  const [bestPractices, setBestPractices] = useState(
    arrayToText(lab?.bestPractices ?? [])
  );

  const [references, setReferences] = useState(
    arrayToText(lab?.references ?? [])
  );

  useEffect(() => {
    setProjectId(lab?.projectId ?? "");
    setName(lab?.name ?? "");
    setDescription(lab?.description ?? "");
    setStatus(lab?.status ?? "idea");
    setDifficulty(lab?.difficulty ?? "beginner");
    setCategory(lab?.category ?? "performance");
    setObjectives(arrayToText(lab?.objectives ?? []));
    setPrerequisites(arrayToText(lab?.prerequisites ?? []));
    setTechnologies(lab?.technologies.join(", ") ?? "");
    setEnvironment(lab?.environment ?? "");
    setSetupScript(lab?.setupScript ?? "");
    setExecutionScript(lab?.executionScript ?? "");
    setDiagnosticScript(lab?.diagnosticScript ?? "");
    setExpectedResult(lab?.expectedResult ?? "");
    setActualResult(lab?.actualResult ?? "");
    setConclusion(lab?.conclusion ?? "");
    setBestPractices(arrayToText(lab?.bestPractices ?? []));
    setReferences(arrayToText(lab?.references ?? []));
  }, [lab]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName || !projectId) {
      return;
    }

    onSubmit({
      projectId,
      name: trimmedName,
      description: description.trim(),
      status,
      difficulty,
      category,

      objectives: textToArray(objectives),
      prerequisites: textToArray(prerequisites),

      technologies: technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),

      environment: environment.trim(),

      setupScript,
      executionScript,
      diagnosticScript,

      expectedResult: expectedResult.trim(),
      actualResult: actualResult.trim(),
      conclusion: conclusion.trim(),

      bestPractices: textToArray(bestPractices),
      references: textToArray(references),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {lab ? "Editar laboratorio" : "Nuevo laboratorio"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Define el laboratorio, su ambiente, scripts y resultados.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Proyecto *
          </label>

          <select
            value={projectId}
            onChange={(event) => setProjectId(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Selecciona un proyecto</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {projects.length === 0 && (
            <p className="mt-2 text-xs text-amber-600">
              Debes crear al menos un proyecto antes de crear un
              laboratorio.
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nombre *
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej. LAB-001 - SQL Server Wait Statistics"
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
            placeholder="Describe qué se pretende investigar o demostrar..."
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
              setStatus(event.target.value as LabStatus)
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
            Dificultad
          </label>

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as LabDifficulty)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none"
          >
            {difficultyOptions.map((option) => (
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
              setCategory(event.target.value as LabCategory)
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
            placeholder="SQL Server, PowerShell, dbatools"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <p className="mt-1 text-xs text-slate-400">
            Separa las tecnologías con comas.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Objetivos
          </label>

          <textarea
            value={objectives}
            onChange={(event) => setObjectives(event.target.value)}
            placeholder="Un objetivo por línea"
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Prerrequisitos
          </label>

          <textarea
            value={prerequisites}
            onChange={(event) => setPrerequisites(event.target.value)}
            placeholder="Un prerrequisito por línea"
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ambiente
          </label>

          <textarea
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            placeholder="SQL Server 2022 Developer, Windows 11, 4 vCPU, 16 GB RAM..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-base font-semibold text-slate-900">
              Scripts
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Scripts utilizados para preparar, ejecutar y diagnosticar
              el laboratorio.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Script de preparación
          </label>

          <textarea
            value={setupScript}
            onChange={(event) => setSetupScript(event.target.value)}
            placeholder="Script para preparar el escenario..."
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Script de ejecución
          </label>

          <textarea
            value={executionScript}
            onChange={(event) =>
              setExecutionScript(event.target.value)
            }
            placeholder="Script que genera o reproduce el escenario..."
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Script de diagnóstico
          </label>

          <textarea
            value={diagnosticScript}
            onChange={(event) =>
              setDiagnosticScript(event.target.value)
            }
            placeholder="DMVs, Query Store, análisis de waits..."
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 font-mono text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-base font-semibold text-slate-900">
              Resultados
            </h3>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Resultado esperado
          </label>

          <textarea
            value={expectedResult}
            onChange={(event) =>
              setExpectedResult(event.target.value)
            }
            placeholder="Qué debería observarse..."
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Resultado obtenido
          </label>

          <textarea
            value={actualResult}
            onChange={(event) =>
              setActualResult(event.target.value)
            }
            placeholder="Qué ocurrió durante la ejecución..."
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Conclusión
          </label>

          <textarea
            value={conclusion}
            onChange={(event) => setConclusion(event.target.value)}
            placeholder="Conclusiones técnicas del laboratorio..."
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Buenas prácticas
          </label>

          <textarea
            value={bestPractices}
            onChange={(event) =>
              setBestPractices(event.target.value)
            }
            placeholder="Una buena práctica por línea"
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Referencias
          </label>

          <textarea
            value={references}
            onChange={(event) => setReferences(event.target.value)}
            placeholder="Una referencia por línea"
            rows={5}
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
          disabled={projects.length === 0}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {lab ? "Guardar cambios" : "Crear laboratorio"}
        </button>
      </div>
    </form>
  );
}
