// @ts-check
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Absolute, so imports that climb out of this project root resolve the same
// way in dev and in the rollup build.
const appSrc = fileURLToPath(new URL('../app/src', import.meta.url))

/**
 * The pilot deliberately shares ../app/src rather than copying it.
 *
 * The question this answers is "can the existing components ship as static
 * HTML without being rewritten", and a forked copy could not answer it — it
 * would drift, and every difference would be arguable. Both builds compile the
 * same files; only the renderer differs.
 */
export default defineConfig({
  // Same asset tree as the SPA. Nothing is duplicated into astro/public.
  publicDir: '../app/public',

  integrations: [react()],

  vite: {
    resolve: {
      alias: { '@app': appSrc },
    },
    server: {
      // The React source lives outside this project root, so the dev server
      // has to be told it may read it. Build has no such restriction.
      fs: { allow: ['..'] },
    },
  },
})
