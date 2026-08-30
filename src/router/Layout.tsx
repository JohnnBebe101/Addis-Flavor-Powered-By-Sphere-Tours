import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import Navbar from '../components/Navbar';
import { HeroBanner } from '../components/home/HeroBanner';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import TourBookingModal from '../components/TourBookingModal';
import ContactModal from '../components/ContactModal';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';
import { Tour } from '../types';
import toursData from '../content/tours.json';
import homeData from '../content/home.json';

export const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);
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

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubbed(true);
      setTimeout(() => {
        setNewsletterSubbed(false);
        setNewsletterEmail('');
      }, 5000);
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
          translations={{ heroSearchPlaceholder: TRANSLATIONS.heroSearchPlaceholder, heroSearchGo: 'GO' }}
          tours={toursData.tours as Tour[]}
          searchSelection={searchSelection}
          isSelectFocused={isSelectFocused}
          setIsSelectFocused={setIsSelectFocused}
          handleSelectSearchPackage={handleSelectSearchPackage}
          handleOpenBooking={handleOpenBooking}
        />
      )}
      <main id="main-content">
        <Outlet />
      </main>
      <ScrollRestoration />
      <Footer
        translations={TRANSLATIONS}
        _isGlobalDark={false}
        newsletterEmail={newsletterEmail}
        setNewsletterEmail={setNewsletterEmail}
        newsletterSubbed={newsletterSubbed}
        _setNewsletterSubbed={setNewsletterSubbed}
        handleNewsletterSubmit={handleNewsletterSubmit}
        NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS}
      />
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
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default Layout;
