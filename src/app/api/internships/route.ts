import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    const internships = await prisma.internshipListing.findMany({
      orderBy: { deadline: "asc" },
    });

    const parsedInternships = internships.map((i) => ({
      ...i,
      eligibilityCriteria: typeof i.eligibilityCriteria === "string" ? JSON.parse(i.eligibilityCriteria || "{}") : (i.eligibilityCriteria || {}),
      requiredSkills: typeof i.requiredSkills === "string" ? JSON.parse(i.requiredSkills || "[]") : (i.requiredSkills || []),
    }));

    const filtered = domain && domain !== "ALL"
      ? parsedInternships.filter((i) =>
          i.domain.toLowerCase().includes(domain.toLowerCase())
        )
      : parsedInternships;

    return NextResponse.json({
      internships: filtered,
      total: filtered.length,
      notice: "Curated student internship opportunities with external official portal redirects.",
    });
  } catch (error: any) {
    console.error("Internships query error:", error);
    return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 });
  }
}
