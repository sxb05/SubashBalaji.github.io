import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { profile } from "../data";
import TopographyArt from "./TopographyArt";

const ease = [0.2, 0.8, 0.2, 1] as const;

const letters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotate: 6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const reduce = !!useReducedMotion();
  const lift = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.9 + i * 0.1, duration: 0.6, ease },
        };

  return (
    <div className="hero">
      <div className="wrap">
        <div className="copy">
          <motion.h1
            aria-label={profile.name}
            variants={letters}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            {profile.name.split(" ").map((word, wi, words) => (
              <span key={wi}>
                <span className="w" aria-hidden="true">
                  {[...word].map((ch, ci) => (
                    <motion.span className="c" key={ci} variants={letter}>
                      {ch}
                    </motion.span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </motion.h1>

          <motion.p className="role" {...lift(0)}>
            {profile.role}
          </motion.p>

          <motion.div className="cta" {...lift(1)}>
            <a className="btn primary" href="#work">
              See my projects
            </a>
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div className="art-wrap" {...lift(2)}>
          <TopographyArt />
        </motion.div>
      </div>
    </div>
  );
}
