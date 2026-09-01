import React from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  BrainCircuit,
  Award,
  Code2,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-600/15 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-20 border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 shadow-lg shadow-indigo-500/25">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Thiran<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signin"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
            >
              Try Demo Platform
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Anti-Anxiety Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-300 mb-8 shadow-inner animate-pulse-glow">
          <HeartHandshake className="h-4 w-4 text-indigo-400" />
          <span>No Leaderboards. Zero Peer-Comparison Anxiety. 100% Personal Mastery.</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Stop wondering what to study.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Navigate your tech career with AI.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Discover your genuine domain through adaptive micro-puzzles, receive a step-by-step personalized skill roadmap, discover matched hackathons & internships, and always know your <strong className="text-slate-200">Next Big Action</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 group transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4 text-cyan-200" />
            <span>Discover Your Domain (5 Min Test)</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/signin"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Live Demo as Alex (Full-Stack)</span>
          </Link>
        </div>

        {/* Product Preview Card */}
        <div className="mt-16 relative rounded-3xl p-2 bg-gradient-to-b from-indigo-500/20 via-slate-800/40 to-slate-950/80 border border-slate-800 shadow-2xl max-w-5xl mx-auto">
          <div className="rounded-2xl bg-slate-950/90 p-6 sm:p-8 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-indigo-400 font-bold">Always Know What To Do</span>
                  <h3 className="text-xl font-bold text-white">The "Next Big Action" Engine</h3>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-400 font-medium self-start sm:self-auto">
                Real-Time Priority Scoring
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
                  <span>Step 1: Skill Discovery</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-semibold text-white">Adaptive Aptitude Scenarios</h4>
                <p className="text-xs text-slate-400">Micro-tasks and real-world dilemmas reveal where your natural strengths lie.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-400 font-semibold">
                  <span>Step 2: Custom Roadmap</span>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </div>
                <h4 className="text-sm font-semibold text-white">Tailored Milestone Journey</h4>
                <p className="text-xs text-slate-400">High-yield resources & mini challenges. No comparing against other students.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Step 3: Opportunity Match</span>
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                </div>
                <h4 className="text-sm font-semibold text-white">Hackathons & Internships</h4>
                <p className="text-xs text-slate-400">Curated opportunities with gap-closing eligibility plans to unlock your target roles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white">Every module designed to give you clarity and momentum.</h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From discovering your path to landing your dream internship, ThiranAI guides your entire student trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Adaptive Aptitude Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mix of scenario puzzles, logic dilemmas, and preference checks analyzed by Gemini to pinpoint your authentic domain fit.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Context-Aware AI Mentor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Persistent chat with memory of your completed milestones, struggles, and real-time market demand grounding.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Diversion Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gently senses if your curiosity shifts towards another domain and offers a guilt-free roadmap pivot.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Curated Hackathons</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Filterable events matching your domain with external links, countdown deadlines, and team criteria.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Eligibility Gap Analyzer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare your current skills against company prerequisites and slot missing skills directly into your roadmap.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-rose-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Skill Assessments & Scoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-evaluated milestone quizzes and mini-projects with structured constructive feedback instead of harsh pass/fail.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© 2026 ThiranAI — Built with empathy for students worldwide. 100% Non-Comparative Learning.</p>
      </footer>
    </div>
  );
}
