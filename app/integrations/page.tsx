import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, Calendar, Mail, DollarSign, Zap, Globe, Sparkles } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { name: "Slack Notification Bot", category: "Communication", desc: "Send automated channel alerts when deals transition to Closed Won.", icon: MessageSquare },
    { name: "WhatsApp Business Webhooks", category: "Messaging", desc: "Trigger instant WhatsApp outreach messages when lead scores cross 80.", icon: Globe },
    { name: "Google Calendar Sync", category: "Calendar", desc: "Sync sales demos, discovery calls, and meetings bidirectionally.", icon: Calendar },
    { name: "Gmail & Outlook", category: "Email", desc: "Log email threads, track opens, and send AI-generated email drafts.", icon: Mail },
    { name: "Stripe & Razorpay Invoicing", category: "Payments", desc: "Collect credit card & UPI payments directly inside deal invoices.", icon: DollarSign },
    { name: "Zapier & Make Automations", category: "No-Code", desc: "Connect SalesFlow AI to 5,000+ web applications via webhooks.", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            Ecosystem & APIs
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">1-Click CRM Integrations</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Connect your existing tech stack seamlessly with SalesFlow AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{item.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
