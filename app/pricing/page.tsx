"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, DollarSign, Calculator, Sparkles, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [teamSize, setTeamSize] = useState(10);
  const [avgDealSize, setAvgDealSize] = useState(25000);

  // ROI Calculations
  const salesforceCostPerYear = teamSize * 150 * 12;
  const hubspotCostPerYear = teamSize * 90 * 12;
  const salesflowCostPerYear = annual ? 129 * 12 : 149 * 12; // Flat plan price!

  const savingsVsSalesforce = salesforceCostPerYear - salesflowCostPerYear;

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            Transparent Pricing Structure
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Simple Plans. Zero Per-Seat Penalties.</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Scale your sales team without paying $150/user every single month.</p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center space-x-3 text-xs">
            <span className={!annual ? "text-white font-bold" : "text-gray-400"}>Monthly Billing</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 bg-blue-600 rounded-full p-1 transition-colors relative"
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${annual ? "translate-x-6" : ""}`}></div>
            </button>
            <span className={annual ? "text-white font-bold" : "text-gray-400"}>
              Annual Billing <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Free */}
          <div className="glass-card p-6 rounded-2xl space-y-5 border border-gray-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-white text-xl">Starter Free</h3>
              <div className="text-4xl font-extrabold text-white">$0</div>
              <p className="text-xs text-gray-400">For small teams getting started with lead tracking.</p>
              <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-800 pt-4">
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />Up to 100 leads</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />1 Kanban Sales Pipeline</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />Basic Task Management</li>
              </ul>
            </div>
            <Link href="/register" className="w-full text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs py-3 rounded-xl transition-all">
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-6 rounded-2xl space-y-5 border border-gray-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-white text-xl">Pro AI Suite</h3>
              <div className="text-4xl font-extrabold text-white">
                ${annual ? "39" : "49"} <span className="text-xs text-gray-400 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-gray-400">For growing teams wanting AI scoring & workflow automation.</p>
              <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-800 pt-4">
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />Unlimited Managed Leads</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />AI Lead Scoring & Assistant</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />10 Automated Workflows</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-400 mr-2" />AI Email Draft Generator</li>
              </ul>
            </div>
            <Link href="/register" className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 rounded-xl shadow-lg transition-all">
              Start Pro Free Trial
            </Link>
          </div>

          {/* Enterprise Business */}
          <div className="glass-card p-6 rounded-2xl space-y-5 border border-blue-500/50 relative overflow-hidden flex flex-col justify-between blue-glow">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold px-3.5 py-1 rounded-bl-xl uppercase">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-white text-xl">Enterprise Business</h3>
              <div className="text-4xl font-extrabold text-white">
                ${annual ? "99" : "129"} <span className="text-xs text-gray-400 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-gray-400">Full platform access with Developer API, webhooks & SLA.</p>
              <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-800 pt-4">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Unlimited leads & pipelines</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Unlimited AI assistant tool calls</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Developer API Keys & Webhooks</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Custom Field Builder</li>
              </ul>
            </div>
            <Link href="/register" className="w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs py-3 rounded-xl shadow-lg transition-all">
              Get Enterprise Business
            </Link>
          </div>
        </div>

        {/* Interactive ROI & Savings Calculator Slider */}
        <div className="glass-card p-8 rounded-3xl space-y-6 border border-blue-500/30 blue-glow">
          <div className="flex items-center space-x-2 text-blue-400">
            <Calculator className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Interactive ROI & Cost Savings Calculator</h2>
          </div>
          <p className="text-xs text-gray-400">Calculate how much your organization saves switching from per-seat CRM pricing.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Sales Representatives / Users</span>
                  <span className="font-bold text-white text-sm">{teamSize} reps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Average Deal Size ($)</span>
                  <span className="font-bold text-white text-sm">${avgDealSize.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={avgDealSize}
                  onChange={(e) => setAvgDealSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Savings Result Card */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 text-center space-y-4">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Annual Cost Savings</span>
              <div className="text-4xl font-extrabold text-green-400">${savingsVsSalesforce.toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ year</span></div>
              <p className="text-xs text-gray-400">
                Salesforce Enterprise for {teamSize} reps costs **${salesforceCostPerYear.toLocaleString()}/yr**. SalesFlow AI costs only **${salesflowCostPerYear.toLocaleString()}/yr** for your entire team!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
