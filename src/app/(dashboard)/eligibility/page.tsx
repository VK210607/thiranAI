"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Sparkles,
  Building2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Plus,
  Loader2,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SEED_COMPANIES_ELIGIBILITY } from "@/data/seed-data";

export default function EligibilityPage() {
  const [selectedCompany, setSelectedCompany] = useState("Google");
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);
  const [injectingSkill, setInjectingSkill] = useState<string | null>(null);
  const [injectedSuccess, setInjectedSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchEligibility(selectedCompany);
  }, [selectedCompany]);

  const fetchEligibility = async (companyName: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/eligibility/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInjectGap = async (gap: any) => {
    setInjectingSkill(gap.skill);
    try {
      const res = await fetch("/api/eligibility/inject-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gapItem: gap,
          targetCompanyName: selectedCompany,
        }),
      });

      if (res.ok) {
        setInjectedSuccess(gap.skill);
        setTimeout(() => setInjectedSuccess(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInjectingSkill(null);
    }
  };

  const evaluation = analysis?.evaluation;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <Target className="h-4 w-4" />
            <span>Opportunity Prerequisites & Gap Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Company & Hackathon Eligibility Guide
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Compare your current skill inventory and project proof against typical employer standards, with concrete gap-closing milestones.
          </p>
        </div>
      </div>

      {/* Company Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SEED_COMPANIES_ELIGIBILITY.map((comp) => {
          const isSelected = selectedCompany === comp.company;
          return (
            <button
              key={comp.company}
              onClick={() => setSelectedCompany(comp.company)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? "bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="h-8 w-8 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-xs">
                  {comp.logoText}
                </span>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">{comp.company}</h4>
                <span className="text-[10px] text-slate-400 block truncate">{comp.role}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Eligibility Analysis View */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
          <p className="text-xs text-slate-500 mt-2">Evaluating skill prerequisites...</p>
        </div>
      ) : (
        evaluation && (
          <div className="space-y-6">
            {/* Top Match Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Candidate Readiness Verdict
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    {evaluation.targetName}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-400">
                      {evaluation.matchPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Prerequisite Match</span>
                  </div>
                </div>
              </div>

              {/* Advice */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {evaluation.overallAdvice}
              </p>

              {/* Matched vs Missing Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Skills You Have Covered ({evaluation.matchedSkills?.length || 0})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evaluation.matchedSkills?.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <XCircle className="h-4 w-4" />
                    <span>Skills / Proof-of-Work to Bridge ({evaluation.missingSkills?.length || 0})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evaluation.missingSkills?.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Gap Closing Plan */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <span>Step-by-Step Gap Closing Action Plan</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Specific milestones you can slot into your roadmap to become fully eligible.
                  </p>
                </div>
              </div>

              {injectedSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>
                    Successfully added gap-closing milestone for &ldquo;{injectedSuccess}&rdquo; to your active roadmap!
                  </span>
                  <Link href="/roadmap" className="ml-auto underline font-semibold">
                    View Roadmap &rarr;
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {evaluation.gapClosingPlan?.map((gap: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-indigo-400">Step {idx + 1}:</span>
                        <span>{gap.skill}</span>
                      </h4>
                      <span className="text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 self-start sm:self-auto">
                        Est. {gap.estimatedTimeToBridge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{gap.actionItem}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase">
                        Recommended Project Proof:
                      </span>
                      <p className="text-slate-400 text-xs">{gap.suggestedProject}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleInjectGap(gap)}
                        disabled={injectingSkill === gap.skill}
                        className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        {injectingSkill === gap.skill ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Slot into My Roadmap</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
