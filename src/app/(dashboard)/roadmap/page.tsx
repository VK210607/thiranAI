"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Video,
  Code2,
  Star,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatDate } from "@/lib/utils";

interface Resource {
  title: string;
  url: string;
  type: "video" | "doc" | "course" | "interactive";
  provider: string;
}

interface Milestone {
  id: string;
  orderIndex: number;
  title: string;
  description: string;
  whyItMatters: string;
  estimatedHours: number;
  resources: Resource[];
  practicalChallenge?: {
    challenge: string;
    deliverables: string[];
    evaluationCriteria: string[];
  } | null;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completionPercent: number;
  submissionDetails?: {
    projectUrl?: string;
    notes?: string;
    completedAt?: string;
  } | null;
  userRating?: number | null;
  userFeedback?: string | null;
  completedAt?: string | Date | null;
}

export default function RoadmapPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [diversion, setDiversion] = useState<any>(null);

  // Modal states
  const [activeModalMilestone, setActiveModalMilestone] = useState<Milestone | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRoadmap();
    checkDiversion();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch("/api/roadmap");
      if (res.ok) {
        const data = await res.json();
        setRoadmap(data.roadmap);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const checkDiversion = async () => {
    try {
      const res = await fetch("/api/roadmap/diversion");
      if (res.ok) {
        const data = await res.json();
        if (data.hasDiverted) {
          setDiversion(data);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const handleOpenCompleteModal = (milestone: Milestone) => {
    setActiveModalMilestone(milestone);
    setSubmissionUrl(milestone.submissionDetails?.projectUrl || "");
    setSubmissionNotes(milestone.submissionDetails?.notes || "");
    setRating(milestone.userRating || 5);
    setFeedback(milestone.userFeedback || "");
  };

  const handleSubmitMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalMilestone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/roadmap/milestone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneId: activeModalMilestone.id,
          status: "COMPLETED",
          projectUrl: submissionUrl,
          notes: submissionNotes,
          rating,
          feedback,
        }),
      });

      if (res.ok) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#38bdf8", "#ec4899", "#10b981"],
        });

        setActiveModalMilestone(null);
        await fetchRoadmap();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePivotDomain = async (newDomain: string) => {
    try {
      const res = await fetch("/api/onboarding/select-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: newDomain,
          reason: "User accepted diversion suggestion to pivot active roadmap.",
        }),
      });

      if (res.ok) {
        setDiversion(null);
        await fetchRoadmap();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="h-16 w-16 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
          <Compass className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No active roadmap found</h2>
        <p className="text-xs text-slate-400">
          Take our 5-minute adaptive aptitude discovery to generate your personalized learning journey.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20"
        >
          <Sparkles className="h-4 w-4" />
          <span>Start Aptitude Test</span>
        </Link>
      </div>
    );
  }

  const milestones: Milestone[] = roadmap.milestones || [];
  const completedCount = milestones.filter((m) => m.status === "COMPLETED").length;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-1">
              <Compass className="h-4 w-4 text-indigo-400" />
              <span>Personal Skill Mastery Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{roadmap.domain}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{roadmap.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Switch Domain Track</span>
            </Link>
          </div>
        </div>

        {/* Non-Comparative Progress Header */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Your Milestone Progress</span>
              <span className="text-indigo-400 font-bold">
                {completedCount} of {milestones.length} Milestones Achieved ({roadmap.completionPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${roadmap.completionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Diversion Prompt if triggered */}
      {diversion && diversion.hasDiverted && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/40 border border-cyan-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Gentle Curiosity Shift Detected</span>
            </div>
            <button
              onClick={() => setDiversion(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <h3 className="text-base font-bold text-white">
            It looks like your focus may have shifted toward {diversion.suggestedDomain}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {diversion.divergenceReason} {diversion.recentActivitySummary} In ThiranAI, adapting your journey is completely natural and guilt-free. Would you like to update your active roadmap?
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handlePivotDomain(diversion.suggestedDomain)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <span>Update Roadmap to {diversion.suggestedDomain}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setDiversion(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Stay on Current Track
            </button>
          </div>
        </div>
      )}

      {/* Roadmap Milestones Sequence */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          <span>Milestone Learning Sequence</span>
        </h2>

        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const isCompleted = milestone.status === "COMPLETED";
            const isInProgress = milestone.status === "IN_PROGRESS";

            return (
              <div
                key={milestone.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                  isCompleted
                    ? "bg-slate-900/40 border-emerald-900/40"
                    : isInProgress
                    ? "bg-slate-900/90 border-indigo-500/60 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "bg-slate-950/40 border-slate-800/80 opacity-75"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCompleted
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/40"
                          : isInProgress
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : `0${index + 1}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white">{milestone.title}</h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-400">
                            Completed
                          </span>
                        )}
                        {isInProgress && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-[10px] font-bold text-indigo-300 animate-pulse">
                            Active Step
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-indigo-400" />
                      <span>~{milestone.estimatedHours || 10} hrs</span>
                    </span>
                  </div>
                </div>

                {/* "Why It Matters" Callout */}
                <div className="my-4 p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Why It Matters</span>
                  <p className="leading-relaxed">{milestone.whyItMatters}</p>
                </div>

                {/* External Credible Resources */}
                <div className="space-y-2 mt-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Curated Learning Materials
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {milestone.resources?.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all flex items-start gap-2.5 group"
                      >
                        <div className="h-7 w-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          {res.type === "video" ? (
                            <Video className="h-3.5 w-3.5" />
                          ) : (
                            <BookOpen className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                            {res.title}
                          </p>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <span>{res.provider}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Practical Challenge & Submission Status */}
                {milestone.practicalChallenge && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Code2 className="h-4 w-4 text-purple-400" />
                        <span>Practical Challenge: {milestone.practicalChallenge.challenge}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Deliverables:</span>
                      <ul className="text-xs text-slate-300 space-y-0.5">
                        {milestone.practicalChallenge.deliverables?.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-1.5">
                            <span className="text-indigo-400">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Submission Details View */}
                    {isCompleted && milestone.submissionDetails && (
                      <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                        {milestone.submissionDetails.projectUrl && (
                          <p className="flex items-center gap-1 text-indigo-300">
                            <span className="text-slate-500">Submitted Proof:</span>
                            <a
                              href={milestone.submissionDetails.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex items-center gap-1"
                            >
                              <span>{milestone.submissionDetails.projectUrl}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </p>
                        )}
                        {milestone.userRating && (
                          <div className="flex items-center gap-1 text-amber-400 pt-1">
                            <span className="text-slate-500">Your Enjoyment Rating:</span>
                            {Array.from({ length: milestone.userRating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Milestone Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    {isCompleted && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Completed on {formatDate(milestone.completedAt)}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenCompleteModal(milestone)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCompleted
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                        : "bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-md shadow-indigo-600/25"
                    }`}
                  >
                    <span>{isCompleted ? "Update Work / Rating" : "Complete & Attach Work"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion & Rating Modal */}
      {activeModalMilestone && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Milestone Submission
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeModalMilestone.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalMilestone(null)}
                className="text-slate-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitMilestone} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Project Proof Link (GitHub Repo / Live Demo)
                </label>
                <input
                  type="url"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  placeholder="https://github.com/your-username/project-repo"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  What did you build or learn? (Notes)
                </label>
                <textarea
                  rows={2}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="e.g. Implemented custom hooks, handled state persistence with local storage..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Topic Enjoyment Rating */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <label className="text-xs font-medium text-slate-300 block">
                  How much did you enjoy learning this topic? (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  This signal is remembered by your AI mentor for tailored recommendations.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Personal Reflection / Feedback (Optional)
                </label>
                <input
                  type="text"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g. Really loved state machines, found CSS animations slightly tedious"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModalMilestone(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mark Milestone Complete 🎉"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
