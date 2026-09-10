import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotificationBar } from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import { HeroBanner } from '../components/home/HeroBanner';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import ContactModal from '../components/ContactModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';
import { Tour } from '../types';
import toursData from '../content/tours.json';
import homeData from '../content/home.json';

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
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
