import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "motion/react";

/** PQRST approximation: t in 0..1 over one beat, returns roughly -0.3..1 */
function beat(t: number): number {
  const g = (m: number, s: number, a: number) => a * Math.exp(-Math.pow((t - m) / s, 2));
  return g(0.16, 0.025, 0.14) + g(0.3, 0.008, -0.16) + g(0.33, 0.012, 1) + g(0.36, 0.01, -0.3) + g(0.6, 0.05, 0.28);
}

export default function EcgMonitor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bpmRef = useRef(72);
  const [bpm, setBpm] = useState(72);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const speed = 140;
    let W = 0;
    let H = 0;
    let x = 0;
    let phase = 0;
    let lastY: number | null = null;
    let last = 0;
    let raf = 0;

    const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const yFor = (v: number) => H * 0.62 - v * H * 0.42;

    const grid = () => {
      ctx.save();
      ctx.strokeStyle = css("--line");
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      grid();
      ctx.strokeStyle = css("--trace") || "#d81b60";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      const period = W / 4;
      for (let i = 0; i <= W; i++) {
        const y = yFor(beat((i % period) / period));
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
    };

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      x = 0;
      lastY = null;
      ctx.clearRect(0, 0, W, H);
      grid();
      if (reduce) drawStatic();
    };

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      const dx = speed * dt;
      const steps = Math.max(1, Math.ceil(dx));
      const sx = dx / steps;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let s = 0; s < steps; s++) {
        phase += sx / speed / (60 / bpmRef.current);
        if (phase >= 1) phase -= 1;
        const y = yFor(beat(phase));
        const nx = x + sx;
        // erase a gap ahead of the pen, like a bedside monitor
        ctx.clearRect(nx + 2, 0, 26, H);
        ctx.save();
        ctx.beginPath();
        ctx.rect(nx + 2, 0, 26, H);
        ctx.clip();
        grid();
        ctx.restore();
        ctx.strokeStyle = css("--trace") || "#d81b60";
        if (lastY !== null) {
          ctx.beginPath();
          ctx.moveTo(x, lastY);
          ctx.lineTo(nx, y);
          ctx.stroke();
        }
        lastY = y;
        x = nx;
        if (x >= W) {
          x = 0;
          lastY = null;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  // pointer position nudges the heart rate between 60 and 110 bpm
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const next = Math.round(60 + 50 * ratio);
    bpmRef.current = next;
    setBpm(next);
  };

  return (
    <div className="monitor bottom" ref={wrapRef} onPointerMove={onMove} aria-hidden="true">
      <span className="tag">Medical Electronics × AI</span>
      <span className="readout">
        HR <b>{bpm}</b> bpm
      </span>
      <canvas ref={canvasRef} />
    </div>
  );
}
