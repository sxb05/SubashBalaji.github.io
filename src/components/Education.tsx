import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { education } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const reduce = !!useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: the red line draws down the timeline with scroll
  useEffect(() => {
    const el = timelineRef.current;
    if (reduce || !el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="path">
      <div className="wrap">
        <h2>Education and learning</h2>
        <p className="lede">A degree in biomedical hardware, plus self-directed study in software engineering.</p>
        <div className="timeline" ref={timelineRef}>
          <div className="tl-fill" aria-hidden="true" />
          {education.map((e) => (
            <div className="event" key={e.title}>
              <span className="when">{e.when}</span>
              <h3>{e.title}</h3>
              <p>{e.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
