import { about } from "../data";
import ParticleGlobe from "./ParticleGlobe";

export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="about-text">
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ParticleGlobe />
      </div>
    </section>
  );
}
