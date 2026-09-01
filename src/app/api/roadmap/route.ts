import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const roadmap = await prisma.roadmap.findFirst({
      where: { userId, isCurrent: true },
      include: {
        milestones: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!roadmap) {
      return NextResponse.json({ roadmap: null });
    }

    // Parse JSON strings in milestones
    const parsedMilestones = roadmap.milestones.map((m) => ({
      ...m,
      resources: typeof m.resources === "string" ? JSON.parse(m.resources || "[]") : (m.resources || []),
      practicalChallenge: typeof m.practicalChallenge === "string" ? JSON.parse(m.practicalChallenge || "null") : (m.practicalChallenge || null),
      submissionDetails: typeof m.submissionDetails === "string" ? JSON.parse(m.submissionDetails || "null") : (m.submissionDetails || null),
    }));

    return NextResponse.json({
      roadmap: {
        ...roadmap,
        milestones: parsedMilestones,
      },
    });
  } catch (error: any) {
    console.error("Roadmap fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch roadmap" }, { status: 500 });
  }
}
