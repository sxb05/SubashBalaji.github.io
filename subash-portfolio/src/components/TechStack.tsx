import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { stackGroups } from "../data";

const ease = [0.2, 0.8, 0.2, 1] as const;

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const group: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, staggerChildren: 0.04, delayChildren: 0.2 } },
};
const tile: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

const monogram = (name: string) => name.replace(/[^A-Za-z]/g, "").slice(0, 2);

export default function TechStack() {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const names = stackGroups.flatMap((g) => g.items);
  const loop = reduce ? names : [...names, ...names]; // duplicated so the -50% shift loops seamlessly

  // GSAP: endless marquee that eases to a stop on hover
  useEffect(() => {
    const track = trackRef.current;
    if (reduce || !track) return;
    const tween = gsap.to(track, { xPercent: -50, duration: 34, ease: "none", repeat: -1 });
    const wrap = track.parentElement as HTMLElement;
    const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
    wrap.addEventListener("pointerenter", slow);
    wrap.addEventListener("pointerleave", resume);
    return () => {
      wrap.removeEventListener("pointerenter", slow);
      wrap.removeEventListener("pointerleave", resume);
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduce]);

  return (
    <section id="stack">
      <div className="wrap">
        <h2>Tech stack</h2>
        <p className="lede">The tools I use to build agent systems, services and the data layers under them.</p>

        <div className="marquee" aria-hidden="true">
          <div className="track" ref={trackRef}>
            {loop.map((n, i) => (
              <span key={`${n}-${i}`}>{n}</span>
            ))}
          </div>
        </div>

        <motion.div
          className="stack-grid"
          variants={grid}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {stackGroups.map((g) => (
            <motion.div className="group" key={g.title} variants={group}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={tile}
                    whileHover={reduce ? undefined : { y: -3 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  >
                    <span className="mono" aria-hidden="true">
                      {monogram(item)}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
