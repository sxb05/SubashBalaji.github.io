import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { cardiohemo, featuredProjects, projects } from "../data";
import type { Project } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.2, 0.8, 0.2, 1] as const;
const cards: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <article className="feature">
      <div>
        <span className="badge">
          {String(index).padStart(2, "0")} · {project.badge}
        </span>
        <h3>{project.title}</h3>
        <p className="summary">{project.blurb}</p>
      </div>
      <ul className="hl">
        {project.highlights?.map((h) => (
          <li key={h.slice(0, 28)}>{h}</li>
        ))}
      </ul>
      <ul className="chips">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <a className="link" href={project.href} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </article>
  );
}

export default function Projects() {
  const reduce = !!useReducedMotion();
  const flowRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: pipeline steps light up in sequence as you scroll past
  useEffect(() => {
    const flow = flowRef.current;
    if (reduce || !flow) return;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".step:not(.orch)");
      gsap
        .timeline({
          scrollTrigger: { trigger: flow, start: "top 85%", end: "bottom 55%", scrub: 0.6 },
        })
        .from(".orch", { opacity: 0.3, duration: 0.4 })
        .from(steps, { opacity: 0.2, y: 14, duration: 0.4, stagger: 0.35 });
    }, flow);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="work">
      <div className="wrap">
        <h2>Projects</h2>
        <p className="lede">Multi-agent systems, RAG applications and production-style APIs, starting with the ones I'm proudest of.</p>

        {featuredProjects.map((p, i) => (
          <FeaturedProject key={p.title} project={p} index={i + 1} />
        ))}

        <article className="feature">
          <div>
            <span className="badge">03 · {cardiohemo.badge}</span>
            <h3>{cardiohemo.title}</h3>
            <p className="summary">{cardiohemo.summary}</p>
          </div>
          <div className="flow" ref={flowRef} role="list" aria-label="CardioHemo pipeline">
            <div className="step orch" role="listitem">
              {cardiohemo.orchestrator}
            </div>
            {cardiohemo.pipeline.map((s) => (
              <div className="step" role="listitem" key={s.label}>
                {s.label}
                <small>{s.note}</small>
              </div>
            ))}
          </div>
          <ul className="chips">
            {cardiohemo.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="note">{cardiohemo.note}</p>
        </article>

        <motion.div
          className="grid"
          variants={cards}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((p) => (
            <motion.article
              className="card"
              key={p.title}
              variants={card}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul className="chips">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="link" href={p.href} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
