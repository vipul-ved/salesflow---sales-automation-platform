"use client";

import { useState } from "react";
import { Sparkles, MessageSquare, Copy, Check, ShieldAlert } from "lucide-react";

export default function AIScriptsPage() {
  const [objection, setObjection] = useState("Budget is too high / Expensive");
  const [industry, setIndustry] = useState("Software & Technology");
  const [generatedScript, setGeneratedScript] = useState<{ callScript: string; followUpEmail: string } | null>({
    callScript: "I completely understand budget constraints, Vipul. However, most teams using legacy CRMs pay $150/user every month. SalesFlow AI provides flat enterprise pricing with built-in AI lead scoring and workflow triggers—saving our clients over $45,000 annually. Would you be open to seeing a 5-minute ROI comparison?",
    followUpEmail: "Subject: Re: SalesFlow AI ROI & Budget Comparison for {{company}}\n\nHi {{first_name}},\n\nThanks for speaking with me earlier. Following up on your point regarding budget, I wanted to share a quick 1-page ROI breakdown showing how SalesFlow AI replaces multiple per-seat software licenses with flat transparent pricing.\n\nLet me know if Thursday afternoon works for a quick review.\n\nBest,\nSalesFlow Team",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a cold calling rebuttal script and follow-up email for objection '${objection}' in the '${industry}' industry.`,
        }),
      });
      const data = await res.json();
      setGeneratedScript({
        callScript: data.answer || "Script generation ready.",
        followUpEmail: `Subject: Follow up regarding ${objection}\n\nHi,\n\nFollowing up on our conversation about ${objection.toLowerCase()}...`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Sales Objection & Cold Call Script Generator</h1>
        <p className="text-sm text-gray-400">Generate instant live rebuttal scripts and email follow-ups for common buyer objections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <form onSubmit={handleGenerateScript} className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="flex items-center space-x-2 text-purple-400 border-b border-gray-800 pb-3">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold text-white text-base">Select Objection Parameters</h3>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Common Buyer Objection</label>
            <select
              value={objection}
              onChange={(e) => setObjection(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Budget is too high / Expensive">"Budget is too high / Expensive"</option>
              <option value="We are already using Salesforce / HubSpot">"We are already using Salesforce / HubSpot"</option>
              <option value="Just send me an email first">"Just send me an email first"</option>
              <option value="Need approval from CTO / Board">"Need approval from CTO / Board"</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Target Prospect Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Software & Technology">Software & Technology</option>
              <option value="Fintech & Banking">Fintech & Banking</option>
              <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
              <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs py-2.5 rounded-xl shadow-lg transition-all"
          >
            {loading ? "Generating Rebuttal Script..." : "Generate AI Rebuttal Script"}
          </button>
        </form>

        {/* Output Display Card */}
        <div className="lg:col-span-2 space-y-4">
          {generatedScript && (
            <>
              {/* Cold Call Script Rebuttal */}
              <div className="glass-card p-6 rounded-2xl space-y-3 border border-purple-500/30 purple-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Live Call Rebuttal Script</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedScript.callScript);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center space-x-1 text-xs text-gray-300 hover:text-white bg-gray-900 px-2.5 py-1 rounded"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Script"}</span>
                  </button>
                </div>
                <div className="bg-gray-950 p-4 rounded-xl text-xs text-gray-200 leading-relaxed font-mono">
                  {generatedScript.callScript}
                </div>
              </div>

              {/* Follow Up Email */}
              <div className="glass-card p-6 rounded-2xl space-y-3 border border-gray-800">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Follow-Up Email Template</span>
                <div className="bg-gray-950 p-4 rounded-xl text-xs text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {generatedScript.followUpEmail}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
