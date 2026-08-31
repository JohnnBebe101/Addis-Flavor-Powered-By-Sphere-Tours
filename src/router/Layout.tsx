import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
  const [searchSelection, setSearchSelection] = useState('');
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const { pathname } = useLocation();

  const handleOpenBooking = () => setIsBookingOpen(true);

  const handleSelectSearchPackage = (tourId: string) => {
    setSearchSelection(tourId);
    if (tourId) {
      setIsBookingOpen(true);
    }
  };

  return (
    <>
      <Navbar
        translations={TRANSLATIONS}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
      />
      {pathname === '/' && (
        <HeroBanner
          slides={homeData.hero.slides}
          translations={{
            heroSearchPlaceholder: TRANSLATIONS.heroSearchPlaceholder,
            heroSearchGo: 'GO',
          }}
          tours={toursData.tours as Tour[]}
          searchSelection={searchSelection}
          isSelectFocused={isSelectFocused}
          setIsSelectFocused={setIsSelectFocused}
          handleSelectSearchPackage={handleSelectSearchPackage}
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
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
