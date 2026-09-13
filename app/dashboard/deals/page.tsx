"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, DollarSign, Building2, User, Sparkles, AlertCircle, Kanban } from "lucide-react";

interface Stage {
  id: string;
  name: string;
  order: number;
  probability: number;
}

interface Deal {
  id: string;
  name: string;
  amount: number;
  probability: number;
  status: string;
  stageId: string;
  company?: { name: string } | null;
  contact?: { name: string } | null;
}

export default function DealsPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // New Deal Form State
  const [formData, setFormData] = useState({
    name: "",
    amount: "45000",
    stageId: "",
    probability: "50",
  });

  const fetchPipeline = () => {
    setLoading(true);
    fetch("/api/deals")
      .then((res) => res.json())
      .then((data) => {
        if (data.pipeline) {
          setStages(data.pipeline.stages || []);
          if (data.pipeline.stages?.length > 0 && !formData.stageId) {
            setFormData((prev) => ({ ...prev, stageId: data.pipeline.stages[0].id }));
          }
        }
        setDeals(data.deals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPipeline();
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const targetStageId = destination.droppableId;

    // Optimistic UI update
    setDeals((prev) =>
      prev.map((d) => (d.id === draggableId ? { ...d, stageId: targetStageId } : d))
    );

    // Call backend API
    await fetch("/api/deals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: draggableId, stageId: targetStageId }),
    });
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setFormData({ name: "", amount: "45000", stageId: stages[0]?.id || "", probability: "50" });
      fetchPipeline();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        <span>Loading Kanban Sales Pipeline...</span>
      </div>
    );
  }

  const STAGE_ACCENTS = ["border-t-blue-500", "border-t-purple-500", "border-t-amber-500", "border-t-indigo-500", "border-t-pink-500", "border-t-green-500", "border-t-red-500"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Kanban Sales Pipeline</h1>
          <p className="text-xs text-gray-400">Drag and drop deals across stages to update status and trigger workflows.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all blue-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Drag Drop Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-6">
          {stages.map((stage, sIdx) => {
            const stageDeals = deals.filter((d) => d.stageId === stage.id);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);
            const accentClass = STAGE_ACCENTS[sIdx % STAGE_ACCENTS.length];

            return (
              <div key={stage.id} className={`w-80 shrink-0 flex flex-col glass-card rounded-3xl p-4 border border-white/[0.08] border-t-4 ${accentClass}`}>
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-3">
                  <div>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">{stage.name}</h3>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      {stageDeals.length} deals • ${stageTotal.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {stage.probability}%
                  </span>
                </div>

                {/* Droppable Column */}
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 min-h-[420px] space-y-3 transition-colors rounded-2xl p-1 ${
                        snapshot.isDraggingOver ? "bg-blue-600/10 border border-dashed border-blue-500/40" : ""
                      }`}
                    >
                      {stageDeals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-900/90 border border-white/[0.08] rounded-2xl p-4 space-y-3 cursor-grab hover:border-blue-500/40 transition-all ${
                                snapshot.isDragging ? "shadow-2xl border-blue-500 ring-2 ring-blue-500/30 scale-105 z-30" : ""
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <h4 className="font-bold text-white text-xs leading-snug">{deal.name}</h4>
                              </div>

                              <div className="text-base font-extrabold text-green-400">
                                ${deal.amount.toLocaleString()}
                              </div>

                              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-white/[0.06] pt-2">
                                <div className="flex items-center space-x-1">
                                  <Building2 className="w-3 h-3 text-gray-500" />
                                  <span className="text-gray-300 font-medium">{deal.company?.name || "Acme Client"}</span>
                                </div>
                                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                                  Hot 🔥
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-gray-900 border border-white/[0.08] rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-extrabold text-white">Create New Deal</h2>
            <form onSubmit={handleCreateDeal} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Acme Enterprise SaaS Upgrade"
                  className="w-full bg-gray-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Deal Amount ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-gray-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Pipeline Stage</label>
                  <select
                    value={formData.stageId}
                    onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
                    className="w-full bg-gray-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {stages.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
