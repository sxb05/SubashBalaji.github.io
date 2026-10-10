import * as THREE from "three";
import { animate } from "motion";

export interface ArtController {
  setPaused(paused: boolean): void;
  dispose(): void;
}

const FALLBACK_BG: [number, number, number] = [0.714, 0.678, 0.631];

function parseHex(value: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return FALLBACK_BG;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const VERTEX = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Four print layers in one fragment shader: black ink, taupe halftone columns,
// a spherical longitude field that rises into a plume, and a shaded red sphere.
// uBg is the page background, so the poster sits on the page in both themes.
const FRAGMENT = /* glsl */ `
  uniform vec2 resolution;
  uniform float phase;
  uniform vec3 uBg;
  uniform float redX, redY, redRadius, blueShade;
  uniform float dotSize, leftWidth, rightWidth, columnBottom;
  uniform float lowerY, lowerRadius, density, lineWidth, distortion;
  uniform float overlayX, overlayTop, overlayWidth, overlayHeight, overlayStrength;
  const vec3 TAUPE = vec3(0.714, 0.678, 0.631);
  const vec3 BLACK = vec3(0.025, 0.031, 0.027);
  const vec3 BLUE = vec3(0.51, 0.70, 0.84);
  const vec3 RED = vec3(1.0, 0.235, 0.19);

  float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * 0.1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float weight = 0.5;
    mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      value += weight * noise(p);
      p = turn * p * 2.03 + 7.1;
      weight *= 0.5;
    }
    return value;
  }

  void main() {
    float scale = min(resolution.y * 0.49, resolution.x * 0.94);
    vec2 p = (gl_FragCoord.xy - resolution * 0.5) / scale;
    float pixel = 1.0 / scale;
    float grain = hash(floor(gl_FragCoord.xy));
    vec3 color = uBg;
    float paper = step(abs(p.x), 0.49) * step(abs(p.y), 0.98);

    if (paper > 0.0) {
      color = BLACK;
      float leftColumn = step(-0.465, p.x) * step(p.x, -0.465 + leftWidth);
      float rightColumn = step(0.465 - rightWidth, p.x) * step(p.x, 0.465);
      float columns = (leftColumn + rightColumn)
        * step(p.y, 0.98) * step(columnBottom, p.y);
      vec2 cell = fract(gl_FragCoord.xy / dotSize) - 0.5;
      float dots = 1.0 - smoothstep(0.35, 0.49, length(cell));
      color = mix(color, TAUPE, columns * dots);

      vec2 drift = vec2(cos(phase), sin(phase)) * 0.65;
      float y = (p.y - lowerY) / lowerRadius;
      float rise = smoothstep(-0.05, 0.95, y);
      float warp = (fbm(vec2(p.x * 3.2, p.y * 2.8) + drift) - 0.5) * distortion;
      float fine = (fbm(vec2(p.x * 7.0, p.y * 5.0) - drift) - 0.5) * distortion;
      float sphereWidth = lowerRadius * sqrt(max(0.0, 1.0 - min(y, 0.0) * min(y, 0.0)));
      float width = sphereWidth + rise * (0.035 + 0.035 * sin(p.y * 8.0 + warp * 3.0));
      float x = p.x + (warp * 0.20 + fine * 0.025) * smoothstep(-1.0, 0.6, y);
      x += rise * distortion * (0.055 * sin(p.y * 7.0 + drift.x) + 0.025 * sin(p.y * 16.0 + drift.y));
      float nx = x / max(width, 0.001);
      float body = 1.0 - smoothstep(0.98, 1.0, abs(nx));
      body *= smoothstep(-1.02, -0.96, y);
      float longitude = asin(clamp(nx, -0.999, 0.999));
      float latitude = asin(clamp(y, -0.999, 0.999));
      float field = longitude * density + warp * (2.0 + rise * 2.0)
        + fine * 0.6 + (1.0 - rise) * latitude * 4.0;

      float distanceToLine = abs(fract(field) - 0.5);
      float aa = min(fwidth(field) * 0.65, 0.20);
      float lines = 1.0 - smoothstep(lineWidth, lineWidth + aa, distanceToLine);
      float nz = sqrt(max(0.0, 1.0 - nx * nx - y * y));
      float light = clamp(0.3 - nx * 0.45 + nz * 0.35 + y * 0.3, 0.0, 1.0);
      float stipple = smoothstep(grain - 0.12, grain + 0.12, light);
      float fade = mix(stipple * light, 0.90, rise);
      float rim = pow(max(nx, 0.0), 10.0)
        * smoothstep(-1.0, -0.8, y)
        * (1.0 - smoothstep(-0.1, 0.18, y));
      fade = max(fade, rim * 0.32 * (0.65 + 0.35 * step(grain, 0.65)));
      fade *= 1.0 - smoothstep(0.65, 1.1, p.y);
      vec3 contourInk = mix(BLUE, RED, columns);
      color = mix(color, contourInk, lines * body * fade);

      vec2 sphere = (p - vec2(redX, redY)) / redRadius;
      float radius = length(sphere);
      float cover = 1.0 - smoothstep(1.0 - pixel / redRadius, 1.0, radius);
      if (cover > 0.0) {
        vec3 normal = vec3(sphere, sqrt(max(0.0, 1.0 - radius * radius)));
        float shade = max(0.0, dot(normal, normalize(vec3(-0.65, 0.85, 0.35))));
        float blueInk = step(grain, pow(shade, 4.0) * blueShade + 0.035);
        vec3 sphereColor = mix(RED, BLUE, blueInk);
        color = mix(color, sphereColor, cover);
      }

      float strip = smoothstep(overlayX, overlayX + pixel, p.x)
        * (1.0 - smoothstep(overlayX + overlayWidth - pixel, overlayX + overlayWidth, p.x))
        * (1.0 - smoothstep(overlayTop - pixel, overlayTop, p.y));
      float stripProgress = clamp((p.y - (overlayTop - overlayHeight)) / overlayHeight, 0.0, 1.0);
      float redFade = smoothstep(0.0, 0.85, stripProgress);
      float redGrain = smoothstep(grain - 0.08, grain + 0.08, redFade);
      float redOpacity = strip * redGrain * redFade * overlayStrength;
      vec3 redOverprint = 1.0 - (1.0 - color) * (1.0 - RED);
      color = mix(color, redOverprint, redOpacity);
    }
    color *= 0.97 + grain * 0.06;
    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Returns null when WebGL is unavailable so the caller can show a fallback.
 * Motion's animate() drives the shader's `phase` uniform (a 90s seamless loop).
 */
export function createTopography(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  startPaused: boolean
): ArtController | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  } catch {
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;

  const bg = new THREE.Vector3();
  const uniforms = {
    resolution: { value: new THREE.Vector2() },
    phase: { value: 0 },
    uBg: { value: bg },
    redX: { value: 0.075 },
    redY: { value: 0.49 },
    redRadius: { value: 0.285 },
    blueShade: { value: 0.92 },
    dotSize: { value: 7 },
    leftWidth: { value: 0.18 },
    rightWidth: { value: 0.285 },
    columnBottom: { value: 0.06 },
    lowerY: { value: -0.48 },
    lowerRadius: { value: 0.365 },
    density: { value: 22 },
    lineWidth: { value: 0.065 },
    distortion: { value: 1 },
    overlayX: { value: -0.28 },
    overlayTop: { value: -0.56 },
    overlayWidth: { value: 0.055 },
    overlayHeight: { value: 0.48 },
    overlayStrength: { value: 1 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));

  const readBg = () => {
    const [r, g, b] = parseHex(getComputedStyle(document.documentElement).getPropertyValue("--bg"));
    bg.set(r, g, b);
  };
  readBg();

  const animation = animate(0, Math.PI * 2, {
    duration: 90,
    ease: "linear",
    repeat: Infinity,
    onUpdate: (value: number) => {
      uniforms.phase.value = value;
    },
  });

  let paused = startPaused;
  let inView = true;
  let raf = 0;

  const render = () => renderer.render(scene, camera);
  const tick = () => {
    render();
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    const run = !paused && inView && !document.hidden;
    if (run) {
      animation.play();
      if (!raf) raf = requestAnimationFrame(tick);
    } else {
      animation.pause();
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      render();
    }
  };

  const resize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(stage.clientWidth, stage.clientHeight, false);
    renderer.getDrawingBufferSize(uniforms.resolution.value);
    render();
  };

  const onTheme = () => {
    readBg();
    render();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  intersection.observe(stage);
  const themeObserver = new MutationObserver(onTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  scheme.addEventListener("change", onTheme);
  document.addEventListener("visibilitychange", sync);

  resize();
  sync();

  return {
    setPaused(next: boolean) {
      paused = next;
      sync();
    },
    dispose() {
      animation.stop();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", onTheme);
      document.removeEventListener("visibilitychange", sync);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
