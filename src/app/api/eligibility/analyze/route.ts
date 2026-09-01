import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { evaluateEligibility } from "@/lib/ai/gemini";
import { SEED_COMPANIES_ELIGIBILITY } from "@/data/seed-data";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { companyName } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        roadmaps: {
          where: { isCurrent: true },
          include: {
            milestones: { where: { status: "COMPLETED" } },
          },
        },
      },
    });

    const targetCompany = SEED_COMPANIES_ELIGIBILITY.find(
      (c) => c.company.toLowerCase() === (companyName || "Google").toLowerCase()
    ) || SEED_COMPANIES_ELIGIBILITY[0];

    const parsedSkills = typeof user?.profile?.skills === "string" ? JSON.parse(user.profile.skills || "[]") : (user?.profile?.skills || []);
    const parsedProjects = typeof user?.profile?.projects === "string" ? JSON.parse(user.profile.projects || "[]") : (user?.profile?.projects || []);

    const evaluation = await evaluateEligibility(
      `${targetCompany.company} - ${targetCompany.role}`,
      "COMPANY",
      targetCompany.prerequisites,
      {
        skills: parsedSkills,
        projects: parsedProjects,
        completedMilestones: user?.roadmaps[0]?.milestones || [],
      }
    );

    return NextResponse.json({
      company: targetCompany,
      evaluation,
    });
  } catch (error: any) {
    console.error("Eligibility analysis error:", error);
    return NextResponse.json({ error: "Failed to evaluate eligibility" }, { status: 500 });
  }
}
