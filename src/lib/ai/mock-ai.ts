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
  "AI Engineering & LLMOps": {
    title: "Generative AI Engineering & Autonomous Agents Track",
    domain: "AI Engineering & LLMOps",
    description: "Master prompt engineering, embeddings, RAG architectures, vector databases, tool-calling autonomous agents, and production LLMOps evaluation.",
    estimatedWeeks: 12,
    milestones: [
      {
        orderIndex: 0,
        title: "Prompt Engineering, Structured JSON & Generative SDKs",
        description: "Master system instructions, few-shot prompting, schema-constrained outputs, and Google Gemini / OpenAI SDK integration.",
        whyItMatters: "Structured prompting transforms raw text models into reliable programmatic building blocks.",
        estimatedHours: 12,
        resources: [
          { title: "Google Gemini API Prompting Guide", url: "https://ai.google.dev/docs/prompt_best_practices", type: "doc", provider: "Google AI" },
          { title: "DeepLearning.AI: ChatGPT Prompt Engineering for Developers", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", type: "course", provider: "DeepLearning.AI" },
          { title: "Prompt Engineering Guide (DAIR.AI)", url: "https://www.promptingguide.ai/", type: "doc", provider: "DAIR.AI" }
        ],
        practicalChallenge: {
          challenge: "Build a Structured Data Extraction CLI tool that parses messy invoice text or resumes into validated Zod JSON schemas.",
          deliverables: ["GitHub repo with TypeScript/Python SDK", "Sample raw test datasets", "JSON schema validation tests"],
          evaluationCriteria: ["Zero JSON parsing errors", "Graceful retry handling", "Cost & token tracking"]
        }
      },
      {
        orderIndex: 1,
        title: "Vector Embeddings, Semantic Search & Vector Databases",
        description: "Understand cosine similarity, dense vs sparse vectors, chunking strategies, and vector stores (Pinecone, ChromaDB, pgvector).",
        whyItMatters: "Vector embeddings form the memory layer of modern AI applications and semantic retrieval.",
        estimatedHours: 16,
        resources: [
          { title: "Pinecone Vector Database Architecture Guide", url: "https://www.pinecone.io/learn/vector-database/", type: "doc", provider: "Pinecone" },
          { title: "Embeddings: What They Are and How They Work", url: "https://www.youtube.com/watch?v=gQddtTdmG_8", type: "video", provider: "StatQuest" },
          { title: "ChromaDB Getting Started Guide", url: "https://docs.trychroma.com/", type: "doc", provider: "Chroma" }
        ],
        practicalChallenge: {
          challenge: "Develop a Semantic Code Search Engine that indexes open-source GitHub repositories and returns relevant functions for natural language queries.",
          deliverables: ["Vector indexing pipeline", "Chunking strategy benchmarks", "Interactive search CLI or UI"],
          evaluationCriteria: ["Optimal chunk size/overlap", "Sub-100ms retrieval speed", "Relevance accuracy"]
        }
      },
      {
        orderIndex: 2,
        title: "Production RAG (Retrieval Augmented Generation) Pipelines",
        description: "Build advanced RAG with hybrid search (BM25 + Dense), re-ranking (Cohere), query decomposition, and hallucination guardrails.",
        whyItMatters: "Grounds LLMs in private enterprise documentation, drastically cutting hallucinations.",
        estimatedHours: 20,
        resources: [
          { title: "Advanced RAG Techniques Overview", url: "https://towardsdatascience.com/advanced-rag-01-overview-and-algorithms-1d2279159042", type: "doc", provider: "Towards Data Science" },
          { title: "Building and Evaluating Advanced RAG", url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/", type: "course", provider: "DeepLearning.AI" },
          { title: "LlamaIndex Documentation & Tutorials", url: "https://docs.llamaindex.ai/", type: "doc", provider: "LlamaIndex" }
        ],
        practicalChallenge: {
          challenge: "Construct a Full-Stack Customer Support & Docs Copilot with multi-document RAG, citation footnotes, and conversational context.",
          deliverables: ["Next.js/React interface", "RAG query engine with citations", "Source verification test suite"],
          evaluationCriteria: ["Accurate footnote citations", "Zero hallucinated claims", "Graceful 'I don't know' fallback"]
        }
      },
      {
        orderIndex: 3,
        title: "Autonomous Multi-Agent Systems & Tool Calling",
        description: "Master function calling, ReAct loops (Reason + Act), LangGraph/CrewAI agent orchestration, and human-in-the-loop workflows.",
        whyItMatters: "Agents can autonomously browse, execute code, call APIs, and solve multi-step engineering tasks.",
        estimatedHours: 22,
        resources: [
          { title: "LangChain LangGraph Official Tutorials", url: "https://langchain-ai.github.io/langgraph/", type: "doc", provider: "LangChain" },
          { title: "Building Multi-Agent AI Systems (CrewAI)", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", type: "course", provider: "DeepLearning.AI" },
          { title: "Function Calling with Gemini & OpenAI", url: "https://ai.google.dev/docs/function_calling", type: "doc", provider: "Google AI" }
        ],
        practicalChallenge: {
          challenge: "Create an Autonomous Market Research Agent that searches live web data, aggregates competitive pricing, and writes an executive PDF summary.",
          deliverables: ["Multi-agent workflow implementation", "Tool integrations (Search, Calculator, File Writer)", "Execution trace logs"],
          evaluationCriteria: ["Clean error recovery when tools fail", "Proper loop termination", "High-quality synthesized output"]
        }
      },
      {
        orderIndex: 4,
        title: "LLMOps, Evaluation Frameworks (Ragas) & Capstone Deployment",
        description: "Implement continuous evaluation metrics (faithfulness, answer relevance), prompt versioning, rate limiting, and production deployment.",
        whyItMatters: "Separates experimental toy AI demos from reliable, auditable production systems.",
        estimatedHours: 25,
        resources: [
          { title: "Ragas: Automated Evaluation of RAG Applications", url: "https://docs.ragas.io/", type: "doc", provider: "Ragas" },
          { title: "Arize Phoenix: Open-Source AI Observability", url: "https://docs.arize.com/phoenix", type: "doc", provider: "Arize AI" },
          { title: "Deploying Full-Stack AI Apps", url: "https://vercel.com/templates/ai", type: "doc", provider: "Vercel" }
        ],
        practicalChallenge: {
          challenge: "Deploy a production-grade AI Code Reviewer & Security Auditor bot for GitHub Pull Requests with automated PR comments and Ragas evaluation.",
          deliverables: ["Live GitHub App / Webhook integration", "Ragas evaluation benchmark report", "Production monitoring dashboard"],
          evaluationCriteria: ["High precision review comments", "Trace observability enabled", "Rate-limit resilience"]
        }
      }
    ]
  },
  "Cloud Computing & DevOps": {
    title: "Cloud Infrastructure & DevOps Engineering Track",
    domain: "Cloud Computing & DevOps",
    description: "From Linux systems programming and Docker containerization to Kubernetes orchestration, Terraform infrastructure as code, and CI/CD pipelines.",
    estimatedWeeks: 12,
    milestones: [
      {
        orderIndex: 0,
        title: "Linux Systems Administration, Bash Scripting & Networking",
        description: "Master file permissions, process management (systemd), SSH keys, iptables/firewalls, DNS, TCP/IP, and shell automation.",
        whyItMatters: "Linux powers 95%+ of all cloud servers and container runtimes.",
        estimatedHours: 14,
        resources: [
          { title: "Linux Journey: Free Interactive Guide", url: "https://linuxjourney.com/", type: "interactive", provider: "Linux Journey" },
          { title: "Bash Scripting Full Tutorial", url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4", type: "video", provider: "freeCodeCamp" },
          { title: "Computer Networking Course for Beginners", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", type: "video", provider: "freeCodeCamp" }
        ],
        practicalChallenge: {
          challenge: "Write an automated Server Provisioning & Hardening Bash Script that configures UFW firewalls, fail2ban, SSH key policies, and log rotation.",
          deliverables: ["Bash script with error handling and dry-run flag", "Test execution on Ubuntu VM/WSL", "Verification audit report"],
          evaluationCriteria: ["Idempotent execution", "Non-root security adherence", "Clean exit status codes"]
        }
      },
      {
        orderIndex: 1,
        title: "Docker Containerization & Multi-Stage Production Builds",
        description: "Deep dive into Dockerfiles, multi-stage optimization, layer caching, volume mounts, Docker Compose, and vulnerability scanning (Trivy).",
        whyItMatters: "Containers guarantee application parity from local development all the way to cloud staging and production.",
        estimatedHours: 16,
        resources: [
          { title: "Docker Official Get Started & Best Practices", url: "https://docs.docker.com/get-started/", type: "doc", provider: "Docker" },
          { title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "video", provider: "TechWorld with Nana" },
          { title: "Dockerfile Best Practices Guide", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/", type: "doc", provider: "Docker" }
        ],
        practicalChallenge: {
          challenge: "Containerize a multi-tier microservices app (Next.js frontend + Node.js API + PostgreSQL + Redis cache) with Docker Compose.",
          deliverables: ["Optimized multi-stage Dockerfiles (< 150MB image size)", "docker-compose.yml with healthchecks", "Trivy vulnerability scan report"],
          evaluationCriteria: ["Zero critical CVEs", "Proper non-root container users", "Persistent volume setup"]
        }
      },
      {
        orderIndex: 2,
        title: "CI/CD Automation with GitHub Actions & GitOps",
        description: "Build automated test suites, linting gates, automated semantic versioning, container registry publishing, and staging deploys.",
        whyItMatters: "Automated pipelines enable engineering teams to safely ship code multiple times per day with zero manual toil.",
        estimatedHours: 18,
        resources: [
          { title: "GitHub Actions Official Documentation", url: "https://docs.github.com/en/actions", type: "doc", provider: "GitHub" },
          { title: "GitHub Actions CI/CD Complete Course", url: "https://www.youtube.com/watch?v=R8_veQiYBjI", type: "video", provider: "freeCodeCamp" },
          { title: "GitOps Principles (OpenGitOps)", url: "https://opengitops.net/", type: "doc", provider: "OpenGitOps" }
        ],
        practicalChallenge: {
          challenge: "Build a complete CI/CD Matrix Pipeline with automated unit tests, code coverage badges, automated Docker Hub push, and release changelog generation.",
          deliverables: [".github/workflows/ci.yml and cd.yml", "Automated releases triggered by git tags", "Branch protection rules documentation"],
          evaluationCriteria: ["Fast cached build execution (< 2 mins)", "Secure secrets injection", "Rollback handling"]
        }
      },
      {
        orderIndex: 3,
        title: "Kubernetes (K8s) Container Orchestration & Helm",
        description: "Master Pods, Deployments, Services (ClusterIP, NodePort, Ingress), ConfigMaps, Secrets, Horizontal Pod Autoscaling (HPA), and Helm charts.",
        whyItMatters: "Kubernetes is the universal operating system for distributed cloud computing and microservices.",
        estimatedHours: 24,
        resources: [
          { title: "Kubernetes Official Documentation & Interactive Katacoda", url: "https://kubernetes.io/docs/home/", type: "doc", provider: "Kubernetes.io" },
          { title: "Kubernetes Course for Beginners", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video", provider: "TechWorld with Nana" },
          { title: "Helm Package Manager Quickstart", url: "https://helm.sh/docs/intro/quickstart/", type: "doc", provider: "Helm" }
        ],
        practicalChallenge: {
          challenge: "Deploy a resilient microservice application onto a local Minikube/K3s cluster with Ingress routing, HPA autoscaling, and custom Helm chart.",
          deliverables: ["Custom Helm chart with values.yaml", "Load test script simulating CPU spike triggering autoscaling", "Ingress SSL config"],
          evaluationCriteria: ["Zero-downtime rolling update verified", "Proper resource requests/limits", "Clean namespace isolation"]
        }
      },
      {
        orderIndex: 4,
        title: "Infrastructure as Code (Terraform) & Cloud Observability (Capstone)",
        description: "Provision AWS/GCP resources declaratively with Terraform, set up Prometheus metrics, Grafana dashboards, and centralized Loki logging.",
        whyItMatters: "Demonstrates production readiness in provisioning, monitoring, and debugging complex distributed cloud systems.",
        estimatedHours: 26,
        resources: [
          { title: "Terraform Official Tutorials (HashiCorp Learn)", url: "https://developer.hashicorp.com/terraform/tutorials", type: "doc", provider: "HashiCorp" },
          { title: "Prometheus & Grafana Monitoring Full Course", url: "https://www.youtube.com/watch?v=9TYX7HKtr34", type: "video", provider: "freeCodeCamp" },
          { title: "AWS Cloud Architecture Center", url: "https://aws.amazon.com/architecture/", type: "doc", provider: "AWS" }
        ],
        practicalChallenge: {
          challenge: "Provision a complete cloud VPC architecture using Terraform modules, deploy an autoscaling cluster, and configure Grafana alerting for 5xx errors.",
          deliverables: ["Terraform configuration with state locking", "Live Grafana dashboard with key RED metrics", "Post-mortem incident runbook"],
          evaluationCriteria: ["Modular terraform structure", "Alert triggers on latency/errors", "Clean teardown capability"]
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
  },
  "Cybersecurity & Ethical Hacking": {
    title: "Offensive & Defensive Cybersecurity Track",
    domain: "Cybersecurity & Ethical Hacking",
    description: "From networking fundamentals and Linux security to web application penetration testing, cryptography, and defensive SOC analysis.",
    estimatedWeeks: 12,
    milestones: [
      {
        orderIndex: 0,
        title: "Network Fundamentals, Wireshark & Packet Analysis",
        description: "Understand TCP/IP 3-way handshakes, DNS poisoning, ARP spoofing, subnetting, and live packet inspection with Wireshark.",
        whyItMatters: "All network-based cyber attacks occur at the packet layer; packet inspection is foundational to detection.",
        estimatedHours: 14,
        resources: [
          { title: "Wireshark Official User Guide & Practice PCAPs", url: "https://www.wireshark.org/docs/", type: "doc", provider: "Wireshark" },
          { title: "CompTIA Security+ Full Course", url: "https://www.youtube.com/watch?v=9NE33fpQuw8", type: "video", provider: "Professor Messer" },
          { title: "TryHackMe: Pre-Security & Network Fundamentals", url: "https://tryhackme.com/", type: "interactive", provider: "TryHackMe" }
        ],
        practicalChallenge: {
          challenge: "Analyze an infected network capture PCAP file to detect malware beaconing, DNS exfiltration, and identify attacker IP/payload.",
          deliverables: ["Wireshark filter cheat sheet", "Incident analysis report", "Mitigation firewall rule list"],
          evaluationCriteria: ["Accurate identification of malicious streams", "Clear evidence timestamps", "Actionable mitigation steps"]
        }
      },
      {
        orderIndex: 1,
        title: "Web Application Security & OWASP Top 10 Exploits",
        description: "Master SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, Server-Side Request Forgery (SSRF), and Burp Suite interception proxy.",
        whyItMatters: "Web vulnerabilities represent the largest attack surface for companies and startups.",
        estimatedHours: 18,
        resources: [
          { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", type: "interactive", provider: "PortSwigger" },
          { title: "OWASP Top 10 2021 Project", url: "https://owasp.org/Top10/", type: "doc", provider: "OWASP" },
          { title: "Bug Bounty Hunting for Beginners", url: "https://www.youtube.com/watch?v=Rp37O_xK_e4", type: "video", provider: "freeCodeCamp" }
        ],
        practicalChallenge: {
          challenge: "Perform a Vulnerability Assessment on a deliberately vulnerable web app (Juice Shop / DVWA) and document exploits with proof-of-concept payloads.",
          deliverables: ["Standardized Vulnerability Assessment Report", "Burp Suite raw request/response logs", "Remediation code patches"],
          evaluationCriteria: ["Clear CVSS scoring", "Reproducible exploit steps", "Secure code recommendations"]
        }
      },
      {
        orderIndex: 2,
        title: "Applied Cryptography, TLS & Zero Trust Security",
        description: "Understand symmetric vs asymmetric encryption (AES, RSA, ECC), public key infrastructure (PKI), digital signatures, and JWT security.",
        whyItMatters: "Cryptography protects data in transit and at rest across global cloud systems.",
        estimatedHours: 16,
        resources: [
          { title: "Crypto101: A Guide to Cryptography for Developers", url: "https://www.crypto101.io/", type: "doc", provider: "Crypto101" },
          { title: "Applied Cryptography Specialization", url: "https://www.coursera.org/specializations/applied-crypto", type: "course", provider: "Coursera" },
          { title: "Zero Trust Architecture Standards (NIST SP 800-207)", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final", type: "doc", provider: "NIST" }
        ],
        practicalChallenge: {
          challenge: "Build an End-to-End Encrypted File Sharing CLI with hybrid RSA-AES key exchange and digital signature verification.",
          deliverables: ["Working CLI tool in Python/TypeScript", "Cryptographic architecture documentation", "Unit tests for tamper detection"],
          evaluationCriteria: ["Proper IV/Nonce generation", "Protection against replay attacks", "Clean key storage"]
        }
      },
      {
        orderIndex: 3,
        title: "Defensive Security, SIEM & Threat Hunting (Capstone)",
        description: "Set up Elastic/Splunk SIEM, configure Sysmon endpoint telemetry, analyze attack logs, and build automated incident response playbooks.",
        whyItMatters: "Prepares you directly for high-paying roles in Security Operations Centers (SOC) and Incident Response teams.",
        estimatedHours: 24,
        resources: [
          { title: "Splunk Fundamentals & Free Training", url: "https://www.splunk.com/en_us/training/free-courses/overview.html", type: "course", provider: "Splunk" },
          { title: "MITRE ATT&CK Framework Explorer", url: "https://attack.mitre.org/", type: "doc", provider: "MITRE" },
          { title: "SOC Core Skills by Black Hills Security", url: "https://www.youtube.com/watch?v=jW5s6z3eA6Y", type: "video", provider: "Black Hills" }
        ],
        practicalChallenge: {
          challenge: "Build a mini SOC Home Lab, simulate an attack with Kali Linux, and create a detection rule in SIEM with automated alert notifications.",
          deliverables: ["Lab topology diagram", "Custom Sigma/YARA detection rule", "Incident timeline writeup matching MITRE tactics"],
          evaluationCriteria: ["Accurate MITRE mapping", "Low false-positive detection rule", "Clear containment playbook"]
        }
      }
    ]
  },
  "Data Engineering & Big Data": {
    title: "Data Engineering & Stream Processing Track",
    domain: "Data Engineering & Big Data",
    description: "From complex SQL data modeling and Python ETL pipelines to Apache Spark distributed compute, Kafka streaming, and Snowflake data warehouses.",
    estimatedWeeks: 12,
    milestones: [
      {
        orderIndex: 0,
        title: "Advanced SQL, Data Modeling & Relational Warehousing",
        description: "Master window functions, CTEs, recursive queries, Star/Snowflake schema modeling, and indexing strategies.",
        whyItMatters: "SQL is the foundational query language for all analytical computation and business intelligence.",
        estimatedHours: 14,
        resources: [
          { title: "Mode Analytics SQL Tutorial for Data Analysis", url: "https://mode.com/sql-tutorial/", type: "interactive", provider: "Mode" },
          { title: "Data Warehouse Toolkit (Kimball Dimensional Modeling)", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/", type: "doc", provider: "Kimball Group" },
          { title: "Advanced SQL Full Course", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", type: "video", provider: "freeCodeCamp" }
        ],
        practicalChallenge: {
          challenge: "Design a dimensional data warehouse schema (Fact and Dimension tables) for an e-commerce platform and write analytical queries with window functions.",
          deliverables: ["DDL schema script", "Sample data population script", "10 analytical queries with performance EXPLAIN plans"],
          evaluationCriteria: ["Proper surrogate keys & dimensional design", "Zero Cartesian joins", "Optimized index usage"]
        }
      },
      {
        orderIndex: 1,
        title: "ETL / ELT Pipelines with Python, dbt & Apache Airflow",
        description: "Build robust extraction pipelines, transform data with dbt (data build tool), and schedule automated workflows with Apache Airflow DAGs.",
        whyItMatters: "Automates the continuous transformation of raw application data into clean, tested reporting models.",
        estimatedHours: 18,
        resources: [
          { title: "dbt Fundamentals Free Course", url: "https://courses.getdbt.com/courses/fundamentals", type: "course", provider: "dbt Labs" },
          { title: "Apache Airflow Official Tutorial & Documentation", url: "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html", type: "doc", provider: "Apache" },
          { title: "Data Engineering with Python", url: "https://www.youtube.com/watch?v=qWru-b6m030", type: "video", provider: "freeCodeCamp" }
        ],
        practicalChallenge: {
          challenge: "Build an automated ELT pipeline that extracts public API data (e.g. GitHub events/crypto), loads into DuckDB/Postgres, transforms with dbt, and schedules with Airflow.",
          deliverables: ["Airflow DAG script with retries and alerting", "dbt model project with schema tests", "Data lineage documentation"],
          evaluationCriteria: ["Data quality tests passing (unique, not_null)", "Idempotent backfilling", "Clean DAG structure"]
        }
      },
      {
        orderIndex: 2,
        title: "Distributed Compute with Apache Spark & PySpark",
        description: "Understand Spark RDDs, DataFrames, distributed memory partitions, catalyst optimizer, and cluster execution.",
        whyItMatters: "Processes petabyte-scale datasets that cannot fit in a single server's RAM.",
        estimatedHours: 20,
        resources: [
          { title: "Apache Spark Official Quick Start & Documentation", url: "https://spark.apache.org/docs/latest/quick-start.html", type: "doc", provider: "Apache Spark" },
          { title: "PySpark Course for Beginners", url: "https://www.youtube.com/watch?v=_C8kWso4ebw", type: "video", provider: "freeCodeCamp" },
          { title: "Databricks Free Community Edition", url: "https://community.cloud.databricks.com/", type: "interactive", provider: "Databricks" }
        ],
        practicalChallenge: {
          challenge: "Process a 50GB multi-year taxi trips dataset with PySpark to compute hourly spatial demand aggregations and outlier filtering.",
          deliverables: ["PySpark transformation script", "Partition optimization benchmark report", "Saved Parquet data lake format"],
          evaluationCriteria: ["Efficient partition count", "Avoidance of unnecessary data shuffles", "Proper column pruning"]
        }
      },
      {
        orderIndex: 3,
        title: "Real-Time Event Streaming with Apache Kafka (Capstone)",
        description: "Master Kafka topics, producers, consumers, partition keys, consumer groups, schema registries, and stream processing with Kafka Streams / Flink.",
        whyItMatters: "Enables real-time fraud detection, live user activity feeds, and instant financial transaction processing.",
        estimatedHours: 25,
        resources: [
          { title: "Confluent Kafka Developer Tutorials", url: "https://developer.confluent.io/get-started/", type: "course", provider: "Confluent" },
          { title: "Apache Kafka Full Course", url: "https://www.youtube.com/watch?v=R873BlBMUBY", type: "video", provider: "freeCodeCamp" },
          { title: "Kafka: The Definitive Guide (Free O'Reilly Edition)", url: "https://www.confluent.io/resources/kafka-the-definitive-guide/", type: "doc", provider: "O'Reilly / Confluent" }
        ],
        practicalChallenge: {
          challenge: "Build a Real-Time Ride-Sharing Fare & Surge Pricing Stream: produce mock GPS driver events to Kafka, process surge multipliers in real-time, and store results.",
          deliverables: ["Docker Compose Kafka cluster setup", "Producer & Stream Consumer services", "Live metrics dashboard"],
          evaluationCriteria: ["Handling of out-of-order events", "Exactly-once processing semantics", "Resilience to broker restart"]
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
        matchScore: 94,
        reasoning: "Your desire to build intuitive, user-facing applications paired with immediate visual feedback aligns strongly with modern full-stack web engineering.",
        keySkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Tailwind CSS"],
        careerRoles: ["Full-Stack Developer", "Product Engineer", "Frontend Specialist"],
        growthOutlook: "Consistently strong demand across early startups and global enterprises."
      },
      {
        domain: "AI Engineering & LLMOps",
        matchScore: 89,
        reasoning: "Your interest in autonomous reasoning, RAG architectures, and generative tools matches the fast-growing frontier of applied AI engineering.",
        keySkills: ["LangChain", "Vector DBs", "Prompt Engineering", "Python", "RAG Pipelines"],
        careerRoles: ["AI Engineer", "Generative AI Developer", "LLMOps Architect"],
        growthOutlook: "The single fastest-growing tech discipline worldwide with high compensation."
      },
      {
        domain: "Cloud Computing & DevOps",
        matchScore: 82,
        reasoning: "You demonstrated an appreciation for scalable infrastructure, automated deployment pipelines, and high availability systems.",
        keySkills: ["Docker", "Kubernetes", "Linux", "Terraform", "CI/CD", "AWS/GCP"],
        careerRoles: ["Cloud Engineer", "DevOps Specialist", "Site Reliability Engineer (SRE)"],
        growthOutlook: "Vital enterprise discipline with high job stability and low replacement risk."
      },
      {
        domain: "Cybersecurity & Ethical Hacking",
        matchScore: 78,
        reasoning: "Your analytical curiosity around adversarial defense, cryptographic guarantees, and resilience provides a great foundation for security engineering.",
        keySkills: ["Network Security", "Linux", "Burp Suite", "AppSec", "Cryptography"],
        careerRoles: ["Security Analyst", "Penetration Tester", "AppSec Engineer"],
        growthOutlook: "Massive talent shortage globally; high compensation across all tech sectors."
      }
    ],
    primaryRecommendation: "Full-Stack Web Development",
    supportiveSynthesis: "You have a natural builder's intuition — enjoying both the creative polish of user-facing products and the systematic logic of server-side data workflows."
  };
}

export function getMockMarketDemand(domainOrSkill: string): MarketDemandInfo {
  const query = domainOrSkill.toLowerCase();
  if (query.includes("ai engineering") || query.includes("llm") || query.includes("generative")) {
    return {
      domain: "AI Engineering & LLMOps",
      skillName: domainOrSkill,
      demandLevel: "Very High",
      averageSalaryRange: "$130,000 - $210,000 (US) / ₹15L - ₹45L (India)",
      topHiringCompanies: ["OpenAI", "Google DeepMind", "Anthropic", "Microsoft", "Scale AI", "Perplexity"],
      growthRatePercent: "+48% YoY",
      keyTrends: [
        "Massive demand for Autonomous Agents & Multi-Agent Orchestration",
        "RAG (Retrieval Augmented Generation) standard in enterprise search",
        "Fine-tuning open-source models (Llama 3, Mistral) for private domains"
      ],
      recommendation: "One of the highest ROI tracks in tech today. Build deployed applications demonstrating real RAG and tool-calling agents to stand out.",
      isEstimate: true
    };
  } else if (query.includes("cloud") || query.includes("devops") || query.includes("kubernetes") || query.includes("docker")) {
    return {
      domain: "Cloud Computing & DevOps",
      skillName: domainOrSkill,
      demandLevel: "Very High",
      averageSalaryRange: "$110,000 - $175,000 (US) / ₹12L - ₹30L (India)",
      topHiringCompanies: ["Amazon Web Services", "Google Cloud", "Microsoft Azure", "Datadog", "HashiCorp", "Netflix"],
      growthRatePercent: "+25% YoY",
      keyTrends: [
        "Kubernetes standardizing as the distributed cloud OS",
        "Shift towards Declarative Infrastructure as Code (Terraform)",
        "GitOps and automated canary deployments"
      ],
      recommendation: "High stability and excellent compensation. Having hands-on portfolio proof with Terraform and Kubernetes will open doors immediately.",
      isEstimate: true
    };
  } else if (query.includes("data") || query.includes("spark") || query.includes("kafka")) {
    return {
      domain: "Data Engineering & Big Data",
      skillName: domainOrSkill,
      demandLevel: "High",
      averageSalaryRange: "$115,000 - $170,000 (US) / ₹11L - ₹28L (India)",
      topHiringCompanies: ["Snowflake", "Databricks", "Confluent", "Uber", "Spotify", "Meta"],
      growthRatePercent: "+22% YoY",
      keyTrends: [
        "Real-time event streaming replacing batch ETL",
        "Adoption of modern data stack (dbt + Snowflake/BigQuery)",
        "Data contracts and data observability"
      ],
      recommendation: "Every AI model relies on clean data pipelines. Building a live Kafka/Spark project gives you immediate credibility.",
      isEstimate: true
    };
  } else if (query.includes("cyber") || query.includes("security")) {
    return {
      domain: "Cybersecurity & Ethical Hacking",
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
