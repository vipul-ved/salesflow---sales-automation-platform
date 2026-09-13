import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const matrix = [
    { feature: "Pricing Model", salesflow: "Flat Plan ($99/mo org)", salesforce: "$150/user/mo", hubspot: "$90/user/mo", attio: "$60/user/mo" },
    { feature: "Per-Seat License Penalties", salesflow: false, salesforce: true, hubspot: true, attio: true },
    { feature: "AI Assistant Server-Side Tool Calling", salesflow: true, salesforce: false, hubspot: false, attio: false },
    { feature: "Dynamic AI Lead Scoring (0-100)", salesflow: true, salesforce: true, hubspot: true, attio: false },
    { feature: "Drag-and-Drop Kanban Pipelines", salesflow: true, salesforce: true, hubspot: true, attio: true },
    { feature: "Custom Automation Workflows Builder", salesflow: true, salesforce: true, hubspot: true, attio: false },
    { feature: "Developer API Keys & Webhooks", salesflow: true, salesforce: true, hubspot: true, attio: true },
    { feature: "Setup Time & Onboarding", salesflow: "60 Seconds", salesforce: "3-6 Months", hubspot: "2-4 Weeks", attio: "1 Week" },
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
            Brand & Feature Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">How SalesFlow AI Compares</h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">See why fast-growing sales teams switch from legacy CRMs to SalesFlow AI.</p>
        </div>

        {/* Comparison Table */}
        <div className="glass-card rounded-3xl overflow-hidden border border-gray-800 p-6 space-y-4 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-950 text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                <tr>
                  <th className="py-4 px-4 w-1/3">Feature / Capability</th>
                  <th className="py-4 px-4 text-blue-400 bg-blue-600/10 border-x border-blue-500/20 font-bold text-sm">
                    SalesFlow AI ⚡
                  </th>
                  <th className="py-4 px-4 text-gray-300">Salesforce</th>
                  <th className="py-4 px-4 text-gray-300">HubSpot</th>
                  <th className="py-4 px-4 text-gray-300">Attio / Close</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300">
                {matrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-900/40 transition-all">
                    <td className="py-4 px-4 font-semibold text-white">{row.feature}</td>

                    {/* SalesFlow AI Column */}
                    <td className="py-4 px-4 bg-blue-600/5 border-x border-blue-500/20 font-bold text-white">
                      {typeof row.salesflow === "boolean" ? (
                        row.salesflow ? (
                          <span className="flex items-center text-green-400"><Check className="w-4 h-4 mr-1" /> Included</span>
                        ) : (
                          <span className="flex items-center text-gray-400"><X className="w-4 h-4 mr-1" /> No Fee</span>
                        )
                      ) : (
                        <span className="text-blue-400 font-bold">{row.salesflow}</span>
                      )}
                    </td>

                    {/* Salesforce */}
                    <td className="py-4 px-4">
                      {typeof row.salesforce === "boolean" ? (
                        row.salesforce ? <Check className="w-4 h-4 text-gray-400" /> : <X className="w-4 h-4 text-gray-600" />
                      ) : (
                        row.salesforce
                      )}
                    </td>

                    {/* HubSpot */}
                    <td className="py-4 px-4">
                      {typeof row.hubspot === "boolean" ? (
                        row.hubspot ? <Check className="w-4 h-4 text-gray-400" /> : <X className="w-4 h-4 text-gray-600" />
                      ) : (
                        row.hubspot
                      )}
                    </td>

                    {/* Attio */}
                    <td className="py-4 px-4">
                      {typeof row.attio === "boolean" ? (
                        row.attio ? <Check className="w-4 h-4 text-gray-400" /> : <X className="w-4 h-4 text-gray-600" />
                      ) : (
                        row.attio
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-8 rounded-3xl text-center space-y-4 border border-blue-500/30 blue-glow">
          <h2 className="text-2xl font-bold text-white">Ready to Upgrade Your Sales Pipeline?</h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto">Start your 14-day free trial today. Set up your organization in under 60 seconds.</p>
          <Link
            href="/register"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
