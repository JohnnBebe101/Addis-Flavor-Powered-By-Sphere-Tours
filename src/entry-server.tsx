/**
 * Server entry for the prerenderer.
 *
 * The homepage is rendered to HTML at build time and injected into
 * dist/index.html, so the hero — including the paragraph that Chrome treats as
 * the Largest Contentful Paint element — is painted from the document
 * response instead of waiting for the JavaScript bundle to download and
 * execute. The client then hydrates that markup.
 *
 * The markup must be identical to what the browser renders on its first pass,
 * so this module mirrors `src/main.tsx` exactly and renders the same route
 * table through a memory router.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './router/routes';

export interface PrerenderResult {
  /** The markup for the #root container. */
  html: string;
  /** The title Helmet would have applied, for reference. */
  title: string;
}

export async function render(url: string): Promise<PrerenderResult> {
  const router = createMemoryRouter(routes, { initialEntries: [url] });

  // The router resolves its (lazy) route modules asynchronously; rendering
  // before that settles would produce an empty document.
  await router.initialize();

  const helmetContext: { helmet?: { title?: { toString(): string } } } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext as never}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </HelmetProvider>
    </StrictMode>,
  );

  return {
    html,
    title: helmetContext.helmet?.title?.toString() ?? '',
  };
}
