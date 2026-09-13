import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Kanban, Bot, Zap, BarChart3, Key, Shield, Sparkles, CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Kanban Sales Pipeline Engine",
      icon: Kanban,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      desc: "Drag-and-drop deal cards across customizable stages. Instant stage total recalculations, win probability weightings, and real-time backend updates.",
    },
    {
      title: "AI Sales Assistant & Tool Calling",
      icon: Bot,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      desc: "Server-side function calling tools (searchLeads, getPipeline, getSalesMetrics) process natural language prompts without exposing sensitive database schemas.",
    },
    {
      title: "Automated Workflows Engine",
      icon: Zap,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      desc: "Trigger-condition-action rule builder. Automatically assign leads, create priority tasks, send welcome emails, or fire webhooks on custom CRM events.",
    },
    {
      title: "Executive Analytics & Reporting",
      icon: BarChart3,
      color: "text-green-400 border-green-500/30 bg-green-500/10",
      desc: "Interactive Recharts area charts for monthly revenue growth vs active pipeline value, conversion funnels, and sales rep performance leaderboards.",
    },
    {
      title: "Developer REST API & Webhooks",
      icon: Key,
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      desc: "Generate secret API keys with SHA-256 hash security and scope enforcement. Manage webhook subscriptions with payload log inspection.",
    },
    {
      title: "Multi-Tenant Security & RBAC",
      icon: Shield,
      color: "text-red-400 border-red-500/30 bg-red-500/10",
      desc: "Strict organization-level data scoping (organizationId) guarding every query. 5-tier role matrix: OWNER, ADMIN, MANAGER, SALES_AGENT, VIEWER.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
            Full Platform Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Engineered for High-Velocity Sales</h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">Explore the deep feature suite that powers modern AI CRM workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass-card glass-card-hover p-6 rounded-2xl space-y-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
