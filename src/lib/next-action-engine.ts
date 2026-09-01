import { NextActionRecommendation } from "@/types";
import { getDaysRemaining } from "@/lib/utils";

interface UserContextForNextAction {
  targetDomain?: string;
  activeRoadmap?: any;
  nextIncompleteMilestone?: any;
  nearestHackathon?: any;
  nearestInternship?: any;
  unreadNotificationsCount?: number;
}

export function computeNextBigAction(context: UserContextForNextAction): NextActionRecommendation {
  const { targetDomain, nextIncompleteMilestone, nearestHackathon, nearestInternship } = context;

  // 1. Check if hackathon deadline is urgent (<= 5 days)
  if (nearestHackathon && nearestHackathon.deadline) {
    const days = getDaysRemaining(nearestHackathon.deadline);
    if (days >= 0 && days <= 4) {
      return {
        id: `hack_${nearestHackathon.id}`,
        title: `Register for ${nearestHackathon.title}`,
        subtitle: `Registration deadline in ${days === 0 ? "today!" : `${days} days`}`,
        description: `Organized by ${nearestHackathon.organizer} with ${nearestHackathon.prizePool || "exciting prizes"}. Build a project in ${nearestHackathon.domainTags?.[0] || targetDomain || "your domain"}.`,
        actionType: "HACKATHON",
        ctaText: "View Hackathon & Register",
        targetUrl: `/hackathons`,
        urgency: "HIGH",
        deadlineText: `${days === 0 ? "Closes Today" : `${days}d left`}`,
        contextTag: "Urgent Opportunity",
      };
    }
  }

  // 2. Check if internship application deadline is near (<= 7 days)
  if (nearestInternship && nearestInternship.deadline) {
    const days = getDaysRemaining(nearestInternship.deadline);
    if (days >= 0 && days <= 7) {
      return {
        id: `intern_${nearestInternship.id}`,
        title: `Apply to ${nearestInternship.company} — ${nearestInternship.title}`,
        subtitle: `Application window closing in ${days} days`,
        description: `Stipend: ${nearestInternship.stipend}. Prepare your GitHub link and review eligibility criteria before submitting.`,
        actionType: "INTERNSHIP",
        ctaText: "Review Requirements & Apply",
        targetUrl: `/internships`,
        urgency: "HIGH",
        deadlineText: `${days}d left`,
        contextTag: "Internship Window",
      };
    }
  }

  // 3. Primary Next Action: Progress on current active milestone
  if (nextIncompleteMilestone) {
    return {
      id: `milestone_${nextIncompleteMilestone.id}`,
      title: `Finish Milestone ${nextIncompleteMilestone.orderIndex + 1}: ${nextIncompleteMilestone.title}`,
      subtitle: `Estimated ~${nextIncompleteMilestone.estimatedHours || 10} hours of hands-on learning`,
      description: nextIncompleteMilestone.whyItMatters || "Unlock foundational mastery and practical confidence for your portfolio.",
      actionType: "MILESTONE",
      ctaText: "Continue Learning Milestone",
      targetUrl: `/roadmap`,
      urgency: "MEDIUM",
      contextTag: "Active Roadmap Step",
    };
  }

  // 4. Fallback: If no roadmap exists yet, direct to onboarding/mentor
  if (!targetDomain) {
    return {
      id: "action_onboard",
      title: "Discover Your Ideal Tech Domain",
      subtitle: "Take our 5-minute adaptive scenario assessment",
      description: "Discover your natural problem-solving strengths and build a customized, anxiety-free learning roadmap.",
      actionType: "ASSESSMENT",
      ctaText: "Start Aptitude Discovery",
      targetUrl: "/onboarding",
      urgency: "HIGH",
      contextTag: "Initial Setup",
    };
  }

  // 5. Default: Explore eligibility or check mentor
  return {
    id: "action_mentor",
    title: `Chat with your AI Mentor about ${targetDomain}`,
    subtitle: "Get tailored advice on what projects to build next",
    description: "Your persistent AI mentor is ready with personalized guidance and market demand insights.",
    actionType: "MENTOR",
    ctaText: "Open AI Mentor Chat",
    targetUrl: "/mentor",
    urgency: "NORMAL",
    contextTag: "Personal Mentorship",
  };
}
