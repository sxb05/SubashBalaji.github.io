import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data";
import GradientASCII from "./GradientASCII";

export default function Hero() {
  const reduce = !!useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-field" aria-hidden="true">
        <GradientASCII
          colors={["#143b70", "#6ea8d7", "#e6f4ff", "#38bdf8"]}
          shape="horizon"
          characters=" .:+=xX8#@"
          cellSize={17}
          density={0.72}
          glyphOpacity={0.72}
          gradientOpacity={0.38}
          glow={0.18}
          flicker={0.08}
          flow={0.26}
          speed={reduce ? 0 : 0.42}
          grain={0.035}
          mouseInteraction={!reduce}
          clickEffect="none"
        />
      </div>
      <div className="wrap hero-inner">
        <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}>
          <p className="eyebrow"><span className="status-dot" /> {profile.eyebrow}</p>
          <h1 id="hero-title">Building systems<br /><span>that ship.</span></h1>
          <p className="role">{profile.role}</p>
          <p className="intro">{profile.intro}</p>
          <div className="cta">
            <a className="btn primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
            <a className="btn" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-meta"><span>Based in Bengaluru, India</span><span>Engineering student · 2024—2028</span></div>
        </motion.div>
        <div className="hero-aside" aria-label="Current engineering interests">
          <span className="aside-label">CURRENT FOCUS / 01</span>
          <div className="focus-line"><span>01</span><div><b>AI Engineering</b><small>agents · RAG · tool workflows</small></div></div>
          <div className="focus-line"><span>02</span><div><b>DevOps & delivery</b><small>containers · CI/CD · cloud</small></div></div>
          <div className="focus-line"><span>03</span><div><b>LLMOps</b><small>evaluation · reliability · cost</small></div></div>
          <a href="https://github.com/sxb05" target="_blank" rel="noreferrer" className="github-line">GITHUB / @sxb05 <span>↗</span></a>
        </div>
      </div>
      <div className="hero-bottom wrap"><span>SELECTED SYSTEMS & BUILDS</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
  );
}
