import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      // Raster images are owned by scripts/optimize-images.mjs (resize + mozjpeg + AVIF/WebP).
      // Re-encoding them here at q75 always produced larger files than the originals and was
      // skipped, so this plugin is limited to SVGs.
      exclude: /\.(?:jpe?g|png)$/i,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupIds: { minify: false },
              },
            },
          },
          'convertColors',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
}));