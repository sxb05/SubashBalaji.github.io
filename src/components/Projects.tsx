import { cardiohemo, featuredProjects, projects } from "../data";
import type { Project } from "../data";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <nav className="project-links" aria-label={`Links for ${project.title}`}>
      {project.liveHref && (
        <a
          className="link project-link"
          href={project.liveHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live demo for ${project.title} in a new tab`}
        >
          Live Demo <span aria-hidden="true">↗</span>
        </a>
      )}
      <a
        className="link project-link"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View the source code for ${project.title} on GitHub in a new tab`}
      >
        Source Code <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="projects-heading">
      <div className="wrap">
        <h2 id="projects-heading">Selected Work</h2>
        <p className="lede">
          Backend engineering, document-aware AI, and multi-agent workflows built through hands-on projects.
        </p>

        {featuredProjects.map((project) => (
          <article className="feature" key={project.title}>
            <div>
              {project.badge && <span className="badge">{project.badge}</span>}
              <h3>{project.title}</h3>
              <p className="summary">{project.blurb}</p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="hl" aria-label={`${project.title} highlights`}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            <ul className="chips" aria-label={`${project.title} technologies`}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <ProjectLinks project={project} />
          </article>
        ))}

        <article className="feature" aria-labelledby="cardiohemo-heading">
          <div>
            <span className="badge">{cardiohemo.badge}</span>
            <h3 id="cardiohemo-heading">{cardiohemo.title}</h3>
            <p className="summary">{cardiohemo.summary}</p>
          </div>

          <div className="flow" aria-label="CardioHemo planned inference workflow">
            <div className="step orch">
              <span>{cardiohemo.orchestrator}</span>
            </div>
            {cardiohemo.pipeline.map((step) => (
              <div className="step" key={step.label}>
                <span>{step.label}</span>
                <small>{step.note}</small>
              </div>
            ))}
          </div>

          <ul className="chips" aria-label="CardioHemo technologies">
            {cardiohemo.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="note">{cardiohemo.note}</p>
        </article>

        <div className="grid" aria-label="Additional projects">
          {projects.map((project) => (
            <article className="card" key={project.title}>
              {project.badge && <span className="status">{project.badge}</span>}
              <h3>{project.title}</h3>
              <p>{project.blurb}</p>
              <ul className="chips" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <ProjectLinks project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
