import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { chatWithMentor } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get or create active mentor session
    let mentorSession = await prisma.mentorSession.findFirst({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!mentorSession) {
      mentorSession = await prisma.mentorSession.create({
        data: {
          userId,
          title: "Career Navigation Session",
          messages: {
            create: {
              role: "assistant",
              content: "Hello! I'm your Thiran AI Career Mentor. I'm here to answer your questions about your skills, roadmap milestones, project architectures, or current industry demand. What would you like to explore today?",
            },
          },
        },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });
    }

    return NextResponse.json({
      sessionId: mentorSession.id,
      messages: mentorSession.messages,
    });
  } catch (error: any) {
    console.error("Mentor fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch mentor session" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Load full user context
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
      },
    });

    const activeRoadmap = user?.roadmaps[0];
    const completedMilestones = activeRoadmap?.milestones.filter((m) => m.status === "COMPLETED") || [];
    const skills = typeof user?.profile?.skills === "string" ? JSON.parse(user.profile.skills || "[]") : (user?.profile?.skills || []);
    const projects = typeof user?.profile?.projects === "string" ? JSON.parse(user.profile.projects || "[]") : (user?.profile?.projects || []);

    let targetSessionId = sessionId;
    if (!targetSessionId) {
      const existingSession = await prisma.mentorSession.findFirst({
        where: { userId },
      });
      targetSessionId = existingSession?.id;
    }

    if (!targetSessionId) {
      const newSession = await prisma.mentorSession.create({
        data: {
          userId,
          title: "Career Navigation Session",
        },
      });
      targetSessionId = newSession.id;
    }

    // Save user message
    const userMsg = await prisma.mentorMessage.create({
      data: {
        sessionId: targetSessionId,
        role: "user",
        content: message,
      },
    });

    // Fetch conversation history
    const history = await prisma.mentorMessage.findMany({
      where: { sessionId: targetSessionId },
      orderBy: { createdAt: "asc" },
      take: 12,
    });

    // Call Gemini AI with complete context
    const aiReplyText = await chatWithMentor(
      message,
      history.map((h) => ({ role: h.role as any, content: h.content })),
      {
        userName: user?.name || "Student",
        targetDomain: user?.profile?.targetDomain || "Software Engineering",
        experienceLevel: user?.profile?.experienceLevel || "BEGINNER",
        skills,
        projects,
        currentRoadmap: activeRoadmap,
        completedMilestonesCount: completedMilestones.length,
        totalMilestonesCount: activeRoadmap?.milestones.length || 0,
        recentRatings: completedMilestones.map((m) => ({ title: m.title, rating: m.userRating, feedback: m.userFeedback })),
      }
    );

    // Save assistant message
    const assistantMsg = await prisma.mentorMessage.create({
      data: {
        sessionId: targetSessionId,
        role: "assistant",
        content: aiReplyText,
      },
    });

    return NextResponse.json({
      reply: assistantMsg,
      userMessage: userMsg,
    });
  } catch (error: any) {
    console.error("Mentor chat error:", error);
    return NextResponse.json({ error: "Failed to process mentor message" }, { status: 500 });
  }
}
