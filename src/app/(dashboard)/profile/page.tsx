"use client";

import React, { useState, useEffect } from "react";
import {
  User as UserIcon,
  Sparkles,
  Compass,
  CheckCircle2,
  Code2,
  Plus,
  Trash2,
  ExternalLink,
  Star,
  Clock,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  FolderGit2,
  Save,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  verified?: boolean;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [domainLogs, setDomainLogs] = useState<any[]>([]);

  // Local editing states
  const [bio, setBio] = useState("");
  const [targetDomain, setTargetDomain] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

  // New Project modal/form state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectTech, setNewProjectTech] = useState("");
  const [newProjectLink, setNewProjectLink] = useState("");

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setProfile(data.profile);
        setRoadmap(data.currentRoadmap);
        setDomainLogs(data.domainChangeLogs || []);

        setBio(data.profile?.bio || "");
        setTargetDomain(data.profile?.targetDomain || "Full-Stack Web Development");
        setExperienceLevel(data.profile?.experienceLevel || "BEGINNER");
        setSkills(data.profile?.skills || []);
        setProjects(data.profile?.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio,
          targetDomain,
          experienceLevel,
          skills,
          projects,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const updated = [...skills, { name: newSkillName.trim(), level: newSkillLevel, verified: false }];
    setSkills(updated);
    setNewSkillName("");
  };

  const handleRemoveSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    const techArray = newProjectTech.split(",").map((t) => t.trim()).filter(Boolean);
    const updated = [
      ...projects,
      {
        title: newProjectTitle.trim(),
        description: newProjectDesc.trim(),
        techStack: techArray,
        link: newProjectLink.trim(),
      },
    ];
    setProjects(updated);
    setNewProjectTitle("");
    setNewProjectDesc("");
    setNewProjectTech("");
    setNewProjectLink("");
    setShowAddProject(false);
  };

  const handleRemoveProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Calculate non-comparative milestone stats
  const milestones = roadmap?.milestones || [];
  const completedMilestones = milestones.filter((m: any) => m.status === "COMPLETED");
  const totalHoursLearned = completedMilestones.reduce((acc: number, m: any) => acc + (m.estimatedHours || 10), 0);
  const completionPercentage = milestones.length > 0 ? Math.round((completedMilestones.length / milestones.length) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & User Profile Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-indigo-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-white">{user?.name || "Student"}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-900/60 border border-indigo-700/50 text-[11px] font-semibold text-indigo-300">
                  {targetDomain}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 uppercase">
                  {experienceLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>Member since {formatDate(user?.createdAt)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all self-stretch sm:self-auto justify-center disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Profile successfully updated!</span>
          </div>
        )}
      </div>

      {/* NON-COMPARATIVE Personal Mastery & Progress Meters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-indigo-400" />
              <span>Personal Roadmap Growth Meter</span>
            </h2>
            <p className="text-xs text-slate-400">
              Measured strictly against your own milestones — zero peer comparisons.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-400">{completionPercentage}%</span>
            <span className="text-xs text-slate-500 block">Mastery of Domain</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <span className="text-xs text-slate-400 font-medium">Milestones Completed</span>
            <p className="text-xl font-bold text-white">
              {completedMilestones.length} <span className="text-xs text-slate-500 font-normal">/ {milestones.length} Milestones</span>
            </p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <span className="text-xs text-slate-400 font-medium">Estimated Hands-on Hours</span>
            <p className="text-xl font-bold text-cyan-400">
              ~{totalHoursLearned} hrs <span className="text-xs text-slate-500 font-normal">Dedicated Practice</span>
            </p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalHoursLearned / 50) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <span className="text-xs text-slate-400 font-medium">Verified Skills Inventory</span>
            <p className="text-xl font-bold text-emerald-400">
              {skills.filter((s) => s.verified).length} <span className="text-xs text-slate-500 font-normal">Verified / {skills.length} Total</span>
            </p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${skills.length > 0 ? (skills.filter((s) => s.verified).length / skills.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Domain Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Editor */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-indigo-400" />
              <span>Personal Statement & Bio</span>
            </h3>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your learning goals and what kind of projects excite you..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">Active Domain Track</label>
                <select
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Cybersecurity & Ethical Hacking">Cybersecurity & Ethical Hacking</option>
                  <option value="Cloud & DevOps Engineering">Cloud & DevOps Engineering</option>
                  <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="BEGINNER">Beginner (Building Foundations)</option>
                  <option value="INTERMEDIATE">Intermediate (Building Projects)</option>
                  <option value="ADVANCED">Advanced (Production & Scale)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Inventory */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Skill Inventory ({skills.length})</span>
              </h3>
            </div>

            {/* Add Skill Row */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Next.js, Docker, PyTorch"
                className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newSkillLevel}
                onChange={(e: any) => setNewSkillLevel(e.target.value)}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 group hover:border-indigo-500/50 transition-all"
                >
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {skill.level}
                  </span>
                  {skill.verified && (
                    <span title="Verified via Assessment">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors ml-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Portfolio */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-purple-400" />
                <span>Projects Portfolio ({projects.length})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProject(!showAddProject)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <form onSubmit={handleAddProject} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <input
                  type="text"
                  required
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Project Title (e.g. Distributed Task Queue)"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500"
                />
                <textarea
                  rows={2}
                  required
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Brief description of what you built and problems solved..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newProjectTech}
                    onChange={(e) => setNewProjectTech(e.target.value)}
                    placeholder="Tech Stack (comma separated: React, Node, PostgreSQL)"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="url"
                    value={newProjectLink}
                    onChange={(e) => setNewProjectLink(e.target.value)}
                    placeholder="GitHub or Live Demo URL (optional)"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="space-y-3">
              {projects.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  No projects added yet. Complete milestone challenges to attach your code!
                </p>
              ) : (
                projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack?.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-indigo-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Learning Journey Timeline & Interest Feedback Signals */}
        <div className="space-y-6">
          {/* Topic Interest & Reflections History */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" />
              <span>Topic Enjoyment Signals</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When you complete a milestone, your rating feeds into future AI roadmap adjustments.
            </p>

            <div className="space-y-3">
              {completedMilestones.filter((m: any) => m.userRating).length === 0 ? (
                <p className="text-xs text-slate-500 py-2">
                  Complete milestone challenges to rate how much you enjoyed the topic!
                </p>
              ) : (
                completedMilestones
                  .filter((m: any) => m.userRating)
                  .map((m: any) => (
                    <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{m.title}</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: m.userRating || 5 }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      {m.userFeedback && (
                        <p className="text-[11px] text-slate-400 italic">
                          &ldquo;{m.userFeedback}&rdquo;
                        </p>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Domain Journey & Audit Log */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Domain Navigation Log</span>
            </h3>
            <div className="space-y-3">
              {domainLogs.length === 0 ? (
                <p className="text-xs text-slate-500">No domain switches recorded.</p>
              ) : (
                domainLogs.map((log: any) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Switched Domain</span>
                      <span>{formatDate(log.switchedAt)}</span>
                    </div>
                    <p className="font-semibold text-indigo-300">
                      {log.previousDomain} &rarr; {log.newDomain}
                    </p>
                    {log.reason && <p className="text-slate-400 text-[11px]">{log.reason}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
