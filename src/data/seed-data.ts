export const SEED_HACKATHONS = [
  {
    id: "hack_1",
    title: "Global AI & Web Innovation Sprint 2026",
    organizer: "Devpost Community & Google Cloud",
    domainTags: ["Full-Stack Web Development", "AI & Machine Learning", "Cloud"],
    description: "Build next-generation autonomous web apps combining Gemini multimodal models with modern web frameworks. Open to solo hackers and teams.",
    startDate: "2026-09-15T00:00:00Z",
    endDate: "2026-09-17T23:59:59Z",
    deadline: "2026-09-14T18:00:00Z",
    location: "Global Virtual",
    isOnline: true,
    registrationUrl: "https://devpost.com/hackathons",
    prizePool: "$25,000 USD + Google Cloud Credits",
    eligibilityCriteria: {
      studentOnly: false,
      minTeamSize: 1,
      maxTeamSize: 4,
      requiredSkills: ["JavaScript/TypeScript or Python", "API Integration"],
      targetLevel: "Beginner to Advanced"
    },
    isCurated: true
  },
  {
    id: "hack_2",
    title: "CyberShield Collegiate CTF Challenge",
    organizer: "Major League Hacking (MLH) & Defcon Group",
    domainTags: ["Cybersecurity & Ethical Hacking", "Cloud & DevOps Engineering"],
    description: "48-hour competitive capture-the-flag tournament testing binary exploitation, cryptography, web security, and cloud forensics.",
    startDate: "2026-09-22T09:00:00Z",
    endDate: "2026-09-24T18:00:00Z",
    deadline: "2026-09-20T23:59:59Z",
    location: "Online",
    isOnline: true,
    registrationUrl: "https://mlh.io/seasons/2026/events",
    prizePool: "$10,000 in Hardware & Security Certifications",
    eligibilityCriteria: {
      studentOnly: true,
      minTeamSize: 1,
      maxTeamSize: 3,
      requiredSkills: ["Linux", "Basic Networking", "Python/Bash"],
      targetLevel: "All Experience Levels"
    },
    isCurated: true
  },
  {
    id: "hack_3",
    title: "NextGen Full-Stack & Open Source Buildathon",
    organizer: "Unstop & GitHub Education",
    domainTags: ["Full-Stack Web Development", "Cloud & DevOps Engineering"],
    description: "Create accessible open-source developer tooling, education platforms, or sustainability trackers using Next.js and Prisma.",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-10-05T23:59:59Z",
    deadline: "2026-09-28T23:59:59Z",
    location: "Hybrid (Bengaluru / Virtual)",
    isOnline: true,
    registrationUrl: "https://unstop.com/hackathons",
    prizePool: "₹5,00,000 INR + Mentorship from GitHub Stars",
    eligibilityCriteria: {
      studentOnly: true,
      minTeamSize: 2,
      maxTeamSize: 4,
      requiredSkills: ["React / Next.js", "Git / GitHub", "Database Basics"],
      targetLevel: "Beginners Welcome"
    },
    isCurated: true
  },
  {
    id: "hack_4",
    title: "Healthcare Intelligence & Vision Hackathon",
    organizer: "Stanford Medicine AI Lab & Hugging Face",
    domainTags: ["AI & Machine Learning", "Data Science & Analytics"],
    description: "Develop assistive diagnostics, patient triage bots, and medical image segmentation tools using open-weights models.",
    startDate: "2026-10-12T00:00:00Z",
    endDate: "2026-10-14T23:59:59Z",
    deadline: "2026-10-08T23:59:59Z",
    location: "Online",
    isOnline: true,
    registrationUrl: "https://huggingface.co/events",
    prizePool: "$30,000 USD + GPU compute grants",
    eligibilityCriteria: {
      studentOnly: false,
      minTeamSize: 1,
      maxTeamSize: 4,
      requiredSkills: ["Python", "PyTorch / TensorFlow", "Computer Vision / NLP"],
      targetLevel: "Intermediate"
    },
    isCurated: true
  }
];

export const SEED_INTERNSHIPS = [
  {
    id: "intern_1",
    title: "Software Engineering Intern - Web & Platforms (Summer 2027)",
    company: "Google",
    domain: "Full-Stack Web Development",
    stipend: "$48 - $55 / hr + Housing Stipend",
    location: "Mountain View, CA / New York, NY",
    remote: false,
    applicationUrl: "https://careers.google.com/students",
    deadline: "2026-10-15T23:59:59Z",
    description: "Work on high-scale distributed frontend and backend services powering products used by billions of users.",
    eligibilityCriteria: {
      graduatingYears: ["2027", "2028"],
      allowedDegrees: ["B.Tech/B.S. in Computer Science or related STEM field"],
      workAuthorization: "Eligible to work in country of application"
    },
    requiredSkills: ["Data Structures & Algorithms", "TypeScript / JavaScript", "Go / Java / Python", "System Design Basics"],
    isCurated: true
  },
  {
    id: "intern_2",
    title: "Applied AI / Machine Learning Research Intern",
    company: "Microsoft Research",
    domain: "AI & Machine Learning",
    stipend: "$52 / hr + Relocation",
    location: "Redmond, WA / Remote Option",
    remote: true,
    applicationUrl: "https://careers.microsoft.com/students",
    deadline: "2026-10-30T23:59:59Z",
    description: "Collaborate with researchers on multimodal foundation models, agentic reasoning, and scalable evaluation benchmarks.",
    eligibilityCriteria: {
      graduatingYears: ["2026", "2027", "2028"],
      allowedDegrees: ["B.S., M.S., or Ph.D. in Computer Science, AI, or Mathematics"],
      minGpa: "3.5 / 4.0 or equivalent"
    },
    requiredSkills: ["PyTorch", "Python", "Linear Algebra & Statistics", "Transformer Architectures"],
    isCurated: true
  },
  {
    id: "intern_3",
    title: "Security Operations & AppSec Intern",
    company: "Cloudflare",
    domain: "Cybersecurity & Ethical Hacking",
    stipend: "$42 / hr",
    location: "Austin, TX / London, UK / Remote",
    remote: true,
    applicationUrl: "https://www.cloudflare.com/careers",
    deadline: "2026-11-01T23:59:59Z",
    description: "Analyze web application firewalls (WAF) logs, participate in vulnerability triage, and automate bot mitigation rules.",
    eligibilityCriteria: {
      graduatingYears: ["2027", "2028"],
      allowedDegrees: ["Computer Science, Cybersecurity, Information Systems"]
    },
    requiredSkills: ["Network Protocols (TCP/IP, HTTP/3)", "Linux CLI", "Python or Go", "Web Vulnerabilities (OWASP Top 10)"],
    isCurated: true
  },
  {
    id: "intern_4",
    title: "Frontend Engineering Intern (Product Growth)",
    company: "Stripe",
    domain: "Full-Stack Web Development",
    stipend: "$50 / hr + Benefits",
    location: "San Francisco, CA / Seattle, WA",
    remote: true,
    applicationUrl: "https://stripe.com/jobs",
    deadline: "2026-10-20T23:59:59Z",
    description: "Craft pixel-perfect financial checkout components, payment SDKs, and developer dashboards with rigorous testing.",
    eligibilityCriteria: {
      graduatingYears: ["2027", "2028"],
      allowedDegrees: ["B.S./M.S. in Computer Science or self-taught with equivalent project proof"]
    },
    requiredSkills: ["React", "TypeScript", "CSS/Tailwind", "REST/GraphQL APIs", "Unit Testing (Jest/Playwright)"],
    isCurated: true
  }
];

export const SEED_COMPANIES_ELIGIBILITY = [
  {
    company: "Google",
    role: "Software Engineering Intern",
    domain: "Full-Stack Web Development",
    logoText: "G",
    color: "from-blue-500 to-red-500",
    prerequisites: [
      { name: "Data Structures & Algorithms", importance: "CRITICAL", description: "Proficiency in Trees, Graphs, Dynamic Programming, and complexity analysis." },
      { name: "Full-Stack Project Proof", importance: "HIGH", description: "At least 1-2 deployed full-stack applications with clean GitHub repositories." },
      { name: "TypeScript & Modern React", importance: "HIGH", description: "Component lifecycle, state management, and asynchronous data fetching." },
      { name: "Database & Backend APIs", importance: "MEDIUM", description: "SQL/PostgreSQL schema modeling and RESTful or GraphQL endpoints." }
    ]
  },
  {
    company: "Microsoft",
    role: "Explore Intern / SWE Intern",
    domain: "Full-Stack Web Development",
    logoText: "MS",
    color: "from-cyan-500 to-blue-600",
    prerequisites: [
      { name: "Object-Oriented Programming & Problem Solving", importance: "CRITICAL", description: "C++, C#, Java, or TypeScript design principles." },
      { name: "Collaborative Git Workflow", importance: "HIGH", description: "Branching, PR reviews, and CI testing." },
      { name: "Web Architecture Fundamentals", importance: "MEDIUM", description: "Client-server model, HTTP status codes, and cloud deployment." }
    ]
  },
  {
    company: "OpenAI / Anthropic Partner Lab",
    role: "AI Applied Fellow",
    domain: "AI & Machine Learning",
    logoText: "AI",
    color: "from-emerald-500 to-teal-700",
    prerequisites: [
      { name: "Python & Scientific Stack", importance: "CRITICAL", description: "NumPy, Pandas, PyTorch or JAX proficiency." },
      { name: "LLM Orchestration & Prompt Engineering", importance: "HIGH", description: "Function calling, embeddings, RAG pipelines, and fine-tuning." },
      { name: "Applied Evaluation & Benchmarking", importance: "HIGH", description: "Designing rigorous test sets and mitigating hallucinations." }
    ]
  },
  {
    company: "CrowdStrike / Mandiant",
    role: "Threat Intelligence & Security Intern",
    domain: "Cybersecurity & Ethical Hacking",
    logoText: "SEC",
    color: "from-red-600 to-slate-900",
    prerequisites: [
      { name: "Linux System Internals", importance: "CRITICAL", description: "Kernel namespaces, file permissions, shell scripting, and log analysis." },
      { name: "Networking & Packet Analysis", importance: "CRITICAL", description: "Wireshark packet inspection, routing, DNS, TLS handshakes." },
      { name: "OWASP Top 10 Vulnerabilities", importance: "HIGH", description: "XSS, SQLi, CSRF, IDOR discovery and remediation." }
    ]
  }
];
