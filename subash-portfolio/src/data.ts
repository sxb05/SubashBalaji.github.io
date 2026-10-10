// All site content lives here. Edit this file; the components just render it.

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  badge?: string;
  highlights?: string[];
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface PipelineStep {
  label: string;
  note: string;
}

export interface EducationEvent {
  when: string;
  title: string;
  detail: string;
}

export const profile = {
  name: "Subash Balaji S",
  role: "Generative AI and backend engineer. I build LLM-powered multi-agent systems, RAG applications and production-ready REST APIs.",
};

export const navItems = [
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Projects" },
  { href: "#path", label: "Education" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const stackGroups: StackGroup[] = [
  {
    title: "Generative AI",
    items: ["LangChain", "LangGraph", "Gemini", "Groq", "OpenAI API", "Chroma", "Tavily", "RAG"],
  },
  {
    title: "Backend",
    items: ["Python", "FastAPI", "Pydantic v2", "JWT / OAuth2", "RBAC", "Celery", "Redis"],
  },
  {
    title: "Data and DevOps",
    items: ["PostgreSQL", "SQLAlchemy", "Alembic", "Docker", "GitHub Actions", "AWS", "Render"],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Vite", "Streamlit"],
  },
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "C", "C++", "Bash"],
  },
];

// EDIT: the repo links currently point at your GitHub repositories page.
// Replace each href with the exact repo URL (https://github.com/sxb05/<repo-name>).
const REPOS = "https://github.com/sxb05?tab=repositories";

export const featuredProjects: Project[] = [
  {
    badge: "Multi-agent",
    title: "Multi-Agent Research System",
    blurb:
      "A modular research pipeline where agents search the web, synthesise a report and then critique it, delivered as a Streamlit app.",
    highlights: [
      "Combines autonomous web search, LLM report synthesis (Gemini and Groq) and a critical-review agent. Estimated 80% less manual research effort.",
      "Orchestrates 4+ AI tools through LangChain's agent framework and exports structured Markdown reports, using prompt engineering to control reasoning and output format.",
    ],
    tags: ["Python", "LangChain", "Gemini", "Groq", "Tavily", "Streamlit", "Trafilatura"],
    href: REPOS,
  },
  {
    badge: "Full-stack RAG",
    title: "HelloGPT: RAG-powered AI assistant",
    blurb:
      "A document-grounded assistant with a FastAPI backend and a React + TypeScript frontend, orchestrated with LangGraph.",
    highlights: [
      "LangGraph coordinates Gemini with Tavily web search and long-term memory tools.",
      "RAG pipeline parses PDF, DOCX, TXT and Markdown uploads, chunks and embeds them with Gemini into Chroma, and retrieves context scoped to each conversation thread.",
      "JWT authentication with expiring tokens; users, conversations, messages and agent checkpoints persist with SQLAlchemy and SQLite behind 10 REST endpoints.",
    ],
    tags: ["FastAPI", "LangGraph", "Gemini", "Chroma", "SQLAlchemy", "React", "TypeScript"],
    href: REPOS,
  },
];

export const cardiohemo = {
  badge: "Team project · I lead the AI backend",
  title: "CardioHemo: agentic explainable AI for non-invasive CVD risk prediction",
  summary:
    "A framework that predicts cardiovascular risk from five vital signs and explains why. A LangGraph agent routes each case through a distilled student model, a physics-based CFD surrogate, an ML ensemble with SHAP explanations, and a retrieval step, then produces a prognosis.",
  orchestrator: "LangGraph agent · 7-node StateGraph · FastAPI service",
  pipeline: [
    { label: "5 vitals", note: "input" },
    { label: "Student model", note: "knowledge distillation" },
    { label: "CFD surrogate", note: "Windkessel + ROM" },
    { label: "Ensemble", note: "ML + SHAP" },
    { label: "Retrieval", note: "RAG on ChromaDB" },
    { label: "Prognosis", note: "SYNTAX / GRACE" },
  ] as PipelineStep[],
  tags: ["LangGraph", "FastAPI", "ChromaDB", "SHAP", "OpenFOAM", "Groq Llama 3.3 70B", "Claude Sonnet"],
  note: "In active development with a four-person team.",
};

export const projects: Project[] = [
  {
    title: "LangChain AI Assistant",
    blurb:
      "A conversational assistant with persistent session memory for multi-turn dialogue, deployed on Render with a Streamlit interface. Two real-time tools (Tavily web search, Weatherstack weather) with graceful fallbacks when API keys are missing.",
    tags: ["Python", "LangChain", "Gemini", "Streamlit"],
    href: REPOS,
  },
  {
    title: "Products Management REST API",
    blurb:
      "A RESTful API with full CRUD, Pydantic v2 validation, query filtering, JWT authentication and role-based access control. PostgreSQL with SQLAlchemy and Alembic migrations, Swagger docs, and Docker Compose with GitHub Actions CI/CD.",
    tags: ["FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    href: REPOS,
  },
];

export const education: EducationEvent[] = [
  {
    when: "2024 – 2028 · Bengaluru",
    title: "BE, Medical Electronics Engineering — Dayananda Sagar College of Engineering",
    detail: "GPA 8.0/10. Editor of the department newsletter.",
  },
  {
    when: "In progress",
    title: "Data Structures and Algorithms specialization — UC San Diego",
    detail: "Building algorithmic fundamentals for backend and systems work.",
  },
  {
    when: "2024",
    title: "AWS Solutions Architect – Fundamentals — Amazon Web Services",
    detail: "Studied EC2, S3, IAM, VPC and RDS.",
  },
  {
    when: "Completed",
    title: "CS50: Introduction to Programming with Python — Harvard University",
    detail: "The foundation for my Python-first approach.",
  },
  {
    when: "2024",
    title: "Programming with C and Working with Excel — Infosys Springboard",
    detail: "Programming fundamentals in C and spreadsheet skills.",
  },
];

export const about = {
  heading: "Engineering for signals that matter",
  paragraphs: [
    "I'm an engineering student building LLM-powered multi-agent systems, RAG applications and production-ready REST APIs with Python, FastAPI and LangChain, and deploying them as containerised services with Docker and CI/CD.",
    "I study Medical Electronics at Dayananda Sagar College of Engineering in Bengaluru, which is why my current focus is healthcare AI: I lead the AI backend for CardioHemo, a team project on explainable cardiovascular risk prediction.",
  ],
  facts: [
    { label: "Based in", value: "Jayanagar, Bengaluru" },
    { label: "Studying", value: "BE, Medical Electronics (2024–2028)" },
    { label: "Looking for", value: "A software engineering internship" },
    { label: "Also", value: "Editor, department newsletter" },
  ],
};

export const contact = {
  heading: "Let's work together",
  text: "I'm looking for a software engineering internship to ship scalable, AI-driven backend products. Send me a note and I'll reply.",
  links: [
    { label: "Email me", href: "mailto:subashbalaji.god@gmail.com", main: true },
    { label: "GitHub", href: "https://github.com/sxb05" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/subashbalaji--/" },
    { label: "LeetCode", href: "https://leetcode.com/u/subashbalaji/" },
    { label: "NeetCode", href: "https://neetcode.io/user/CyberPotara264" },
    { label: "Résumé", href: `${import.meta.env.BASE_URL}resume.pdf` },
  ] as { label: string; href: string; main?: boolean }[],
};
