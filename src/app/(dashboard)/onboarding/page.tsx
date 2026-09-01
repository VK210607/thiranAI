"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  Globe,
  ShieldCheck,
  CloudLightning,
  Palette,
  Loader2,
  HelpCircle,
  Code2,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { APTITUDE_QUESTIONS, PRESET_DOMAINS } from "@/data/aptitude-questions";

export default function OnboardingPage() {
  const router = useRouter();

  // Mode: "CHOOSING_MODE" | "APTITUDE_TEST" | "PRESET_BROWSE" | "RESULTS"
  const [mode, setMode] = useState<"CHOOSING_MODE" | "APTITUDE_TEST" | "PRESET_BROWSE" | "RESULTS">("CHOOSING_MODE");

  // Aptitude test step index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [skillsInput, setSkillsInput] = useState("");
  const [projectsInput, setProjectsInput] = useState("");

  // Results from AI
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResults, setAiResults] = useState<any>(null);

  // Selected domain for roadmap generation
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  const handleSelectOption = (questionId: string, option: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option.label,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < APTITUDE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finished questions -> Submit for Gemini Analysis
      handleSubmitAptitude();
    }
  };

  const handleSubmitAptitude = async () => {
    setIsAnalyzing(true);
    setMode("RESULTS");

    try {
      const skillsArray = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/onboarding/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          skills: skillsArray,
          projects: projectsInput ? [{ description: projectsInput }] : [],
        }),
      });

      const data = await res.json();
      setAiResults(data);
      if (data.primaryRecommendation) {
        setSelectedDomain(data.primaryRecommendation);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmDomainAndGenerateRoadmap = async (domainToSet: string) => {
    setIsGeneratingRoadmap(true);
    try {
      const res = await fetch("/api/onboarding/select-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domainToSet,
          experienceLevel: "BEGINNER",
          reason: "Aptitude discovery analysis recommendation.",
        }),
      });

      if (res.ok) {
        router.push("/roadmap");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const currentQ = APTITUDE_QUESTIONS[currentQuestionIndex];
  const selectedAnswerForCurrentQ = currentQ ? answers[currentQ.id] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 pb-16">
      {/* MODE 1: Initial Selection (I know my domain vs I'm not sure yet) */}
      {mode === "CHOOSING_MODE" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-300">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>Personalized Career Navigation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Where are you currently at in your tech journey?
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Whether you are completely new, mid-way through a degree and reconsidering, or ready to specialize — we will guide you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* Option A: I'm not sure yet (Adaptive Discovery) */}
            <button
              onClick={() => setMode("APTITUDE_TEST")}
              className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 hover:border-indigo-400/60 text-left space-y-4 group transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Recommended</span>
                <h3 className="text-xl font-bold text-white mt-1">I&apos;m not sure yet</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Take a 5-minute adaptive scenario assessment. We&apos;ll analyze your problem-solving style and recommend 2–4 high-match tech domains.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-indigo-300 group-hover:text-indigo-200">
                <span>Start Aptitude Test</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Option B: I know my domain */}
            <button
              onClick={() => setMode("PRESET_BROWSE")}
              className="p-8 rounded-3xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left space-y-4 group transition-all transform hover:-translate-y-1"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-105 transition-transform">
                <Compass className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Direct Path</span>
                <h3 className="text-xl font-bold text-white mt-1">I know my domain</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Select your target domain (Web Dev, AI/ML, Cyber Security, Cloud, UI/UX) and generate your custom step-by-step roadmap immediately.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-200">
                <span>Browse Domain Tracks</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: Aptitude Test Questions */}
      {mode === "APTITUDE_TEST" && currentQ && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-indigo-400">
                Question {currentQuestionIndex + 1} of {APTITUDE_QUESTIONS.length}
              </span>
              <span>{Math.round(((currentQuestionIndex + 1) / APTITUDE_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / APTITUDE_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-800/60 text-[10px] uppercase tracking-wider font-bold text-indigo-300">
                {currentQ.category.replace("_", " ")}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{currentQ.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{currentQ.prompt}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswerForCurrentQ === opt.label;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-600 text-white"
                          : "border-slate-600 bg-slate-900"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{opt.label}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom: Previous/Next Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  } else {
                    setMode("CHOOSING_MODE");
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>

              <button
                type="button"
                disabled={!selectedAnswerForCurrentQ}
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-40"
              >
                <span>
                  {currentQuestionIndex === APTITUDE_QUESTIONS.length - 1 ? "Analyze Results with Gemini AI" : "Next Question"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Direct Preset Domains Browse */}
      {mode === "PRESET_BROWSE" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Select Your Target Domain</h2>
              <p className="text-xs text-slate-400">Choose a track to generate your personalized roadmap.</p>
            </div>
            <button
              onClick={() => setMode("CHOOSING_MODE")}
              className="text-xs text-slate-400 hover:text-white"
            >
              &larr; Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRESET_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400">{domain.careerOpportunities[0]}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                      High Growth
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{domain.name}</h3>
                  <p className="text-xs text-slate-400">{domain.tagline}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {domain.popularSkills.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleConfirmDomainAndGenerateRoadmap(domain.name)}
                  disabled={isGeneratingRoadmap}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isGeneratingRoadmap ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Generate Personalized Roadmap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: AI Analysis Results View */}
      {mode === "RESULTS" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {isAnalyzing ? (
            <div className="py-20 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 animate-pulse">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Gemini AI is analyzing your answers...</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Evaluating logic patterns, project affinity, and problem-solving intuition against real tech domains.
              </p>
            </div>
          ) : (
            aiResults && (
              <div className="space-y-8">
                {/* Supportive Synthesis Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 border border-indigo-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                    <span>Aptitude Analysis Complete</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Your Natural Problem-Solving Strengths</h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {aiResults.supportiveSynthesis}
                  </p>
                </div>

                {/* Candidate Domains */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-indigo-400" />
                    <span>Ranked Candidate Domains For You</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {aiResults.analyzedDomains?.map((candidate: any, idx: number) => {
                      const isSelected = selectedDomain === candidate.domain;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedDomain(candidate.domain)}
                          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/10"
                              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                            <div className="flex items-center gap-3">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/30 text-indigo-300 text-xs font-bold">
                                #{idx + 1}
                              </span>
                              <h4 className="text-base font-bold text-white">{candidate.domain}</h4>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400">
                                {candidate.matchScore}% Match
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                            {candidate.reasoning}
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {candidate.keySkills?.map((skill: string, sIdx: number) => (
                                <span
                                  key={sIdx}
                                  className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConfirmDomainAndGenerateRoadmap(candidate.domain);
                              }}
                              disabled={isGeneratingRoadmap}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                            >
                              {isGeneratingRoadmap ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <>
                                  <span>Choose & Build Roadmap</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
