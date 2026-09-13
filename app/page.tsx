"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, ArrowRight, Kanban, Bot, Zap, TrendingUp, CheckCircle2, Star, Shield, Play, Building2, Users } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "ai" | "automation">("pipeline");

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 selection:bg-blue-600 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center space-y-8 relative overflow-hidden">
          {/* Ambient Top Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial-Grade AI Sales CRM SaaS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Manage relationships. Automate sales. <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Close smarter.</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            SalesFlow AI combines intelligent lead scoring, drag-and-drop Kanban pipelines, automated workflow triggers, and server-side AI assistant tools into one unified commercial platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2 blue-glow"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/compare"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all"
            >
              Compare vs Salesforce & HubSpot
            </Link>
          </div>

          {/* Interactive Live Preview Switcher */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="glass-card p-4 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              {/* Tab Navigation */}
              <div className="flex items-center justify-center space-x-3 border-b border-gray-800/80 pb-3">
                <button
                  onClick={() => setActiveTab("pipeline")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "pipeline" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Kanban className="w-4 h-4" />
                  <span>Kanban Pipeline</span>
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "ai" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>AI Assistant & Scoring</span>
                </button>
                <button
                  onClick={() => setActiveTab("automation")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "automation" ? "bg-amber-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Automation Workflows</span>
                </button>
              </div>

              {/* Dynamic Content Preview */}
              <div className="bg-gray-950 rounded-2xl p-6 text-left border border-gray-800 min-h-[220px]">
                {activeTab === "pipeline" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
                      <span className="font-semibold text-white">Interactive Kanban Pipeline</span>
                      <span className="text-green-400 font-bold">$332,500 Active Pipeline</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                        <span className="text-[10px] text-gray-400 font-bold">QUALIFIED</span>
                        <div className="font-bold text-white text-xs">Nexus Cloud Upgrade</div>
                        <div className="text-green-400 text-xs font-bold">$48,000</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                        <span className="text-[10px] text-gray-400 font-bold">PROPOSAL SENT</span>
                        <div className="font-bold text-white text-xs">Apex Logistics Pass</div>
                        <div className="text-green-400 text-xs font-bold">$32,000</div>
                      </div>
                      <div className="bg-gray-900 p-3 rounded-xl border border-blue-500/40 space-y-1 blue-glow">
                        <span className="text-[10px] text-purple-400 font-bold">CLOSED WON 🎉</span>
                        <div className="font-bold text-white text-xs">FinPulse Expansion</div>
                        <div className="text-green-400 text-xs font-bold">$65,000</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                    <div className="flex items-center space-x-2 text-purple-400 font-semibold border-b border-gray-800 pb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Assistant Response & Tool Calling</span>
                    </div>
                    <p className="text-gray-300">
                      Query: <code className="text-purple-300 font-mono">"Show hot leads worth more than $30,000"</code>
                    </p>
                    <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-gray-200 font-mono leading-relaxed">
                      • **Samantha Reed** (CloudScale Inc) — Score: **94/100 🔥** | Value: **$52,000**<br />
                      • **Rohan Verma** (TechCorp India) — Score: **88/100 🔥** | Value: **$35,000**
                    </div>
                  </div>
                )}

                {activeTab === "automation" && (
                  <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                    <div className="flex items-center space-x-2 text-amber-400 font-semibold border-b border-gray-800 pb-2">
                      <Zap className="w-4 h-4" />
                      <span>Active Workflow Rule</span>
                    </div>
                    <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">High-Value Lead Automation</span>
                        <span className="text-gray-400 text-[11px]">Trigger: Lead Score &gt; 75 ➔ Action: Create Task & Send Email</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                        Active
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Counter Section */}
        <section className="py-16 bg-gray-950/60 border-y border-gray-800/80">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">$500M+</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Pipeline Revenue Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400">99.9%</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Uptime & Reliability</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-purple-400">2.4x</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Faster Sales Velocity</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-400">4.9 ★</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Customer Satisfaction</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
