export type UserRole = "STUDENT" | "ADMIN" | "MENTOR";

export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  verified?: boolean;
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  githubUrl?: string;
}

export interface DomainCandidate {
  domain: string;
  matchScore: number; // 0 - 100
  reasoning: string;
  keySkills: string[];
  careerRoles: string[];
  growthOutlook: string;
}

export interface LearningResource {
  title: string;
  url: string;
  type: "video" | "doc" | "course" | "interactive";
  provider: string;
  estimatedMinutes?: number;
}

export interface PracticalChallenge {
  challenge: string;
  deliverables: string[];
  evaluationCriteria: string[];
}

export interface MilestoneSubmission {
  projectUrl?: string;
  notes: string;
  completedAt: string;
  rating?: number;
  feedback?: string;
}

export interface MarketDemandInfo {
  domain: string;
  skillName?: string;
  demandLevel: "Very High" | "High" | "Moderate" | "Niche";
  averageSalaryRange: string;
  topHiringCompanies: string[];
  growthRatePercent: string;
  keyTrends: string[];
  recommendation: string;
  isEstimate: boolean;
}

export interface NextActionRecommendation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionType: "MILESTONE" | "HACKATHON" | "INTERNSHIP" | "ASSESSMENT" | "MENTOR";
  ctaText: string;
  targetUrl: string;
  urgency: "HIGH" | "MEDIUM" | "NORMAL";
  deadlineText?: string;
  contextTag: string;
}

export interface EligibilityEvaluation {
  targetName: string; // e.g. "Google SWE Intern", "Devpost Global Hackathon"
  targetType: "COMPANY" | "HACKATHON" | "INTERNSHIP";
  isEligible: boolean;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  gapClosingPlan: {
    skill: string;
    actionItem: string;
    estimatedTimeToBridge: string;
    recommendedResource: string;
    suggestedProject: string;
  }[];
  overallAdvice: string;
}

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  type: "MILESTONE" | "DEADLINE" | "ENCOURAGEMENT" | "DIVERSION" | "SYSTEM";
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}
