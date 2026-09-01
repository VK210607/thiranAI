"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Sparkles,
  Calendar,
  Compass,
  HeartHandshake,
  Loader2,
  Clock,
  ArrowRight,
  Info,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PATCH" });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "MILESTONE":
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case "DEADLINE":
        return <Calendar className="h-5 w-5 text-rose-400" />;
      case "DIVERSION":
        return <Compass className="h-5 w-5 text-cyan-400" />;
      case "ENCOURAGEMENT":
        return <HeartHandshake className="h-5 w-5 text-indigo-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
            <Bell className="h-4 w-4" />
            <span>Supportive Updates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Notification Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Supportive milestone celebrations, approaching deadlines, and gentle learning check-ins.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors self-start sm:self-auto"
        >
          Mark all as read
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="py-20 text-center space-y-3 max-w-md mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No notifications right now</h3>
          <p className="text-xs text-slate-400">
            As you make progress on your roadmap, we will celebrate your milestones here!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                n.read
                  ? "bg-slate-900/40 border-slate-800/80 text-slate-400"
                  : "bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border-indigo-500/40 text-slate-200 shadow-lg"
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                {getNotificationIcon(n.type)}
              </div>

              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                  <span className="text-[11px] text-slate-500 shrink-0">
                    {formatTimeAgo(n.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>

                {n.linkUrl && (
                  <div className="pt-2">
                    <Link
                      href={n.linkUrl}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
