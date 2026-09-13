"use client";

import { useEffect, useState } from "react";
import { Zap, Plus, ArrowRight, Play, CheckCircle2, AlertCircle } from "lucide-react";

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("LEAD_QUALIFIED");
  const [actionType, setActionType] = useState("CREATE_TASK");

  const fetchWorkflows = () => {
    fetch("/api/workflows")
      .then((res) => res.json())
      .then((data) => {
        setWorkflows(data.workflows || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        triggerEvent,
        actionType,
        field: "score",
        operator: "GREATER_THAN",
        value: "70",
      }),
    });

    setName("");
    setShowModal(false);
    fetchWorkflows();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sales Automation Engine</h1>
          <p className="text-sm text-gray-400">Trigger automatic tasks, emails, lead assignments, and webhook events.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow Rule</span>
        </button>
      </div>

      {/* Workflows Visual List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading automation workflows...</div>
        ) : workflows.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No active workflows created.</div>
        ) : (
          workflows.map((wf) => (
            <div key={wf.id} className="glass-card p-5 rounded-2xl space-y-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{wf.name}</h3>
                    <span className="text-xs text-gray-400">{wf.description || "Active automated rule"}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                  <span>Active</span>
                </span>
              </div>

              {/* Trigger -> Condition -> Action Visual Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-950/80 p-3.5 rounded-xl text-xs text-gray-300 border border-gray-800/80">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Trigger:</span>
                  <span className="font-semibold text-blue-400">{wf.triggerEvent}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Condition:</span>
                  <span className="font-semibold text-purple-400">Score &gt; 70</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Action:</span>
                  <span className="font-semibold text-green-400">{wf.actions[0]?.actionType || "CREATE_TASK"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Create Workflow Rule</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Workflow Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lead Score > 80 Auto-Assignment"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Trigger Event</label>
                <select
                  value={triggerEvent}
                  onChange={(e) => setTriggerEvent(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="LEAD_CREATED">When Lead Created</option>
                  <option value="LEAD_QUALIFIED">When Lead Qualified</option>
                  <option value="DEAL_STAGE_CHANGED">When Deal Stage Changes</option>
                  <option value="DEAL_WON">When Deal Won</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Automated Action</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="CREATE_TASK">Create Priority Task</option>
                  <option value="SEND_EMAIL">Send Welcome Email</option>
                  <option value="TRIGGER_WEBHOOK">Fire External Webhook</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white">
                  Save Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
