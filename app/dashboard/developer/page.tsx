"use client";

import { useEffect, useState } from "react";
import { Key, Globe, Plus, Copy, Shield, Check } from "lucide-react";

export default function DeveloperPage() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [newSecretKey, setNewSecretKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = () => {
    fetch("/api/developer/api-keys").then((res) => res.json()).then((d) => setApiKeys(d.apiKeys || []));
    fetch("/api/developer/webhooks").then((res) => res.json()).then((d) => setWebhooks(d.webhooks || []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;

    const res = await fetch("/api/developer/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: keyName }),
    });

    const data = await res.json();
    setNewSecretKey(data.secretKey);
    setKeyName("");
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Developer API & Webhooks</h1>
          <p className="text-sm text-gray-400">Generate secure API keys, manage custom integrations, and subscribe to webhooks.</p>
        </div>
        <button
          onClick={() => { setNewSecretKey(null); setShowKeyModal(true); }}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create API Key</span>
        </button>
      </div>

      {/* API Keys Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800 p-5 space-y-4">
        <div className="flex items-center space-x-2 text-blue-400">
          <Key className="w-4 h-4" />
          <h3 className="font-semibold text-white text-sm">Active Secret API Keys</h3>
        </div>

        <div className="divide-y divide-gray-800 text-xs">
          {apiKeys.length === 0 ? (
            <div className="py-6 text-center text-gray-500">No API keys created yet.</div>
          ) : (
            apiKeys.map((k) => (
              <div key={k.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">{k.name}</span>
                  <span className="font-mono text-gray-400 text-[11px]">{k.keyPrefix}</span>
                </div>
                <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                  Active
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Webhooks Endpoint Manager */}
      <div className="glass-card rounded-2xl p-5 space-y-4 border border-gray-800">
        <div className="flex items-center space-x-2 text-purple-400">
          <Globe className="w-4 h-4" />
          <h3 className="font-semibold text-white text-sm">Registered Webhook Endpoints</h3>
        </div>

        <div className="space-y-3">
          {webhooks.length === 0 ? (
            <div className="py-6 text-center text-gray-500 text-xs">No webhooks registered.</div>
          ) : (
            webhooks.map((w) => (
              <div key={w.id} className="bg-gray-950 p-3.5 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{w.name}</span>
                  <span className="text-gray-400 font-mono">{w.url}</span>
                </div>
                <span className="text-green-400 font-medium">Subscribed: lead.created, deal.updated</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Generate Secret API Key</h2>
            
            {!newSecretKey ? (
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Key Label *</label>
                  <input
                    type="text"
                    required
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="e.g. Zapier Integration Production"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                  <button type="button" onClick={() => setShowKeyModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white">
                    Generate Key
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                  ⚠️ Make sure to copy your secret key now. You will not be able to see it again!
                </div>
                <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs font-mono text-green-400 break-all flex items-center justify-between">
                  <span>{newSecretKey}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(newSecretKey);
                      setCopied(true);
                    }}
                    className="p-1 text-gray-300 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="w-full bg-blue-600 text-white font-semibold text-xs py-2 rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
