import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

/**
 * The browser router.
 *
 * It lives in its own module because `createBrowserRouter` needs a `window`:
 * the prerenderer imports the route table (`./routes`) directly and builds a
 * memory router from it in Node.
 *
 * <ScrollRestoration /> owns scroll behavior. Native restoration races the
 * progressive homepage sections and can clamp a saved position to the short
 * hero-only document before the below-the-fold sections mount. RR v6 exposes
 * this option only through the component, so set the same history mode here
 * before the router is created.
 */
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

export const router = createBrowserRouter(routes);
