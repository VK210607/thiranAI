import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateRoadmap } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";
import { notifySupportiveNudge } from "@/lib/notification-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { domain, experienceLevel = "BEGINNER", reason } = body;

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    // Get current profile
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    const previousDomain = existingProfile?.targetDomain || "Undecided";

    // 1. Update Profile
    await prisma.profile.upsert({
      where: { userId },
      update: {
        targetDomain: domain,
        experienceLevel,
      },
      create: {
        userId,
        targetDomain: domain,
        experienceLevel,
        skills: "[]",
        projects: "[]",
        domainInterests: JSON.stringify([domain]),
      },
    });

    // 2. Mark previous roadmaps as inactive
    await prisma.roadmap.updateMany({
      where: { userId, isCurrent: true },
      data: { isCurrent: false },
    });

    // 3. Generate Roadmap via Gemini AI
    const roadmapData = await generateRoadmap(domain, experienceLevel, []);

    // 4. Create new Roadmap and Milestones
    const newRoadmap = await prisma.roadmap.create({
      data: {
        userId,
        domain,
        title: roadmapData.title || `${domain} Mastery Roadmap`,
        description: roadmapData.description || `Tailored learning roadmap for ${domain}.`,
        isCurrent: true,
        generatedByAi: true,
        completionPercent: 0,
      },
    });

    const milestones = roadmapData.milestones || [];
    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      await prisma.roadmapMilestone.create({
        data: {
          roadmapId: newRoadmap.id,
          orderIndex: i,
          title: m.title,
          description: m.description,
          whyItMatters: m.whyItMatters || "Crucial building block for real-world mastery.",
          estimatedHours: m.estimatedHours || 10,
          resources: JSON.stringify(m.resources || []),
          practicalChallenge: JSON.stringify(m.practicalChallenge || null),
          status: i === 0 ? "IN_PROGRESS" : "NOT_STARTED",
          completionPercent: 0,
        },
      });
    }

    // 5. Log domain change
    if (previousDomain !== domain) {
      await prisma.domainChangeLog.create({
        data: {
          userId,
          previousDomain,
          newDomain: domain,
          reason: reason || "Domain selection through aptitude discovery onboarding.",
        },
      });
    }

    // 6. Create supportive notification
    await notifySupportiveNudge(userId, domain);

    return NextResponse.json({
      success: true,
      roadmapId: newRoadmap.id,
      domain,
    });
  } catch (error: any) {
    console.error("Domain selection error:", error);
    return NextResponse.json({ error: "Failed to set target domain" }, { status: 500 });
  }
}
