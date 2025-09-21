// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: { host: true, port: 5173 },
  preview: {
    host: true,
    port: 4173,
    https: false,
    allowedHosts: ["tracker.jebula.co.za"],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // The manifest below is what the browser reads to “install” your app
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
        ],
		screenshots: [
		  { src: '/mobile-720x1280.png', sizes: '720x1280', type: 'image/png' },
		  { src: '/desktop-1280x720.png', sizes: '1280x720', type: 'image/png', form_factor: 'wide' }
		]
      }
    })
  ]
});
