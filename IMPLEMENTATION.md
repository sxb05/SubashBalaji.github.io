# Portfolio enhancements (content design preserved)

## Files included

- `src/components/Projects.tsx`: adds distinct, accessible **Live Demo** and **Source Code** links using the site's existing `.feature`, `.card`, `.link`, and `.chips` visual language. It uses the existing `href` and optional `liveHref` fields in `src/data.ts`.
- `src/styles.css`: includes the existing stylesheet plus append-only accessibility improvements for keyboard focus, low-contrast status text, project links, and reduced-motion preferences.
- `check-resume.ps1`: verifies the local resume source, built asset, and optionally the deployed URL.

## Apply

Copy `src/components/Projects.tsx` and `src/styles.css` into the matching locations in your repository. These preserve the site's existing CSS class-based design and do not introduce a new design system. `src/data.ts` should already contain `liveHref?: string` and live URLs for projects with demos; don't replace it with an older data file.

Then run from the repository root:

```powershell
npm run build
.\check-resume.ps1
```

## Resume status

The portfolio's current data points to `${import.meta.env.BASE_URL}resume.pdf`, which is the right Vite pattern for a file located at `public/resume.pdf`. I could not verify that `public/resume.pdf` exists in the files available to me. The check script deliberately fails if that PDF is missing instead of creating or publishing an outdated placeholder. Put your latest resume PDF at `public/resume.pdf`, then build and check again. Once the site deploys, run:

```powershell
.\check-resume.ps1 -SiteUrl "https://YOUR-ACTUAL-PAGES-URL/resume.pdf"
```

## Accessibility note

The stylesheet respects `prefers-reduced-motion` for CSS-driven transitions, animations, and smooth scrolling. Custom canvas animations driven by JavaScript requestAnimationFrame loops also need a `matchMedia('(prefers-reduced-motion: reduce)')` check in their animation components; their implementation source was not available in this edit package, so those loops are not claimed to be fully disabled by this CSS alone.
