import Link from "next/link";
import { Sparkles, ArrowRight, Shield, Zap, Bot, Users, DollarSign, CheckCircle2, Star, Kanban, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md fixed top-0 w-full z-50 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg blue-glow">
            SF
          </div>
          <span className="font-bold text-white tracking-wide text-base">SalesFlow AI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-gray-300">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#ai-assistant" className="hover:text-blue-400 transition-colors">AI Suite</a>
          <a href="#automation" className="hover:text-blue-400 transition-colors">Automation</a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/login" className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2">
            Sign In
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center space-y-8 relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation AI Sales SaaS</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Manage relationships. Automate sales. <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Close smarter.</span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          SalesFlow AI combines intelligent lead scoring, drag-and-drop Kanban pipelines, automated workflow triggers, and server-side AI chat assistance to accelerate your revenue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2">
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/login" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all">
            Explore Live Demo
          </Link>
        </div>

        {/* Dashboard Mockup Banner */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="glass-card p-3 rounded-3xl border border-gray-800 shadow-2xl blue-glow">
            <div className="bg-gray-950 rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500 font-mono ml-2">salesflow-ai.app/dashboard</span>
                </div>
                <span className="text-xs text-blue-400 font-semibold">Active Enterprise Pipeline</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Pipeline</span>
                  <div className="text-lg font-bold text-white">$332,500</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Closed Won</span>
                  <div className="text-lg font-bold text-green-400">$107,000</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Hot Leads</span>
                  <div className="text-lg font-bold text-purple-400">18 Prospects</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">AI Win Rate</span>
                  <div className="text-lg font-bold text-amber-400">68%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto border-t border-gray-800/80">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Built for Commercial Sales Acceleration</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Everything modern high-velocity sales teams need to turn prospects into revenue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-3 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Kanban className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Kanban Sales Pipeline</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Drag-and-drop deal management with probability weighting, stage totals, and instant stage trigger execution.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">AI Sales Assistant & Scoring</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Server-side database tools calculate lead scores (0-100), generate personalized email drafts, and answer natural queries.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-3 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Automated Workflows</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Rule builder executing automated tasks, follow-up emails, lead re-assignments, and webhook dispatches on custom events.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto border-t border-gray-800/80">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Transparent SaaS Pricing</h2>
          <p className="text-gray-400 text-sm">Choose the tier that matches your organization's growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
            <h3 className="font-bold text-white text-lg">Starter Free</h3>
            <div className="text-3xl font-extrabold text-white">$0</div>
            <p className="text-xs text-gray-400">Basic CRM & lead management.</p>
            <Link href="/register" className="w-full block text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2.5 rounded-xl">Get Started</Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-blue-500/50 blue-glow">
            <h3 className="font-bold text-white text-lg">Pro AI Suite</h3>
            <div className="text-3xl font-extrabold text-white">$49 <span className="text-xs text-gray-400 font-normal">/ mo</span></div>
            <p className="text-xs text-gray-400">AI lead scoring & sales automation.</p>
            <Link href="/register" className="w-full block text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 rounded-xl shadow-lg">Start Free Trial</Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
            <h3 className="font-bold text-white text-lg">Enterprise Business</h3>
            <div className="text-3xl font-extrabold text-white">$129 <span className="text-xs text-gray-400 font-normal">/ mo</span></div>
            <p className="text-xs text-gray-400">Full API, webhooks & priority SLA.</p>
            <Link href="/register" className="w-full block text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-2.5 rounded-xl">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 py-8 text-center text-xs text-gray-500">
        © 2026 SalesFlow AI SaaS Platform. All rights reserved.
      </footer>
    </div>
  );
}
