// Portfolio content, maintained separately from presentation.
export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  liveHref?: string;
  badge?: string;
  highlights?: string[];
}
export interface StackGroup { title: string; items: string[]; }
export interface PipelineStep { label: string; note: string; }
export interface EducationEvent { when: string; title: string; detail: string; }

export const profile = {
  name: "Subash Balaji S",
  eyebrow: "Backend · DevOps · LLMOps",
  role: "I build reliable backend systems and the infrastructure that makes AI applications usable in production.",
  intro: "From API design and data systems to agent workflows, deployment and observability — I enjoy making the pieces work together.",
};

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Toolkit" },
  { href: "#path", label: "Journey" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const stackGroups: StackGroup[] = [
  { title: "Backend engineering", items: ["Python", "FastAPI", "REST APIs", "Pydantic", "SQLAlchemy", "JWT authentication", "pytest"] },
  { title: "Data systems", items: ["PostgreSQL", "Supabase", "pgvector", "Alembic", "SQL", "Semantic retrieval"] },
  { title: "AI application engineering", items: ["LangGraph", "LangChain", "Google Gemini", "RAG", "Tool calling", "Tavily", "Guardrails AI"] },
  { title: "Delivery & operations", items: ["Docker", "Git", "GitHub Actions", "Render", "Linux", "Bash", "CI/CD fundamentals"] },
  { title: "Working knowledge", items: ["React", "TypeScript", "Vite", "Streamlit", "C", "C++"] },
];

export const featuredProjects: Project[] = [
  {
    badge: "Live application · Primary project",
    title: "Pagetrail — Document-aware AI workspace",
    blurb: "A full-stack application for working with your own documents through conversational AI. It combines retrieval, agent orchestration and persistent application data in a deployable product.",
    highlights: [
      "Upload PDF, DOCX, TXT and Markdown files, then ask questions grounded in retrieved document chunks.",
      "Built a retrieval pipeline with Gemini embeddings and PostgreSQL pgvector cosine-distance search.",
      "FastAPI + React/TypeScript + LangGraph + Gemini, with Supabase PostgreSQL, SQLAlchemy and Docker.",
      "Includes authentication, persistent conversations and checkpointing, Tavily web search, long-term memory support and input guardrails. Application-level ownership checks are used for user-scoped data access."
    ],
    tags: ["Python", "FastAPI", "LangGraph", "React", "TypeScript", "PostgreSQL", "pgvector", "Docker"],
    href: "https://github.com/sxb05/Pagetrail",
    liveHref: "https://pagetrail.onrender.com"
  },
  {
    badge: "Live · Multi-agent research workflow",
    title: "Multi-Agent Research System",
    blurb: "A research workflow that gathers web sources, extracts content, drafts a report and sends it through a separate critique stage.",
    highlights: [
      "Coordinates Tavily search, Trafilatura extraction, Gemini report generation and an LLM-based review step.",
      "Provides distinct views for sources, notes, report output and critique; packaged with Docker."
    ],
    tags: ["Python", "FastAPI", "React", "LangChain", "Gemini", "Tavily", "Docker"],
    href: "https://github.com/sxb05/Multi-Agent_Research_sys",
    liveHref: "https://multi-agent-research-sys-72wp.onrender.com"
  }
];

export const cardiohemo = {
  badge: "Ongoing research · Team project · AI backend lead",
  title: "CardioHemo — Explainable cardiovascular risk research",
  summary: "A medical-engineering research prototype exploring how clinical measurements and CFD-derived hemodynamic indicators can contribute to cardiovascular risk assessment. My role focuses on the AI/backend architecture and integrating model outputs into an interpretable workflow.",
  orchestrator: "Research workflow · Clinical + hemodynamic signals",
  pipeline: [
    { label: "Clinical data", note: "patient measurements" },
    { label: "CFD features", note: "WSS · OSI · pressure" },
    { label: "Predictive models", note: "risk estimation" },
    { label: "SHAP", note: "feature explanations" },
    { label: "Context", note: "supporting evidence" },
    { label: "Risk summary", note: "interpretable output" }
  ] as PipelineStep[],
  tags: ["Python", "FastAPI", "SHAP", "OpenFOAM", "LangGraph", "Machine Learning"],
  note: "Research, model integration and validation are in progress; this is not a clinically validated diagnostic system."
};

export const projects: Project[] = [
  {
    badge: "Live · Tool-calling assistant",
    title: "LangChain AI Assistant",
    blurb: "A conversational assistant with session memory and external tools for web search and weather lookup, deployed with a Streamlit interface.",
    tags: ["Python", "LangChain", "Gemini", "Streamlit", "Tavily"],
    href: "https://github.com/sxb05/LANGCHAIN_AGENT",
    liveHref: "https://langchain-agent-p2z5.onrender.com/"
  },
  {
    badge: "Practice repository",
    title: "Backend Engineering with FastAPI",
    blurb: "Hands-on backend learning and implementation practice covering Python, API development and PostgreSQL fundamentals.",
    tags: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    href: "https://github.com/sxb05/backend-with-fastapi"
  }
];

export const education: EducationEvent[] = [
  { when: "2024 – 2028 · Bengaluru", title: "BE, Medical Electronics — Dayananda Sagar College of Engineering", detail: "Honours degree track. Medical electronics foundation alongside software and AI projects." },
  { when: "Ongoing learning", title: "Computer science & backend foundations", detail: "Practising data structures, algorithms, Python, API design, databases and engineering workflows." },
  { when: "Cloud learning", title: "AWS architecture fundamentals", detail: "Developing familiarity with core cloud concepts including compute, storage, identity, networking and managed databases." },
  { when: "2024", title: "Infosys Springboard — Programming with C and Working with Excel", detail: "Programming fundamentals in C and spreadsheet skills." }
];

export const about = {
  heading: "Engineering across the application stack",
  paragraphs: [
    "I’m a Medical Electronics engineering student drawn to the systems behind useful software: dependable APIs, well-designed data layers, deployment pipelines and applications that behave predictably beyond a local demo.",
    "My current direction is a hybrid of backend engineering, DevOps and LLMOps. Through Pagetrail, I’ve been working with FastAPI, LangGraph, PostgreSQL/pgvector, Docker and deployment workflows. I’m especially interested in model-serving operations, CI/CD, observability, evaluation and making AI systems more reliable and cost-aware.",
    "I also lead the AI/backend work for CardioHemo, an ongoing team research project that connects medical engineering with machine learning and computational hemodynamics."
  ],
  facts: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Studying", value: "BE Medical Electronics · 2024–2028" },
    { label: "Current direction", value: "Backend · DevOps · LLMOps" }
  ]
};

export const contact = {
  heading: "Have a system worth building?",
  text: "I’m open to internships, collaborative engineering work and opportunities around backend systems, cloud infrastructure and AI application operations.",
  links: [
    { label: "Email", href: "mailto:subashbalaji.god@gmail.com", main: true },
    { label: "GitHub", href: "https://github.com/sxb05" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/subashbalaji--/" },
    { label: "LeetCode", href: "https://leetcode.com/u/subashbalaji/" },
    { label: "Résumé", href: `${import.meta.env.BASE_URL}resume.pdf` }
  ] as { label: string; href: string; main?: boolean }[]
};
