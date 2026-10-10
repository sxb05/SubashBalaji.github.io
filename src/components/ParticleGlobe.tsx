import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";
import type { ParticleController } from "../lib/particles";

/** Particles form a small poster; press and hold to pull them into a globe. */
export default function ParticleGlobe() {
  const reduce = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctlRef = useRef<ParticleController | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let ctl: ParticleController | null = null;
    let io: IntersectionObserver | null = null;
    (async () => {
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;
      const mod = await import("../lib/particles");
      if (cancelled) return;
      const created = await mod.createParticleGlobe(stage, canvas, reduce);
      if (cancelled) {
        created?.dispose();
        return;
      }
      if (!created) {
        setFailed(true);
        return;
      }
      ctl = created;
      ctlRef.current = created;
      io = new IntersectionObserver(([entry]) => created.setVisible(entry.isIntersecting), { threshold: 0.25 });
      io.observe(stage);
    })();
    return () => {
      cancelled = true;
      io?.disconnect();
      ctl?.dispose();
      ctlRef.current = null;
    };
  }, [reduce]);

  const hold = () => ctlRef.current?.hold();
  const release = () => ctlRef.current?.release();
  const onKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      hold();
    }
  };
  const onKeyUp = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === " " || e.key === "Enter") release();
  };

  if (failed) return null;

  return (
    <div className="about-side">
      <div className="globe" ref={stageRef}>
        <canvas
          ref={canvasRef}
          role="button"
          tabIndex={0}
          aria-label="Hold to form a particle globe"
          onPointerDown={hold}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={release}
        />
      </div>
      <p className="globe-hint">Press and hold to pull the particles into a globe.</p>
    </div>
  );
}
