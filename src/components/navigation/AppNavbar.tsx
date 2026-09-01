"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Bell,
  MessageSquare,
  User as UserIcon,
  LogOut,
  Compass,
  CheckCircle2,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}

export default function AppNavbar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        const unread = (data.notifications || []).filter((n: any) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (e) {
      // ignore
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PATCH" });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (e) {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Mobile Menu Button & Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Thiran<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium -mt-1 hidden sm:block">
                Career & Skill Navigation
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Anxiety-free reminder pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>Non-Comparative Learning • Focus on Your Growth</span>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick AI Mentor Button */}
          <Link
            href="/mentor"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Mentor</span>
          </Link>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-[#090d16]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-indigo-400" />
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No notifications yet. Keep progressing on your roadmap!
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.linkUrl || "/dashboard"}
                        onClick={() => setShowNotifications(false)}
                        className={`block p-3 rounded-xl border transition-all ${
                          n.read
                            ? "bg-slate-900/40 border-slate-800 text-slate-400"
                            : "bg-indigo-950/30 border-indigo-800/40 text-slate-200"
                        } hover:border-indigo-500/50`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {formatTimeAgo(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs mt-1 line-clamp-2">{n.message}</p>
                      </Link>
                    ))
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-center">
                  <Link
                    href="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-indigo-400 font-medium"
                  >
                    View all notifications &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-800 transition-colors"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "S"}
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-sm font-semibold text-white truncate">
                    {session?.user?.name || "Student"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {session?.user?.email || "student@thiran.ai"}
                  </p>
                </div>

                <div className="mt-1 space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <UserIcon className="h-4 w-4 text-slate-400" />
                    <span>My Profile & Skills</span>
                  </Link>
                  <Link
                    href="/roadmap"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Compass className="h-4 w-4 text-slate-400" />
                    <span>Active Roadmap</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
