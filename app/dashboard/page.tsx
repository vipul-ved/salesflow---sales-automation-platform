"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Plus,
  Kanban,
  Target,
  Clock,
  ChevronRight,
  Radio,
  Flame,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        <span>Loading Executive Sales Metrics...</span>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalLeads: 35,
    qualifiedLeads: 18,
    activeDealsCount: 8,
    pipelineValue: 332500,
    wonRevenue: 107000,
    conversionRate: 68,
    avgDealSize: 41500,
    tasksDue: 3,
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-transparent p-6 rounded-3xl border border-white/[0.08] relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400">
            <Sparkles className="w-4 h-4" />
            <span>Executive Overview</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome back, Alex Vance 👋</h1>
          <p className="text-xs text-gray-400">Your organization has **8 active deals** worth **$332,500** in active pipeline.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/leads"
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all blue-glow"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </Link>
          <Link
            href="/dashboard/deals"
            className="flex items-center space-x-1.5 bg-gray-900 hover:bg-gray-800 border border-white/[0.08] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Kanban className="w-4 h-4 text-blue-400" />
            <span>Kanban Board</span>
          </Link>
        </div>
      </div>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card glass-card-hover p-5 rounded-2xl border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Pipeline</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">${metrics.pipelineValue.toLocaleString()}</div>
          <div className="mt-2 flex items-center text-xs text-green-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span>+18.4% growth</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border-l-4 border-l-green-500">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Closed Won Revenue</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">${metrics.wonRevenue.toLocaleString()}</div>
          <div className="mt-2 flex items-center text-xs text-green-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span>Target: 71% reached</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Qualified Prospects</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics.qualifiedLeads}</div>
          <div className="mt-2 flex items-center text-xs text-gray-400 font-medium">
            <span>Out of {metrics.totalLeads} total prospects</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Win Rate & Conversion</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics.conversionRate}%</div>
          <div className="mt-2 flex items-center text-xs text-amber-400 font-semibold">
            <span>Avg Deal: ${metrics.avgDealSize.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Charts & AI Insight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Revenue & Pipeline Trend</h3>
              <p className="text-xs text-gray-400">Monthly closed revenue vs active pipeline growth</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>Pipeline</span>
              <span className="flex items-center text-green-400"><span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1.5"></span>Revenue</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueTrend || []}>
                <defs>
                  <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0c1222", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(val: any) => `$${Number(val).toLocaleString()}`}
                />
                <Area type="monotone" dataKey="pipeline" stroke="#3b82f6" fillOpacity={1} fill="url(#pipelineGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Next Best Action Insights Card */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between border border-purple-500/30 purple-glow relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-extrabold text-xs tracking-wider uppercase">AI Next Best Action</span>
              </div>
              <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                Hot 🔥 (90%)
              </span>
            </div>

            <div className="bg-gray-900/90 border border-white/[0.08] rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Deal: Nexus Cloud Upgrade</span>
                <span className="text-green-400">$48,000</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Client completed technical validation. Estimated contract value is **$48,000**.
              </p>
              <div className="text-xs text-purple-300 font-medium bg-purple-600/10 p-3 rounded-xl border border-purple-500/20">
                👉 **Recommendation**: Send final MSA agreement & schedule executive sign-off call today.
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-semibold">
                <span>Monthly Target Progress</span>
                <span>71% ($107k / $150k)</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-white/[0.06]">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-400 h-full rounded-full w-[71%]"></div>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/ai"
            className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold py-3 rounded-xl border border-white/[0.08] flex items-center justify-center space-x-2 transition-all"
          >
            <span>Open AI Intelligence Suite</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stage Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Breakdown Bar Chart */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-white text-base">Pipeline Stage Breakdown</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.stageBreakdown || []}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0c1222", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(val: any, name: any) => [name === "value" ? `$${Number(val).toLocaleString()}` : val, name]}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Activity Stream */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Recent Sales Activity</h3>
            <span className="text-xs text-blue-400 font-semibold">Real-time audit log</span>
          </div>

          <div className="space-y-3">
            {[
              { text: "Priya Sharma created lead Rohan Verma (TechCorp)", time: "10m ago", icon: Users, color: "text-blue-400" },
              { text: "Deal Nexus Cloud moved to Negotiation stage ($48,000)", time: "25m ago", icon: DollarSign, color: "text-green-400" },
              { text: "Automated Workflow created task: Follow up with CloudScale", time: "1h ago", icon: CheckCircle2, color: "text-purple-400" },
              { text: "Alex Vance generated API Key for Zapier integration", time: "3h ago", icon: AlertCircle, color: "text-amber-400" },
            ].map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-900/60 border border-white/[0.06] text-xs">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${act.color}`} />
                    <span className="text-gray-300 font-medium">{act.text}</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
