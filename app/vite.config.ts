import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this site from a sub-path because the Vite app lives
  // in the `app/` subdirectory of the repo. Without this, the built CSS/JS
  // would try to load from `/assets/...` and 404.
  base: '/HTTP-3-test-page/app/',
  plugins: [react()],
})
