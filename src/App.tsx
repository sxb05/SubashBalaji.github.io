// All site content lives here. Edit this file; the components just render it.

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  liveHref?: string;
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
  role: "Backend-focused software engineer building APIs and AI-powered applications with Python, FastAPI, PostgreSQL, and LangGraph.",
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
    title: "AI Engineering",
    items: ["LangChain", "LangGraph", "Google Gemini", "Groq", "RAG", "Tavily", "Tool-calling agents"],
  },
  {
    title: "Backend and APIs",
    items: ["Python", "FastAPI", "REST API design", "Pydantic", "JWT authentication", "Role-based access control", "SQLAlchemy"],
  },
  {
    title: "Data and DevOps",
    items: ["PostgreSQL", "pgvector", "Alembic", "Redis", "Docker", "GitHub Actions", "pytest", "Render"],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Vite", "Streamlit"],
  },
  {
    title: "Languages",
    items: ["Python", "SQL", "JavaScript", "TypeScript", "C", "C++", "Bash"],
  },
];

export const featuredProjects: Project[] = [
  {
    badge: "Live · Full-stack RAG",
    title: "PageTrail — Document-aware AI assistant",
    blurb:
      "A deployed full-stack assistant for chatting with uploaded documents, searching the web, and maintaining conversation context across sessions.",
    highlights: [
      "Accepts PDF, DOCX, TXT, and Markdown documents and uses retrieval-augmented generation to ground responses in uploaded content.",
      "Built with FastAPI, React, TypeScript, LangGraph, Google Gemini, Supabase PostgreSQL, and pgvector; optional web search is powered by Tavily.",
      "Includes authentication and user-scoped data-access checks for conversations and document retrieval, with security and isolation tests in the development workflow.",
    ],
    tags: ["FastAPI", "React", "TypeScript", "LangGraph", "Gemini", "PostgreSQL", "pgvector", "Tavily"],
    href: "https://github.com/sxb05/Pagetrail",
    liveHref: "https://pagetrail.onrender.com",
  },
  {
    badge: "Live · Multi-agent workflow",
    title: "Multi-Agent Research System",
    blurb:
      "A research workspace that turns a question into a sourced report, then sends the draft through a separate review step.",
    highlights: [
      "Coordinates web search with Tavily, content extraction with Trafilatura, report generation with Gemini, and an LLM-based critique step.",
      "Provides separate views for sources, notes, the report, and the critique; the application is packaged with Docker for deployment.",
    ],
    tags: ["Python", "React", "FastAPI", "LangChain", "Gemini", "Tavily", "Trafilatura", "Docker"],
    href: "https://github.com/sxb05/Multi-Agent_Research_sys",
    liveHref: "https://multi-agent-research-sys-72wp.onrender.com",
  },
];

export const cardiohemo = {
  badge: "In progress · Team project · AI backend lead",
  title: "CardioHemo — Explainable cardiovascular risk research",
  summary:
    "A research prototype exploring how clinical measurements and hemodynamic indicators can support cardiovascular risk assessment. The planned agent workflow combines predictive models, a physics-informed CFD surrogate, SHAP-based explanations, and retrieved clinical context to produce an interpretable summary.",
  orchestrator: "LangGraph workflow · FastAPI service · Explainable ML",
  pipeline: [
    { label: "Clinical inputs", note: "patient measurements" },
    { label: "Student model", note: "knowledge distillation" },
    { label: "CFD surrogate", note: "physics-informed features" },
    { label: "ML ensemble", note: "risk estimate + SHAP" },
    { label: "Retrieval", note: "supporting context" },
    { label: "Risk summary", note: "interpretable output" },
  ] as PipelineStep[],
  tags: ["LangGraph", "FastAPI", "SHAP", "OpenFOAM", "ChromaDB", "Python"],
  note: "Active team project; research and integration are ongoing.",
};

export const projects: Project[] = [
  {
    badge: "Live · Tool-calling assistant",
    title: "LangChain AI Assistant",
    blurb:
      "A conversational assistant with persistent session memory and two external tools: Tavily web search and Weatherstack weather lookup. It is deployed on Render with a Streamlit interface and graceful fallbacks when optional API keys are unavailable.",
    tags: ["Python", "LangChain", "Gemini", "Streamlit", "Tavily", "Weatherstack"],
    href: "https://github.com/sxb05/LANGCHAIN_AGENT",
    liveHref: "https://langchain-agent-p2z5.onrender.com/",
  },
  {
    badge: "Learning in public",
    title: "FastAPI Backend Engineering",
    blurb:
      "A public learning repository documenting hands-on practice with Python, FastAPI, PostgreSQL, and backend development fundamentals.",
    tags: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    href: "https://github.com/sxb05/backend-with-fastapi",
  },
];

export const education: EducationEvent[] = [
  {
    when: "2024 – 2028 · Bengaluru",
    title: "Bachelor of Engineering, Medical Electronics — Dayananda Sagar College of Engineering",
    detail: "GPA: 8.0/10. Editor of the department newsletter.",
  },
  {
    when: "In progress",
    title: "Data Structures and Algorithms Specialization — UC San Diego",
    detail: "Strengthening algorithmic problem-solving and core computer science fundamentals.",
  },
  {
    when: "In progress",
    title: "CS50: Introduction to Programming with Python",
    detail: "Building a stronger foundation in Python programming.",
  },
  {
    when: "Coursework / fundamentals",
    title: "AWS Solutions Architect Fundamentals",
    detail: "Cloud architecture fundamentals covering EC2, S3, IAM, VPC, and RDS.",
  },
  {
    when: "2024",
    title: "Infosys Springboard — Programming with C and Working with Excel",
    detail: "Programming fundamentals in C and spreadsheet skills.",
  },
];

export const about = {
  heading: "Building dependable backends and useful AI applications",
  paragraphs: [
    "I'm an engineering student focused on backend and software engineering. I build with Python, FastAPI, PostgreSQL, SQLAlchemy, Docker, and testing/CI workflows, while applying LangChain and LangGraph to AI assistants, retrieval pipelines, and multi-agent applications.",
    "My Medical Electronics background also shapes my interest in healthcare AI. I lead the AI backend for CardioHemo, an ongoing team research project exploring explainable cardiovascular risk assessment with machine learning and physics-informed signals.",
  ],
  facts: [
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Studying", value: "BE, Medical Electronics (2024–2028)" },
    { label: "Focus", value: "Backend engineering · AI applications" },
  ],
};

export const contact = {
  heading: "Let's work together",
  text: "I'm looking for opportunities to build reliable backend services and practical AI products. Feel free to reach out about internships, open-source work, or engineering projects.",
  links: [
    { label: "Email me", href: "mailto:subashbalaji.god@gmail.com", main: true },
    { label: "GitHub", href: "https://github.com/sxb05" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/subashbalaji--/" },
    { label: "LeetCode", href: "https://leetcode.com/u/subashbalaji/" },
    { label: "NeetCode", href: "https://neetcode.io/user/CyberPotara264" },
    { label: "Résumé", href: `${import.meta.env.BASE_URL}resume.pdf` },
  ] as { label: string; href: string; main?: boolean }[],
};
