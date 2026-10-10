import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ArtController } from "../lib/topography";

/** Print-style WebGL artwork for the hero. three.js is loaded on demand. */
export default function TopographyArt() {
  const reduce = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctlRef = useRef<ArtController | null>(null);
  const pausedRef = useRef(reduce);
  const [paused, setPaused] = useState(reduce);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPaused(reduce);
  }, [reduce]);

  useEffect(() => {
    pausedRef.current = paused;
    ctlRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    let cancelled = false;
    let ctl: ArtController | null = null;
    (async () => {
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;
      const mod = await import("../lib/topography");
      if (cancelled) return;
      ctl = mod.createTopography(stage, canvas, pausedRef.current);
      if (!ctl) {
        setFailed(true);
        return;
      }
      ctlRef.current = ctl;
    })();
    return () => {
      cancelled = true;
      ctl?.dispose();
      ctlRef.current = null;
    };
  }, []);

  return (
    <div className="art" ref={stageRef}>
      {failed ? (
        <div className="art-fallback" aria-hidden="true">
          <span />
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="A red sphere with blue grain floats above a dark sphere. Fine blue contours rise from its changing surface and turn red over taupe halftone columns."
          />
          <button
            className="pause"
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play animation" : "Pause animation"}
          >
            {paused ? "Play" : "Pause"}
          </button>
        </>
      )}
    </div>
  );
}
