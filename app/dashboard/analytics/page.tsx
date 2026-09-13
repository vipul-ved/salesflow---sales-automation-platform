"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, DollarSign, Target } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics").then((r) => r.json()).then(setData);
  }, []);

  const metrics = data?.metrics || {
    totalLeads: 35,
    qualifiedLeads: 18,
    pipelineValue: 332500,
    wonRevenue: 107000,
    conversionRate: 68,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Sales Analytics & Custom Reports</h1>
        <p className="text-sm text-gray-400">Deep dive into conversion funnels, rep performance, and lead sources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 font-medium">Conversion Rate</span>
          <div className="text-2xl font-bold text-green-400">{metrics.conversionRate}%</div>
          <span className="text-[10px] text-gray-500">Closed Won / Total Deals</span>
        </div>
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 font-medium">Total Pipeline Value</span>
          <div className="text-2xl font-bold text-white">${metrics.pipelineValue.toLocaleString()}</div>
          <span className="text-[10px] text-gray-500">Active opportunities</span>
        </div>
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs text-gray-400 font-medium">Total Closed Won</span>
          <div className="text-2xl font-bold text-blue-400">${metrics.wonRevenue.toLocaleString()}</div>
          <span className="text-[10px] text-gray-500">Year to date</span>
        </div>
      </div>

      {/* Sales Representative Leaderboard Table */}
      <div className="glass-card rounded-2xl p-5 space-y-4 border border-gray-800">
        <h3 className="font-semibold text-white text-base">Sales Representative Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 text-gray-400 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Salesperson</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Closed Revenue</th>
                <th className="py-3 px-4">Active Deals</th>
                <th className="py-3 px-4">Target Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              <tr className="hover:bg-gray-800/40">
                <td className="py-3 px-4 font-semibold text-white">Priya Sharma</td>
                <td className="py-3 px-4 text-gray-400">Sales Agent</td>
                <td className="py-3 px-4 font-bold text-green-400">$65,000</td>
                <td className="py-3 px-4">5 active</td>
                <td className="py-3 px-4 text-blue-400 font-bold">108% 🔥</td>
              </tr>
              <tr className="hover:bg-gray-800/40">
                <td className="py-3 px-4 font-semibold text-white">Rahul Mehta</td>
                <td className="py-3 px-4 text-gray-400">Sales Manager</td>
                <td className="py-3 px-4 font-bold text-green-400">$42,000</td>
                <td className="py-3 px-4">3 active</td>
                <td className="py-3 px-4 text-blue-400 font-bold">84%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
