"use client";

import { Check, Zap, CreditCard, Sparkles, ShieldCheck } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">SaaS Billing & Usage Limits</h1>
        <p className="text-sm text-gray-400">Subscription plan, payment gateways, and real-time usage metrics.</p>
      </div>

      {/* Usage Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="text-xs text-gray-400 font-medium">AI Requests Usage</span>
          <div className="text-xl font-bold text-white">720 / 1,000</div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[72%]"></div>
          </div>
          <span className="text-[10px] text-gray-500">Resets on 1st of next month</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="text-xs text-gray-400 font-medium">Total Managed Leads</span>
          <div className="text-xl font-bold text-white">35 / Unlimited</div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full w-[15%]"></div>
          </div>
          <span className="text-[10px] text-gray-500">Business Plan quota</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="text-xs text-gray-400 font-medium">Active Sales Workflows</span>
          <div className="text-xl font-bold text-white">3 / 20</div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[15%]"></div>
          </div>
          <span className="text-[10px] text-gray-500">Automation Engine</span>
        </div>
      </div>

      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Free Plan */}
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-lg">Starter Free</h3>
            <div className="text-3xl font-extrabold text-white">$0 <span className="text-xs text-gray-400 font-normal">/ mo</span></div>
            <p className="text-xs text-gray-400">For small teams getting started with lead management.</p>
            <ul className="space-y-2 text-xs text-gray-300 pt-3">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />Up to 100 leads</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />1 Sales Pipeline</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />Basic CRM Kanban</li>
            </ul>
          </div>
          <button disabled className="w-full bg-gray-800 text-gray-500 text-xs font-semibold py-2.5 rounded-xl">Current Tier</button>
        </div>

        {/* Pro Plan */}
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-lg">Pro AI Suite</h3>
            <div className="text-3xl font-extrabold text-white">$49 <span className="text-xs text-gray-400 font-normal">/ mo</span></div>
            <p className="text-xs text-gray-400">For growing teams wanting AI sales assistance & automation.</p>
            <ul className="space-y-2 text-xs text-gray-300 pt-3">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />Unlimited leads</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />AI Lead Scoring & Assistant</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-400 mr-2" />10 Automated Workflows</li>
            </ul>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg transition-all">Upgrade to Pro</button>
        </div>

        {/* Business Plan (Active) */}
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-blue-500/50 relative overflow-hidden flex flex-col justify-between blue-glow">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Active Plan</div>
          <div className="space-y-3">
            <h3 className="font-bold text-white text-lg">Enterprise Business</h3>
            <div className="text-3xl font-extrabold text-white">$129 <span className="text-xs text-gray-400 font-normal">/ mo</span></div>
            <p className="text-xs text-gray-400">Full platform capability with custom API, webhooks & SLA.</p>
            <ul className="space-y-2 text-xs text-gray-300 pt-3">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-green-400 mr-2" />Unlimited leads & pipelines</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-green-400 mr-2" />Unlimited AI assistant & scoring</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-green-400 mr-2" />Developer API & Webhooks</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-green-400 mr-2" />Razorpay & Stripe Integration</li>
            </ul>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg">Manage Subscription</button>
        </div>
      </div>
    </div>
  );
}
