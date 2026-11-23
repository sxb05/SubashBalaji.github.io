import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { education } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const reduce = !!useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (reduce || !el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-fill", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
      });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="path">
      <div className="wrap">
        <div className="section-heading">
          <div><p className="eyebrow">03 / BACKGROUND</p><h2>Learning by building<span>.</span></h2></div>
          <p className="lede">Medical electronics engineering alongside self-directed study in software and infrastructure.</p>
        </div>
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
