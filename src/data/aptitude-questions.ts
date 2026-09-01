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
    alignedDomains: string[]; // e.g. ["Full-Stack Web Development", "AI Engineering & LLMOps"]
    trait: string;
  }[];
}

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: "q1_weekend_project",
    category: "PROJECT_PREFERENCE",
    title: "The 48-Hour Hackathon Challenge",
    prompt: "You are given 48 uninterrupted hours and complete creative freedom. Which project would you be most excited to build?",
    options: [
      {
        id: "opt_web",
        label: "Interactive Real-Time Web Platform",
        description: "A collaborative workspace with smooth animations, instant WebSocket sync, and responsive dashboards.",
        alignedDomains: ["Full-Stack Web Development", "UI/UX & Product Design"],
        trait: "Visual Creation & Product Flow"
      },
      {
        id: "opt_ai_eng",
        label: "Autonomous AI Research & Coding Agent",
        description: "A multi-agent system combining LLMs, vector database retrieval (RAG), and tools to autonomously research and write code.",
        alignedDomains: ["AI Engineering & LLMOps", "AI & Machine Learning"],
        trait: "Generative Intelligence & Agentic Logic"
      },
      {
        id: "opt_cloud",
        label: "Auto-Healing Multi-Cloud Kubernetes Mesh",
        description: "Automating cloud infrastructure with Terraform, zero-downtime canary deployments, and Prometheus observability.",
        alignedDomains: ["Cloud Computing & DevOps", "Data Engineering & Big Data"],
        trait: "Infrastructure Orchestration & Scale"
      },
      {
        id: "opt_cyber",
        label: "Penetration Testing & Red-Team Defense Lab",
        description: "Setting up a secure honeypot, reverse-engineering vulnerable binaries, and auditing APIs for exploit vectors.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Adversarial Security & Threat Modeling"
      }
    ]
  },
  {
    id: "q2_scenario_breakdown",
    category: "SCENARIO",
    title: "The High-Traffic Outage Scenario",
    prompt: "A campus super-app crashes right when 20,000 students try to register for classes simultaneously. Where does your curiosity naturally pull you first?",
    options: [
      {
        id: "opt_frontend_fix",
        label: "User Interface & Client State Resilience",
        description: "Checking if client-side rendering choked, streamlining registration queues, and adding graceful offline caching.",
        alignedDomains: ["Full-Stack Web Development", "Mobile & Cross-Platform Development"],
        trait: "User Experience & Flow Empathy"
      },
      {
        id: "opt_cloud_scaling",
        label: "Cloud Autoscaling & Serverless Infrastructure",
        description: "Configuring elastic load balancers, database connection pools, Kubernetes HPA, and microservice limits.",
        alignedDomains: ["Cloud Computing & DevOps"],
        trait: "Systems Optimization & High Availability"
      },
      {
        id: "opt_data_pipeline",
        label: "Data Ingestion & High-Throughput Streaming",
        description: "Analyzing Kafka partition bottlenecks, deduplicating transaction events, and optimizing database write locks.",
        alignedDomains: ["Data Engineering & Big Data"],
        trait: "Data Throughput & Concurrency"
      },
      {
        id: "opt_ai_triage",
        label: "AI-Powered Anomaly Detection & Self-Healing",
        description: "Feeding system telemetry to an AI model to detect root-cause patterns and auto-adjust server configurations.",
        alignedDomains: ["AI Engineering & LLMOps", "AI & Machine Learning"],
        trait: "Algorithmic Pattern Analysis"
      }
    ]
  },
  {
    id: "q3_logic_puzzle",
    category: "MICRO_TASK",
    title: "5-Minute Architecture Logic Puzzle",
    prompt: "You need to securely transfer and process 10,000,000 encrypted student transcripts across international university nodes. Which approach excites you most?",
    options: [
      {
        id: "puzzle_web",
        label: "Build an accessible, resumable web portal with chunked multi-part uploads",
        description: "Focus on zero user confusion, resumable network uploads, and crisp progress indicators.",
        alignedDomains: ["Full-Stack Web Development"],
        trait: "Product Experience"
      },
      {
        id: "puzzle_ai_rag",
        label: "Deploy semantic embedding search to index and query structured transcript records",
        description: "Transform raw document transcripts into vector embeddings for instant semantic lookup and validation.",
        alignedDomains: ["AI Engineering & LLMOps", "AI & Machine Learning"],
        trait: "Semantic Retrieval & Vector Math"
      },
      {
        id: "puzzle_crypto",
        label: "Implement Zero-Knowledge Proofs & End-to-End Cryptographic Signatures",
        description: "Ensure complete tamper-resistance, confidentiality, and decentralized immutable verification.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Cryptographic Integrity"
      },
      {
        id: "puzzle_streaming",
        label: "Orchestrate an event-driven Apache Kafka / Spark streaming data pipeline",
        description: "Guarantee at-least-once delivery, fault-tolerant worker clusters, and zero data loss.",
        alignedDomains: ["Data Engineering & Big Data", "Cloud Computing & DevOps"],
        trait: "Distributed Stream Processing"
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
        label: "Seeing a living, breathing product that people can touch, navigate, and love",
        description: "The satisfaction of clean UI, responsive design, and intuitive user workflows.",
        alignedDomains: ["Full-Stack Web Development", "UI/UX & Product Design", "Mobile & Cross-Platform Development"],
        trait: "Visual Impact"
      },
      {
        id: "rush_ai_agent",
        label: "Watching an AI model solve complex reasoning tasks accurately without hallucination",
        description: "The thrill of seeing prompt chains, RAG pipelines, and agents deliver smart, context-rich results.",
        alignedDomains: ["AI Engineering & LLMOps", "AI & Machine Learning"],
        trait: "Intelligent Synthesis"
      },
      {
        id: "rush_automation",
        label: "Having an entire multi-cloud deployment pipeline execute in seconds with 99.99% uptime",
        description: "The elegance of robust automation, declarative infrastructure, and resilient systems.",
        alignedDomains: ["Cloud Computing & DevOps"],
        trait: "Scalability & Automation"
      },
      {
        id: "rush_defense",
        label: "Finding a critical zero-day exploit and patching it before attackers can breach the system",
        description: "The excitement of outsmarting adversaries and safeguarding sensitive human privacy.",
        alignedDomains: ["Cybersecurity & Ethical Hacking"],
        trait: "Security Mastery"
      }
    ]
  },
  {
    id: "q5_engineering_preference",
    category: "PROJECT_PREFERENCE",
    title: "The Engineering Layer Preference",
    prompt: "When designing a new enterprise technology system, which layer would you want to take primary ownership of?",
    options: [
      {
        id: "pref_ai_layer",
        label: "The Cognitive AI Layer (LLMs, Vector DBs, Prompt Workflows)",
        description: "Fine-tuning models, building RAG knowledge systems, and orchestrating autonomous tool-calling agents.",
        alignedDomains: ["AI Engineering & LLMOps"],
        trait: "Applied AI Architecture"
      },
      {
        id: "pref_infra_layer",
        label: "The Cloud Infrastructure Layer (Kubernetes, Terraform, CI/CD)",
        description: "Designing the secure VPC networks, autoscaling container clusters, and observability dashboards.",
        alignedDomains: ["Cloud Computing & DevOps"],
        trait: "Cloud Infrastructure"
      },
      {
        id: "pref_data_layer",
        label: "The Big Data & Pipeline Layer (Spark, Kafka, Data Lakes)",
        description: "Transforming raw data oceans into clean, lightning-fast analytical warehouses and streaming topics.",
        alignedDomains: ["Data Engineering & Big Data"],
        trait: "Data Architecture"
      },
      {
        id: "pref_fullstack_layer",
        label: "The Full-Stack Product Layer (Next.js, React, APIs, PostgreSQL)",
        description: "Connecting databases, clean APIs, and elegant client interfaces into a cohesive commercial product.",
        alignedDomains: ["Full-Stack Web Development", "Mobile & Cross-Platform Development"],
        trait: "End-to-End Product Craft"
      }
    ]
  }
];

export const PRESET_DOMAINS = [
  {
    id: "web-dev",
    name: "Full-Stack Web Development",
    tagline: "Build responsive, scalable, modern web applications end-to-end.",
    icon: "Globe",
    primaryColor: "from-blue-500 to-indigo-600",
    popularSkills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    careerOpportunities: ["Full-Stack Engineer", "Frontend Specialist", "Backend Developer", "Product Engineer"],
    marketOutlook: "High demand across startups, mid-market, and global enterprise tech."
  },
  {
    id: "ai-engineering",
    name: "AI Engineering & LLMOps",
    tagline: "Build generative AI systems, autonomous agents, RAG pipelines, and production LLM applications.",
    icon: "Sparkles",
    primaryColor: "from-indigo-500 via-purple-500 to-pink-500",
    popularSkills: ["LangChain", "LlamaIndex", "Vector DBs (Pinecone/Chroma)", "Gemini / OpenAI APIs", "Prompt Engineering", "Python"],
    careerOpportunities: ["AI Engineer", "Generative AI Developer", "LLMOps Specialist", "AI Solutions Architect"],
    marketOutlook: "The fastest-growing engineering discipline worldwide with exceptional compensation."
  },
  {
    id: "cloud-devops",
    name: "Cloud Computing & DevOps",
    tagline: "Orchestrate resilient cloud infrastructure, CI/CD pipelines, Kubernetes, and scalable systems.",
    icon: "CloudLightning",
    primaryColor: "from-cyan-500 to-blue-600",
    popularSkills: ["Docker", "Kubernetes", "AWS / GCP / Azure", "Terraform", "CI/CD (GitHub Actions)", "Linux"],
    careerOpportunities: ["Cloud Engineer", "DevOps Specialist", "Site Reliability Engineer (SRE)", "Platform Architect"],
    marketOutlook: "Mission-critical across every enterprise transitioning to cloud-native stacks."
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    tagline: "Harness statistical modeling, deep neural networks, computer vision, and predictive analytics.",
    icon: "BrainCircuit",
    primaryColor: "from-purple-500 to-pink-600",
    popularSkills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "NumPy & Pandas", "Computer Vision / NLP"],
    careerOpportunities: ["ML Engineer", "Data Scientist", "Computer Vision Specialist", "AI Research Practitioner"],
    marketOutlook: "Strong enterprise investment across healthcare, finance, automotive, and technology."
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Ethical Hacking",
    tagline: "Defend critical infrastructure, audit vulnerabilities, implement Zero Trust, and secure data.",
    icon: "ShieldCheck",
    primaryColor: "from-emerald-500 to-teal-600",
    popularSkills: ["Network Security", "Linux", "Burp Suite", "Wireshark", "Cryptography", "AppSec / OWASP"],
    careerOpportunities: ["Security Analyst", "Penetration Tester", "SOC Engineer", "AppSec Specialist"],
    marketOutlook: "Global talent shortage; highly resilient and recession-proof tech career path."
  },
  {
    id: "data-engineering",
    name: "Data Engineering & Big Data",
    tagline: "Build high-throughput data pipelines, real-time streaming architectures, and analytical warehouses.",
    icon: "Database",
    primaryColor: "from-amber-500 to-orange-600",
    popularSkills: ["Apache Kafka", "Apache Spark", "SQL & dbt", "Snowflake / BigQuery", "Python", "Airflow"],
    careerOpportunities: ["Data Engineer", "Analytics Engineer", "Big Data Architect", "Pipeline Specialist"],
    marketOutlook: "High demand as companies build AI foundations on structured data lakes."
  },
  {
    id: "mobile-dev",
    name: "Mobile & Cross-Platform Development",
    tagline: "Craft high-performance native and cross-platform mobile apps for iOS and Android.",
    icon: "Smartphone",
    primaryColor: "from-rose-500 to-red-600",
    popularSkills: ["React Native", "Flutter", "TypeScript", "Swift (iOS)", "Kotlin (Android)", "Mobile UX"],
    careerOpportunities: ["Mobile Engineer", "React Native Developer", "Flutter Specialist", "iOS/Android Engineer"],
    marketOutlook: "Consistently strong consumer and B2B app ecosystem."
  },
  {
    id: "ui-ux",
    name: "UI/UX & Product Design",
    tagline: "Craft delightful user journeys, design systems, interactive prototypes, and human-centered interfaces.",
    icon: "Palette",
    primaryColor: "from-amber-500 to-rose-600",
    popularSkills: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping", "Design Tokens"],
    careerOpportunities: ["Product Designer", "UI/UX Specialist", "Interaction Designer", "Design Systems Lead"],
    marketOutlook: "Essential for product-market fit, user adoption, and customer retention."
  }
];
