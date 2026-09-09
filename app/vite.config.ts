import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base, so the build does not care what path it is served from.
  //
  // This was previously pinned to a GitHub Pages sub-path ('/HTTP-3-test-page/app/').
  // Vercel serves the site from the ROOT of its own domain, so every bundle and
  // asset URL pointed at a directory that does not exist there.
  //
  // './' emits relative URLs instead, which resolve correctly whether the site
  // is served from a domain root (Vercel), a project sub-path (GitHub Pages),
  // or the local `vite preview`. It also makes import.meta.env.BASE_URL './',
  // which is what the runtime asset paths in src/ are built on.
  base: './',
  plugins: [react()],
})
