"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  MessageSquare,
  Award,
  Code2,
  Briefcase,
  Target,
  User,
  Bell,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Aptitude Discovery",
    href: "/onboarding",
    icon: Sparkles,
  },
  {
    name: "My Roadmap",
    href: "/roadmap",
    icon: Compass,
  },
  {
    name: "AI Career Mentor",
    href: "/mentor",
    icon: MessageSquare,
  },
  {
    name: "Skill Assessments",
    href: "/assessments",
    icon: Award,
  },
  {
    name: "Hackathons",
    href: "/hackathons",
    icon: Code2,
  },
  {
    name: "Internships",
    href: "/internships",
    icon: Briefcase,
  },
  {
    name: "Eligibility Checker",
    href: "/eligibility",
    icon: Target,
  },
  {
    name: "Profile & Growth",
    href: "/profile",
    icon: User,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

export default function AppSidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-[#090d16]/95 backdrop-blur-xl flex flex-col justify-between p-4 transition-transform duration-200 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Anxiety-Free Philosophy Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/30 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1.5">
            <HeartHandshake className="h-4 w-4 text-indigo-400" />
            <span>Pure Personal Growth</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            No leaderboards, no peer rankings. Every step is tailored only to your journey and goals.
          </p>
        </div>
      </aside>
    </>
  );
}
