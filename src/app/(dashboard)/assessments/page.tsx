"use client";

import React, { useState } from "react";
import {
  Award,
  Sparkles,
  Code2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  BookOpen,
  Send,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

const ASSESSMENT_CHALLENGES = [
  {
    id: "ass_1",
    title: "TypeScript Generics & Strong Typing Challenge",
    domain: "Full-Stack Web Development",
    difficulty: "Foundational",
    estimatedMinutes: 15,
    prompt: "Explain how you would create a strongly typed API response wrapper generic `ApiResponse<T>` that handles either data of type T or structured error messages, with zero use of `any`.",
    sampleStarter: `type ApiSuccess<T> = { success: true; data: T; timestamp: string };\ntype ApiError = { success: false; error: { code: string; message: string } };\nexport type ApiResponse<T> = ApiSuccess<T> | ApiError;`,
  },
  {
    id: "ass_2",
    title: "React 18 Custom Hooks & Asynchronous State Architecture",
    domain: "Full-Stack Web Development",
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    prompt: "Write or describe a custom `useDebounce<T>` or `useLocalStorage<T>` hook that guarantees synchronized state across tabs and prevents memory leaks when unmounted.",
    sampleStarter: `function useDebounce<T>(value: T, delay: number): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`,
  },
  {
    id: "ass_3",
    title: "Relational Schema Modeling & Concurrency Safety",
    domain: "Backend & Systems",
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    prompt: "Design a relational schema (in Prisma or SQL) for an event ticketing system that prevents double booking when two users attempt to purchase the final seat at the exact same millisecond.",
    sampleStarter: `// Describe your transaction boundary or optimistic locking strategy here...`,
  },
  {
    id: "ass_4",
    title: "OWASP Web Security & Safe Authentication Architecture",
    domain: "Cybersecurity & Web",
    difficulty: "Advanced",
    estimatedMinutes: 25,
    prompt: "Analyze how you would prevent Cross-Site Scripting (XSS), CSRF, and SQL Injection in a server-rendered Next.js / Node app with HttpOnly cookies.",
    sampleStarter: `// Outline your CSP header configuration, input sanitization, and session token rotation strategy...`,
  },
];

export default function AssessmentsPage() {
  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);

  const handleOpenChallenge = (challenge: any) => {
    setActiveChallenge(challenge);
    setSubmissionText(challenge.sampleStarter || "");
    setGradingResult(null);
  };

  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallenge || !submissionText.trim()) return;

    setIsGrading(true);
    try {
      const res = await fetch("/api/assessments/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activeChallenge.title,
          domain: activeChallenge.domain,
          submission: { codeOrText: submissionText },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGradingResult(data.grading);

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#38bdf8", "#10b981"],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
          <Award className="h-4 w-4" />
          <span>Constructive Skill Checkpoints</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Skill Assessments & Challenges
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Test your conceptual understanding and code architecture. Scored by Gemini with structured, actionable feedback (never just harsh pass/fail).
        </p>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ASSESSMENT_CHALLENGES.map((challenge) => (
          <div
            key={challenge.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">{challenge.domain}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                  {challenge.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {challenge.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{challenge.prompt}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Est. ~{challenge.estimatedMinutes} mins
              </span>

              <button
                type="button"
                onClick={() => handleOpenChallenge(challenge)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-transform group-hover:scale-105"
              >
                <span>Take Assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Modal */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Skill Assessment
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeChallenge.title}</h3>
              </div>
              <button
                onClick={() => setActiveChallenge(null)}
                className="text-slate-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200 leading-relaxed">
              <span className="font-bold text-indigo-300 block mb-1">Challenge Prompt:</span>
              {activeChallenge.prompt}
            </div>

            {!gradingResult ? (
              <form onSubmit={handleSubmitAssessment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Code or Architecture Solution
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Write your explanation or code solution here..."
                    className="w-full font-mono p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveChallenge(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGrading || !submissionText.trim()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isGrading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Submit for Gemini AI Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                {/* Scoring Header */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Mastery Score</span>
                    <h4 className="text-2xl font-black text-indigo-400">{gradingResult.score} / 100</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    Mastery Confirmed 🎉
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-white">Review Summary:</span>
                  <p className="text-slate-300 leading-relaxed">{gradingResult.summary}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Key Strengths</span>
                    </span>
                    <ul className="text-slate-300 space-y-1">
                      {gradingResult.strengths?.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-400">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-1.5">
                    <span className="font-bold text-indigo-400 flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      <span>Actionable Improvements</span>
                    </span>
                    <ul className="text-slate-300 space-y-1">
                      {gradingResult.areasToImprove?.map((a: string, i: number) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-indigo-400">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200">
                  <span className="font-bold block mb-1">Constructive Feedback:</span>
                  <p>{gradingResult.constructiveFeedback}</p>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveChallenge(null)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
