# Daily Activity Tracker (Vite + React + TS + Tailwind)

A lightweight, offline-friendly daily tracker. Uses React + Vite + TypeScript + Tailwind.

## Prerequisites
- Node.js 18+ and npm
- Git (optional but recommended)

## Project Layout
```
.
├─ public/
│  ├─ pwa-192.png            # App icon (192×192) — add this
│  └─ pwa-512.png            # App icon (512×512) — add this
├─ src/
│  ├─ App.tsx                # Replace placeholder with your canvas code
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.ts
```

## Add your `App.tsx`
1. Open `src/App.tsx`.
2. Replace the placeholder with your real app from the canvas titled **“Daily Activity Tracker”**.
3. Save.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm start` — serve the production build (`vite preview`)

## First run
```bash
npm install
npm run build
npm start
```

---

## ✅ Make it an Installable PWA

This repo is prepared for **vite-plugin-pwa**. Finish enabling it like this:

### 1) Install the plugin
```bash
npm i -D vite-plugin-pwa
```

### 2) Configure Vite
Create or replace **vite.config.ts** with:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Daily Activity Tracker",
        short_name: "Tracker",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});
```

> No manual service worker file is required—the plugin generates and registers it.

### 3) Add icons
Put PNGs in **public/**:
```
public/
  pwa-192.png   (192×192)
  pwa-512.png   (512×512)
```

### 4) Build & preview the production app
```bash
npm run build
npm start
```
Open the preview URL from the terminal.

### 5) Verify installability
- Chrome/Edge: DevTools → **Application** → **Manifest** → should show **Installable**.
- You may also see an **Install** icon in the address bar (or menu → *Install app*).

**Notes**
- PWAs require a secure context. **localhost is treated as secure**, so preview is fine.
- Testing with `npm start` (production preview) best mirrors real deployment.

---

## Deploy
Upload the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, S3/CloudFront).
- For GitHub Pages served from a subpath, set `base` in `vite.config.ts` accordingly (e.g., `base: "/daily-tracker/"`).

---

## Git: connect to your GitHub repo
To push to **https://github.com/Jebula999/daily-tracker**:

```bash
git init
git add -A
git commit -m "init: scaffold daily-tracker"
git branch -M main
git remote add origin https://github.com/Jebula999/daily-tracker.git
git push -u origin main
```

Day-to-day:
```bash
git pull --rebase
git add -A
git commit -m "feat: <what you changed>"
git push
```

---

## Troubleshooting
- **Not installable**: ensure `public/pwa-192.png` and `public/pwa-512.png` exist and `vite.config.ts` is configured as above. Test on the **built** preview (`npm start`).
- **Old assets cached**: refresh the page or close/reopen the installed app; the service worker updates in the background and applies on next load.
- **Text spilling**: ensure all components use Tailwind classes that prevent overflow (e.g., `truncate`, `overflow-hidden`, `break-words`) as the app code does.
