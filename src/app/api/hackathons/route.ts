import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    const hackathons = await prisma.hackathonListing.findMany({
      orderBy: { deadline: "asc" },
    });

    const parsedHackathons = hackathons.map((h) => ({
      ...h,
      domainTags: typeof h.domainTags === "string" ? JSON.parse(h.domainTags || "[]") : (h.domainTags || []),
      eligibilityCriteria: typeof h.eligibilityCriteria === "string" ? JSON.parse(h.eligibilityCriteria || "{}") : (h.eligibilityCriteria || {}),
    }));

    const filtered = domain && domain !== "ALL"
      ? parsedHackathons.filter((h) =>
          h.domainTags.some((tag: string) => tag.toLowerCase().includes(domain.toLowerCase()))
        )
      : parsedHackathons;

    return NextResponse.json({
      hackathons: filtered,
      total: filtered.length,
      notice: "Curated student hackathon database with verified registration portals.",
    });
  } catch (error: any) {
    console.error("Hackathons query error:", error);
    return NextResponse.json({ error: "Failed to fetch hackathons" }, { status: 500 });
  }
}
