# DBA AI Studio - Architecture

## Application

DBA AI Studio is currently a client-side React application.

### Frontend

React + TypeScript + Vite

### Styling

Tailwind CSS

### State

Zustand with persistence where required.

### Routing

React Router.

## Main application areas

Dashboard
SQL Server
AI
Projects
Knowledge
Roadmap
Study
Labs
Settings

## Planned domain areas

### SQL Server

- Health checks
- Performance
- Tuning
- Query analysis
- Execution plans
- Query Store
- Wait Statistics
- Blocking
- Deadlocks
- Memory
- CPU
- I/O
- TempDB
- Indexes
- Statistics
- Backup/Restore
- HA/DR
- Always On
- Replication
- SQL Agent
- SSIS

### AI

- DBA assistant
- Query analysis
- Execution plan explanation
- Incident analysis
- Script generation
- Documentation generation
- Knowledge retrieval
- Local LLM experimentation

### Labs

Labs must become reproducible practical exercises.

Each lab should define:

- Objective
- Prerequisites
- Environment
- Setup
- Workload
- Diagnostics
- Expected observations
- Analysis
- Optimization
- Validation
- Cleanup
- Documentation

### Projects

Projects represent longer-running DBA initiatives.

Examples:

- SQL Server performance optimization
- ETL workload distribution
- SQL Server Audit
- DBA automation
- Monitoring
- Security
- AI for DBA

## Architectural principle

Keep the UI, state management, domain knowledge and practical laboratory material logically separated.

The application should eventually become an interface over the DBA knowledge and tooling ecosystem.
