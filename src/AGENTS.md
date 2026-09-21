# Frontend Development Context

This directory contains the React frontend of DBA AI Studio.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- Lucide React

## Rules

- Prefer functional components.
- Use TypeScript types.
- Avoid `any`.
- Keep components focused.
- Reuse existing components where possible.
- Keep state logic in Zustand when it is application-level state.
- Avoid unnecessary dependencies.
- Preserve existing navigation.
- Maintain responsive layouts.
- Keep Spanish user-facing text correctly encoded as UTF-8.

## Validation

After meaningful changes:

npm run build

Before committing:

git status
git diff

## UX principle

The application should feel like a professional DBA workspace rather than a generic CRUD dashboard.

Prioritize:

- clarity
- useful metrics
- technical context
- actionable information
- consistency
- maintainability
