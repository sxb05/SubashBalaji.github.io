import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
