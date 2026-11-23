import { cardiohemo, featuredProjects, projects } from "../data";
import type { Project } from "../data";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <nav className="project-links" aria-label={`Links for ${project.title}`}>
      {project.liveHref && <a href={project.liveHref} target="_blank" rel="noopener noreferrer">Live application <span>↗</span></a>}
      <a href={project.href} target="_blank" rel="noopener noreferrer">Source code <span>↗</span></a>
    </nav>
  );
}

export default function Projects() {
  return (
    <section id="work" className="work-section" aria-labelledby="projects-heading">
      <div className="wrap">
        <div className="section-heading">
          <div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="projects-heading">Things I’ve built<span>.</span></h2></div>
          <p className="lede">A selection of deployed applications and research work. I focus on the engineering underneath the interface.</p>
        </div>
        {featuredProjects.map((project, index) => (
          <article className={`feature feature-${index + 1}`} key={project.title}>
            <div className="feature-top"><span className="badge">{project.badge}</span><span className="feature-index">0{index + 1} / 0{featuredProjects.length}</span></div>
            <div className="feature-main">
              <div><h3>{project.title}</h3><p className="summary">{project.blurb}</p></div>
              <div className="project-detail">
                <p className="detail-label">WHAT IT DOES / ENGINEERING NOTES</p>
                <ul className="hl">{project.highlights?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <ul className="chips">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <ProjectLinks project={project} />
          </article>
        ))}
        <article className="feature research-feature">
          <div className="feature-top"><span className="badge">{cardiohemo.badge}</span><span className="feature-index">RESEARCH / 03</span></div>
          <div className="feature-main">
            <div><h3>{cardiohemo.title}</h3><p className="summary">{cardiohemo.summary}</p></div>
            <div className="project-detail"><p className="detail-label">RESEARCH PIPELINE / IN PROGRESS</p>
              <div className="flow"><div className="step orch">{cardiohemo.orchestrator}</div>{cardiohemo.pipeline.map(step => <div className="step" key={step.label}><b>{step.label}</b><small>{step.note}</small></div>)}</div>
              <p className="note">{cardiohemo.note}</p>
            </div>
          </div>
          <ul className="chips">{cardiohemo.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </article>
        <div className="other-work">
          <p className="eyebrow">MORE BUILDS</p>
          <div className="grid">{projects.map(project => <article className="card" key={project.title}>
            <span className="status">{project.badge}</span><h3>{project.title}</h3><p>{project.blurb}</p>
            <ul className="chips">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><ProjectLinks project={project} />
          </article>)}</div>
        </div>
      </div>
    </section>
  );
}
