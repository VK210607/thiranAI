import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkDomainDiversion } from "@/lib/diversion-detector";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const diversion = await checkDomainDiversion(userId);

    return NextResponse.json(diversion);
  } catch (error: any) {
    console.error("Diversion query error:", error);
    return NextResponse.json({ hasDiverted: false }, { status: 500 });
  }
}
