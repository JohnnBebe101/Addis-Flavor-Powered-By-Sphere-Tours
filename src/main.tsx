import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

/*
 * The homepage is prerendered at build time (see scripts/prerender.mjs), so the
 * document already contains the markup React would produce. Hydrating it lets
 * the hero paint from the HTML response instead of waiting for this bundle to
 * download and execute.
 *
 * Other routes are still client-rendered, and a hard reload of a sub-route
 * serves the same prerendered homepage — in that case there is nothing to
 * hydrate and the app mounts from scratch, which is why the check below looks
 * at the container rather than at the URL.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
