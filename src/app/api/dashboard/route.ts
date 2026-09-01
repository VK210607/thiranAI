import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeNextBigAction } from "@/lib/next-action-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch user with profile and active roadmap
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        roadmaps: {
          where: { isCurrent: true },
          include: {
            milestones: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
        notifications: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    const activeRoadmap = user?.roadmaps[0];
    const parsedMilestones = activeRoadmap?.milestones.map((m) => ({
      ...m,
      resources: typeof m.resources === "string" ? JSON.parse(m.resources || "[]") : (m.resources || []),
      practicalChallenge: typeof m.practicalChallenge === "string" ? JSON.parse(m.practicalChallenge || "null") : (m.practicalChallenge || null),
    })) || [];

    const nextIncompleteMilestone = parsedMilestones.find(
      (m) => m.status === "IN_PROGRESS" || m.status === "NOT_STARTED"
    );

    // Fetch nearest hackathon
    const nearestHackathon = await prisma.hackathonListing.findFirst({
      where: { deadline: { gte: new Date() } },
      orderBy: { deadline: "asc" },
    });

    // Fetch nearest internship
    const nearestInternship = await prisma.internshipListing.findFirst({
      where: { deadline: { gte: new Date() } },
      orderBy: { deadline: "asc" },
    });

    const nextBigAction = computeNextBigAction({
      targetDomain: user?.profile?.targetDomain || undefined,
      activeRoadmap: activeRoadmap || undefined,
      nextIncompleteMilestone: nextIncompleteMilestone || undefined,
      nearestHackathon: nearestHackathon
        ? {
            ...nearestHackathon,
            domainTags: typeof nearestHackathon.domainTags === "string" ? JSON.parse(nearestHackathon.domainTags || "[]") : nearestHackathon.domainTags,
          }
        : undefined,
      nearestInternship: nearestInternship || undefined,
    });

    const completedMilestones = parsedMilestones.filter((m) => m.status === "COMPLETED");
    const skills = typeof user?.profile?.skills === "string" ? JSON.parse(user?.profile?.skills || "[]") : (user?.profile?.skills || []);

    return NextResponse.json({
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
      profile: {
        targetDomain: user?.profile?.targetDomain,
        experienceLevel: user?.profile?.experienceLevel,
        skillsCount: skills.length,
      },
      activeRoadmap: activeRoadmap
        ? {
            ...activeRoadmap,
            milestones: parsedMilestones,
          }
        : null,
      nextIncompleteMilestone,
      nextBigAction,
      nearestHackathon: nearestHackathon
        ? {
            ...nearestHackathon,
            domainTags: typeof nearestHackathon.domainTags === "string" ? JSON.parse(nearestHackathon.domainTags || "[]") : nearestHackathon.domainTags,
          }
        : null,
      nearestInternship,
      recentNotifications: user?.notifications || [],
      stats: {
        completedMilestones: completedMilestones.length,
        totalMilestones: parsedMilestones.length,
        completionPercent: activeRoadmap?.completionPercent || 0,
        skillsCount: skills.length,
      },
    });
  } catch (error: any) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
