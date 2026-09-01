import { Outlet, ScrollRestoration, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotificationBar } from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import { HeroBanner } from '../components/home/HeroBanner';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import TourBookingModal from '../components/TourBookingModal';
import ContactModal from '../components/ContactModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';
import { Tour } from '../types';
import toursData from '../content/tours.json';
import homeData from '../content/home.json';

export const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const bookTourId = searchParams.get('book');
    if (bookTourId) {
      setIsBookingOpen(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('book');
      setSearchParams(newParams, { replace: true });
    }
  }, [search, searchParams, setSearchParams]);

  const handleOpenBooking = () => setIsBookingOpen(true);

  return (
    <>
      <NotificationBar />
      <Navbar
        translations={TRANSLATIONS}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
      />
      {pathname === '/' && (
        <HeroBanner
          slides={homeData.hero.slides}
          tours={toursData.tours as Tour[]}
          handleOpenBooking={handleOpenBooking}
        />
      )}
      <main id="main-content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <ScrollRestoration />
      <Footer NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS} />
      <StickyBookingBar
        translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
        handleOpenBooking={handleOpenBooking}
      />
      <TourBookingModal
        translations={TRANSLATIONS}
        tours={toursData.tours as Tour[]}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTourId={undefined}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
