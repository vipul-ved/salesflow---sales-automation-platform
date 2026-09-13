import Link from "next/link";
import { Sparkles, Globe, Shield, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg text-xs">
              SF
            </div>
            <span className="font-extrabold text-white tracking-wide text-sm">SalesFlow AI</span>
          </Link>
          <p className="text-gray-400 leading-relaxed text-xs">
            Commercial-grade AI CRM & Sales Automation platform. Manage relationships, automate sales pipelines, and close smarter.
          </p>
          <div className="text-[11px] text-gray-500 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span>USD ($) • Global Multi-Tenant</span>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Product & Features</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/features" className="hover:text-blue-400 transition-colors">Kanban Sales Pipeline</Link></li>
            <li><Link href="/features" className="hover:text-blue-400 transition-colors">AI Lead Scoring Engine</Link></li>
            <li><Link href="/features" className="hover:text-blue-400 transition-colors">Sales Automation Workflows</Link></li>
            <li><Link href="/features" className="hover:text-blue-400 transition-colors">Executive Analytics & Recharts</Link></li>
            <li><Link href="/integrations" className="hover:text-blue-400 transition-colors">Integrations Catalog</Link></li>
          </ul>
        </div>

        {/* Brand Comparisons & Pricing */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Compare & Pricing</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing & ROI Calculator</Link></li>
            <li><Link href="/compare" className="hover:text-blue-400 transition-colors">SalesFlow vs. Salesforce</Link></li>
            <li><Link href="/compare" className="hover:text-blue-400 transition-colors">SalesFlow vs. HubSpot</Link></li>
            <li><Link href="/compare" className="hover:text-blue-400 transition-colors">SalesFlow vs. Attio & Close</Link></li>
            <li><Link href="/customers" className="hover:text-blue-400 transition-colors">Customer Success Stories</Link></li>
          </ul>
        </div>

        {/* Legal & Account */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Account & Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/login" className="hover:text-blue-400 transition-colors">Sign In to Workspace</Link></li>
            <li><Link href="/register" className="hover:text-blue-400 transition-colors">Create Free Account</Link></li>
            <li><a href="https://github.com/vipul-ved/salesflow---sales-automation-platform" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub Repository</a></li>
            <li><span className="text-gray-500">Privacy Policy & Terms</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-gray-500 text-[11px]">
        © 2026 SalesFlow AI SaaS. Built with Next.js 14, TypeScript & Prisma. All rights reserved.
      </div>
    </footer>
  );
}
