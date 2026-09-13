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
} from "lucide-react";
import { CommandPalette } from "@/components/CommandPalette";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
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
      group: "CRM",
      items: [
        { label: "Leads", href: "/dashboard/leads", icon: Users },
        { label: "Contacts", href: "/dashboard/contacts", icon: Users },
        { label: "Companies", href: "/dashboard/companies", icon: Building2 },
        { label: "Deals Pipeline", href: "/dashboard/deals", icon: Kanban },
        { label: "Products", href: "/dashboard/products", icon: Package },
      ],
    },
    {
      group: "ACTIVITIES",
      items: [
        { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      ],
    },
    {
      group: "INTELLIGENCE & AUTOMATION",
      items: [
        { label: "Communication", href: "/dashboard/communication", icon: Mail },
        { label: "Sales Automation", href: "/dashboard/automation", icon: Zap },
        { label: "AI Sales Suite", href: "/dashboard/ai", icon: Bot },
        { label: "Analytics & Reports", href: "/dashboard/analytics", icon: BarChart3 },
      ],
    },
    {
      group: "PLATFORM",
      items: [
        { label: "Developer API", href: "/dashboard/developer", icon: Key },
        { label: "Billing & Subscription", href: "/dashboard/billing", icon: CreditCard },
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
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800/80 flex flex-col z-20 shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-gray-800/80 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg blue-glow">
              SF
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-base block leading-none">SalesFlow AI</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-1 block">Enterprise CRM</span>
            </div>
          </Link>
        </div>

        {/* Sidebar Nav items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          <Link
            href={mainDashboard.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isMainActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            <MainIcon className="w-4 h-4 mr-3" />
            {mainDashboard.label}
          </Link>

          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Organization Info Footer */}
        <div className="p-4 border-t border-gray-800/80 bg-gray-950/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div>
              <span className="font-semibold text-gray-200 block">Acme Global</span>
              <span className="text-[10px] text-green-400 font-medium">Business Plan • Active</span>
            </div>
            <button onClick={handleLogout} title="Logout" className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-red-400">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-gray-950/80 border-b border-gray-800/80 px-6 flex items-center justify-between backdrop-blur-md z-10">
          {/* Global Search Bar Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center text-xs text-gray-400 bg-gray-900 border border-gray-800 hover:border-gray-700 px-3.5 py-2 rounded-xl w-72 justify-between transition-all"
          >
            <span className="flex items-center">
              <Search className="w-3.5 h-3.5 mr-2 text-gray-500" />
              Search CRM or commands...
            </span>
            <kbd className="px-1.5 py-0.5 bg-gray-800 text-[10px] rounded text-gray-400 border border-gray-700">Ctrl K</kbd>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAIOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Assistant</span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-2 border-l border-gray-800 pl-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                AV
              </div>
              <span className="text-xs font-medium text-gray-300">Alex Vance</span>
            </div>
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
