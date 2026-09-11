import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { NotificationBar } from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import ContactModal from '../components/ContactModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';

const HomeHero = lazy(() => import('../components/home/HomeHero').then(m => ({ default: m.HomeHero })));

function RouteLoadingSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-coffee-red/20 border-t-coffee-red rounded-full animate-spin" />
    </div>
  );
}

export const Layout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const bookTourId = urlParams.get('book');
    if (bookTourId) {
      navigate(`/book/?tour=${bookTourId}`, { replace: true });
    }
  }, [search, navigate]);

  const handleOpenBooking = () => navigate('/book/');

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-coffee-red focus:text-linen-white focus:rounded-lg focus:text-sm focus:font-bold focus:outline-none"
      >
        Skip to main content
      </a>
      <NotificationBar />
      <Navbar
        translations={TRANSLATIONS}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
      />
      {pathname === '/' && (
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={<div className="min-h-[80vh] bg-sandstone/20 animate-pulse" />}>
            <HomeHero />
          </Suspense>
        </ErrorBoundary>
      )}
      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<RouteLoadingSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ScrollRestoration />
      <Footer NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS} />
      <StickyBookingBar
        translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
