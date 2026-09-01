"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Calendar,
  Clock,
  ExternalLink,
  Award,
  Users,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";
import { formatDate, getDaysRemaining } from "@/lib/utils";

const DOMAIN_TABS = [
  { id: "ALL", label: "All Domains" },
  { id: "Web", label: "Web Development" },
  { id: "AI", label: "AI & Machine Learning" },
  { id: "Cyber", label: "Cybersecurity" },
  { id: "Cloud", label: "Cloud & DevOps" },
];

export default function HackathonsPage() {
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons(selectedTab);
  }, [selectedTab]);

  const fetchHackathons = async (domain: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hackathons?domain=${domain}`);
      if (res.ok) {
        const data = await res.json();
        setHackathons(data.hackathons || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredHackathons = hackathons.filter(
    (h) =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <Code2 className="h-4 w-4" />
            <span>Curated Student Competitions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Hackathons & Buildathons
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Test your skills, build real projects with peers, and win prizes & mentorship.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <Info className="h-3.5 w-3.5 text-indigo-400" />
          <span>Curated Verified Listings (Devpost, MLH, Unstop)</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Domain Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
          {DOMAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackathons..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
        </div>
      ) : filteredHackathons.length === 0 ? (
        <div className="py-16 text-center text-xs text-slate-400">
          No hackathons match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHackathons.map((hack) => {
            const daysLeft = getDaysRemaining(hack.deadline);
            return (
              <div
                key={hack.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="space-y-3">
                  {/* Top tags row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-indigo-400">{hack.organizer}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        daysLeft <= 4
                          ? "bg-rose-950 border border-rose-800 text-rose-300 animate-pulse"
                          : "bg-indigo-950 border border-indigo-800 text-indigo-300"
                      }`}
                    >
                      {daysLeft === 0 ? "Deadline Today!" : `${daysLeft} Days to Register`}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {hack.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {hack.description}
                  </p>

                  {/* Domain Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hack.domainTags?.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-amber-400" />
                      <span className="truncate">{hack.prizePool || "Prizes & Mentorship"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{hack.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Starts {formatDate(hack.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-purple-400" />
                      <span>Team: {hack.eligibilityCriteria?.minTeamSize || 1}-{hack.eligibilityCriteria?.maxTeamSize || 4} Members</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Deadline: {formatDate(hack.deadline)}
                  </span>

                  <a
                    href={hack.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-transform group-hover:scale-105"
                  >
                    <span>Register on Portal</span>
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
