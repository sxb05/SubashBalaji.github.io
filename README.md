# Subash Balaji S — portfolio (React + TypeScript)

Vite + React 18 + TypeScript. Animation: Motion (`motion/react`) and GSAP + ScrollTrigger.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
```

## Edit content
Everything you'll change is in `src/data.ts` (projects, links, education, text).
Colours are CSS variables at the top of `src/styles.css`.
Put your résumé PDF at `public/resume.pdf`.

## Deploy to GitHub Pages
1. Create a repo named `<your-username>.github.io` and push this folder to `main`.
2. In the repo: Settings → Pages → Source → **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push.
