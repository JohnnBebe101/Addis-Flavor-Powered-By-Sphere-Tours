/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, TouchEvent } from 'react';
import { TRANSLATIONS, PACKAGES, REVIEWS, PRESS_LOGOS, NEIGHBORHOOD_DESTINATIONS } from './data';

import Navbar from './components/Navbar';
import ReviewsCarousel from './components/ReviewsCarousel';
import BookingWidget from './components/BookingWidget';
import BecomeHost from './components/BecomeHost';
import OurStory from './components/OurStory';
import ContactModal from './components/ContactModal';
import { HeroBanner } from './components/home/HeroBanner';
import { KeyBenefits } from './components/home/KeyBenefits';
import { PressLogos } from './components/home/PressLogos';
import ExperienceGrid from './components/home/ExperienceGrid';
import { BehindTheScenes } from './components/home/BehindTheScenes';
import VettedHostsRow from './components/home/VettedHostsRow';
import OnlineClasses from './components/home/OnlineClasses';
import { FAQSection } from './components/home/FAQSection';
import { Footer } from './components/home/Footer';
import { StickyBookingBar } from './components/home/StickyBookingBar';
import { useSEO } from './utils/seo';

import heroBgImg from './assets/images/addis_hero_bg_1782233695273.jpg';

const getShortName = (pkgId: string) => {
  if (pkgId === 'cooking-class') return 'Cooking Class';
  if (pkgId === 'home-meal') return 'Home Meal';
  return 'Coffee Ritual';
};

export default function App() {
  const [isGlobalDark, setGlobalDark] = useState(false);
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>(null);
  const [searchSelection, setSearchSelection] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);
  const [activeScrollyStep, setActiveScrollyStep] = useState<Record<string, number>>({
    'cooking-class': 0,
    'home-meal': 0,
    'coffee-only': 0,
  });
  const [activeView, setActiveView] = useState<'home' | 'become-host' | 'our-story'>('home');
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const translations = TRANSLATIONS;

  const [activeBehindTheScenesId, setActiveBehindTheScenesId] = useState<string>('cooking-class');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrevBehindTheScenes = () => {
    const currentIndex = PACKAGES.findIndex((p) => p.id === activeBehindTheScenesId);
    const prevIndex = (currentIndex - 1 + PACKAGES.length) % PACKAGES.length;
    setActiveBehindTheScenesId(PACKAGES[prevIndex].id);
  };

  const handleNextBehindTheScenes = () => {
    const currentIndex = PACKAGES.findIndex((p) => p.id === activeBehindTheScenesId);
    const nextIndex = (currentIndex + 1) % PACKAGES.length;
    setActiveBehindTheScenesId(PACKAGES[nextIndex].id);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNextBehindTheScenes();
    } else if (distance < -minSwipeDistance) {
      handlePrevBehindTheScenes();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      let percentage = 0;
      if (totalHeight > 0) {
        percentage = (window.scrollY / totalHeight) * 100;
      }
      setScrollPercentage(isNaN(percentage) ? 0 : Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Hook
  useSEO(activeView);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectSearchPackage = (pkgId: string) => {
    setSearchSelection(pkgId);
    if (pkgId) {
      handleOpenBooking();
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

  const handleBecomeHostClick = () => {
    setActiveView('become-host');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-1000 ${
        isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'
      }`}
    >
      {/* FULL PAGE PROGRESS SCROLL BAR FIXED AT TOP */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gold/25 z-[100] pointer-events-none">
        <div
          className="h-full bg-coffee-red transition-all duration-75 ease-out shadow-[0_0_8px_rgba(196,75,59,0.8)]"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div
        id="announcement-bar"
        className="bg-teal text-linen-white text-xs text-center py-2 px-4 font-sans tracking-wide uppercase transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span>{translations.announcement}</span>
        </div>
      </div>

      {/* 2. STICKY BLUR NAVBAR */}
      <Navbar
        translations={translations}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        isGlobalDark={isGlobalDark}
      />

      {activeView === 'become-host' ? (
        <BecomeHost
          isGlobalDark={isGlobalDark}
          onBackToHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : activeView === 'our-story' ? (
        <OurStory
          isGlobalDark={isGlobalDark}
          onBackToHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBookClick={handleOpenBooking}
        />
      ) : (
        <>
          {/* 3. HERO BANNER */}
          <HeroBanner
            heroBgImg={heroBgImg}
            translations={{
              heroTitle: translations.heroTitle,
              heroSub: translations.heroSub,
              heroSearchPlaceholder: translations.heroSearchPlaceholder,
            }}
            searchSelection={searchSelection}
            isSelectFocused={isSelectFocused}
            setIsSelectFocused={setIsSelectFocused}
            handleSelectSearchPackage={handleSelectSearchPackage}
            handleOpenBooking={handleOpenBooking}
          />

          {/* 4. REVIEWS CAROUSEL */}
          <ReviewsCarousel reviews={REVIEWS} onBookClick={handleOpenBooking} />

          {/* 5. KEY BENEFITS */}
          <KeyBenefits
            translations={{
              guaranteeVetted: translations.guaranteeVetted,
              guaranteeVettedSub: translations.guaranteeVettedSub,
              guaranteeTitle: translations.guaranteeTitle,
              guaranteeTitleSub: translations.guaranteeTitleSub,
              guaranteePrivate: translations.guaranteePrivate,
              guaranteePrivateSub: translations.guaranteePrivateSub,
            }}
          />

          {/* 6. PRESS LOGOS */}
          <PressLogos pressLogos={PRESS_LOGOS} />

          {/* 7. EXPERIENCE GRID */}
          <ExperienceGrid
            translations={translations}
            packages={PACKAGES}
            expandedPkgId={expandedPkgId}
            setExpandedPkgId={setExpandedPkgId}
            handleSelectSearchPackage={handleSelectSearchPackage}
          />

          {/* 8. BEHIND THE SCENES */}
          <BehindTheScenes
            _translations={translations}
            PACKAGES={PACKAGES}
            activeBehindTheScenesId={activeBehindTheScenesId}
            setActiveBehindTheScenesId={setActiveBehindTheScenesId}
            activeScrollyStep={activeScrollyStep}
            setActiveScrollyStep={setActiveScrollyStep}
            handlePrevBehindTheScenes={handlePrevBehindTheScenes}
            handleNextBehindTheScenes={handleNextBehindTheScenes}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            isGlobalDark={isGlobalDark}
            _getShortName={getShortName}
          />

          {/* 9 & 10. VETTED HOSTS & COFFEE RITUAL */}
          <VettedHostsRow
            translations={translations}
            isGlobalDark={isGlobalDark}
            setGlobalDark={setGlobalDark}
          />

          {/* 11. ONLINE CLASSES */}
          <OnlineClasses
            translations={{
              notTravelingTitle: translations.notTravelingTitle,
              notTravelingSub: translations.notTravelingSub,
              viewOnlineClasses: translations.viewOnlineClasses,
            }}
            handleOpenBooking={handleOpenBooking}
          />

          {/* 12. FAQ SECTION */}
          <FAQSection
            openFaqIndex={openFaqIndex}
            setOpenFaqIndex={setOpenFaqIndex}
          />

          {/* 13. FOOTER */}
          <Footer
            _isGlobalDark={isGlobalDark}
            translations={translations}
            newsletterEmail={newsletterEmail}
            setNewsletterEmail={setNewsletterEmail}
            newsletterSubbed={newsletterSubbed}
            _setNewsletterSubbed={setNewsletterSubbed}
            handleNewsletterSubmit={handleNewsletterSubmit}
            NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS}
            onBecomeHostClick={handleBecomeHostClick}
          />
        </>
      )}

      {/* 14. STICKY BOOKING BAR (MOBILE) */}
      <StickyBookingBar
        translations={{ bookNowButton: translations.bookNowButton }}
        handleOpenBooking={handleOpenBooking}
      />

      {/* 15. BOOKING FLOW MODAL */}
      <BookingWidget
        translations={translations}
        packages={PACKAGES}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSearchSelection('');
        }}
        initialPkgId={searchSelection}
      />

      {/* 16. CONTACT FLOW MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isGlobalDark={isGlobalDark}
      />
    </div>
  );
}