# Database Schema & Entity Relationships

SalesFlow AI uses **Prisma ORM** with **Supabase (PostgreSQL)** in production.

## Key Entities
- **Organization**: Top-level tenant container.
- **User**: Organization member with role (`OWNER`, `ADMIN`, `MANAGER`, `SALES_AGENT`, `VIEWER`).
- **Lead**: Sales prospect with 0-100 score, expected value, source, and status.
- **Deal & Pipeline**: Kanban pipeline stages with deal probability and amount.
- **Contact & Company**: Relational B2B entities.
- **Workflow**: Automated rule definitions (Triggers, Conditions, Actions).
- **ApiKey & Webhook**: Developer platform endpoints.
