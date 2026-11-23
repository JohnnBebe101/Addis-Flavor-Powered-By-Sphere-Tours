/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router/browserRouter';

export default function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
