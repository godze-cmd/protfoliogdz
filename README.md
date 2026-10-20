# R3F Portfolio (React + Vite + React Three Fiber)

## Install & run
    npm install
    npm run dev        # http://localhost:5173
    npm run build && npm run preview

## Edit your content
- Name, bio, email, GitHub/LinkedIn, hero text, services, skills, process: `src/data/site.js`
- Projects: `src/data/projects.js` (images go in `public/projects/`)
- Page title/meta: `index.html`
- Colors/fonts/spacing: CSS variables at the top of `src/styles.css`
- Only add skills you can confirm you have.

## Deploy to Vercel
1. Push the folder to a GitHub repo.
2. vercel.com > Add New Project > import repo. Framework: Vite (auto). Build `npm run build`, output `dist`.
3. Or CLI: `npm i -g vercel && vercel --prod`.

## Contact form
Not connected to a backend. On submit it opens the visitor's email app (mailto). To send for real, replace the mailto line in `src/components/Contact.jsx` with a fetch() to Formspree, EmailJS, etc.

## Troubleshooting
- Blank/black background: open DevTools console; check WebGL at get.webgl.org. The gradient fallback shows when WebGL is off.
- "Multiple instances of Three.js": run `npm ls three`; keep one version.
- Version errors: R3F v8 + drei v9 require React 18. Don't upgrade to React 19 without moving to R3F v9 / drei v10.
- Slow on phones: lower `dpr`, Sparkles `count`, or geometry detail in `src/components/Scene.jsx`.
- Fonts missing offline: they load from Google Fonts; fallbacks are Georgia / system-ui.
- Context lost: refresh; avoid many canvases on one page.

## Testing status
NOT built or run yet (no network in the authoring environment). Needs local `npm install && npm run dev` check.
