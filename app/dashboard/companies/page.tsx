"use client";

import { useEffect, useState } from "react";
import { Building2, Globe, Users, DollarSign, MapPin } from "lucide-react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.companies || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Companies Portfolio</h1>
        <p className="text-sm text-gray-400">Enterprise accounts, firmographics, and revenue tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">Loading companies...</div>
        ) : companies.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">No companies found.</div>
        ) : (
          companies.map((comp) => (
            <div key={comp.id} className="glass-card glass-card-hover p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center border border-purple-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">{comp.name}</h3>
                    <span className="text-xs text-gray-400">{comp.industry || "General Industry"}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                  {comp.revenue || "$10M+"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 border-t border-gray-800 pt-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-500 block">Employees</span>
                  <span className="text-white font-medium">{comp.employees || "100-500"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-500 block">Contacts</span>
                  <span className="text-white font-medium">{comp._count?.contacts || 1} linked</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-500 block">Active Deals</span>
                  <span className="text-white font-medium">{comp._count?.deals || 1} active</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
