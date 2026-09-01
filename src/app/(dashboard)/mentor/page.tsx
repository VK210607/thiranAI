"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  TrendingUp,
  Search,
  Building2,
  DollarSign,
  AlertCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
} from "lucide-react";

interface ChatMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
}

const QUICK_PROMPTS = [
  "What should I focus on in my next milestone?",
  "Is learning Next.js App Router worth it right now?",
  "How should I structure a full-stack portfolio project?",
  "What do recruiters look for in internship applications?",
  "How do I prepare for my first hackathon?",
];

export default function MentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Market Demand grounding state
  const [marketQuery, setMarketQuery] = useState("Full-Stack Web Development");
  const [marketData, setMarketData] = useState<any>(null);
  const [marketLoading, setMarketLoading] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatHistory();
    fetchMarketDemand("Full-Stack Web Development");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchChatHistory = async () => {
    try {
      const res = await fetch("/api/mentor/chat");
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.sessionId);
        setMessages(data.messages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchMarketDemand = async (queryToSearch: string) => {
    setMarketLoading(true);
    try {
      const res = await fetch(`/api/mentor/market-demand?query=${encodeURIComponent(queryToSearch)}`);
      if (res.ok) {
        const data = await res.json();
        setMarketData(data.insights);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMarketLoading(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply.content }]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having a brief connection pause. Please try asking again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMarket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketQuery.trim()) return;
    fetchMarketDemand(marketQuery.trim());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
      {/* Main Chat Column (2/3 width) */}
      <div className="lg:col-span-2 flex flex-col h-[calc(100vh-8.5rem)] rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Thiran AI Career Mentor</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h2>
              <p className="text-[11px] text-slate-400">
                Context-aware guidance with zero judgment
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowMarketModal(true)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Market Demand</span>
          </button>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {initialLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const isAssistant = msg.role === "assistant" || msg.role === "system";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAssistant && (
                      <div className="h-8 w-8 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? "bg-slate-950/80 border border-slate-800 text-slate-200"
                          : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>

                    {!isAssistant && (
                      <div className="h-8 w-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="rounded-2xl p-4 bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                    Thinking with context...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-[11px] text-slate-400 hover:text-indigo-300 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask your mentor about skills, project advice, market demand..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="h-11 w-11 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors disabled:opacity-40 shrink-0 shadow-md shadow-indigo-600/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Right Column: Real-Time Market Demand Grounding Card (1/3 width) */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Job Market Signal Grounding</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-[10px] text-cyan-300 font-semibold">
              Live Analytical Signals
            </span>
          </div>

          <form onSubmit={handleSearchMarket} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={marketQuery}
              onChange={(e) => setMarketQuery(e.target.value)}
              placeholder="Search skill or domain (e.g. Next.js, AI, Cyber)"
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={marketLoading}
              className="absolute right-1.5 top-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-semibold text-white"
            >
              {marketLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Check"}
            </button>
          </form>

          {marketLoading ? (
            <div className="py-8 text-center">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-400 mx-auto" />
              <p className="text-xs text-slate-500 mt-2">Grounding industry data...</p>
            </div>
          ) : (
            marketData && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{marketData.domain || marketQuery}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold text-[10px]">
                      {marketData.demandLevel} Demand
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-medium">{marketData.averageSalaryRange}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 block font-semibold">
                    {marketData.growthRatePercent} Industry Hiring Growth
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Top Hiring Organizations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {marketData.topHiringCompanies?.map((comp: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <Building2 className="h-3 w-3 text-indigo-400" />
                        <span>{comp}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key Emerging Trends
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {marketData.keyTrends?.map((trend: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-1 text-indigo-200">
                  <span className="font-semibold block text-[11px]">Mentor Recommendation</span>
                  <p className="text-[11px] leading-relaxed">{marketData.recommendation}</p>
                </div>

                {/* Clear Estimation Disclaimer */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 italic pt-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>Clearly labeled as an analytical industry estimate.</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
