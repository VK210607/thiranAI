# 🚀 ThiranAI — AI-Powered Personalized Career & Skill Navigation Platform

> **Anxiety-Free, Non-Comparative Career Discovery, Dynamic Learning Roadmaps, and Real AI Deliverable Verification for Students.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/AI_Engine-Gemini_2.5_Flash-8E75B2?logo=google)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Table of Contents
1. [Project Overview & Core Mission](#-project-overview--core-mission)
2. [Why We Chose This Tech Stack (Architecture Rationale)](#-why-we-chose-this-tech-stack-architecture-rationale)
3. [Key Modules & Live Capabilities](#-key-modules--live-capabilities)
4. [Real AI Milestone Verification Flow](#-real-ai-milestone-verification-flow)
5. [Codebase & Directory Structure](#-codebase--directory-structure)
6. [Database Schema & Data Architecture](#-database-schema--data-architecture)
7. [Installation & Setup Guide](#-installation--setup-guide)
8. [Evaluator Walkthrough & Demo Guide](#-evaluator-walkthrough--demo-guide)

---

## 🎯 Project Overview & Core Mission

Most student career platforms push toxic leaderboards, comparative percentile rankings, and shallow progress bars that induce anxiety rather than fostering genuine mastery. Furthermore, milestone completion is typically an unchecked honor system where any link is blindly accepted.

**ThiranAI** re-engineers career preparation around **pure personal mastery and verifiable proof of work**:
- **Zero Peer Comparison**: No public ranks, percentiles, or leaderboards. Every student competes only against their own previous milestone.
- **Adaptive Discovery**: Discovers authentic domain alignment through scenario-based aptitude dilemmas rather than generic multiple-choice quizzes.
- **Real AI Proof Verification**: Powered by Google Gemini 2.5 Flash, student project submissions (GitHub repositories and technical notes) are audited against expected deliverables before milestone credit is awarded.
- **Guilt-Free Diversion Detection**: Intelligently detects if a student’s interests are naturally pivoting to another domain and offers friction-free roadmap realignment.

---

## 🏗️ Why We Chose This Tech Stack (Architecture Rationale)

Evaluators often ask: *"Why is there no separate Express/Django/FastAPI backend server?"*

ThiranAI is built on a **unified full-stack serverless architecture** using Next.js 14 and Prisma ORM.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 14 App Router                           │
│                                                                        │
│  ┌───────────────────────────┐        ┌─────────────────────────────┐  │
│  │     Client Components     │        │    Server Route Handlers    │  │
│  │  (React 18 + Tailwind)    │ ────>  │    (TypeScript API Routes)  │  │
│  │  • Interactive Dashboard  │ HTTP   │    • /api/roadmap/milestone │  │
│  │  • Real-time Mentor Chat  │ Fetch  │    • /api/onboarding/analyze│  │
│  │  • Modal & AI Feedback UI │        │    • /api/mentor/chat       │  │
│  └───────────────────────────┘        └──────────────┬──────────────┘  │
│                                                      │                 │
│                                       ┌──────────────┴──────────────┐  │
│                                       │     Data & Intelligence     │  │
│                                       │  ┌───────────────────────┐  │  │
│                                       │  │   Prisma ORM (SQLite) │  │  │
│                                       │  ├───────────────────────┤  │  │
│                                       │  │  Google Gemini 2.5    │  │  │
│                                       │  └───────────────────────┘  │  │
│                                       └─────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Next.js 14 (App Router) as a Full-Stack Framework
- **Unified Serverless Backend**: Backend route handlers run directly inside `src/app/api/...` as isolated serverless endpoints. This eliminates the need to maintain a separate backend repository, port routing, or CORS configurations.
- **Server-Side Security**: API keys (`GEMINI_API_KEY`) and database credentials run strictly on the Node.js server environment and are never leaked to client bundles.

### 2. Prisma ORM with SQLite (`dev.db`)
- **Real Relational Database**: Unlike mock in-memory stores, SQLite is a full ACID SQL database stored on disk (`prisma/dev.db`).
- **Zero Latency & Zero Setup**: No external database connection strings or cloud provisioning needed for local development and grading.
- **1-Line Cloud Portability**: Prisma abstracts database queries. To switch to PostgreSQL (Supabase, Neon, AWS RDS), you simply change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma` without rewriting a single line of application code.

### 3. Google Gemini 2.5 Flash (`@google/generative-ai`)
- **Fast Token Generation**: Generates comprehensive multi-milestone roadmaps and code audits in < 2 seconds.
- **Strict Structured JSON Mode**: Employs `responseMimeType: "application/json"` to ensure programmatic consistency across frontend UI cards and backend state.
- **Deterministic Offline Fallbacks**: If the API key is missing or quota is exhausted, the application gracefully falls back to structured offline responses without crashing.

### 4. Tailwind CSS + Framer Motion + Canvas Confetti
- Modern, dark-mode first design system tailored for developer focus with ambient glows, glassmorphism, responsive modals, and milestone celebration feedback.

---

## ⚡ Key Modules & Live Capabilities

| Module | Route | Description & Real AI Capability |
| :--- | :--- | :--- |
| **Landing Page** | [`/`](http://localhost:3000) | Value proposition, feature highlights, architectural manifesto, and quick portal access. |
| **Student Dashboard** | [`/dashboard`](http://localhost:3000/dashboard) | Central hub displaying the **"Next Big Action" Engine**, milestone momentum, and active domain stats. |
| **Aptitude Discovery** | [`/onboarding`](http://localhost:3000/onboarding) | Scenario-based quizzes analyzed by Gemini to discover student strengths and recommend ranked domains. |
| **Dynamic Roadmap** | [`/roadmap`](http://localhost:3000/roadmap) | 5-stage personalized milestones with curated video/doc resources, practical challenges, and AI review. |
| **AI Career Mentor** | [`/mentor`](http://localhost:3000/mentor) | Multi-turn conversational mentor aware of the student's active roadmap, completed milestones, and ratings. |
| **Hackathon Listings** | [`/hackathons`](http://localhost:3000/hackathons) | Curated hackathon database with domain tags, verified registration portals, and deadline countdowns. |
| **Internship Listings** | [`/internships`](http://localhost:3000/internships) | Verified software and tech internships with stipend details, eligibility criteria, and direct apply links. |
| **Target Eligibility** | [`/eligibility`](http://localhost:3000/eligibility) | Gap-closing analyzer comparing student skills against enterprise standards (Google, Microsoft, OpenAI). |
| **Skill Assessments** | [`/assessments`](http://localhost:3000/assessments) | Live coding/architecture challenges graded by Gemini with score breakdown, strengths, and improvements. |
| **Notifications** | [`/notifications`](http://localhost:3000/notifications) | Supportive event-driven notifications celebrating personal progress and milestone completion. |

---

## 🛡️ Real AI Milestone Verification Flow

To prevent students from submitting dummy or unverified links, every milestone completion submission undergoes automated AI verification:

```
Student Submits Project URL & Implementation Reflection
                     │
                     ▼
       POST /api/roadmap/milestone
                     │
                     ▼
       verifyMilestoneProof() in gemini.ts
         (Evaluates URL validity & deliverable match)
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    [FAIL / INCOMPLETE]     [VERIFIED / APPROVED]
         │                       │
         ▼                       ▼
  Returns HTTP 422        Saves AI Verified Badge
  Displays:               Marks Milestone Complete (100%)
  • Specific Missing Items Advances Next Milestone
  • Actionable Next Step  Triggers Confetti Celebration 🎉
```

---

## 📁 Codebase & Directory Structure

```text
ThiranAI/
├── prisma/
│   ├── schema.prisma        # Prisma data models & SQLite datasource
│   ├── seed.ts              # Database seed script (hackathons, internships, demo user)
│   └── dev.db               # SQLite database file
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── (dashboard)/     # Authenticated dashboard route group
│   │   │   ├── dashboard/   # Student dashboard & Next Action engine
│   │   │   ├── onboarding/  # Adaptive aptitude discovery
│   │   │   ├── roadmap/     # Learning roadmap & AI milestone verifier
│   │   │   ├── mentor/      # Context-aware AI career mentor chat
│   │   │   ├── hackathons/  # Curated hackathons directory
│   │   │   ├── internships/ # Curated internships directory
│   │   │   ├── eligibility/ # Target company eligibility gap analysis
│   │   │   ├── assessments/ # Practical challenge grader
│   │   │   └── profile/     # Student profile & skills management
│   │   ├── api/             # Full-stack Serverless REST Endpoints
│   │   │   ├── onboarding/  # Aptitude analysis & domain selection
│   │   │   ├── roadmap/     # Roadmap retrieval, milestone audit & diversion
│   │   │   ├── mentor/      # Multi-turn Gemini chat with profile context
│   │   │   ├── hackathons/  # Hackathon listing queries
│   │   │   ├── internships/ # Internship listing queries
│   │   │   └── assessments/ # Live submission grading
│   │   ├── layout.tsx       # Root application layout with providers
│   │   └── page.tsx         # Modern landing page
│   ├── components/          # Reusable UI & Navigation components
│   │   ├── navigation/      # AppNavbar, AppSidebar, and MobileNav
│   │   └── providers/       # NextAuth session & theme providers
│   ├── data/                # Initial seed data & aptitude scenario questions
│   ├── lib/
│   │   ├── ai/              # AI Engine (Gemini integration & system prompts)
│   │   │   ├── gemini.ts    # Google Generative AI integration (Gemini 2.5 Flash)
│   │   │   ├── prompts.ts   # System prompts with strict JSON schemas
│   │   │   └── mock-ai.ts   # Graceful fallback data provider
│   │   ├── auth.ts          # NextAuth authentication & bcrypt configuration
│   │   ├── prisma.ts        # Prisma Client singleton
│   │   ├── diversion-detector.ts # Domain shift analysis engine
│   │   └── notification-service.ts # Event-driven notifications
│   └── types/               # TypeScript interfaces & types
├── .env                     # Environment variables
└── package.json             # Project dependencies & scripts
```

---

## 💾 Database Schema & Data Architecture

The SQLite relational database maintains the following core models:

- **`User`**: Account credentials, email, hashed passwords, role (`STUDENT`, `ADMIN`, `MENTOR`).
- **`Profile`**: Target career domain, declared skills, experience level, bio, and social links.
- **`AptitudeTestResult`**: Answers to scenario questions, AI analysis reasoning, and recommended candidate domains.
- **`Roadmap`**: Active learning path for a domain, completion percentage, and AI generation metadata.
- **`RoadmapMilestone`**: Individual milestone stages containing:
  - `resources`: Curated YouTube, documentation, and course links.
  - `practicalChallenge`: Expected deliverables and evaluation rubrics.
  - `submissionDetails`: Verified project URL, reflection notes, AI score, and verification badge.
- **`Assessment`**: Code quiz submissions, scores, and Gemini AI feedback.
- **`MentorSession` & `MentorMessage`**: Multi-turn chat conversation history with contextual memory.
- **`Notification`**: Real-time non-comparative milestone celebrations and deadline reminders.
- **`HackathonListing` & `InternshipListing`**: Curated listings with eligibility requirements and application links.

---

## 🛠️ Installation & Setup Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/VK210607/thiranAI.git
cd thiranAI
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database Connection (Self-contained SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="thiran-ai-super-secret-development-jwt-key-2026-safe-guard"

# Google Gemini API Key (Get from https://aistudio.google.com/)
GEMINI_API_KEY="AIzaSyYourActualGoogleGeminiApiKeyHere"
```

### 3. Initialize & Seed Database
```bash
# Push schema to SQLite
npm run prisma:push

# Generate Prisma Client
npm run prisma:generate

# Seed hackathons, internships, and demo user
npm run db:seed
```

### 4. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Evaluator Walkthrough & Demo Guide

### Quick Login Credentials
You can either sign in with the pre-configured demo account or click **"1-Click Sign In as Demo Student"** on the `/signin` page:
- **Email**: `demo@thiran.ai`
- **Password**: `thiran123`

### Suggested Evaluation Flow:
1. **Explore the Landing Page (`/`)**: View the design system and core principles.
2. **Review the Dashboard (`/dashboard`)**: Check the **"Next Big Action"** priority card and milestone progress.
3. **Test Real AI Milestone Verification (`/roadmap`)**:
   - Click on Milestone 2 (*"React Architecture & State Patterns"*).
   - Click **"Complete & Attach Work"**.
   - *Test Rejection*: Enter `test` as the link and `done` as notes. Click **"Verify & Complete Milestone"** ➔ Watch Gemini reject the submission with specific missing deliverables!
   - *Test Approval*: Enter a valid GitHub URL (e.g., `https://github.com/demo/react-state-dashboard`) and a 2–3 sentence technical explanation. Click verify ➔ Watch Gemini audit the code, award an AI score, save the verified badge, and trigger confetti!
4. **Chat with AI Career Mentor (`/mentor`)**: Ask questions like *"What skills should I learn next for full-stack internships?"* or *"What is the market demand for this domain?"*.
5. **Explore Hackathons & Internships (`/hackathons`, `/internships`)**: Filter by domain tags and view verified registration portals.
