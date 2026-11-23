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
  eyebrow: "AI ENGINEERING · DEVOPS · LLMOPS",
  role: "I build agentic AI applications and the infrastructure that keeps them reliable in production.",
  intro: "I’m especially interested in LLM-based systems — retrieval, orchestration, tool use, evaluation, deployment and observability.",
};

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Toolkit" },
  { href: "#path", label: "Journey" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const stackGroups: StackGroup[] = [
  { title: "AI engineering", items: ["LangGraph", "LangChain", "Google Gemini", "RAG", "Tool calling", "Tavily", "Guardrails AI"] },
  { title: "Backend engineering", items: ["Python", "FastAPI", "REST APIs", "Pydantic", "SQLAlchemy", "JWT authentication", "pytest"] },
  { title: "Data systems", items: ["PostgreSQL", "Supabase", "pgvector", "Alembic", "SQL", "Semantic retrieval"] },
  { title: "DevOps & delivery", items: ["Docker", "Git", "GitHub Actions", "Render", "Linux", "Bash", "CI/CD fundamentals"] },
  { title: "Frontend foundations", items: ["React", "TypeScript", "Vite", "Streamlit"] },
];

export const featuredProjects: Project[] = [
  {
    badge: "Live · AI workspace + project operations APIs",
    title: "Pagetrail — AI project operations workspace",
    blurb: "A full-stack AI workspace that brings document-grounded conversations and project coordination together. The live application combines a RAG-powered knowledge assistant with a project workspace backed by real organization, project and task APIs.",
    highlights: [
      "Document intelligence: upload PDF, DOCX, TXT and Markdown files, extract and chunk their content, then retrieve relevant passages for grounded answers.",
      "RAG and agentic chat: Gemini gemini-embedding-001 embeddings (3,072 dimensions), PostgreSQL pgvector cosine-distance retrieval, LangGraph conversations, PostgreSQL checkpointing, Tavily web search and long-term memory.",
      "Project workspace: React routes at /projects and /projects/{projectId} use FastAPI APIs for organizations, memberships, projects, tasks, milestones, dependencies, meeting notes, project document metadata and dashboard metrics.",
      "Backend design: FastAPI routes, Pydantic schemas and SQLAlchemy service logic enforce organization and project membership, role checks and project-scoped task assignment.",
      "Delivery and data safety: Docker + Render deployment, health endpoints and version-controlled Alembic migrations. The application does not run schema migrations at startup; the compatibility initializer is restricted to explicitly enabled local database targets."
    ],
    tags: ["Python", "FastAPI", "LangGraph", "Gemini", "React", "TypeScript", "PostgreSQL", "pgvector", "Alembic", "Docker"],
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
  badge: "Ongoing research · Team project · AI/backend lead",
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
  { when: "Ongoing learning", title: "Computer science & AI engineering foundations", detail: "Practising data structures, algorithms, Python, LLM application patterns, API design and databases." },
  { when: "Cloud learning", title: "AWS architecture fundamentals", detail: "Developing familiarity with core cloud concepts including compute, storage, identity, networking and managed databases." },
  { when: "2024", title: "Infosys Springboard — Programming with C and Working with Excel", detail: "Programming fundamentals in C and spreadsheet skills." }
];

export const about = {
  heading: "Building useful AI systems — and making them dependable",
  paragraphs: [
    "I’m a Medical Electronics engineering student building toward an AI engineering career. I enjoy developing practical LLM-powered applications: agent workflows, retrieval systems, tool use and domain-specific AI that solve real problems.",
    "Pagetrail is my main full-stack build so far. It has taken me through document RAG, LangGraph conversations, Gemini embeddings, pgvector, project-workspace APIs, access-control logic and controlled database migrations. I’m interested in how these systems behave beyond a demo — from evaluation and reliability to deployment and observability.",
    "DevOps and LLMOps are complementary parts of my focus: containers, CI/CD, cloud infrastructure, model evaluation, monitoring and cost/latency awareness. I also lead the AI/backend work for CardioHemo, an ongoing research project connecting medical engineering with machine learning and computational hemodynamics."
  ],
  facts: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Studying", value: "BE Medical Electronics · 2024–2028" },
    { label: "Current interests", value: "AI Engineering · DevOps · LLMOps" }
  ]
};

export const contact = {
  heading: "Have an AI system worth building?",
  text: "I’m open to internships and collaborative work in AI engineering, LLM-powered applications, DevOps and the infrastructure that helps AI products run reliably.",
  links: [
    { label: "Email", href: "mailto:subashbalaji.god@gmail.com", main: true },
    { label: "GitHub", href: "https://github.com/sxb05" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/subashbalaji--/" },
    { label: "LeetCode", href: "https://leetcode.com/u/subashbalaji/" },
    { label: "Résumé", href: `${import.meta.env.BASE_URL}resume.pdf` }
  ] as { label: string; href: string; main?: boolean }[]
};
