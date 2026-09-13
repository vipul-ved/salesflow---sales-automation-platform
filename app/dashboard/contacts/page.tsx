"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Mail, Phone, Building2, User } from "lucide-react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contacts Directory</h1>
          <p className="text-sm text-gray-400">Manage individual buyer personas, stakeholders, and champions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">No contacts available.</div>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/30">
                  {c.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                  <p className="text-xs text-gray-400">{c.jobTitle || "Stakeholder"}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-800 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>{c.email}</span>
                </div>
                {c.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>{c.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-blue-400 font-medium">{c.company?.name || "Independent"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
