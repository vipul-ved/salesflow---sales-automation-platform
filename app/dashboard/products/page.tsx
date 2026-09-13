"use client";

import { Package, Plus, DollarSign, Tag } from "lucide-react";

export default function ProductsPage() {
  const products = [
    { name: "SalesFlow Enterprise Suite", sku: "SF-ENT-001", price: 2400, category: "Software Subscription", active: true },
    { name: "AI Lead Scoring & Assistant Addon", sku: "SF-AI-002", price: 850, category: "AI Tools", active: true },
    { name: "Dedicated SLA & Onboarding", sku: "SF-SLA-003", price: 1500, category: "Services", active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products & Services Catalog</h1>
          <p className="text-sm text-gray-400">SKUs, pricing tiers, and line items attachable to deals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p, idx) => (
          <div key={idx} className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">{p.sku}</span>
            </div>
            <h3 className="font-semibold text-white text-sm">{p.name}</h3>
            <div className="text-xl font-bold text-green-400">${p.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ unit</span></div>
            <div className="text-xs text-gray-400 flex items-center">
              <Tag className="w-3.5 h-3.5 mr-1 text-gray-500" />
              <span>{p.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
