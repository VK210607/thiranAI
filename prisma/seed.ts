import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SEED_HACKATHONS, SEED_INTERNSHIPS } from "../src/data/seed-data";
import { MOCK_ROADMAPS_BY_DOMAIN, getMockAptitudeAnalysis } from "../src/lib/ai/mock-ai";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ThiranAI database seed...");

  // 1. Seed Hackathon Listings
  console.log("Seeding curated hackathons...");
  for (const hack of SEED_HACKATHONS) {
    await prisma.hackathonListing.upsert({
      where: { id: hack.id },
      update: {},
      create: {
        id: hack.id,
        title: hack.title,
        organizer: hack.organizer,
        domainTags: JSON.stringify(hack.domainTags),
        description: hack.description,
        startDate: new Date(hack.startDate),
        endDate: new Date(hack.endDate),
        deadline: new Date(hack.deadline),
        location: hack.location,
        isOnline: hack.isOnline,
        registrationUrl: hack.registrationUrl,
        prizePool: hack.prizePool,
        eligibilityCriteria: JSON.stringify(hack.eligibilityCriteria),
        isCurated: true,
      },
    });
  }

  // 2. Seed Internship Listings
  console.log("Seeding curated internships...");
  for (const intern of SEED_INTERNSHIPS) {
    await prisma.internshipListing.upsert({
      where: { id: intern.id },
      update: {},
      create: {
        id: intern.id,
        title: intern.title,
        company: intern.company,
        domain: intern.domain,
        stipend: intern.stipend,
        location: intern.location,
        remote: intern.remote,
        applicationUrl: intern.applicationUrl,
        deadline: new Date(intern.deadline),
        description: intern.description,
        eligibilityCriteria: JSON.stringify(intern.eligibilityCriteria),
        requiredSkills: JSON.stringify(intern.requiredSkills),
        isCurated: true,
      },
    });
  }

  // 3. Seed Demo User
  console.log("Seeding demo student user (demo@thiran.ai)...");
  const defaultPasswordHash = await bcrypt.hash("thiran123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@thiran.ai" },
    update: {},
    create: {
      name: "Alex Rivera",
      email: "demo@thiran.ai",
      passwordHash: defaultPasswordHash,
      role: "STUDENT",
      profile: {
        create: {
          targetDomain: "Full-Stack Web Development",
          experienceLevel: "BEGINNER",
          bio: "Undergraduate CS student passionate about building accessible web apps, clean APIs, and exploring AI-assisted workflows.",
          skills: JSON.stringify([
            { name: "TypeScript", level: "Beginner", verified: true },
            { name: "JavaScript (ES6+)", level: "Intermediate", verified: true },
            { name: "HTML & CSS / Tailwind", level: "Intermediate", verified: true },
            { name: "React", level: "Beginner", verified: false },
            { name: "Git & GitHub", level: "Intermediate", verified: true },
          ]),
          projects: JSON.stringify([
            {
              id: "p1",
              title: "StudyForge - Collaborative Pomodoro",
              description: "A real-time group study session tracker built with React and local storage state persistence.",
              techStack: ["React", "Tailwind CSS", "JavaScript"],
              link: "https://github.com/demo/studyforge",
            },
          ]),
          domainInterests: JSON.stringify(["Full-Stack Web Development", "AI Engineering", "UI/UX Design"]),
          githubUrl: "https://github.com/demo-alex",
          linkedinUrl: "https://linkedin.com/in/demo-alex",
        },
      },
    },
    include: { profile: true },
  });

  // 4. Seed Aptitude Test Result for Demo User
  const mockAnalysis = getMockAptitudeAnalysis({});
  await prisma.aptitudeTestResult.create({
    data: {
      userId: demoUser.id,
      answers: JSON.stringify({
        weekend_project: "Interactive Web Application",
        scenario_breakdown: "User Interface & Experience",
        logic_puzzle: "Build a sleek resumable web portal with chunked uploads",
        satisfaction: "Seeing a living, breathing product that people click and love",
      }),
      analyzedDomains: JSON.stringify(mockAnalysis.analyzedDomains),
      selectedDomain: "Full-Stack Web Development",
      reasoning: mockAnalysis.supportiveSynthesis,
    },
  });

  // 5. Seed Active Roadmap for Demo User
  const webRoadmapData = MOCK_ROADMAPS_BY_DOMAIN["Full-Stack Web Development"];
  const roadmap = await prisma.roadmap.create({
    data: {
      userId: demoUser.id,
      domain: webRoadmapData.domain,
      title: webRoadmapData.title,
      description: webRoadmapData.description,
      isCurrent: true,
      generatedByAi: true,
      completionPercent: 20,
    },
  });

  // Seed Milestones
  for (let i = 0; i < webRoadmapData.milestones.length; i++) {
    const m = webRoadmapData.milestones[i];
    const isFirst = i === 0;
    const isSecond = i === 1;

    await prisma.roadmapMilestone.create({
      data: {
        roadmapId: roadmap.id,
        orderIndex: m.orderIndex,
        title: m.title,
        description: m.description,
        whyItMatters: m.whyItMatters,
        estimatedHours: m.estimatedHours,
        resources: JSON.stringify(m.resources),
        practicalChallenge: JSON.stringify(m.practicalChallenge),
        status: isFirst ? "COMPLETED" : isSecond ? "IN_PROGRESS" : "NOT_STARTED",
        completionPercent: isFirst ? 100 : isSecond ? 35 : 0,
        submissionDetails: isFirst
          ? JSON.stringify({
              projectUrl: "https://github.com/demo/typed-cli-taskmanager",
              notes: "Completed all CLI requirements using TypeScript generics and zod validation.",
              completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            })
          : null,
        userRating: isFirst ? 5 : null,
        userFeedback: isFirst ? "Building the CLI tool with TypeScript interfaces really solidified how generics work." : null,
        completedAt: isFirst ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : null,
      },
    });
  }

  // 6. Seed AI Mentor Session
  const session = await prisma.mentorSession.create({
    data: {
      userId: demoUser.id,
      title: "Initial Career Domain Alignment",
    },
  });

  await prisma.mentorMessage.createMany({
    data: [
      {
        sessionId: session.id,
        role: "assistant",
        content: "Welcome Alex! I'm your Thiran AI Mentor. I reviewed your aptitude discovery results — your eye for product experience and logical data flows makes Full-Stack Web Development a great domain. How are you feeling about starting Milestone 2 on React state patterns?",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        sessionId: session.id,
        role: "user",
        content: "I finished the TypeScript CLI project and loved it! Is learning Next.js App Router worth it right now for internship applications?",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000),
      },
      {
        sessionId: session.id,
        role: "assistant",
        content: "Absolutely! Next.js App Router is one of the highest-demand skills in modern full-stack engineering. Most early-stage tech companies and tech enterprises look for developers who understand Server Components and fast edge rendering. You're well on track!",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 120000),
      },
    ],
  });

  // 7. Seed Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: demoUser.id,
        title: "Milestone Completed! 🎉",
        message: "You completed 'Modern TypeScript & Modern JavaScript'! Your personalized roadmap has updated.",
        type: "MILESTONE",
        read: true,
        linkUrl: "/roadmap",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: demoUser.id,
        title: "Hackathon Deadline Approaching 🚀",
        message: "Registration for 'Global AI & Web Innovation Sprint 2026' closes soon. Check out the project prompts!",
        type: "DEADLINE",
        read: false,
        linkUrl: "/hackathons",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: demoUser.id,
        title: "Consistent Momentum ✨",
        message: "Great job maintaining your learning streak. Remember to take comfortable breaks between coding sessions.",
        type: "ENCOURAGEMENT",
        read: false,
        linkUrl: "/dashboard",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ],
  });

  // 8. Seed Domain Change Log
  await prisma.domainChangeLog.create({
    data: {
      userId: demoUser.id,
      previousDomain: "Undecided / Exploratory",
      newDomain: "Full-Stack Web Development",
      reason: "Completed initial adaptive aptitude test with 92% affinity for product engineering.",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
