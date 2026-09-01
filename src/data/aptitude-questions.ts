export interface AptitudeQuestion {
  id: string;
  category: "SCENARIO" | "MICRO_TASK" | "PROJECT_PREFERENCE" | "PROBLEM_SOLVING";
  title: string;
  prompt: string;
  context?: string;
  options: {
    id: string;
    label: string;
    description: string;
    alignedDomains: string[]; // e.g. ["Full-Stack Web Development", "AI & Machine Learning"]
    trait: string;
  }[];
}

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: "q1_weekend_project",
    category: "PROJECT_PREFERENCE",
    title: "The Weekend Hack Challenge",
    prompt: "You are given 48 uninterrupted hours and complete creative freedom. Which project would you be most excited to build?",
    options: [
      {
        id: "opt_web",
        label: "Interactive Web Application",
        description: "A collaborative real-time study platform with buttery-smooth animations, clean dashboards, and instant sharing.",
        alignedDomains: ["Full-Stack Web Development", "UI/UX & Frontend Engineering"],
        trait: "Visual Creation & Product Building"
      },
      {
        id: "opt_ai",
        label: "Intelligent Neural Predictor",
        description: "An AI model that listens to patient cough audio files or financial trends and detects underlying patterns with 95% accuracy.",
        alignedDomains: ["AI & Machine Learning", "Data Science & Analytics"],
        trait: "Mathematical Modeling & Pattern Recognition"
      },
      {
        id: "opt_cyber",
        label: "Penetration Testing & Defense Lab",
        description: "Setting up a secure honeypot, reverse-engineering a vulnerable binary, and auditing an API for exploit vectors.",
        alignedDomains: ["Cybersecurity & Ethical Hacking", "Cloud & DevOps Engineering"],
        trait: "Adversarial Thinking & Systems Resilience"
      },
      {
        id: "opt_cloud",
        label: "Distributed Microservices Architecture",
        description: "Automating Kubernetes clusters, zero-downtime CI/CD pipelines, and multi-region database replication.",
        alignedDomains: ["Cloud & DevOps Engineering", "Backend & Distributed Systems"],
        trait: "Infrastructure & High Availability"
      }
    ]
  },
  {
    id: "q2_scenario_breakdown",
    category: "SCENARIO",
    title: "The Crisis Breakdown",
    prompt: "An online bookstore crashes right when 10,000 students try to buy semester textbooks at once. Where does your curiosity naturally pull you first?",
    options: [
      {
        id: "opt_frontend_fix",
        label: "User Interface & Experience",
        description: "Checking if client-side rendering choked, streamlining checkout flows, and adding graceful offline caching.",
        alignedDomains: ["Full-Stack Web Development", "UI/UX & Frontend Engineering"],
        trait: "User Experience Empathy"
      },
      {
        id: "opt_data_analysis",
        label: "Data Ingestion & Traffic Patterns",
        description: "Querying anomaly detection logs, analyzing shopping basket behavior, and clustering traffic spikes.",
        alignedDomains: ["Data Science & Analytics", "AI & Machine Learning"],
        trait: "Analytical Reasoning"
      },
      {
        id: "opt_security_audit",
        label: "Security & DDoS Assessment",
        description: "Investigating whether this is a distributed bot attack, rate-limit evasion, or authentication bottleneck.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Security First Mindset"
      },
      {
        id: "opt_infra_scaling",
        label: "Server Autoscaling & Load Balancing",
        description: "Configuring load balancers, database connection pools, and container horizontal scaling.",
        alignedDomains: ["Cloud & DevOps Engineering", "Backend & Distributed Systems"],
        trait: "Systems Optimization"
      }
    ]
  },
  {
    id: "q3_logic_puzzle",
    category: "MICRO_TASK",
    title: "5-Minute Logic Puzzle",
    prompt: "Consider this scenario: You need to transfer 1,000,000 student transcripts securely between two universities over a slow network. Which approach appeals most to you?",
    options: [
      {
        id: "puzzle_opt1",
        label: "Build a sleek resumable web portal with chunked uploads and progress states",
        description: "Focus on frictionless user experience, real-time status sockets, and zero user confusion.",
        alignedDomains: ["Full-Stack Web Development"],
        trait: "Product Flow"
      },
      {
        id: "puzzle_opt2",
        label: "Train a compression & deduplication algorithm using semantic similarity",
        description: "Reduce payload size by 80% by analyzing structured token frequencies.",
        alignedDomains: ["AI & Machine Learning", "Data Science & Analytics"],
        trait: "Algorithm Design"
      },
      {
        id: "puzzle_opt3",
        label: "Implement end-to-end zero-knowledge encryption and cryptographic verification",
        description: "Ensure complete tamper-resistance, confidentiality, and immutable audit logs.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Cryptographic Security"
      },
      {
        id: "puzzle_opt4",
        label: "Orchestrate an event-driven stream using Kafka message queues and object storage sync",
        description: "Guarantee at-least-once delivery, fault-tolerant worker pools, and automated retry backoff.",
        alignedDomains: ["Cloud & DevOps Engineering", "Backend & Distributed Systems"],
        trait: "Distributed Architecture"
      }
    ]
  },
  {
    id: "q4_daily_satisfaction",
    category: "PROBLEM_SOLVING",
    title: "What Gives You the Biggest Dopamine Rush?",
    prompt: "At the end of a long productive day of building, which outcome makes you feel most proud?",
    options: [
      {
        id: "rush_visual",
        label: "Seeing a living, breathing product that people can click, navigate, and love",
        description: "The satisfaction of clean UI, responsive design, and intuitive user workflows.",
        alignedDomains: ["Full-Stack Web Development", "UI/UX & Frontend Engineering"],
        trait: "Visual Impact"
      },
      {
        id: "rush_insight",
        label: "Discovering a hidden truth or achieving high prediction accuracy from complex data",
        description: "The thrill of seeing a model generalize well and uncover insights humans missed.",
        alignedDomains: ["AI & Machine Learning", "Data Science & Analytics"],
        trait: "Discovery & Accuracy"
      },
      {
        id: "rush_defense",
        label: "Finding a hidden vulnerability before anyone else and locking down the perimeter",
        description: "The excitement of outsmarting attackers and protecting sensitive human data.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Protection & Mastery"
      },
      {
        id: "rush_automation",
        label: "Having an entire deployment pipeline run automatically with 0 manual errors",
        description: "The elegance of robust automation, 99.99% uptime, and scalable architecture.",
        alignedDomains: ["Cloud & DevOps Engineering"],
        trait: "Efficiency & Scale"
      }
    ]
  }
];

export const PRESET_DOMAINS = [
  {
    id: "web-dev",
    name: "Full-Stack Web Development",
    tagline: "Build responsive, scalable, modern applications end-to-end.",
    icon: "Globe",
    primaryColor: "from-blue-500 to-indigo-600",
    popularSkills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    careerOpportunities: ["Full-Stack Engineer", "Frontend Specialist", "Backend Developer", "Product Engineer"],
    marketOutlook: "High demand across startups, mid-market, and enterprise tech."
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    tagline: "Harness neural networks, LLMs, and data intelligence to solve complex problems.",
    icon: "BrainCircuit",
    primaryColor: "from-purple-500 to-pink-600",
    popularSkills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "HuggingFace", "LangChain"],
    careerOpportunities: ["ML Engineer", "AI Research Scientist", "Applied AI Developer", "Data Scientist"],
    marketOutlook: "Exponential growth fueled by generative AI and automation."
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Ethical Hacking",
    tagline: "Defend critical infrastructure, audit vulnerabilities, and secure data.",
    icon: "ShieldCheck",
    primaryColor: "from-emerald-500 to-teal-600",
    popularSkills: ["Linux", "Network Security", "Wireshark", "Burp Suite", "Cryptography", "Python"],
    careerOpportunities: ["Security Analyst", "Penetration Tester", "SOC Engineer", "AppSec Specialist"],
    marketOutlook: "Critical shortage of talent worldwide; consistently high compensation."
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps Engineering",
    tagline: "Orchestrate resilient cloud architectures, CI/CD pipelines, and scalable systems.",
    icon: "CloudLightning",
    primaryColor: "from-cyan-500 to-blue-600",
    popularSkills: ["Docker", "Kubernetes", "AWS / GCP", "Terraform", "GitHub Actions", "Linux"],
    careerOpportunities: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Architect", "Platform Engineer"],
    marketOutlook: "High reliance as every enterprise shifts workloads to distributed cloud systems."
  },
  {
    id: "ui-ux",
    name: "UI/UX & Product Design",
    tagline: "Craft delightful user journeys, design systems, and human-centered interfaces.",
    icon: "Palette",
    primaryColor: "from-amber-500 to-rose-600",
    popularSkills: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping", "Design Tokens"],
    careerOpportunities: ["Product Designer", "UI/UX Specialist", "Interaction Designer", "Design Systems Lead"],
    marketOutlook: "Essential for product-market fit and customer retention."
  }
];
