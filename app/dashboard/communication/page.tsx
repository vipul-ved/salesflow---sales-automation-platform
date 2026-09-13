"use client";

import { useState } from "react";
import { Mail, Sparkles, Copy, Send, Check } from "lucide-react";

export default function CommunicationPage() {
  const [showGenModal, setShowGenModal] = useState(false);
  const [genData, setGenData] = useState({
    recipientName: "Samantha Reed",
    companyName: "CloudScale Inc",
    dealValue: "52000",
    objective: "Follow up after product demo and request executive meeting",
    tone: "Professional",
  });
  const [draftResult, setDraftResult] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/ai/email-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genData),
      });

      const result = await res.json();
      setDraftResult(result);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!draftResult) return;
    navigator.clipboard.writeText(`Subject: ${draftResult.subject}\n\n${draftResult.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Communication & Email Center</h1>
          <p className="text-sm text-gray-400">Email templates, outreach history, and AI draft generation.</p>
        </div>
        <button
          onClick={() => setShowGenModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Email with AI</span>
        </button>
      </div>

      {/* Templates Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Template #1</span>
            <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Cold Outreach</span>
          </div>
          <h3 className="font-semibold text-white text-sm">Cold Outreach - Executive Discovery</h3>
          <p className="text-xs text-gray-400">Variable tags: <code className="text-blue-300">{"{{first_name}}"}</code>, <code className="text-blue-300">{"{{company}}"}</code></p>
          <div className="bg-gray-900/80 p-3 rounded-xl text-xs text-gray-300 font-mono">
            Hi {"{{first_name}}"}, I noticed {"{{company}}"} is expanding. SalesFlow AI helps high-growth sales teams double conversion...
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Template #2</span>
            <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Proposal</span>
          </div>
          <h3 className="font-semibold text-white text-sm">Post-Demo Proposal Follow-up</h3>
          <p className="text-xs text-gray-400">Variable tags: <code className="text-purple-300">{"{{deal_value}}"}</code></p>
          <div className="bg-gray-900/80 p-3 rounded-xl text-xs text-gray-300 font-mono">
            Hi {"{{first_name}}"}, thank you for your time during our demonstration today! Attached is custom proposal valued at {"{{deal_value}}"}...
          </div>
        </div>
      </div>

      {/* AI Email Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center space-x-2 text-blue-400">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">AI Sales Email Generator</h2>
              </div>
              <button onClick={() => setShowGenModal(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={genData.recipientName}
                    onChange={(e) => setGenData({ ...genData, recipientName: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Company</label>
                  <input
                    type="text"
                    value={genData.companyName}
                    onChange={(e) => setGenData({ ...genData, companyName: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Tone</label>
                  <select
                    value={genData.tone}
                    onChange={(e) => setGenData({ ...genData, tone: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Persuasive">Persuasive</option>
                    <option value="Short & Direct">Short & Direct</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    value={genData.dealValue}
                    onChange={(e) => setGenData({ ...genData, dealValue: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Objective / Context</label>
                <textarea
                  rows={2}
                  value={genData.objective}
                  onChange={(e) => setGenData({ ...genData, objective: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs py-2.5 rounded-xl shadow-lg transition-all"
              >
                {loading ? "Generating Draft..." : "Generate AI Draft"}
              </button>
            </form>

            {draftResult && (
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
                  <span>Subject: {draftResult.subject}</span>
                  <button onClick={handleCopy} className="flex items-center space-x-1 text-gray-300 hover:text-white bg-gray-800 px-2.5 py-1 rounded">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed border-t border-gray-800/80 pt-2 font-mono">
                  {draftResult.body}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
