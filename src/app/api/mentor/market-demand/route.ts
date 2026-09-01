import { NextResponse } from "next/server";
import { getMarketDemandInsights } from "@/lib/ai/gemini";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "Full-Stack Web Development";

    const insights = await getMarketDemandInsights(query);

    return NextResponse.json({
      insights,
      disclaimer: "Market demand, compensation, and hiring insights are real-time analytical estimates provided to guide your learning exploration.",
    });
  } catch (error: any) {
    console.error("Market demand query error:", error);
    return NextResponse.json({ error: "Failed to evaluate market demand" }, { status: 500 });
  }
}
