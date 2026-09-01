"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Search,
  CheckCircle2,
  Sparkles,
  Info,
  Loader2,
  ShieldCheck,
  Target,
} from "lucide-react";
import { formatDate, getDaysRemaining } from "@/lib/utils";

const DOMAIN_TABS = [
  { id: "ALL", label: "All Roles" },
  { id: "Web", label: "Full-Stack & Frontend" },
  { id: "AI", label: "AI & Machine Learning" },
  { id: "Cyber", label: "Security & AppSec" },
];

export default function InternshipsPage() {
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships(selectedTab);
  }, [selectedTab]);

  const fetchInternships = async (domain: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/internships?domain=${domain}`);
      if (res.ok) {
        const data = await res.json();
        setInternships(data.internships || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredInternships = internships.filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
            <Briefcase className="h-4 w-4" />
            <span>Curated Student Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Internships & Fellowships
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            High-growth engineering and AI roles. Check your skill readiness before applying directly on official company portals.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <Info className="h-3.5 w-3.5 text-cyan-400" />
          <span>Outbound links only — never hosts applications</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
          {DOMAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTab === tab.id
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, title, or skills..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mx-auto" />
        </div>
      ) : filteredInternships.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400">
          No internships match the selected criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((intern) => {
            const daysLeft = getDaysRemaining(intern.deadline);
            return (
              <div
                key={intern.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="space-y-3">
                  {/* Top Company & Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {intern.company.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{intern.company}</h4>
                        <span className="text-[10px] text-slate-400">{intern.domain}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        daysLeft <= 7
                          ? "bg-rose-950 border border-rose-800 text-rose-300"
                          : "bg-cyan-950 border border-cyan-800 text-cyan-300"
                      }`}
                    >
                      {daysLeft === 0 ? "Closes Today" : `${daysLeft} Days to Apply`}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {intern.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {intern.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{intern.stipend}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{intern.location} {intern.remote && "(Remote)"}</span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Key Prerequisites:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {intern.requiredSkills?.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href="/eligibility"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>Check My Eligibility Gap</span>
                  </Link>

                  <a
                    href={intern.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 flex items-center gap-1.5 transition-transform group-hover:scale-105"
                  >
                    <span>Apply on Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
