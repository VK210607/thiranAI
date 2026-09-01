import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notification-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { gapItem, targetCompanyName } = body;

    if (!gapItem?.skill) {
      return NextResponse.json({ error: "Gap item is required" }, { status: 400 });
    }

    const activeRoadmap = await prisma.roadmap.findFirst({
      where: { userId, isCurrent: true },
      include: { milestones: true },
    });

    if (!activeRoadmap) {
      return NextResponse.json({ error: "No active roadmap found" }, { status: 404 });
    }

    const nextOrderIndex = activeRoadmap.milestones.length;

    const newMilestone = await prisma.roadmapMilestone.create({
      data: {
        roadmapId: activeRoadmap.id,
        orderIndex: nextOrderIndex,
        title: `Gap-Closer: Master ${gapItem.skill}`,
        description: gapItem.actionItem || `Focus on bridging your skills in ${gapItem.skill} for ${targetCompanyName || "target opportunities"}.`,
        whyItMatters: `Direct prerequisite for competitive internships and roles at ${targetCompanyName || "top tech companies"}.`,
        estimatedHours: 12,
        resources: JSON.stringify([
          {
            title: `Essential ${gapItem.skill} Guide & Documentation`,
            url: "https://github.com",
            type: "doc",
            provider: "Curated Resource",
          },
        ]),
        practicalChallenge: JSON.stringify({
          challenge: gapItem.suggestedProject || `Build a demonstrator mini-project highlighting ${gapItem.skill}.`,
          deliverables: ["GitHub Repo with working proof", "Unit tests and documentation"],
          evaluationCriteria: ["Clean implementation", "Verifiable Git commit proof"],
        }),
        status: "NOT_STARTED",
        completionPercent: 0,
      },
    });

    await createNotification({
      userId,
      title: "Roadmap Updated with Gap-Closer! 🎯",
      message: `Added "Master ${gapItem.skill}" to your active roadmap to help you qualify for ${targetCompanyName || "top opportunities"}.`,
      type: "SYSTEM",
      linkUrl: "/roadmap",
    });

    return NextResponse.json({
      success: true,
      milestone: newMilestone,
    });
  } catch (error: any) {
    console.error("Inject gap error:", error);
    return NextResponse.json({ error: "Failed to inject gap closer" }, { status: 500 });
  }
}
