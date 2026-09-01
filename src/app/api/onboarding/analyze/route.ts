import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { analyzeAptitude } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { answers, skills = [], projects = [] } = body;

    const analysis = await analyzeAptitude(answers, skills, projects);

    if (session?.user) {
      const userId = (session.user as any).id;
      // Record the aptitude test result
      await prisma.aptitudeTestResult.create({
        data: {
          userId,
          answers: JSON.stringify(answers),
          analyzedDomains: JSON.stringify(analysis.analyzedDomains),
          selectedDomain: analysis.primaryRecommendation,
          reasoning: analysis.supportiveSynthesis,
        },
      });
    }

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Aptitude analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze aptitude responses" }, { status: 500 });
  }
}
