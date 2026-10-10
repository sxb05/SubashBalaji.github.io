import * as THREE from "three";
import { animate, motionValue } from "motion";

export interface ParticleController {
  hold(): void;
  release(): void;
  setVisible(visible: boolean): void;
  dispose(): void;
}

const COLUMNS = 170;
const SOURCE = COLUMNS * 2;

/** The "photograph" the particles form: a small print-style poster drawn on a 2D canvas. */
async function drawPoster(): Promise<Uint8ClampedArray | null> {
  try {
    await document.fonts.load('800 40px "Bricolage Grotesque"');
  } catch {
    /* fall back to the system font */
  }
  const c = document.createElement("canvas");
  c.width = SOURCE;
  c.height = SOURCE;
  const g = c.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  const W = SOURCE;

  g.fillStyle = "#0b0c0a";
  g.fillRect(0, 0, W, W);

  g.fillStyle = "#b6ada1"; // taupe halftone block, top right
  for (let y = 16; y < W * 0.46; y += 14) {
    for (let x = W * 0.58; x < W - 16; x += 14) {
      g.beginPath();
      g.arc(x, y, 4.2, 0, Math.PI * 2);
      g.fill();
    }
  }

  g.strokeStyle = "#82b3d6"; // blue contour lines, lower half
  g.lineWidth = 2.4;
  for (let i = 0; i < 18; i++) {
    const x0 = W * 0.1 + i * (W * 0.045);
    g.beginPath();
    let first = true;
    for (let y = W * 0.55; y <= W * 0.97; y += 6) {
      const x = x0 + Math.sin(y * 0.045 + i * 0.5) * (6 + (y - W * 0.55) * 0.06);
      if (first) {
        g.moveTo(x, y);
        first = false;
      } else {
        g.lineTo(x, y);
      }
    }
    g.stroke();
  }

  g.fillStyle = "#ff3c30"; // red sphere with initials
  g.beginPath();
  g.arc(W * 0.32, W * 0.3, W * 0.2, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#0b0c0a";
  g.font = `800 ${Math.round(W * 0.2)}px "Bricolage Grotesque", system-ui, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("SB", W * 0.32, W * 0.31);

  return g.getImageData(0, 0, W, W).data;
}

const VERTEX = /* glsl */ `
  uniform float uGlobe;
  uniform float uTime;
  uniform float uSize;
  attribute vec3 aGlobe;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aSpeed;
  varying vec3 vColor;
  void main() {
    vec3 turb = vec3(
      sin(uTime * (aSpeed + 0.6) + aPhase) * 0.045,
      cos(uTime * (aSpeed + 0.37) + aPhase * 1.71) * 0.035,
      sin(uTime * (aSpeed + 0.22) + aPhase * 2.13) * 0.045
    );
    vec3 p = mix(position, aGlobe + turb, uGlobe);
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize;
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export async function createParticleGlobe(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  reduce: boolean
): Promise<ParticleController | null> {
  const pixels = await drawPoster();
  if (!pixels) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);

  const count = COLUMNS * COLUMNS;
  const imagePositions = new Float32Array(count * 3);
  const globePositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);

  const half = 0.9;
  const radius = 0.6;
  const tilt = -0.28;
  const yaw = Math.random() * Math.PI * 2;
  const yawCos = Math.cos(yaw);
  const yawSin = Math.sin(yaw);

  for (let index = 0; index < count; index++) {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const sx = Math.min(SOURCE - 1, Math.floor(((column + 0.5) / COLUMNS) * SOURCE));
    const sy = Math.min(SOURCE - 1, Math.floor(((row + 0.5) / COLUMNS) * SOURCE));
    const pixel = (sy * SOURCE + sx) * 4;
    const o = index * 3;

    colors[o] = pixels[pixel] / 255;
    colors[o + 1] = pixels[pixel + 1] / 255;
    colors[o + 2] = pixels[pixel + 2] / 255;
    phases[index] = Math.random() * Math.PI * 2;
    speeds[index] = 0.7 + Math.random() * 0.35;

    imagePositions[o] = ((column + 0.5) / COLUMNS - 0.5) * half * 2;
    imagePositions[o + 1] = (0.5 - (row + 0.5) / COLUMNS) * half * 2;
    imagePositions[o + 2] = 0;

    // Fibonacci sphere, spun by a random yaw and tilted toward the viewer
    const sphereY = 1 - (index / Math.max(count - 1, 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
    const angle = index * 2.39996323;
    const sphereX = Math.cos(angle) * ring;
    const sphereZ = Math.sin(angle) * ring;
    const spunX = sphereX * yawCos + sphereZ * yawSin;
    const spunZ = -sphereX * yawSin + sphereZ * yawCos;
    globePositions[o] = spunX * radius;
    globePositions[o + 1] = (sphereY * Math.cos(tilt) - spunZ * Math.sin(tilt)) * radius;
    globePositions[o + 2] = (sphereY * Math.sin(tilt) + spunZ * Math.cos(tilt)) * radius;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(imagePositions, 3));
  geometry.setAttribute("aGlobe", new THREE.BufferAttribute(globePositions, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

  const uniforms = {
    uGlobe: { value: 1 },
    uTime: { value: 0 },
    uSize: { value: 3 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    depthTest: false,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  const scene = new THREE.Scene();
  scene.add(points);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 4;

  const t0 = performance.now();
  const render = () => {
    uniforms.uTime.value = reduce ? 0 : (performance.now() - t0) / 1000;
    renderer.render(scene, camera);
  };

  const resize = () => {
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    const dpr = Math.min(window.devicePixelRatio, 2);
    const aspect = width / height;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
    // one particle = one cell of the poster grid, rounded up so the image has no gaps
    const cellPx = ((half * 2) / COLUMNS) * (height / 2) * dpr;
    uniforms.uSize.value = Math.max(1, Math.ceil(cellPx * 1.04));
    render();
  };

  // One Motion value drives the morph: 1 = globe, 0 = poster
  const globeValue = motionValue(1);
  const unsubscribe = globeValue.on("change", (v: number) => {
    uniforms.uGlobe.value = v;
  });
  let controls: { stop(): void } | null = null;
  const moveTo = (target: number, stiffness: number, damping: number, mass: number, delay = 0) => {
    controls?.stop();
    controls = null;
    if (reduce) {
      globeValue.set(target);
      render();
    } else {
      controls = animate(globeValue, target, { type: "spring", stiffness, damping, mass, delay });
    }
  };

  let visible = false;
  let started = false;
  let raf = 0;
  const tick = () => {
    render();
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    const run = visible && !document.hidden;
    if (run && !raf) {
      raf = requestAnimationFrame(tick);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      render();
    }
  };

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  document.addEventListener("visibilitychange", sync);
  resize();

  return {
    hold() {
      moveTo(1, 120, 18, 0.9);
    },
    release() {
      moveTo(0, 70, 16, 1);
    },
    setVisible(next: boolean) {
      visible = next;
      if (next && !started) {
        started = true;
        moveTo(0, 55, 16, 1, 0.5); // the poster assembles itself the first time it scrolls into view
      }
      sync();
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      controls?.stop();
      unsubscribe();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
