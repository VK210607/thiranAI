"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Code2,
  Briefcase,
  CheckCircle2,
  MessageSquare,
  Award,
  Loader2,
  TrendingUp,
  Target,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { formatDate, getDaysRemaining } from "@/lib/utils";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const { user, profile, activeRoadmap, nextBigAction, nearestHackathon, nearestInternship, stats } = data || {};

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Personal Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            Welcome back, {user?.name || "Student"} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Domain: <strong className="text-slate-200">{profile?.targetDomain || "Undecided"}</strong> • Focus on your authentic craft
          </p>
        </div>

        <Link
          href="/mentor"
          className="px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Ask AI Mentor</span>
        </Link>
      </div>

      {/* MODULE 9: THE "NEXT BIG ACTION" WIDGET (Prominently Highlighted) */}
      {nextBigAction && (
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/50 shadow-2xl overflow-hidden group">
          {/* Subtle glow circle */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Zap className="h-3 w-3 fill-white" />
                  <span>Next Big Action</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-[10px] text-indigo-300 font-semibold">
                  {nextBigAction.contextTag}
                </span>
                {nextBigAction.deadlineText && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-800 text-[10px] text-rose-300 font-bold animate-pulse">
                    {nextBigAction.deadlineText}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                {nextBigAction.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {nextBigAction.description}
              </p>
            </div>

            <Link
              href={nextBigAction.targetUrl}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.03] shrink-0"
            >
              <span>{nextBigAction.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Non-Comparative Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Roadmap Progress</span>
          <p className="text-xl font-bold text-white">
            {stats?.completionPercent || 0}%
          </p>
          <span className="text-[10px] text-indigo-400 block">Personal Mastery</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Milestones Done</span>
          <p className="text-xl font-bold text-cyan-400">
            {stats?.completedMilestones || 0} <span className="text-xs text-slate-500 font-normal">/ {stats?.totalMilestones || 0}</span>
          </p>
          <span className="text-[10px] text-cyan-400/80 block">Completed Steps</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Skills Tracked</span>
          <p className="text-xl font-bold text-emerald-400">
            {stats?.skillsCount || 0} Skills
          </p>
          <span className="text-[10px] text-emerald-400/80 block">In Profile Inventory</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Mindset Policy</span>
          <p className="text-sm font-bold text-slate-200 flex items-center gap-1 mt-1">
            <HeartHandshake className="h-4 w-4 text-indigo-400" />
            <span>0% Comparison</span>
          </p>
          <span className="text-[10px] text-slate-500 block">100% Personal Growth</span>
        </div>
      </div>

      {/* Core Split: Active Roadmap Status & Approaching Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Roadmap Snapshot */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-400" />
              <span>Current Learning Roadmap</span>
            </h3>
            <Link href="/roadmap" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
              View full roadmap &rarr;
            </Link>
          </div>

          {activeRoadmap ? (
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">{activeRoadmap.title}</h4>
                  <span className="text-xs text-slate-400">{activeRoadmap.domain}</span>
                </div>
                <span className="text-xs font-bold text-indigo-400">
                  {stats?.completedMilestones} of {stats?.totalMilestones} Completed
                </span>
              </div>

              {/* Milestones Quick List */}
              <div className="space-y-2.5">
                {activeRoadmap.milestones?.slice(0, 4).map((m: any, idx: number) => {
                  const isCompleted = m.status === "COMPLETED";
                  const isInProgress = m.status === "IN_PROGRESS";
                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                        isCompleted
                          ? "bg-slate-950/40 border-emerald-900/40 text-slate-300"
                          : isInProgress
                          ? "bg-indigo-950/30 border-indigo-500/50 text-white font-medium"
                          : "bg-slate-950/20 border-slate-800 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div
                          className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isCompleted
                              ? "bg-emerald-600/20 text-emerald-400"
                              : isInProgress
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-800 text-slate-500"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                        </div>
                        <span className="truncate">{m.title}</span>
                      </div>

                      <span className="text-[10px] text-slate-400 shrink-0">
                        {isCompleted ? "Done" : isInProgress ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/roadmap"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
                >
                  <span>Continue Roadmap</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-indigo-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">No active roadmap generated yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Discover your strengths through our adaptive aptitude test and generate a custom roadmap.
              </p>
              <Link
                href="/onboarding"
                className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Start Aptitude Test
              </Link>
            </div>
          )}
        </div>

        {/* Right 1 Col: Approaching Opportunities */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <span>Opportunities on Radar</span>
          </h3>

          <div className="space-y-4">
            {/* Nearest Hackathon */}
            {nearestHackathon && (
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Hackathon</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-800 text-[10px] font-bold text-rose-300">
                    {getDaysRemaining(nearestHackathon.deadline)}d left
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {nearestHackathon.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {nearestHackathon.description}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{nearestHackathon.organizer}</span>
                  <Link
                    href="/hackathons"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Nearest Internship */}
            {nearestInternship && (
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Internship</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] font-bold text-cyan-300">
                    {getDaysRemaining(nearestInternship.deadline)}d left
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {nearestInternship.company} — {nearestInternship.title}
                </h4>
                <p className="text-[11px] text-slate-400">{nearestInternship.stipend}</p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{nearestInternship.location}</span>
                  <Link
                    href="/internships"
                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
