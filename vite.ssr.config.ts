import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * Config for the build-time prerenderer.
 *
 * It is deliberately minimal: the server bundle only has to render React to a
 * string, so it skips the Tailwind plugin and the image optimiser (both of
 * which would otherwise repeat work the client build already did).
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.prerender',
    emptyOutDir: true,
    minify: false,
    target: 'node20',
  },
});
