import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

/**
 * The browser router.
 *
 * It lives in its own module because `createBrowserRouter` needs a `window`:
 * the prerenderer imports the route table (`./routes`) directly and builds a
 * memory router from it in Node.
 */
export const router = createBrowserRouter(routes);
