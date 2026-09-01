import { DomainCandidate, EligibilityEvaluation, MarketDemandInfo } from "@/types";

export const MOCK_ROADMAPS_BY_DOMAIN: Record<string, any> = {
  "Full-Stack Web Development": {
    title: "Modern Full-Stack Mastery Roadmap",
    domain: "Full-Stack Web Development",
    description: "From core TypeScript and modern React fundamentals to scalable server-rendered Next.js backends and cloud deployments.",
    estimatedWeeks: 12,
    milestones: [
      {
        orderIndex: 0,
        title: "Modern TypeScript & Modern JavaScript (ESNext)",
        description: "Master types, generics, asynchronous async/await pipelines, and functional array manipulations.",
        whyItMatters: "TypeScript is the universal standard for full-stack engineering, drastically eliminating runtime bugs.",
        estimatedHours: 12,
        resources: [
          { title: "TypeScript Handbook & Interactive Tour", url: "https://www.typescriptlang.org/docs/", type: "doc", provider: "Official TypeScript Docs" },
          { title: "TypeScript Full Course for Beginners", url: "https://www.youtube.com/watch?v=BwuLxPH8IDs", type: "video", provider: "freeCodeCamp" },
          { title: "Execute Program: TypeScript Track", url: "https://www.executeprogram.com/courses/typescript", type: "interactive", provider: "Execute Program" }
        ],
        practicalChallenge: {
          challenge: "Build a strongly typed CLI Task & Notes Manager with schema validation and JSON file persistence.",
          deliverables: ["GitHub Repository with strict tsconfig", "README with usage instructions", "Unit tests for CRUD operations"],
          evaluationCriteria: ["Zero use of 'any'", "Clean error handling", "Proper type inference"]
        }
      },
      {
        orderIndex: 1,
        title: "React Core, Hooks & Modern State Management",
        description: "Deep dive into component lifecycle, custom hooks, memoization (useMemo/useCallback), and modern state containers.",
        whyItMatters: "React powers over 65% of modern interactive web applications and enterprise platforms.",
        estimatedHours: 16,
        resources: [
          { title: "Official React 18+ Documentation", url: "https://react.dev", type: "doc", provider: "React Team" },
          { title: "React - The Complete Guide", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", type: "video", provider: "freeCodeCamp" },
          { title: "Scrimba Interactive React Course", url: "https://scrimba.com/learn/learnreact", type: "interactive", provider: "Scrimba" }
        ],
        practicalChallenge: {
          challenge: "Develop an interactive Multi-Step Quiz and Flashcard App with keyboard navigation, local storage caching, and timer state.",
          deliverables: ["Responsive UI", "Custom useLocalStorage & useTimer hooks", "Accessible form inputs"],
          evaluationCriteria: ["Clean component separation", "No prop drilling", "Zero console warnings"]
        }
      },
      {
        orderIndex: 2,
        title: "Server-Side Architecture, Next.js App Router & REST APIs",
        description: "Understand Server Components (RSC), Client boundaries, dynamic routing, server actions, and middleware.",
        whyItMatters: "Combines the speed of static websites with the dynamism of full-stack server backends.",
        estimatedHours: 20,
        resources: [
          { title: "Next.js App Router Official Course", url: "https://nextjs.org/learn", type: "course", provider: "Vercel" },
          { title: "Next.js Full Stack Crash Course", url: "https://www.youtube.com/watch?v=843nec-IvW0", type: "video", provider: "freeCodeCamp" },
          { title: "RESTful API Design Best Practices", url: "https://restfulapi.net/", type: "doc", provider: "REST API Guide" }
        ],
        practicalChallenge: {
          challenge: "Construct a full-stack Recipe & Meal Planner with user authentication, search filtering, and API endpoints.",
          deliverables: ["Next.js App Router app", "API routes with validation", "Optimistic UI updates"],
          evaluationCriteria: ["Proper RSC/Client boundary division", "Secure session handling", "Sub-second page transitions"]
        }
      },
      {
        orderIndex: 3,
        title: "Relational Databases, PostgreSQL & Prisma ORM",
        description: "Master relational schema design, one-to-many & many-to-many relations, migrations, transactions, and indexing.",
        whyItMatters: "Every production application requires a resilient, performant persistence layer.",
        estimatedHours: 15,
        resources: [
          { title: "Prisma ORM Getting Started & Schema Guide", url: "https://www.prisma.io/docs", type: "doc", provider: "Prisma" },
          { title: "PostgreSQL Tutorial for Beginners", url: "https://www.youtube.com/watch?v=qw--VYLpxG4", type: "video", provider: "freeCodeCamp" },
          { title: "SQLBolt: Interactive SQL Lessons", url: "https://sqlbolt.com/", type: "interactive", provider: "SQLBolt" }
        ],
        practicalChallenge: {
          challenge: "Design and implement a relational database schema for a multi-tenant Event Ticketing System with concurrency safe bookings.",
          deliverables: ["Prisma schema with relations", "Seed script with mock data", "CRUD API with relational queries"],
          evaluationCriteria: ["Proper foreign key constraints", "Index on high-frequency query columns", "Transaction safety"]
        }
      },
      {
        orderIndex: 4,
        title: "Authentication, Security & Production Deployment (Portfolio Capstone)",
        description: "Implement OAuth, JWT sessions, rate limiting, CORS policies, environment security, and Vercel/Docker deployment.",
        whyItMatters: "Proves you can deliver an end-to-end, production-ready product ready for real users and recruiters.",
        estimatedHours: 25,
        resources: [
          { title: "NextAuth.js Official Documentation", url: "https://next-auth.js.org/", type: "doc", provider: "Auth.js Team" },
          { title: "OWASP Top 10 Web Application Security Guide", url: "https://owasp.org/www-project-top-ten/", type: "doc", provider: "OWASP" },
          { title: "Deploying Next.js to Production", url: "https://nextjs.org/docs/deployment", type: "doc", provider: "Vercel" }
        ],
        practicalChallenge: {
          challenge: "Build and deploy a Collaborative Real-Time Project Management Board with live status updates, OAuth login, and dark mode.",
          deliverables: ["Live deployed URL", "Public GitHub repo with comprehensive README", "Lighthouse score > 90"],
          evaluationCriteria: ["Seamless mobile responsiveness", "Complete auth flow", "Production error monitoring"]
        }
      }
    ]
  },
  "AI & Machine Learning": {
    title: "Applied AI & Machine Learning Engineering Roadmap",
    domain: "AI & Machine Learning",
    description: "From Python data foundations and scientific computing to training neural networks, LLM fine-tuning, and production RAG pipelines.",
    estimatedWeeks: 14,
    milestones: [
      {
        orderIndex: 0,
        title: "Python for Data Science & Scientific Computing",
        description: "Master NumPy vectorization, Pandas dataframes, Matplotlib/Seaborn visualization, and clean OOP principles.",
        whyItMatters: "Python is the lingua franca of AI, and efficient vectorization is crucial for high-throughput pipelines.",
        estimatedHours: 14,
        resources: [
          { title: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", type: "doc", provider: "O'Reilly Open" },
          { title: "NumPy & Pandas Full Course", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8", type: "video", provider: "freeCodeCamp" },
          { title: "Kaggle Python & Pandas Micro-Courses", url: "https://www.kaggle.com/learn", type: "interactive", provider: "Kaggle" }
        ],
        practicalChallenge: {
          challenge: "Perform an Exploratory Data Analysis (EDA) on a 100k-row Kaggle dataset with clean visual storytelling and insights.",
          deliverables: ["Jupyter Notebook with documented findings", "Clean feature engineering script", "Visual summary deck"],
          evaluationCriteria: ["Handling of missing values", "Intuitive statistical plots", "Optimized vector queries"]
        }
      },
      {
        orderIndex: 1,
        title: "Classical Machine Learning & Statistical Modeling",
        description: "Implement Linear Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost), and cross-validation.",
        whyItMatters: "Classical algorithms remain the most cost-effective and interpretable solutions for 80% of business tabular problems.",
        estimatedHours: 18,
        resources: [
          { title: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "doc", provider: "Scikit-Learn" },
          { title: "Machine Learning Specialization by Andrew Ng", url: "https://www.coursera.org/specializations/machine-learning-introduction", type: "course", provider: "DeepLearning.AI" },
          { title: "StatQuest Machine Learning Videos", url: "https://www.youtube.com/c/joshstarmer", type: "video", provider: "StatQuest" }
        ],
        practicalChallenge: {
          challenge: "Build an End-to-End Customer Churn or Real Estate Price Predictor with hyperparameter tuning and model explainability (SHAP).",
          deliverables: ["Trained model artifact", "Evaluation metrics report (ROC-AUC, F1)", "Inference API endpoint"],
          evaluationCriteria: ["Prevention of data leakage", "Proper cross-validation", "Clear feature importance analysis"]
        }
      },
      {
        orderIndex: 2,
        title: "Deep Learning & Neural Networks with PyTorch",
        description: "Understand backpropagation, custom PyTorch nn.Modules, optimizers (AdamW), CNNs for vision, and RNNs/Transformers.",
        whyItMatters: "PyTorch is the foundational framework for state-of-the-art research and modern AI production engineering.",
        estimatedHours: 24,
        resources: [
          { title: "PyTorch Official 60-Minute Blitz & Tutorials", url: "https://pytorch.org/tutorials/", type: "doc", provider: "PyTorch" },
          { title: "Deep Learning for Coders with Fastai & PyTorch", url: "https://course.fast.ai/", type: "course", provider: "fast.ai" },
          { title: "MIT Introduction to Deep Learning (6.S191)", url: "http://introtodeeplearning.com/", type: "video", provider: "MIT" }
        ],
        practicalChallenge: {
          challenge: "Train a Convolutional Neural Network from scratch on CIFAR-10 / Chest X-Ray dataset with data augmentation and transfer learning.",
          deliverables: ["Training loss and accuracy curves", "Model checkpoint (.pt)", "Grad-CAM visualization"],
          evaluationCriteria: ["Validation accuracy > 85%", "Effective learning rate scheduling", "No overfitting"]
        }
      },
      {
        orderIndex: 3,
        title: "Large Language Models, Embeddings & RAG Architectures",
        description: "Harness Gemini API, OpenAI/Anthropic SDKs, vector databases (Pinecone/Chroma/pgvector), and retrieval augmented generation.",
        whyItMatters: "RAG and structured LLM agents are transforming software products across all industries today.",
        estimatedHours: 20,
        resources: [
          { title: "Google Gemini API Cookbook & Documentation", url: "https://ai.google.dev/docs", type: "doc", provider: "Google AI" },
          { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course", type: "course", provider: "Hugging Face" },
          { title: "Building LLM Applications with LangChain & LlamaIndex", url: "https://www.deeplearning.ai/short-courses/", type: "course", provider: "DeepLearning.AI" }
        ],
        practicalChallenge: {
          challenge: "Create an Intelligent Document & Textbook Q&A Copilot that parses PDF files, computes vector embeddings, and answers queries with citations.",
          deliverables: ["Live Next.js/FastAPI demo", "Vector search pipeline with source attribution", "Evaluation test suite"],
          evaluationCriteria: ["Hallucination mitigation", "Fast retrieval latency", "Clean structured output"]
        }
      }
    ]
  }
};

export function getMockAptitudeAnalysis(answers: Record<string, any>, skills: any[] = []): {
  analyzedDomains: DomainCandidate[];
  primaryRecommendation: string;
  supportiveSynthesis: string;
} {
  return {
    analyzedDomains: [
      {
        domain: "Full-Stack Web Development",
        matchScore: 92,
        reasoning: "Your desire to build intuitive user-facing products paired with immediate visual feedback strongly aligns with modern full-stack web engineering.",
        keySkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Tailwind CSS"],
        careerRoles: ["Full-Stack Developer", "Product Engineer", "Frontend Specialist"],
        growthOutlook: "Consistently strong demand across early startups and global enterprises."
      },
      {
        domain: "AI & Machine Learning",
        matchScore: 86,
        reasoning: "Your interest in pattern recognition, automated intelligence, and predictive workflows provides a solid foundation for applied machine learning.",
        keySkills: ["Python", "PyTorch", "Prompt Engineering", "RAG Pipelines", "Data Analytics"],
        careerRoles: ["AI Engineer", "ML Practitioner", "Applied Data Scientist"],
        growthOutlook: "Explosive growth with high industry investment in generative AI solutions."
      },
      {
        domain: "Cloud & DevOps Engineering",
        matchScore: 78,
        reasoning: "You demonstrated an appreciation for scalable architecture, automated pipelines, and system reliability.",
        keySkills: ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS/GCP"],
        careerRoles: ["DevOps Engineer", "Cloud Architect", "Site Reliability Engineer"],
        growthOutlook: "Vital discipline with high compensation and low replacement risk."
      }
    ],
    primaryRecommendation: "Full-Stack Web Development",
    supportiveSynthesis: "You have a natural builder's intuition — enjoying both the visual creativity of user interfaces and the systematic logic of server-side data flows."
  };
}

export function getMockMarketDemand(domainOrSkill: string): MarketDemandInfo {
  const query = domainOrSkill.toLowerCase();
  if (query.includes("ai") || query.includes("machine learning") || query.includes("python")) {
    return {
      domain: "AI & Machine Learning",
      skillName: domainOrSkill,
      demandLevel: "Very High",
      averageSalaryRange: "$115,000 - $185,000 (US) / ₹12L - ₹32L (India)",
      topHiringCompanies: ["Google", "Microsoft", "OpenAI", "NVIDIA", "Meta", "Scale AI"],
      growthRatePercent: "+32% YoY",
      keyTrends: [
        "Rapid adoption of Multimodal LLMs & Autonomous Agents",
        "High demand for RAG and Vector Search Specialists",
        "Integration of edge AI models on client devices"
      ],
      recommendation: "Extremely high value skill set. Focus on building hands-on applied projects with real APIs rather than purely theoretical research.",
      isEstimate: true
    };
  } else if (query.includes("cyber") || query.includes("security")) {
    return {
      domain: "Cybersecurity",
      skillName: domainOrSkill,
      demandLevel: "Very High",
      averageSalaryRange: "$105,000 - $165,000 (US) / ₹10L - ₹28L (India)",
      topHiringCompanies: ["CrowdStrike", "Palo Alto Networks", "Cloudflare", "Mandiant", "Cisco"],
      growthRatePercent: "+28% YoY",
      keyTrends: [
        "Zero Trust Architecture adoption across enterprise",
        "Cloud security posture management (CSPM)",
        "API security and supply-chain vulnerability mitigation"
      ],
      recommendation: "Resilient career path with global talent shortages. Demonstrable CTF accomplishments and home lab proof will get you noticed quickly.",
      isEstimate: true
    };
  } else {
    return {
      domain: "Full-Stack Web Development",
      skillName: domainOrSkill,
      demandLevel: "High",
      averageSalaryRange: "$95,000 - $155,000 (US) / ₹8L - ₹24L (India)",
      topHiringCompanies: ["Stripe", "Vercel", "Shopify", "Amazon", "Airbnb", "Early-Stage Startups"],
      growthRatePercent: "+18% YoY",
      keyTrends: [
        "Shift towards Server Components (React/Next.js) & Edge Functions",
        "TypeScript becoming mandatory across codebases",
        "AI-enhanced developer tooling and copilot integration"
      ],
      recommendation: "The highest volume of junior & internship openings in tech. Stand out by having clean, deployed, production-grade applications with great UX.",
      isEstimate: true
    };
  }
}

export function getMockEligibilityEvaluation(targetName: string, userSkills: any[] = []): EligibilityEvaluation {
  const skillNames = (userSkills || []).map((s: any) => typeof s === "string" ? s.toLowerCase() : (s.name || "").toLowerCase());
  
  const hasReact = skillNames.some(s => s.includes("react") || s.includes("next"));
  const hasTs = skillNames.some(s => s.includes("typescript") || s.includes("javascript"));
  const hasBackend = skillNames.some(s => s.includes("node") || s.includes("sql") || s.includes("postgres"));

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  if (hasTs) matchedSkills.push("Modern TypeScript / JavaScript");
  else missingSkills.push("TypeScript & Strong Type Discipline");

  if (hasReact) matchedSkills.push("React & Component Architecture");
  else missingSkills.push("React 18+ Component Patterns & State");

  if (hasBackend) matchedSkills.push("Database & API Integration");
  else missingSkills.push("PostgreSQL & Relational Data Modeling");

  missingSkills.push("System Design & Performance Optimization");

  const matchPercentage = Math.min(95, Math.max(35, Math.round((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100)));

  return {
    targetName,
    targetType: "COMPANY",
    isEligible: matchPercentage >= 75,
    matchPercentage,
    matchedSkills,
    missingSkills,
    gapClosingPlan: missingSkills.map(skill => ({
      skill,
      actionItem: `Complete a dedicated 3-day practical challenge targeting ${skill}.`,
      estimatedTimeToBridge: "1-2 Weeks",
      recommendedResource: `Official interactive guide and sample repository for ${skill}.`,
      suggestedProject: `Build an open-source mini-tool demonstrating production ${skill}.`
    })),
    overallAdvice: `You already have strong foundational coverage in ${matchedSkills.join(", ") || "core problem solving"}. Closing the gap on ${missingSkills.slice(0, 2).join(" and ")} will make you an exceptionally competitive candidate.`
  };
}
