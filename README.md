# SalesFlow AI - Production-Grade AI CRM & Sales Automation SaaS

> **Manage relationships. Automate sales. Close smarter.**

**SalesFlow AI** is a commercial-grade AI-powered CRM & Sales Automation SaaS platform built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, Prisma ORM, Supabase (PostgreSQL), and OpenAI API.

---

## 🌟 Key Features

- **Multi-Tenant Workspace Scoping**: Complete data isolation per organization (`organizationId`).
- **Role-Based Access Control (RBAC)**: Strict permission enforcement across `OWNER`, `ADMIN`, `MANAGER`, `SALES_AGENT`, and `VIEWER`.
- **Drag-and-Drop Kanban Sales Pipeline**: Visual deal stages, real-time stage totals, weighted value calculations, and animated drag-and-drop state transitions (`@hello-pangea/dnd`).
- **AI Sales Assistant & Tool Engine**: Server-side tool execution (`searchLeads`, `getPipeline`, `getSalesMetrics`, `getRevenueForecast`) allowing natural language queries without exposing sensitive database schemas.
- **AI Lead Scoring**: Real-time 0-100 score engine (Hot 🔥, Warm ☀️, Cold ❄️) with explicit signal explanations.
- **AI Email Generator**: Custom prompt composer supporting tone adjustments (*Professional*, *Friendly*, *Persuasive*, *Short*).
- **Sales Automation Builder**: Trigger-condition-action workflow executor (`lead.created`, `lead.qualified`, `deal.won`, etc.).
- **Executive Analytics & Reporting**: Interactive Recharts revenue trends, conversion funnel metrics, and rep performance leaderboards.
- **Command Palette (`Ctrl + K`)**: Global modal search across CRM records and instant navigation.
- **Developer Portal**: Secret API key generator (SHA-256 validation) & Webhook subscriber endpoint manager.
- **SaaS Billing Architecture**: Plan limits (Free, Pro, Business) ready for Razorpay and Stripe cloud integration.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router) & React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database & ORM**: Prisma ORM with Supabase (PostgreSQL) / SQLite local fallback
- **Authentication**: HTTP-only JWT Session Cookies with bcrypt password hashing
- **Charts & Drag-and-Drop**: Recharts & `@hello-pangea/dnd`

---

## 🚀 Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Initialization & Seed
Push the Prisma schema and seed 50+ realistic CRM records:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Seeded Demo Credentials

Use these credentials to log in to the demo environment:
- **Email**: `alex@acme.com`
- **Password**: `password123`
- **Role**: `OWNER` (Full access to all CRM, AI, Automation, Developer & Billing features)

---

## 🌐 Deploying to GitHub & Vercel (Production)

1. Push this codebase to a GitHub Repository.
2. Connect your GitHub repository to **Vercel**.
3. Set your **Supabase PostgreSQL** `DATABASE_URL` and `DIRECT_URL` in Vercel Environment Variables.
4. Set `JWT_SECRET` and `OPENAI_API_KEY` in Vercel settings.
5. Vercel automatically builds and deploys your live production SaaS on your custom domain!
