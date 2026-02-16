# Belgrade Office Tour

An interactive 3D virtual tour of the Optimal Systems office in Belgrade — **a Kyocera Group company**.

Explore the space in the browser: switch between room views, read short descriptions, and zoom in and out. Built with Three.js and Vite.

---

## Features

- **12 predefined views** — Bird's-eye overview plus rooms (Rest Room, QA, Sparrow, Kookaburra, Guest Office, Kitchen, Conference, Admin, Director, POs, AI)
- **Sidebar navigation** — Jump to any room; active view is highlighted
- **Room descriptions** — Title and short copy per location
- **Scroll to explore** — Scroll hint and smooth transitions
- **Zoom controls** — In/out from the sidebar
- **Loading screen** — Progress bar while assets load
- **Responsive UI** — Layout adapts to different screen sizes

---

## Tech stack

| Category      | Technology |
|---------------|------------|
| 3D / rendering| [Three.js](https://threejs.org/) (r148) |
| Physics       | [cannon-es](https://github.com/pmndrs/cannon-es) |
| Animations    | [GSAP](https://greensock.com/gsap/) |
| Build / dev   | [Vite](https://vitejs.dev/) 4.x |
| Fonts         | [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts) |
| Icons         | Font Awesome |

---

## Project structure

```
office-tour/
├── src/
│   ├── index.html          # Entry HTML
│   ├── script.js           # App entry, creates Experience
│   ├── style.css           # Global and component styles
│   ├── experience/         # Core 3D experience
│   │   ├── experience.js   # Main singleton (scene, camera, renderer, world)
│   │   ├── camera.js
│   │   ├── renderer.js
│   │   ├── world/          # Scene content (office, UI, cones)
│   │   ├── assets/         # View config (views.js), sources (sources.js)
│   │   └── utils/          # Sizes, time, resources, event emitter
│   └── fonts/
├── static/                  # Public assets (models, textures, etc.)
├── dist/                    # Production build output (generated)
├── vite.config.js
├── vercel.json              # Vercel deployment config
└── package.json
```

---

## Prerequisites

- **Node.js** 18+ (recommended: LTS from [nodejs.org](https://nodejs.org/en/download/))

---

## Setup and run

```bash
# Clone the repository (if not already)
git clone <repository-url>
cd office-tour

# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev
```

---

## Build

```bash
# Production build → output in dist/
npm run build
```

Serve the `dist/` folder with any static host to run the tour in production.

---

## Deployment (Vercel)

The project is set up for [Vercel](https://vercel.com):

1. Push the repo to GitHub / GitLab / Bitbucket.
2. In Vercel: **Add New** → **Project** → import this repository.
3. Use the defaults (or ensure **Build Command**: `npm run build`, **Output Directory**: `dist`).
4. Deploy.

Config is defined in `vercel.json` (build command, output directory, SPA rewrites).

---

## License

Private — Optimal Systems | a Kyocera Group company.
