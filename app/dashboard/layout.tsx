"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Kanban,
  Package,
  CheckSquare,
  Calendar,
  Mail,
  Zap,
  Bot,
  BarChart3,
  Key,
  CreditCard,
  Settings,
  Search,
  Sparkles,
  LogOut,
  ChevronDown,
  Sparkle,
  Radio,
} from "lucide-react";
import { CommandPalette } from "@/components/CommandPalette";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const mainDashboard: NavItem = { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard };

  const navGroups: NavGroup[] = [
    {
      group: "CRM CORE",
      items: [
        { label: "Leads", href: "/dashboard/leads", icon: Users, badge: "35" },
        { label: "Contacts", href: "/dashboard/contacts", icon: Users },
        { label: "Companies", href: "/dashboard/companies", icon: Building2 },
        { label: "Deals Pipeline", href: "/dashboard/deals", icon: Kanban, badge: "Live" },
        { label: "Products", href: "/dashboard/products", icon: Package },
      ],
    },
    {
      group: "ACTIVITIES",
      items: [
        { label: "Tasks Queue", href: "/dashboard/tasks", icon: CheckSquare, badge: "3" },
        { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      ],
    },
    {
      group: "INTELLIGENCE & AUTOMATION",
      items: [
        { label: "Communication", href: "/dashboard/communication", icon: Mail },
        { label: "Sales Automation", href: "/dashboard/automation", icon: Zap },
        { label: "AI Sales Suite", href: "/dashboard/ai", icon: Bot, badge: "GPT-4o" },
        { label: "Analytics & Reports", href: "/dashboard/analytics", icon: BarChart3 },
      ],
    },
    {
      group: "PLATFORM",
      items: [
        { label: "Developer API", href: "/dashboard/developer", icon: Key },
        { label: "Billing & Plan", href: "/dashboard/billing", icon: CreditCard },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const MainIcon = mainDashboard.icon;
  const isMainActive = pathname === mainDashboard.href;

  return (
    <div className="min-h-screen bg-[#050811] text-gray-100 flex overflow-hidden">
      {/* Sleek Dark Sidebar */}
      <aside className="w-64 bg-[#080d1a]/90 border-r border-white/[0.07] flex flex-col z-20 shrink-0 backdrop-blur-xl">
        {/* Brand Logo & Workspace Switcher */}
        <div className="p-4 border-b border-white/[0.07] space-y-3">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-sm shadow-lg blue-glow border border-blue-400/30">
              SF
            </div>
            <div>
              <span className="font-extrabold text-white tracking-wide text-sm block leading-none">SalesFlow AI</span>
              <span className="text-[10px] text-blue-400 font-medium tracking-wider uppercase mt-1 block">Commercial SaaS</span>
            </div>
          </Link>

          {/* Org Selector Pill */}
          <div className="bg-gray-900/90 border border-white/[0.08] p-2 rounded-xl flex items-center justify-between text-xs cursor-pointer hover:border-blue-500/40 transition-all">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-semibold text-gray-200 text-xs">Acme Global</span>
            </div>
            <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">PRO</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          <Link
            href={mainDashboard.href}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isMainActive
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg blue-glow"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <div className="flex items-center">
              <MainIcon className="w-4 h-4 mr-2.5" />
              {mainDashboard.label}
            </div>
          </Link>

          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`w-4 h-4 mr-2.5 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? "bg-blue-500/20 text-blue-300" : "bg-gray-800 text-gray-400"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-white/[0.07] bg-[#050811]/60">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                AV
              </div>
              <div>
                <span className="font-semibold text-gray-200 block text-[11px] leading-tight">Alex Vance</span>
                <span className="text-[10px] text-gray-500 block leading-tight">alex@acme.com</span>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout" className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-[#080d1a]/80 border-b border-white/[0.07] px-6 flex items-center justify-between backdrop-blur-xl z-10">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center text-xs text-gray-400 bg-gray-900/90 border border-white/[0.08] hover:border-blue-500/40 px-3.5 py-2 rounded-xl w-80 justify-between transition-all group"
          >
            <span className="flex items-center">
              <Search className="w-3.5 h-3.5 mr-2 text-gray-400 group-hover:text-blue-400 transition-colors" />
              Search CRM or commands...
            </span>
            <kbd className="px-1.5 py-0.5 bg-gray-800 text-[10px] rounded text-gray-400 border border-gray-700 font-mono">⌘ K</kbd>
          </button>

          {/* Right Actions & AI Trigger */}
          <div className="flex items-center space-x-4">
            {/* System Live Status */}
            <div className="hidden md:flex items-center space-x-2 text-[11px] text-gray-400 bg-gray-900/80 px-3 py-1.5 rounded-full border border-white/[0.06]">
              <Radio className="w-3 h-3 text-green-400 animate-pulse" />
              <span className="text-gray-300 font-medium">AI Tools Online</span>
            </div>

            {/* AI Assistant Drawer Trigger */}
            <button
              onClick={() => setIsAIOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all blue-glow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Assistant</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Global Modals */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <AIAssistantDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
}
