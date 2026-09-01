import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notifyMilestoneCompleted, notifyDomainShiftPrompt } from "@/lib/notification-service";
import { checkDomainDiversion } from "@/lib/diversion-detector";
import { verifyMilestoneProof } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { milestoneId, status, projectUrl, notes, rating, feedback } = body;

    if (!milestoneId) {
      return NextResponse.json({ error: "Milestone ID is required" }, { status: 400 });
    }

    // Verify milestone belongs to user's active roadmap
    const milestone = await prisma.roadmapMilestone.findUnique({
      where: { id: milestoneId },
      include: { roadmap: true },
    });

    if (!milestone || milestone.roadmap.userId !== userId) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
    }

    const isCompleted = status === "COMPLETED";
    let aiVerificationResult: any = null;

    if (isCompleted) {
      // Real AI Proof Verification
      let parsedChallenge = null;
      try {
        parsedChallenge = milestone.practicalChallenge ? JSON.parse(milestone.practicalChallenge) : null;
      } catch (e) {}

      aiVerificationResult = await verifyMilestoneProof(
        milestone.title,
        milestone.description,
        milestone.roadmap.domain,
        parsedChallenge,
        { projectUrl: projectUrl || "", notes: notes || "" }
      );

      if (!aiVerificationResult.verified) {
        return NextResponse.json(
          {
            error: "Milestone verification needs revision",
            verification: aiVerificationResult,
          },
          { status: 422 }
        );
      }
    }

    const updatedMilestone = await prisma.roadmapMilestone.update({
      where: { id: milestoneId },
      data: {
        status: status || "COMPLETED",
        completionPercent: isCompleted ? 100 : milestone.completionPercent,
        completedAt: isCompleted ? new Date() : milestone.completedAt,
        userRating: rating !== undefined ? rating : milestone.userRating,
        userFeedback: feedback !== undefined ? feedback : milestone.userFeedback,
        submissionDetails:
          projectUrl || notes || aiVerificationResult
            ? JSON.stringify({
                projectUrl: projectUrl || "",
                notes: notes || "",
                completedAt: new Date().toISOString(),
                aiVerified: isCompleted ? (aiVerificationResult?.verified ?? true) : false,
                verificationScore: aiVerificationResult?.score || 85,
                feedback: aiVerificationResult?.summary || "",
                strengths: aiVerificationResult?.strengths || [],
                badge: aiVerificationResult?.verificationBadge || "VERIFIED",
              })
            : milestone.submissionDetails,
      },
    });

    // Also advance the next milestone to IN_PROGRESS if this one was completed
    if (isCompleted) {
      const nextMilestone = await prisma.roadmapMilestone.findFirst({
        where: {
          roadmapId: milestone.roadmapId,
          orderIndex: milestone.orderIndex + 1,
          status: "NOT_STARTED",
        },
      });

      if (nextMilestone) {
        await prisma.roadmapMilestone.update({
          where: { id: nextMilestone.id },
          data: { status: "IN_PROGRESS" },
        });
      }

      // Recalculate roadmap overall completion percent
      const allMilestones = await prisma.roadmapMilestone.findMany({
        where: { roadmapId: milestone.roadmapId },
      });
      const completedCount = allMilestones.filter((m) => m.status === "COMPLETED").length;
      const totalPercent = Math.round((completedCount / allMilestones.length) * 100);

      await prisma.roadmap.update({
        where: { id: milestone.roadmapId },
        data: { completionPercent: totalPercent },
      });

      // Dispatch non-comparative milestone celebration notification
      await notifyMilestoneCompleted(userId, milestone.title, milestone.roadmap.domain);

      // Check if user has demonstrated diversion to another domain
      const diversion = await checkDomainDiversion(userId);
      if (diversion.hasDiverted && diversion.suggestedDomain) {
        await notifyDomainShiftPrompt(userId, diversion.suggestedDomain);
      }
    }

    return NextResponse.json({
      success: true,
      milestone: updatedMilestone,
    });
  } catch (error: any) {
    console.error("Milestone update error:", error);
    return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
  }
}
