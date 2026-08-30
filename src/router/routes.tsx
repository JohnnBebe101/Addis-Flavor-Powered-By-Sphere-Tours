import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import('../pages/Homepage').then((m) => ({ Component: m.Homepage })),
      },
      {
        path: 'tours/',
        lazy: () => import('../pages/TourListingPage').then((m) => ({ Component: m.TourListingPage })),
      },
      {
        path: 'tours/:slug/',
        lazy: () => import('../pages/TourDetailPage').then((m) => ({ Component: m.TourDetailPage })),
      },
      {
        path: 'destinations/',
        lazy: () =>
          import('../pages/DestinationListingPage').then((m) => ({
            Component: m.DestinationListingPage,
          })),
      },
      {
        path: 'destinations/:slug/',
        lazy: () =>
          import('../pages/DestinationDetailPage').then((m) => ({
            Component: m.DestinationDetailPage,
          })),
      },
      {
        path: 'why-choose-us/',
        lazy: () => import('../pages/WhyChooseUsPage').then((m) => ({ Component: m.WhyChooseUsPage })),
      },
      {
        path: 'travel-guide/',
        lazy: () =>
          import('../pages/TravelGuideListingPage').then((m) => ({
            Component: m.TravelGuideListingPage,
          })),
      },
      {
        path: 'travel-guide/:slug/',
        lazy: () =>
          import('../pages/TravelGuideArticlePage').then((m) => ({
            Component: m.TravelGuideArticlePage,
          })),
      },
      {
        path: 'about/',
        lazy: () => import('../pages/AboutPage').then((m) => ({ Component: m.AboutPage })),
      },
      {
        path: 'reviews/',
        lazy: () => import('../pages/ReviewsPage').then((m) => ({ Component: m.ReviewsPage })),
      },
      {
        path: 'contact/',
        lazy: () => import('../pages/ContactPage').then((m) => ({ Component: m.ContactPage })),
      },
      {
        path: 'custom-tour/',
        lazy: () => import('../pages/CustomTourPage').then((m) => ({ Component: m.CustomTourPage })),
      },
      {
        path: 'travel-agents/',
        lazy: () => import('../pages/TravelAgentsPage').then((m) => ({ Component: m.TravelAgentsPage })),
      },
      {
        path: 'terms/',
        lazy: () =>
          import('../pages/LegalPage').then((m) => ({
            Component: () => <m.LegalPage type="terms" />,
          })),
      },
      {
        path: 'privacy/',
        lazy: () =>
          import('../pages/LegalPage').then((m) => ({
            Component: () => <m.LegalPage type="privacy" />,
          })),
      },
      {
        path: 'cancellation-policy/',
        lazy: () =>
          import('../pages/LegalPage').then((m) => ({
            Component: () => <m.LegalPage type="cancellation" />,
          })),
      },
      {
        path: 'cookies/',
        lazy: () =>
          import('../pages/LegalPage').then((m) => ({
            Component: () => <m.LegalPage type="cookies" />,
          })),
      },
      {
        path: '*',
        lazy: () => import('../pages/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })),
      },
    ],
  },
]);
