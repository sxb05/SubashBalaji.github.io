# Subash Balaji S — Portfolio

A personal portfolio built with React, TypeScript and Vite. Motion and GSAP power small interactions; the hero uses the React Bits GradientASCII WebGL2 effect.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Content

Project details, skills, education and contact links live in `src/data.ts`.

## Visual system

- Dark editorial layout with responsive project sections.
- WebGL2 ASCII gradient in the hero, with pointer interaction and reduced-motion handling.
- CSS fallback gradient remains visible when WebGL2 is unavailable.
- Keyboard focus states and reduced-motion CSS support.

## Deployment

GitHub Pages deployment remains configured through `.github/workflows/deploy.yml`. Pushes to `main` trigger the workflow.