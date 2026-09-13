"use client";

import { useState } from "react";
import { Shield, Building2, Users, Lock, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Acme Global Solutions");
  const [industry, setIndustry] = useState("Technology & Software");
  const [currency, setCurrency] = useState("USD");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Organization & Platform Settings</h1>
        <p className="text-sm text-gray-400">Configure company metadata, RBAC permissions, and team roles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Org Settings Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="flex items-center space-x-2 text-blue-400 border-b border-gray-800 pb-3">
            <Building2 className="w-5 h-5" />
            <h3 className="font-semibold text-white text-base">Organization Details</h3>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Company Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              {saved ? <Check className="w-4 h-4 text-green-300" /> : <Save className="w-4 h-4" />}
              <span>{saved ? "Settings Saved" : "Save Settings"}</span>
            </button>
          </div>
        </form>

        {/* RBAC Matrix Card */}
        <div className="glass-card p-6 rounded-2xl space-y-4 border border-gray-800">
          <div className="flex items-center space-x-2 text-purple-400 border-b border-gray-800 pb-3">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold text-white text-base">User Roles & Access</h3>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { role: "OWNER", desc: "Full administrative & billing control", badge: "bg-purple-500/20 text-purple-400" },
              { role: "ADMIN", desc: "Manage org users & team settings", badge: "bg-blue-500/20 text-blue-400" },
              { role: "MANAGER", desc: "Manage pipeline & workflow rules", badge: "bg-green-500/20 text-green-400" },
              { role: "SALES_AGENT", desc: "Manage assigned leads & deals", badge: "bg-amber-500/20 text-amber-400" },
              { role: "VIEWER", desc: "Read-only analytics access", badge: "bg-gray-800 text-gray-400" },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-gray-950 rounded-xl border border-gray-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.badge}`}>{r.role}</span>
                </div>
                <p className="text-gray-400 text-[11px]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
