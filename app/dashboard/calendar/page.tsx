"use client";

import { Calendar as CalendarIcon, Clock, Plus, Video } from "lucide-react";

export default function CalendarPage() {
  const events = [
    { title: "Discovery Demo with Samantha Reed (CloudScale)", time: "10:00 AM - 11:00 AM", type: "DEMO", lead: "Samantha Reed" },
    { title: "Contract Review Call - Nexus Cloud Upgrade", time: "02:00 PM - 02:45 PM", type: "CALL", lead: "Michael Chang" },
    { title: "Executive Alignment Meeting", time: "04:30 PM - 05:00 PM", type: "MEETING", lead: "Vikram Malhotra" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Calendar & Meetings</h1>
          <p className="text-sm text-gray-400">Schedule demos, client calls, and follow-up reminders.</p>
        </div>
        <button className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg">
          <Plus className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((ev, idx) => (
          <div key={idx} className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {ev.type}
              </span>
              <div className="flex items-center text-[11px] text-gray-400">
                <Clock className="w-3 h-3 mr-1 text-gray-500" />
                <span>Today</span>
              </div>
            </div>
            <h3 className="font-semibold text-white text-sm">{ev.title}</h3>
            <p className="text-xs text-gray-400">{ev.time}</p>
            <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-300">With: {ev.lead}</span>
              <button className="flex items-center space-x-1 bg-blue-600/20 text-blue-400 px-2.5 py-1 rounded hover:bg-blue-600/30">
                <Video className="w-3 h-3" />
                <span>Join Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
