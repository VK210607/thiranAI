# ThiranAI — AI-Guided Career & Skill Navigation Platform for Students

> **Vision**: An anxiety-free, personalized full-stack career and skill navigation platform for students. ThiranAI discovers a student's genuine technical domain, builds a tailored non-comparative roadmap, tracks authentic progress, connects students to relevant hackathons and internships, and always provides the single **"Next Big Action"** to take.

---

## 🌟 Core Philosophy: Zero Peer Comparison

Unlike typical platforms that push stressful leaderboards, percentile rankings, and peer comparisons, ThiranAI is designed around **pure personal mastery**:
- **No Leaderboards**: Progress is measured strictly against your own chosen roadmap.
- **Supportive Tone**: In-app notifications and mentor guidance celebrate consistency and craft.
- **Guilt-Free Diversion Detection**: If your curiosity shifts toward another domain, ThiranAI gently suggests updating your roadmap without friction or guilt.

---

## 🚀 Key Modules & Capabilities

1. **Adaptive Onboarding & Aptitude Discovery** (`/onboarding`):
   - Choice of *"I'm not sure yet"* or *"I know my domain"*.
   - Adaptive scenario questions, logic dilemmas, and project preference checks.
   - Google Gemini AI synthesizes responses and provides 2–4 ranked domain recommendations with plain-language rationales.

2. **Personalized Roadmap & Progress Tracker** (`/roadmap`, `/profile`):
   - 5-stage milestone progression from core foundations to portfolio-grade projects.
   - High-yield external curated resources (video courses, official docs, interactive sandboxes).
   - Milestone submissions with project links, 1–5 star topic enjoyment ratings, and reflection notes.

3. **Persistent AI Career Mentor** (`/mentor`):
   - Multi-turn conversation with memory of student profile, completed milestones, and recent feedback.
   - Real-time **Job Market Signal Grounding** (salary benchmarks, top hiring companies, key emerging trends).

4. **The "Next Big Action" Engine** (`/dashboard`):
   - Priority engine scoring upcoming hackathon deadlines, internship windows, and active milestones into a single, high-impact actionable card.

5. **Curated Hackathons & Internships** (`/hackathons`, `/internships`):
   - Filterable directories with deadline countdowns, domain tags, and direct links to official portals.

6. **Target Company Eligibility Checker** (`/eligibility`):
   - Evaluates current skills against employer standards (Google, Microsoft, OpenAI Partner, CrowdStrike).
   - 1-Click **"Slot into Roadmap"** to inject gap-closing milestones directly into your active learning path.

7. **Constructive Skill Assessments** (`/assessments`):
   - Architecture & code quizzes evaluated with Gemini rubrics (strengths, improvement areas, structured feedback).

8. **Motivational Notification Center** (`/notifications`):
   - Supportive, non-guilt event triggers with stubbed hooks for email and push.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React, Framer Motion, Canvas-Confetti
- **Backend**: Next.js API Routes (Route Handlers) with Zod validation
- **Database**: Prisma ORM with SQLite (zero-config local) or PostgreSQL (Vercel/Neon cloud deployment)
- **Auth**: NextAuth.js (Email/Password credentials with bcrypt + 1-Click Instant Demo Login)
- **AI Engine**: Google Gemini API (`@google/generative-ai` with structured JSON output and fallback resilience)

---

## 📋 Environment Variables Setup

Create a `.env` file in the project root:

```bash
# Database connection (SQLite default for instant local setup; switch to postgresql for production)
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-nextauth-secret-key-here"

# Google Gemini API Key (Get from https://aistudio.google.com/)
# Leave empty to use deterministic mock AI responses for evaluation
GEMINI_API_KEY=""

# Optional: Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed Demo Data
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Demo Credentials & Testing

- **1-Click Instant Demo**: Click *"1-Click Sign In as Demo Student"* on `/signin`
- **Manual Credentials**:
  - Email: `demo@thiran.ai`
  - Password: `thiran123`
- Pre-populated with:
  - Active Full-Stack Web Development Roadmap (1 completed milestone with submission & rating)
  - Prior Aptitude Test Result
  - Seeded Mentor Chat History
  - Seeded Hackathons and Internships
  - Supportive Notifications

---

## 🚢 Building for Production

```bash
npm run build
npm start
```
