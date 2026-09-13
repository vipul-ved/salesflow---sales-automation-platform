"use client";

import { useState } from "react";
import { Bot, Sparkles, TrendingUp, Search, Send, Zap, BrainCircuit } from "lucide-react";

export default function AISuitePage() {
  const [nlQuery, setNlQuery] = useState("Show hot leads with deal value above $30,000");
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunNLQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: nlQuery }),
      });
      const data = await res.json();
      setQueryResult(data.answer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Intelligence & Assistant Suite</h1>
        <p className="text-sm text-gray-400">Natural language search, lead scoring algorithms, and weighted revenue forecasting.</p>
      </div>

      {/* Natural Language CRM Search Playground */}
      <div className="glass-card p-6 rounded-2xl space-y-4 border border-blue-500/30 blue-glow">
        <div className="flex items-center space-x-2 text-blue-400">
          <BrainCircuit className="w-5 h-5" />
          <h3 className="font-semibold text-white text-base">Natural Language CRM Search</h3>
        </div>
        <p className="text-xs text-gray-400">Type natural queries to translate into safe, structured CRM database filters.</p>

        <form onSubmit={handleRunNLQuery} className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
          >
            {loading ? "Searching..." : "Execute Query"}
          </button>
        </form>

        {queryResult && (
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
            {queryResult}
          </div>
        )}
      </div>

      {/* AI Revenue Forecast Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-base">AI Weighted Revenue Forecast</h3>
            <span className="text-xs text-purple-400 font-medium">Confidence Score: 89%</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Total Active Pipeline</span>
              <span className="font-bold text-white">$332,500</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">AI Weighted Forecast (Probability Adjusted)</span>
              <span className="font-bold text-green-400">$218,400</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">High Confidence Deals (Negotiation/Won)</span>
              <span className="font-bold text-blue-400">$155,000</span>
            </div>
          </div>
        </div>

        {/* Lead Scoring Signals explanation */}
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
          <h3 className="font-semibold text-white text-base">AI Lead Scoring Matrix</h3>
          <p className="text-xs text-gray-400">Automatically evaluates customer signals to assign a score from 0-100.</p>

          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-center"><Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2" />High Estimated Value (&gt;$20,000) 👉 +25 pts</li>
            <li className="flex items-center"><Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2" />Enterprise Target Industry 👉 +15 pts</li>
            <li className="flex items-center"><Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2" />High-Converting Channel (Referral) 👉 +10 pts</li>
            <li className="flex items-center"><Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2" />Recent Activity within 7 days 👉 +10 pts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
