import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, TrendingUp, Building2, Quote } from "lucide-react";

export default function CustomersPage() {
  const stories = [
    {
      company: "Nexus Cloud Systems",
      metric: "40% Faster Sales Velocity",
      quote: "SalesFlow AI's lead scoring algorithm allowed our sales reps to focus exclusively on high-intent enterprise accounts. We closed $480k in pipeline in record time.",
      author: "Michael Chang, VP of Engineering",
      industry: "Cloud Infrastructure",
    },
    {
      company: "FinPulse Banking Corp",
      metric: "$1.2M Additional Won Revenue",
      quote: "Automated workflow triggers eliminated manual task creation. Our team cut sales cycle times down from 60 days to 24 days.",
      author: "Vikram Malhotra, Chief Product Officer",
      industry: "Fintech & Banking",
    },
    {
      company: "Apex Global Logistics",
      metric: "10,000+ Automated Follow-ups",
      quote: "The drag-and-drop Kanban pipeline and AI assistant tool calls gave our executives full real-time visibility without expensive per-seat licenses.",
      author: "Elena Rostova, Head of Operations",
      industry: "Supply Chain",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Customer Success Stories
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Loved by High-Growth Sales Teams</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Read how commercial B2B companies double conversion rates with SalesFlow AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((s, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-sm font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20 inline-block">
                  {s.metric}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed italic">"{s.quote}"</p>
              </div>

              <div className="pt-4 border-t border-gray-800 space-y-0.5">
                <span className="font-bold text-white text-xs block">{s.author}</span>
                <span className="text-[11px] text-gray-400">{s.company} • {s.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
