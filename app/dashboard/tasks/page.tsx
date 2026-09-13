"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Plus, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    });
    setTitle("");
    fetchTasks();
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "COMPLETED" ? "TODO" : "COMPLETED";
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });
    fetchTasks();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Tasks & Priority Queue</h1>
        <p className="text-sm text-gray-400">Action items, follow-up calls, and automated workflow tasks.</p>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleCreate} className="glass-card p-4 rounded-2xl flex items-center space-x-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task (e.g., Follow up with CloudScale CTO)..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-xs text-gray-300 px-3 py-2.5 rounded-xl focus:outline-none"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent ⚡</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No pending tasks found.</div>
        ) : (
          tasks.map((task) => {
            const isCompleted = task.status === "COMPLETED";
            return (
              <div
                key={task.id}
                className={`glass-card p-4 rounded-xl flex items-center justify-between transition-all ${
                  isCompleted ? "opacity-60 bg-gray-900/40" : "hover:border-blue-500/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggle(task.id, task.status)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isCompleted ? "bg-green-500 border-green-500 text-black" : "border-gray-700 hover:border-blue-500"
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <span className={`text-xs font-medium ${isCompleted ? "line-through text-gray-500" : "text-white"}`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === "URGENT"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : task.priority === "HIGH"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
