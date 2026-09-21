# DBA AI Studio - Project Context

## Project

DBA AI Studio is a personal DBA engineering and learning ecosystem focused primarily on Microsoft SQL Server, database performance, tuning, automation, security, ETL, high availability, AI-assisted DBA workflows and practical laboratories.

The project is also a React/TypeScript application used to organize projects, laboratories, knowledge, study material and DBA tooling.

## Primary goals

- Build a practical SQL Server DBA laboratory.
- Develop database performance and tuning expertise.
- Create reproducible DBA laboratories.
- Organize SQL Server diagnostic scripts.
- Study Microsoft SQL Server best practices.
- Build automation for DBA operational tasks.
- Integrate AI into DBA workflows.
- Document findings, troubleshooting methods and optimization techniques.
- Eventually connect the application UI with practical DBA tools and knowledge.

## Technology stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- Lucide React

Development:

- Git
- GitHub
- PowerShell
- Node.js

DBA domain:

- Microsoft SQL Server
- T-SQL
- DMVs
- Query Store
- Execution Plans
- SQL Server Agent
- SSIS
- Always On
- Replication
- Backup and Restore
- Security
- Performance Tuning

## Current architecture

src/
- components/
- pages/
- store/
- types/
- router.tsx

labs/
- SQL Server practical laboratories

scripts/
- DBA diagnostic and automation scripts

docs/
- project and technical documentation

tools/
- future DBA tooling and utilities

## Development rules

1. Do not introduce unnecessary dependencies.
2. Preserve the existing architecture unless there is a clear reason to change it.
3. Use TypeScript types instead of `any` whenever possible.
4. Keep components focused and reusable.
5. Keep business/state logic in Zustand stores where appropriate.
6. Run `npm run build` after significant frontend changes.
7. Do not commit secrets, credentials, tokens or environment-specific sensitive data.
8. Do not delete existing functionality without verifying its purpose.
9. Prefer incremental changes over large rewrites.
10. Before committing, inspect `git diff` and `git status`.

## DBA rules

For SQL Server work:

1. Prefer Microsoft documentation and established SQL Server best practices.
2. Never assume that a wait statistic alone proves a performance problem.
3. Correlate waits with CPU, memory, I/O, blocking, queries and execution plans.
4. Distinguish symptoms from root causes.
5. Prefer reproducible tests.
6. Capture baseline metrics before optimization.
7. Measure results after optimization.
8. Document assumptions and limitations.
9. Do not recommend production changes without considering impact and rollback.
10. Avoid destructive SQL in laboratories unless explicitly marked and isolated.

## Laboratory principle

Every laboratory should answer:

Problem
→ Setup
→ Workload
→ Measurement
→ Diagnosis
→ Hypothesis
→ Optimization
→ Validation
→ Documentation

## Git workflow

Main development branch:

develop

Use descriptive conventional commits when practical:

feat:
fix:
refactor:
docs:
test:
chore:

Do not commit unrelated files.

## Current project status

See:

docs/project-context/CURRENT-STATE.md

## Roadmap

See:

docs/project-context/ROADMAP.md

## Important

The project should evolve into a serious personal DBA engineering platform, not just a CRUD application.

Prioritize practical DBA capabilities, reproducibility, diagnostics, performance analysis, automation and knowledge management.
