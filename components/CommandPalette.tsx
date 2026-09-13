"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, Users, Building2, DollarSign, CheckSquare, Bot, Zap, Key, CreditCard, X } from "lucide-react";

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Leads Management", href: "/dashboard/leads", icon: Users },
    { label: "Contacts Directory", href: "/dashboard/contacts", icon: Users },
    { label: "Companies Portfolio", href: "/dashboard/companies", icon: Building2 },
    { label: "Deals & Sales Pipeline", href: "/dashboard/deals", icon: DollarSign },
    { label: "Tasks & Priority Queue", href: "/dashboard/tasks", icon: CheckSquare },
    { label: "AI Sales Assistant & Insights", href: "/dashboard/ai", icon: Bot },
    { label: "Sales Automation Builder", href: "/dashboard/automation", icon: Zap },
    { label: "Developer API & Webhooks", href: "/dashboard/developer", icon: Key },
    { label: "SaaS Billing & Subscriptions", href: "/dashboard/billing", icon: CreditCard },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="flex items-center px-4 border-b border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search CRM (Ctrl + K)..."
            className="w-full py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">No matching CRM pages found.</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavigate(action.href)}
                  className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-transparent transition-all group"
                >
                  <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-400" />
                  <span>{action.label}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-gray-950 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
          <span>Navigate with click or arrow keys</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-300">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
