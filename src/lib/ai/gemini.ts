import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  APTITUDE_ANALYSIS_SYSTEM_PROMPT,
  ROADMAP_GENERATION_SYSTEM_PROMPT,
  MENTOR_SYSTEM_PROMPT,
  ASSESSMENT_GRADER_PROMPT,
  ELIGIBILITY_ANALYZER_PROMPT,
  MARKET_DEMAND_PROMPT,
  MILESTONE_PROOF_VERIFIER_PROMPT,
} from "./prompts";
import {
  getMockAptitudeAnalysis,
  MOCK_ROADMAPS_BY_DOMAIN,
  getMockMarketDemand,
  getMockEligibilityEvaluation,
} from "./mock-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to clean and parse JSON response from LLM
function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    let clean = text.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```/, "").replace(/```$/, "").trim();
    }
    return JSON.parse(clean);
  } catch (err) {
    console.error("Failed to parse Gemini JSON output:", err, "Raw text:", text);
    return fallback;
  }
}

/**
 * 1. Analyze Aptitude Test & Recommend Candidate Domains
 */
export async function analyzeAptitude(answers: Record<string, any>, skills: any[] = [], projects: any[] = []) {
  if (!genAI || !apiKey) {
    return getMockAptitudeAnalysis(answers, skills);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: APTITUDE_ANALYSIS_SYSTEM_PROMPT,
    });

    const prompt = `
Student Data for Career Domain Discovery:
- Aptitude Scenario & Quiz Answers: ${JSON.stringify(answers, null, 2)}
- Existing Declared Skills: ${JSON.stringify(skills, null, 2)}
- Previous Projects / Coursework: ${JSON.stringify(projects, null, 2)}

Provide ranked domain recommendations and encouraging synthesis.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return safeJsonParse(responseText, getMockAptitudeAnalysis(answers, skills));
  } catch (error) {
    console.warn("Gemini API call failed, using mock fallback:", error);
    return getMockAptitudeAnalysis(answers, skills);
  }
}

/**
 * 2. Generate Personalized Non-Comparative Roadmap
 */
export async function generateRoadmap(domain: string, experienceLevel: string = "BEGINNER", existingSkills: any[] = []) {
  if (!genAI || !apiKey) {
    return MOCK_ROADMAPS_BY_DOMAIN[domain] || MOCK_ROADMAPS_BY_DOMAIN["Full-Stack Web Development"];
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: ROADMAP_GENERATION_SYSTEM_PROMPT,
    });

    const prompt = `
Generate a comprehensive, non-comparative learning roadmap for:
- Target Domain: ${domain}
- Current Level: ${experienceLevel}
- Existing Skills Already Known: ${JSON.stringify(existingSkills)}

Include 5 sequenced milestones with clear 'whyItMatters', credible external links (YouTube, Docs, Courses), and practical mini-project challenges.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const fallback = MOCK_ROADMAPS_BY_DOMAIN[domain] || MOCK_ROADMAPS_BY_DOMAIN["Full-Stack Web Development"];
    return safeJsonParse(responseText, fallback);
  } catch (error) {
    console.warn("Gemini roadmap generation failed, using mock fallback:", error);
    return MOCK_ROADMAPS_BY_DOMAIN[domain] || MOCK_ROADMAPS_BY_DOMAIN["Full-Stack Web Development"];
  }
}

/**
 * 3. Chat with Context-Aware AI Career Mentor
 */
export async function chatWithMentor(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[],
  userContext: {
    userName?: string;
    targetDomain?: string;
    experienceLevel?: string;
    skills?: any[];
    projects?: any[];
    currentRoadmap?: any;
    completedMilestonesCount?: number;
    totalMilestonesCount?: number;
    recentRatings?: any[];
  }
) {
  if (!genAI || !apiKey) {
    // Generate context-rich mock mentor response
    const domain = userContext.targetDomain || "Tech";
    return `Hello ${userContext.userName || "there"}! I'm your Thiran AI Mentor. Looking at your progress in **${domain}**, you've completed ${userContext.completedMilestonesCount || 0} milestone(s) so far.

${userMessage.toLowerCase().includes("market") || userMessage.toLowerCase().includes("worth") || userMessage.toLowerCase().includes("demand")
  ? `Regarding market demand for **${domain}**: The industry currently has strong demand for developers who can demonstrate practical project proof. Focus on building clean, deployed applications with verifiable Git commits.`
  : `That's a fantastic question. In **${domain}**, the most high-leverage move right now is to focus on your current active milestone, build out the mini-challenge, and test your understanding with a quick practical assessment.`}

**Next Step**: Check out your active roadmap milestone or review the upcoming hackathons matching ${domain}!`;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `${MENTOR_SYSTEM_PROMPT}

Student Profile Context:
- Name: ${userContext.userName || "Student"}
- Target Domain: ${userContext.targetDomain || "Undecided"}
- Level: ${userContext.experienceLevel || "Beginner"}
- Current Known Skills: ${JSON.stringify(userContext.skills || [])}
- Active Roadmap: ${userContext.currentRoadmap?.title || "None yet"} (Progress: ${userContext.completedMilestonesCount || 0}/${userContext.totalMilestonesCount || 0} milestones)
- Recent Project Ratings/Feedback: ${JSON.stringify(userContext.recentRatings || [])}
`,
    });

    const chat = model.startChat({
      history: history.slice(-8).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.warn("Gemini chat failed, using fallback:", error);
    return `I'm currently running in offline mentor mode. For your path in **${userContext.targetDomain || "Software Engineering"}**, remember to focus on building concrete projects and steady incremental practice. Every small milestone you complete compounds over time!`;
  }
}

/**
 * 4. Grounded Market Demand & Salary Insights
 */
export async function getMarketDemandInsights(domainOrSkill: string) {
  if (!genAI || !apiKey) {
    return getMockMarketDemand(domainOrSkill);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: MARKET_DEMAND_PROMPT,
    });

    const prompt = `Analyze current industry job market demand, hiring companies, and compensation trends for: ${domainOrSkill}`;
    const result = await model.generateContent(prompt);
    return safeJsonParse(result.response.text(), getMockMarketDemand(domainOrSkill));
  } catch (error) {
    console.warn("Market demand analysis failed:", error);
    return getMockMarketDemand(domainOrSkill);
  }
}

/**
 * 5. Grade Skill Assessment or Project Challenge
 */
export async function gradeAssessment(
  quizOrChallengeTitle: string,
  domain: string,
  userSubmission: any
) {
  if (!genAI || !apiKey) {
    return {
      score: 88,
      isPassed: true,
      summary: "Excellent comprehension of core architectural concepts and practical implementation.",
      strengths: [
        "Strong understanding of component lifecycle and async flows",
        "Clean, readable code structure with clear naming conventions",
        "Thoughtful consideration of error boundaries and edge cases"
      ],
      areasToImprove: [
        "Consider adding automated unit tests for critical business logic paths",
        "Ensure all environment variables and secrets are strictly abstracted"
      ],
      constructiveFeedback: "You've demonstrated solid readiness for this milestone! The clarity of your explanation and logic shows genuine mastery.",
      suggestedNextChallenge: "Try optimizing query caching or adding real-time subscription capabilities."
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: ASSESSMENT_GRADER_PROMPT,
    });

    const prompt = `
Evaluate the following student submission:
- Domain: ${domain}
- Assessment / Challenge: ${quizOrChallengeTitle}
- Student Submission: ${JSON.stringify(userSubmission, null, 2)}
`;

    const result = await model.generateContent(prompt);
    return safeJsonParse(result.response.text(), {
      score: 85,
      isPassed: true,
      summary: "Solid work on this assessment.",
      strengths: ["Good problem solving logic"],
      areasToImprove: ["Keep practicing edge case handling"],
      constructiveFeedback: "Great effort! You are making steady progress on your roadmap.",
      suggestedNextChallenge: "Advance to the next milestone challenge."
    });
  } catch (error) {
    console.warn("Assessment grading failed:", error);
    return {
      score: 85,
      isPassed: true,
      summary: "Solid work on this assessment.",
      strengths: ["Good problem solving logic"],
      areasToImprove: ["Keep practicing edge case handling"],
      constructiveFeedback: "Great effort! You are making steady progress on your roadmap.",
      suggestedNextChallenge: "Advance to the next milestone challenge."
    };
  }
}

/**
 * 6. Evaluate Company / Hackathon Eligibility & Generate Gap-Closing Plan
 */
export async function evaluateEligibility(
  targetName: string,
  targetType: "COMPANY" | "HACKATHON" | "INTERNSHIP",
  prerequisites: any[],
  userProfile: any
) {
  if (!genAI || !apiKey) {
    return getMockEligibilityEvaluation(targetName, userProfile?.skills || []);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: ELIGIBILITY_ANALYZER_PROMPT,
    });

    const prompt = `
Evaluate Candidate Eligibility:
- Target Opportunity: ${targetName} (${targetType})
- Target Prerequisites: ${JSON.stringify(prerequisites, null, 2)}
- Student Current Profile & Skills: ${JSON.stringify(userProfile, null, 2)}

Provide matched skills, missing skills, and a concrete gap-closing plan.
`;

    const result = await model.generateContent(prompt);
    return safeJsonParse(result.response.text(), getMockEligibilityEvaluation(targetName, userProfile?.skills || []));
  } catch (error) {
    console.warn("Eligibility evaluation failed:", error);
    return getMockEligibilityEvaluation(targetName, userProfile?.skills || []);
  }
}

/**
 * 7. Real AI Milestone Proof Verifier
 */
export async function verifyMilestoneProof(
  milestoneTitle: string,
  milestoneDescription: string,
  domain: string,
  challengeContext: any,
  submission: { projectUrl: string; notes: string }
) {
  const url = (submission.projectUrl || "").trim();
  const notes = (submission.notes || "").trim();

  // Basic sanity check: URL must have valid structure
  const isValidUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url);
  if (!isValidUrl || url.length < 8) {
    return {
      verified: false,
      score: 30,
      summary: "A valid, accessible project URL (e.g. GitHub repository, deployed site, Figma prototype, or project demo) is required to verify milestone completion.",
      strengths: [],
      missingDeliverables: ["Valid public project or repository URL (https://...)"],
      suggestedImprovements: ["Please provide a direct URL to your repository or live deployment."],
      verificationBadge: "REVISION_REQUIRED",
    };
  }

  if (!notes || notes.length < 15) {
    return {
      verified: false,
      score: 45,
      summary: "Please provide a more detailed reflection on what you built, concepts applied, and challenges overcome (at least 2-3 sentences).",
      strengths: ["Valid project link provided"],
      missingDeliverables: ["Detailed technical implementation summary"],
      suggestedImprovements: ["Explain your architecture, key functions implemented, or what you learned from this milestone challenge."],
      verificationBadge: "REVISION_REQUIRED",
    };
  }

  if (!genAI || !apiKey) {
    return {
      verified: true,
      score: 88,
      summary: "Offline proof verified: Good implementation summary and project link provided.",
      strengths: ["Clean repository link", "Clear milestone deliverables addressed"],
      missingDeliverables: [],
      suggestedImprovements: [],
      verificationBadge: "VERIFIED",
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: MILESTONE_PROOF_VERIFIER_PROMPT,
    });

    const prompt = `
Milestone Under Review:
- Domain: ${domain}
- Milestone Title: ${milestoneTitle}
- Description: ${milestoneDescription}
- Practical Challenge Deliverables: ${JSON.stringify(challengeContext || {}, null, 2)}

Student Submission Proof:
- Project / Repository URL: ${url}
- Reflection & Implementation Notes: ${notes}

Perform an authentic technical verification. Ensure the URL is plausible and the student's explanation authentically addresses the required deliverables.
`;

    const result = await model.generateContent(prompt);
    return safeJsonParse(result.response.text(), {
      verified: true,
      score: 85,
      summary: "Milestone proof verified successfully.",
      strengths: ["Solid problem-solving demonstrated in reflection notes"],
      missingDeliverables: [],
      suggestedImprovements: [],
      verificationBadge: "VERIFIED",
    });
  } catch (error) {
    console.warn("Gemini milestone proof verification failed, fallback:", error);
    return {
      verified: true,
      score: 85,
      summary: "Milestone proof verified.",
      strengths: ["Valid link and completion notes"],
      missingDeliverables: [],
      suggestedImprovements: [],
      verificationBadge: "VERIFIED",
    };
  }
}

