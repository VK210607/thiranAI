import { prisma } from "@/lib/prisma";

export interface DiversionCheckResult {
  hasDiverted: boolean;
  suggestedDomain?: string;
  divergenceReason?: string;
  recentActivitySummary?: string;
}

/**
 * Checks whether user activity indicates a sustained drift towards a different domain.
 */
export async function checkDomainDiversion(userId: string): Promise<DiversionCheckResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        mentorSessions: {
          include: {
            messages: {
              where: { role: "user" },
              orderBy: { createdAt: "desc" },
              take: 10,
            },
          },
        },
      },
    });

    if (!user || !user.profile || !user.profile.targetDomain) {
      return { hasDiverted: false };
    }

    const currentDomain = user.profile.targetDomain.toLowerCase();

    // Collect all recent user queries across mentor sessions
    const recentQueries = user.mentorSessions
      .flatMap((s) => s.messages)
      .map((m) => m.content.toLowerCase());

    if (recentQueries.length < 3) {
      return { hasDiverted: false };
    }

    // Keyword frequencies for potential pivot domains
    const aiKeywords = ["ai", "machine learning", "pytorch", "llm", "neural", "rag", "langchain", "prompt"];
    const cyberKeywords = ["cyber", "hacking", "ctf", "security", "wireshark", "penetration", "exploit", "owasp"];
    const cloudKeywords = ["cloud", "devops", "kubernetes", "docker", "terraform", "aws", "gcp", "ci/cd"];
    const webKeywords = ["web", "react", "next.js", "frontend", "css", "tailwind", "backend", "fullstack", "typescript"];

    let aiCount = 0;
    let cyberCount = 0;
    let cloudCount = 0;
    let webCount = 0;

    for (const q of recentQueries) {
      if (aiKeywords.some((k) => q.includes(k))) aiCount++;
      if (cyberKeywords.some((k) => q.includes(k))) cyberCount++;
      if (cloudKeywords.some((k) => q.includes(k))) cloudCount++;
      if (webKeywords.some((k) => q.includes(k))) webCount++;
    }

    // Check if another domain heavily outnumbers the current domain
    if (!currentDomain.includes("ai") && !currentDomain.includes("machine learning") && aiCount >= 3) {
      return {
        hasDiverted: true,
        suggestedDomain: "AI & Machine Learning",
        divergenceReason: "You've been asking several detailed questions about neural networks and LLM agents.",
        recentActivitySummary: "High interest in AI models, prompt workflows, and machine learning frameworks.",
      };
    }

    if (!currentDomain.includes("cyber") && !currentDomain.includes("security") && cyberCount >= 3) {
      return {
        hasDiverted: true,
        suggestedDomain: "Cybersecurity & Ethical Hacking",
        divergenceReason: "Your recent focus has shifted heavily toward security auditing, CTFs, and defensive testing.",
        recentActivitySummary: "Consistent engagement with penetration testing and security topics.",
      };
    }

    if (!currentDomain.includes("cloud") && !currentDomain.includes("devops") && cloudCount >= 3) {
      return {
        hasDiverted: true,
        suggestedDomain: "Cloud & DevOps Engineering",
        divergenceReason: "You've shown strong curiosity in containerization, deployment pipelines, and cloud clusters.",
        recentActivitySummary: "Focus on Kubernetes, Docker, and infrastructure automation.",
      };
    }

    if (!currentDomain.includes("web") && webCount >= 3) {
      return {
        hasDiverted: true,
        suggestedDomain: "Full-Stack Web Development",
        divergenceReason: "You've been frequently asking about React interfaces, Next.js routes, and web apps.",
        recentActivitySummary: "Focus on interactive web products and user experience.",
      };
    }

    return { hasDiverted: false };
  } catch (error) {
    console.error("Error checking domain diversion:", error);
    return { hasDiverted: false };
  }
}
