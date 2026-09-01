import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gradeAssessment } from "@/lib/ai/gemini";
import { createNotification } from "@/lib/notification-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const body = await req.json();
    const { title, domain, submission } = body;

    if (!title || !submission) {
      return NextResponse.json({ error: "Title and submission are required" }, { status: 400 });
    }

    // Call Gemini Grader
    const grading = await gradeAssessment(title, domain || "Full-Stack Web Development", submission);

    let savedAssessmentId = "demo_assessment";
    if (userId) {
      // Save Assessment in database for logged-in user
      const savedAssessment = await prisma.assessment.create({
        data: {
          userId,
          domain: domain || "Full-Stack Web Development",
          title,
          questions: JSON.stringify({ prompt: title }),
          userSubmission: JSON.stringify(submission),
          aiFeedback: JSON.stringify(grading),
          score: grading.score || 85,
          isPassed: grading.isPassed ?? true,
        },
      });
      savedAssessmentId = savedAssessment.id;

      // Notify student
      await createNotification({
        userId,
        title: `Assessment Evaluated: ${title} ✨`,
        message: `Score: ${grading.score}/100. Constructive feedback: "${grading.summary || 'Great work on this challenge'}"`,
        type: "MILESTONE",
        linkUrl: "/assessments",
      });
    }

    return NextResponse.json({
      assessmentId: savedAssessmentId,
      grading,
    });
  } catch (error: any) {
    console.error("Grading error:", error);
    return NextResponse.json({ error: "Failed to evaluate assessment" }, { status: 500 });
  }
}
