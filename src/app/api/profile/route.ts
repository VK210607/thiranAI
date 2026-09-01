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
        aptitudeResults: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        domainChangeLogs: {
          orderBy: { switchedAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Safely parse JSON strings for profile
    const skills = typeof user.profile?.skills === "string" ? JSON.parse(user.profile.skills || "[]") : (user.profile?.skills || []);
    const projects = typeof user.profile?.projects === "string" ? JSON.parse(user.profile.projects || "[]") : (user.profile?.projects || []);
    const domainInterests = typeof user.profile?.domainInterests === "string" ? JSON.parse(user.profile.domainInterests || "[]") : (user.profile?.domainInterests || []);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile: {
        ...user.profile,
        skills,
        projects,
        domainInterests,
      },
      currentRoadmap: user.roadmaps[0] || null,
      latestAptitude: user.aptitudeResults[0] || null,
      domainChangeLogs: user.domainChangeLogs,
    });
  } catch (error: any) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { targetDomain, experienceLevel, bio, skills, projects, domainInterests, githubUrl, linkedinUrl } = body;

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        targetDomain: targetDomain !== undefined ? targetDomain : undefined,
        experienceLevel: experienceLevel !== undefined ? experienceLevel : undefined,
        bio: bio !== undefined ? bio : undefined,
        skills: skills !== undefined ? JSON.stringify(skills) : undefined,
        projects: projects !== undefined ? JSON.stringify(projects) : undefined,
        domainInterests: domainInterests !== undefined ? JSON.stringify(domainInterests) : undefined,
        githubUrl: githubUrl !== undefined ? githubUrl : undefined,
        linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : undefined,
      },
      create: {
        userId,
        targetDomain: targetDomain || "Full-Stack Web Development",
        experienceLevel: experienceLevel || "BEGINNER",
        bio: bio || "",
        skills: JSON.stringify(skills || []),
        projects: JSON.stringify(projects || []),
        domainInterests: JSON.stringify(domainInterests || []),
        githubUrl: githubUrl || "",
        linkedinUrl: linkedinUrl || "",
      },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
