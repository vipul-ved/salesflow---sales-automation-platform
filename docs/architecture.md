# SalesFlow AI - System Architecture Document

## System Overview
SalesFlow AI is architected as a modern, decoupled Next.js 14+ full-stack SaaS application following multi-tenant domain isolation patterns.

```text
               ┌────────────────────────────────────────────────────────┐
               │              Next.js 14+ App Router                   │
               │  (Client & Server Components / Tailwind / Recharts)   │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   │                                             │
      ┌────────────▼────────────┐                   ┌────────────▼────────────┐
      │     Route Handlers      │                   │     AI Tool Engine      │
      │  /api/v1 (Leads, Deals) │                   │  (OpenAI + Tools API)   │
      └────────────┬────────────┘                   └────────────┬────────────┘
                   │                                             │
                   └──────────────────────┬──────────────────────┘
                                          │
                               ┌──────────▼──────────┐
                               │     Prisma ORM      │
                               └──────────┬──────────┘
                                          │
                               ┌──────────▼──────────┐
                               │ Supabase PostgreSQL │
                               └─────────────────────┘
```

## Core Subsystems
1. **Auth & Multi-Tenancy**: Scopes every Prisma query by `organizationId`. HTTP-only JWT cookies store active user context.
2. **Kanban Engine**: Interactive drag-and-drop state machine updating deal stage positions and re-calculating stage sub-totals.
3. **AI Assistant & Function Calling**: Server-side tool registry (`searchLeads`, `getPipeline`, `getSalesMetrics`) translating prompt intent to isolated database queries.
4. **Automation Engine**: Event listener firing trigger-condition-action pipelines on CRUD operations.
5. **Developer & Webhook Subsystem**: SHA-256 key hashing for REST API authentication and HMAC-signed webhook delivery.
