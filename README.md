# Portfolio Website v2 — Jean Pierre Izarra

Interactive 3D portfolio and systems architecture laboratory built with React 19, Three.js / React Three Fiber, GSAP, and Vite.

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vite.dev/)
- **3D & Canvas:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei) + [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Animations:** [GSAP](https://gsap.com/) + `@gsap/react`
- **Icons:** [lucide-react](https://lucide.dev/)
- **PWA:** `vite-plugin-pwa`

## Project Structure

```text
├── public/                 # Static public assets
├── src/
│   ├── components/         # UI & 3D scene components (HeroArtifact, NativeDiagram, modals)
│   ├── data/               # Content, portfolio slides, and architecture diagrams data
│   ├── App.tsx             # Main application layout & slide orchestrator
│   ├── main.tsx            # Application entrypoint
│   └── index.css           # Global Tailwind / CSS variables & animations
├── index.html              # HTML shell
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & plugin settings
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

### Production Build

Typecheck and create optimized production bundles:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

