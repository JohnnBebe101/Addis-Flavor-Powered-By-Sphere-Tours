/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import {
  Check,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Flame,
  Award,
  ShieldCheck,
  Heart,
  Clock,
  Search,
  Plus,
  Minus
} from 'lucide-react';
import { Language } from './types';
import {
  TRANSLATIONS,
  PACKAGES,
  REVIEWS,
  PRESS_LOGOS,
  NEIGHBORHOOD_DESTINATIONS
} from './data';

import Navbar from './components/Navbar';
import ReviewsCarousel from './components/ReviewsCarousel';
import JebenaDeepDive from './components/JebenaDeepDive';
import BookingWidget from './components/BookingWidget';

import heroBgImg from './assets/images/addis_hero_bg_1782233695273.jpg';
import jebenaPourImg from './assets/images/addis_jebena_pour_1782233715156.jpg';

export default function App() {
  const [currentLang, setLang] = useState<Language>('en');
  const [isGlobalDark, setGlobalDark] = useState(false);
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>(null);
  const [searchSelection, setSearchSelection] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);
  const [activeScrollyStep, setActiveScrollyStep] = useState<Record<string, number>>({
    'cooking-class': 0,
    'home-meal': 0,
    'coffee-only': 0
  });

  const translations = TRANSLATIONS[currentLang];

  const [scrollyProgress, setScrollyProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('scrollytelling-stages-container');
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const totalHeight = rect.height;
      
      const navbarHeight = window.innerWidth >= 768 ? 68 : 58;
      const progressOffset = navbarHeight + 54;
      
      const scrolled = progressOffset - rect.top;
      let percentage = 0;
      if (scrolled > 0) {
        const scrollableRange = totalHeight - (window.innerHeight - progressOffset);
        percentage = scrollableRange > 0 ? (scrolled / scrollableRange) * 100 : 0;
      }
      
      setScrollyProgress(isNaN(percentage) ? 0 : Math.min(100, Math.max(0, percentage)));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-1000 ${
        isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'
      } ${currentLang === 'am' ? 'font-ethiopic' : 'font-sans'}`}
    >
      {/* 1. TOP ANNOUNCEMENT BAR (Traveling Spoon Style) */}
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
        currentLang={currentLang}
        setLang={setLang}
        translations={translations}
        onBookClick={handleOpenBooking}
      />

      {/* 3. HERO HEROIC BANNER */}
      <header
        id="hero-banner"
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${heroBgImg})`
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Decorative Top Accent */}
          <div className="inline-flex items-center space-x-1.5 bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-pulse">
            <Flame className="w-3.5 h-3.5 text-coffee-red fill-coffee-red" />
            <span>{currentLang === 'en' ? 'Authentic Ethiopian Hospitality' : currentLang === 'fr' ? 'Hospitalité éthiopienne authentique' : 'እውነተኛ የኢትዮጵያ መስተንግዶ'}</span>
          </div>

          <h1
            id="hero-headline"
            className="text-4xl sm:text-6xl font-serif font-extrabold text-linen-white tracking-tight leading-tight uppercase"
          >
            {translations.heroTitle}
          </h1>

          <p
            id="hero-subheadline"
            className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-light leading-relaxed"
          >
            {translations.heroSub}
          </p>

          {/* Floating glass-morphism search selector bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="bg-linen-white/10 backdrop-blur-md border border-linen-white/20 p-2 rounded-full flex items-center shadow-2xl">
              <div className="pl-4 text-linen-white/80">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <select
                id="hero-experience-search"
                value={searchSelection}
                onChange={(e) => handleSelectSearchPackage(e.target.value)}
                className="w-full bg-transparent text-linen-white text-xs sm:text-sm font-semibold py-2.5 px-3 focus:outline-none cursor-pointer placeholder-linen-white/60 select-reset appearance-none"
                style={{ WebkitAppearance: 'none' }}
              >
                <option value="" className="text-teal font-sans">
                  {translations.heroSearchPlaceholder}
                </option>
                {PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id} className="text-teal font-sans">
                    {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm} (${pkg.price}/guest)
                  </option>
                ))}
              </select>
              <button
                id="hero-search-go-btn"
                onClick={handleOpenBooking}
                className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 transform active:scale-95 shadow-md flex items-center space-x-1"
              >
                <span>{currentLang === 'en' ? 'GO' : currentLang === 'fr' ? 'GO' : 'ሂድ'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Traditional slide-active dots at bottom of hero */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[1, 2, 3].map((dot, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === 0 ? 'w-8 bg-gold' : 'w-2 bg-linen-white/40'
              }`}
            />
          ))}
        </div>

        {/* Description Label at bottom right of hero */}
        <div className="absolute bottom-6 right-6 hidden sm:block bg-black/40 backdrop-blur-sm border border-linen-white/10 p-2.5 rounded-xl text-left text-[10px] text-linen-white font-mono leading-tight">
          <p className="text-gold uppercase tracking-wider font-semibold">
            {currentLang === 'en' ? 'Live Capture' : currentLang === 'fr' ? 'Capture en direct' : 'የቀጥታ ምስል'}
          </p>
          <p>{currentLang === 'en' ? 'Preparing authentic Injera and Shiro, ADDIS ABABA, ETHIOPIA' : currentLang === 'fr' ? "Préparation d'Injera et de Shiro authentiques, ADDIS-ABEBA, ÉTHIOPIE" : 'በአዲስ አበባ ከተማ እውነተኛ ሽሮ እና እንጀራ ዝግጅት'}</p>
        </div>
      </header>

      {/* 4. REVIEWS CAROUSEL SLIDER (Traveling Spoon Clone) */}
      <ReviewsCarousel
        reviews={REVIEWS}
        currentLang={currentLang}
        onBookClick={handleOpenBooking}
      />

      {/* 5. KEY BENEFIT BADGES SECTION (100% Circle icons) */}
      <section id="key-benefits" className="py-12 bg-linen-white border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Vetted badge */}
            <div id="benefit-vetted" className="flex flex-col items-center p-4 group">
              <div className="w-20 h-20 rounded-full bg-gold/10 text-gold hover:bg-gold/20 flex items-center justify-center transition-all duration-500 mb-4 shadow border border-gold/20 group-hover:scale-110">
                <ShieldCheck className="w-10 h-10 text-coffee-red" />
              </div>
              <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteeVetted}
              </h3>
              <p className="text-xs text-teal/60 max-w-xs mt-2 leading-relaxed">
                {translations.guaranteeVettedSub}
              </p>
            </div>

            {/* Satisfaction badge */}
            <div id="benefit-satisfaction" className="flex flex-col items-center p-4 group">
              <div className="w-20 h-20 rounded-full bg-coffee-red/10 text-coffee-red hover:bg-coffee-red/20 flex items-center justify-center transition-all duration-500 mb-4 shadow border border-coffee-red/20 group-hover:scale-110">
                <span className="font-serif font-extrabold text-xl text-gold">100%</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteeTitle}
              </h3>
              <p className="text-xs text-teal/60 max-w-xs mt-2 leading-relaxed">
                {translations.guaranteeTitleSub}
              </p>
            </div>

            {/* Private experience badge */}
            <div id="benefit-private" className="flex flex-col items-center p-4 group">
              <div className="w-20 h-20 rounded-full bg-teal/10 text-teal hover:bg-teal/20 flex items-center justify-center transition-all duration-500 mb-4 shadow border border-teal/20 group-hover:scale-110">
                <Heart className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteePrivate}
              </h3>
              <p className="text-xs text-teal/60 max-w-xs mt-2 leading-relaxed">
                {translations.guaranteePrivateSub}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRESS LOGOS (Grayscale publishers, exactly like Traveling Spoon image) */}
      <section id="press-logos" className="bg-sandstone/40 py-10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-teal/50 mb-6">
            {currentLang === 'en' ? 'As seen on global publications' : currentLang === 'fr' ? 'Vu sur des publications mondiales' : 'በዓለም አቀፍ ሚዲያዎች የተመሰከረለት'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            {PRESS_LOGOS.map((press, i) => (
              <div key={i} className="flex flex-col items-center max-w-[140px] text-center px-2">
                <span className="font-serif font-black text-xl md:text-2xl tracking-tighter text-teal/80">
                  {press.name === "National Geographic Traveller" ? "NatGeo" : press.name}
                </span>
                <span className="text-[9px] font-sans font-light opacity-65 leading-tight mt-1 italic hidden md:block">
                  "{press.quote}"
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BENTO MATRIX: CHOOSE YOUR JOURNEY */}
      <section id="experiences" className="py-16 md:py-24 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section title */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              {currentLang === 'en' ? 'Which story will you taste?' : currentLang === 'fr' ? 'Quelle histoire allez-vous déguster ?' : 'የትኛውን ታሪክ መቅመስ ይመርጣሉ?'}
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {currentLang === 'en'
                ? 'Select an immersive experience. Click explore to expand steps inline and map out your culinary adventure.'
                : currentLang === 'fr'
                  ? 'Sélectionnez une expérience immersive. Cliquez sur explorer pour afficher les étapes et planifier votre aventure culinaire.'
                  : 'የመረጡትን ልምድ ይምረጡ። የምግብ ዝግጅቱን ደረጃዎች በዝርዝር ለማየት «መርምር» የሚለውን ይጫኑ።'}
            </p>
          </div>

          {/* Bento-style Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => {
              const isExpanded = expandedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  id={`experience-card-${pkg.id}`}
                  className={`bg-linen-white text-teal rounded-3xl border border-teal/10 shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                    isExpanded ? 'lg:col-span-3 border-gold/40 ring-1 ring-gold/20' : ''
                  }`}
                >
                  {/* Card layout split based on expansion */}
                  <div className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-12' : ''} gap-0`}>
                    {/* Visual Image Banner */}
                    <div className={`relative ${isExpanded ? 'lg:col-span-5 h-[280px] lg:h-full' : 'h-[220px]'}`}>
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.nameEn}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {/* Floating Emoji */}
                      <span className="absolute top-4 left-4 bg-linen-white text-xl p-2 rounded-2xl shadow">
                        {pkg.emoji}
                      </span>
                      {/* Bottom Banner with Price inside image */}
                      <div className="absolute bottom-4 left-4 right-4 text-linen-white flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                            {translations.durationLabel}
                          </p>
                          <p className="text-xs font-semibold">{currentLang === 'en' ? pkg.durationEn : currentLang === 'fr' ? pkg.durationFr : pkg.durationAm}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                            {translations.priceLabel}
                          </p>
                          <p className="text-base font-bold text-gold">${pkg.price} USD</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`p-6 sm:p-8 flex flex-col justify-between ${isExpanded ? 'lg:col-span-7 space-y-6' : 'space-y-4'}`}>
                      <div>
                        {/* Tag */}
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-coffee-red bg-coffee-red/10 px-2.5 py-1 rounded-full">
                          {currentLang === 'en' ? pkg.tagEn : currentLang === 'fr' ? pkg.tagFr : pkg.tagAm}
                        </span>

                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal tracking-tight mt-3">
                          {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm}
                        </h3>

                        <p className="text-xs sm:text-sm text-teal/75 leading-relaxed mt-3">
                          {currentLang === 'en' ? pkg.descEn : currentLang === 'fr' ? pkg.descFr : pkg.descAm}
                        </p>
                      </div>

                      {/* Expanded Steps Checklist Matrix */}
                      {isExpanded && (
                        <div className="bg-sandstone/60 p-5 rounded-2xl border border-teal/5 space-y-4 animate-fade-in">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-coffee-red border-b border-teal/10 pb-2">
                            {currentLang === 'en' ? 'Core Milestones & Timeline' : currentLang === 'fr' ? 'Étapes clés & Chronologie' : 'ዋና ዋና ደረጃዎች እና የጊዜ ሰሌዳ'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(currentLang === 'en' ? pkg.stepsEn : currentLang === 'fr' ? pkg.stepsFr : pkg.stepsAm).map((stepText, idx) => {
                              const stepDesc = currentLang === 'en' ? pkg.stepsDescEn[idx] : currentLang === 'fr' ? pkg.stepsDescFr[idx] : pkg.stepsDescAm[idx];
                              return (
                                <div key={idx} className="flex items-start space-x-3 text-xs">
                                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                    <Check className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-teal">{stepText}</h5>
                                    <p className="text-[10px] text-teal/70 leading-relaxed mt-0.5">{stepDesc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Card Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                        <button
                          id={`explore-trigger-${pkg.id}`}
                          onClick={() => setExpandedPkgId(isExpanded ? null : pkg.id)}
                          className="flex items-center space-x-1 font-mono text-xs font-bold text-teal hover:text-coffee-red transition-colors py-2 focus:outline-none"
                        >
                          <span>{isExpanded ? (currentLang === 'en' ? 'COLLAPSE STEPS' : currentLang === 'fr' ? 'RÉDUIRE LES ÉTAPES' : 'ዝርዝሮችን ዝጋ') : (currentLang === 'en' ? 'EXPLORE CULINARY STEPS' : currentLang === 'fr' ? 'EXPLORER LES ÉTAPES CULINAIRES' : 'የምግብ አዘገጃጀት ደረጃዎችን መርምር')}</span>
                          <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>

                        <button
                          id={`book-trigger-${pkg.id}`}
                          onClick={() => {
                            handleSelectSearchPackage(pkg.id);
                          }}
                          className="px-5 py-2 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow"
                        >
                          {translations.bookNowButton}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SCROLLYTELLING SECTIONS (Apple style Sticky elements) */}
      <section id="scrollytelling-showcase" className="py-16 bg-sandstone/30 relative">
        {/* Intro Heading - Always scrolled above the progress bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-serif tracking-tight">
              {currentLang === 'en' ? 'Taste the Soul: Behind the Scenes' : currentLang === 'fr' ? 'Goûtez l’âme : Coulisses' : 'የአዲስ ፍሌቨር በስተጀርባ ታሪኮች'}
            </h2>
            <p className="text-xs font-mono uppercase text-coffee-red tracking-widest mt-2">
              {currentLang === 'en' ? 'SENSORY IMMERSION STAGE' : currentLang === 'fr' ? 'PHASE D’IMMERSION SENSORIELLE' : 'የስሜት ህዋሳት ማነቃቂያ ደረጃ'}
            </p>
          </div>
        </div>

        {/* Sticky Scroll Progress Bar */}
        <div className={`sticky top-[58px] md:top-[68px] left-0 right-0 z-30 backdrop-blur-md py-3 border-b shadow-sm transition-all duration-300 ${
          isGlobalDark
            ? 'bg-dark-bg/95 border-linen-white/10'
            : 'bg-sandstone/95 border-teal/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between text-[10px] font-mono uppercase tracking-widest ${
              isGlobalDark ? 'text-linen-white/70' : 'text-teal'
            }`}>
              <span className="font-bold text-coffee-red flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-coffee-red animate-pulse" />
                {currentLang === 'en' ? 'Immersive Journey Progress' : currentLang === 'fr' ? 'Progression du voyage immersif' : 'የምግብ ዝግጅት ጉዞ ሂደት'}
              </span>
              <span className={`font-semibold ${isGlobalDark ? 'text-linen-white/90' : 'text-gold'}`}>
                {currentLang === 'en' ? 'STAGES' : currentLang === 'fr' ? 'ÉTAPES' : 'ደረጃዎች'} {Math.round(scrollyProgress)}%
              </span>
            </div>
            <div className={`w-full h-1.5 mt-2 rounded-full overflow-hidden ${
              isGlobalDark ? 'bg-linen-white/15' : 'bg-teal/10'
            }`}>
              <div
                className="bg-coffee-red h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${scrollyProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stages/Packages Container */}
        <div id="scrollytelling-stages-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="space-y-24">
            {PACKAGES.map((pkg, pIdx) => {
              const currentActiveIdx = activeScrollyStep[pkg.id] || 0;
              const isEven = pIdx % 2 === 0;

              return (
                <div
                  key={pkg.id}
                  id={`scrollytelling-package-${pkg.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left Column (Sticky Image Side) */}
                  <div className={`lg:col-span-6 relative overflow-hidden rounded-3xl border border-teal/10 shadow-xl ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="h-[280px] sm:h-[380px] relative transition-all duration-500">
                      <img
                        src={pkg.imageUrl}
                        alt="Scrollytelling background"
                        className="w-full h-full object-cover transition-all duration-700 filter saturate-[1.1] scale-100"
                        referrerPolicy="no-referrer"
                      />
                      {/* Overlay card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-teal/90 via-transparent to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6 text-linen-white space-y-1">
                        <p className="text-[10px] font-mono text-gold uppercase tracking-widest">
                          {currentLang === 'en' ? 'ACTIVE PHASE' : currentLang === 'fr' ? 'PHASE ACTIVE' : 'ንቁ ደረጃ'}
                        </p>
                        <h4 className="text-lg font-serif font-bold">
                          {(currentLang === 'en' ? pkg.stepsEn : currentLang === 'fr' ? pkg.stepsFr : pkg.stepsAm)[currentActiveIdx]}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Text blocks with interactive selector indices) */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-xs font-mono uppercase tracking-widest text-coffee-red">
                      {currentLang === 'en' ? `journey 0${pIdx + 1}` : currentLang === 'fr' ? `voyage 0${pIdx + 1}` : `ጉዞ 0${pIdx + 1}`}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight">
                      {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm}
                    </h3>
                    <p className="text-sm opacity-80 leading-relaxed font-sans">
                      {currentLang === 'en' ? pkg.descEn : currentLang === 'fr' ? pkg.descFr : pkg.descAm}
                    </p>

                    {/* Interactive List of Steps to Click and Change active frame */}
                    <div className="space-y-3 pt-4 border-t border-teal/10">
                      {(currentLang === 'en' ? pkg.stepsEn : currentLang === 'fr' ? pkg.stepsFr : pkg.stepsAm).map((stepText, idx) => {
                        const isActive = idx === currentActiveIdx;
                        return (
                          <button
                            key={idx}
                            id={`scrolly-selector-${pkg.id}-${idx}`}
                            onClick={() => {
                              setActiveScrollyStep({
                                ...activeScrollyStep,
                                [pkg.id]: idx
                              });
                            }}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-start space-x-3 focus:outline-none ${
                              isActive
                                ? 'bg-coffee-red/5 border-coffee-red/40 translate-x-1 shadow-sm'
                                : 'bg-transparent border-transparent opacity-60 hover:opacity-100 hover:bg-teal/5'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold mt-0.5 ${
                                isActive ? 'bg-coffee-red text-linen-white' : 'bg-teal/10 text-teal'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div>
                              <h5 className="text-xs font-mono font-bold uppercase tracking-wider">{stepText}</h5>
                              {isActive && (
                                <p className="text-xs opacity-85 mt-1 animate-fade-in font-sans leading-relaxed">
                                  {currentLang === 'en' ? pkg.stepsDescEn[idx] : currentLang === 'fr' ? pkg.stepsDescFr[idx] : pkg.stepsDescAm[idx]}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. VETTED DETAIL SECTION: Traveling Spoon "100% of hosts are personally vetted" Side Panel */}
      <section id="host-section" className="py-16 md:py-24 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left side detail text */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-teal mb-3">
                  {translations.vettedTitle}
                </h2>
                <div className="w-16 h-1 bg-coffee-red mb-6 rounded-full" />
                <p className="text-sm md:text-base font-bold text-teal/80 leading-relaxed mb-4">
                  {translations.vettedSub}
                </p>
                <p className="text-sm text-teal/70 leading-relaxed">
                  {translations.vettedDesc}
                </p>
              </div>

              {/* Three detailed list items with unique stylized graphics */}
              <div className="space-y-6">
                {/* 1. In-home Meals */}
                <div className="flex items-start space-x-4 bg-sandstone/40 p-4 rounded-2xl border border-teal/5 hover:bg-sandstone/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍲</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-base">
                      {currentLang === 'en' ? 'In-home Meals' : currentLang === 'fr' ? 'Repas à la maison' : 'የቤት ውስጥ ባህላዊ ምግቦች'}
                      <span className="font-mono text-[10px] text-coffee-red font-semibold ml-2">
                        (1.5 - 2 hrs)
                      </span>
                    </h4>
                    <p className="text-xs text-teal/75 leading-relaxed mt-1">
                      {currentLang === 'en'
                        ? 'Experience the joy of an authentic homemade feast, eating exactly the way the locals do while discussing local history, culinary lore, and social customs.'
                        : currentLang === 'fr'
                          ? 'Découvrez la joie d’un festin fait maison authentique, en mangeant exactement comme les locaux tout en discutant de l’histoire locale, des traditions culinaires et des coutumes sociales.'
                          : 'የእውነተኛ የቤት ውስጥ የባህል ምግቦችን ደስታ ይለማመዱ፣ ስለ አካባቢው ታሪክ፣ ባህላዊ የምግብ አሰራር ዘዴዎች እና ማህበራዊ ልማዶች እየተጫወቱ ልክ እንደ ሃገሩ ሰው ይመገቡ።'}
                    </p>
                  </div>
                </div>

                {/* 2. Cooking Experiences */}
                <div className="flex items-start space-x-4 bg-sandstone/40 p-4 rounded-2xl border border-teal/5 hover:bg-sandstone/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍳</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-base">
                      {currentLang === 'en' ? 'Cooking Experiences' : currentLang === 'fr' ? 'Expériences culinaires' : 'የምግብ ማብሰል ልምዶች'}
                      <span className="font-mono text-[10px] text-gold font-semibold ml-2">
                        (3 - 4 hrs)
                      </span>
                    </h4>
                    <p className="text-xs text-teal/75 leading-relaxed mt-1">
                      {currentLang === 'en'
                        ? 'Discover ancient culinary traditions passed down through generations. Whip stews, knead teff, and learn to roast raw beans over live charcoal.'
                        : currentLang === 'fr'
                          ? 'Découvrez des traditions culinaires ancestrales transmises de génération en génération. Préparez des ragoûts, pétrissez le teff et apprenez à torréfier les grains crus sur du charbon de bois.'
                          : 'ለትውልድ የተላለፉ ጥንታዊ የምግብ ዝግጅት ወጎችን ያግኙ። ወጦችን ማብሰል፣ ጤፍ ማቡካት እና ጥሬ የቡና ፍሬዎችን በከሰል እሳት ላይ መቁላት ይማሩ።'}
                    </p>
                  </div>
                </div>

                {/* 3. Market Visits */}
                <div className="flex items-start space-x-4 bg-sandstone/40 p-4 rounded-2xl border border-teal/5 hover:bg-sandstone/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-base">
                      {currentLang === 'en' ? 'Market visits' : currentLang === 'fr' ? 'Visites de marchés' : 'የገበያ ጉብኝቶች'}
                      <span className="font-mono text-[10px] text-teal font-semibold ml-2">
                        (1 - 2 hrs)
                      </span>
                    </h4>
                    <p className="text-xs text-teal/75 leading-relaxed mt-1">
                      {currentLang === 'en'
                        ? 'Explore a vibrant nearby open-air market with your host, discovering the best local cardamoms, cinnamon, pure butter, and organic produce.'
                        : currentLang === 'fr'
                          ? 'Explorez un marché de plein air animé à proximité avec votre hôte, en découvrant les meilleures cardamomes locales, la cannelle, le beurre pur et les produits biologiques.'
                          : 'ከአስተናጋጅዎ ጋር በመሆን በአቅራቢያዎ የሚገኘውን ደማቅ ክፍት ገበያ ይጎብኙ፣ ምርጡን ኮረሪማ፣ የቁንዶ በርበሬ፣ ቂቤ እና ኦርጋኒክ ሰብሎችን ያግኙ።'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side massive vertical image with Traveling Spoon Waters Quote (Coconut parallel) */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] flex items-end">
              <img
                src={jebenaPourImg}
                alt="Ethiopian coffee ceremony traditional vertical"
                className="absolute inset-0 w-full h-full object-cover filter saturate-[1.1] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Image dark/warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal/95 via-teal/20 to-transparent" />

              {/* Text Quote overlay exact clone style */}
              <div className="relative z-10 p-8 sm:p-12 text-center text-linen-white w-full space-y-4">
                <blockquote className="text-2xl sm:text-3xl font-serif italic tracking-tight text-gold">
                  {currentLang === 'en'
                    ? '"Addis Flavor is a brilliant idea. The world needs it."'
                    : currentLang === 'fr'
                      ? '"Addis Flavor est une idée géniale. Le monde en a besoin."'
                      : '«አዲስ ፍሌቨር ድንቅ ሃሳብ ነው። ዓለም እጅግ ይፈልገዋል!»'}
                </blockquote>
                <p className="font-mono text-xs uppercase tracking-widest text-linen-white/70">
                  {currentLang === 'en' ? '– Alice Waters, Chef & Activist' : currentLang === 'fr' ? '– Alice Waters, Chef & Activiste' : '– አሊስ ዋተርስ፣ ታዋቂ ሼፍ'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE COFFEE CEREMONY DEEP DIVE (Mindfulness clay pot rounds + dim room switch) */}
      <JebenaDeepDive
        currentLang={currentLang}
        translations={translations}
        isGlobalDark={isGlobalDark}
        setGlobalDark={setGlobalDark}
      />

      {/* 11. NOT TRAVELING? ONLINE CLASSES BANNER */}
      <section
        id="online-banner"
        className="bg-sandstone py-16 text-center border-t border-b border-teal/10 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-xs font-mono uppercase text-coffee-red tracking-widest mb-2">
            {currentLang === 'en' ? 'VIRTUAL CLASSES' : currentLang === 'fr' ? 'COURS VIRTUELS' : 'የመስመር ላይ ክፍሎች'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-teal font-extrabold tracking-tight mb-4">
            {translations.notTravelingTitle}
          </h2>
          <p className="text-sm text-teal/80 max-w-lg mx-auto mb-8 leading-relaxed font-sans">
            {translations.notTravelingSub}
          </p>

          <button
            id="view-online-classes-btn"
            onClick={handleOpenBooking}
            className="px-8 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-widest transition-all duration-300 transform active:scale-95 shadow-md"
          >
            {translations.viewOnlineClasses}
          </button>
        </div>

        {/* Ambient Steam SVG Background Decorator */}
        <div className="absolute right-10 bottom-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-48 h-48 fill-teal">
            <path d="M50 80 Q30 60 40 40 T50 10" stroke="currentColor" strokeWidth="2" fill="none" className="steam-particle" />
            <path d="M60 80 Q40 60 50 40 T60 10" stroke="currentColor" strokeWidth="2" fill="none" className="steam-particle" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq-section" className="py-16 md:py-24 bg-linen-white border-b border-teal/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-teal">
              {currentLang === 'en' ? 'Frequently Asked Questions' : currentLang === 'fr' ? 'Foire Aux Questions' : 'ተደጋግመው የሚጠየቁ ጥያቄዎች'}
            </h2>
            <div className="w-12 h-1 bg-gold mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-6">
            <div className="border border-teal/10 p-5 rounded-2xl bg-sandstone/20">
              <h4 className="font-serif font-bold text-sm text-teal">
                {currentLang === 'en' ? 'Where do these experiences take place?' : currentLang === 'fr' ? 'Où se déroulent ces expériences ?' : 'ልምዶቹ የት ነው የሚከናወኑት?'}
              </h4>
              <p className="text-xs text-teal/70 leading-relaxed mt-2 font-sans">
                {currentLang === 'en'
                  ? 'All sessions are held in the private family kitchens and gardens of our vetted local hosts in comfortable Addis Ababa neighborhoods like Bole, Piazza, Yeka, and Guellele. Host locations are sent immediately upon booking confirmation.'
                  : currentLang === 'fr'
                    ? 'Toutes les sessions se déroulent dans les cuisines et jardins familiaux privés de nos hôtes locaux certifiés, dans des quartiers confortables d’Addis-Abeba comme Bole, Piazza, Yeka et Guellele. Les adresses des hôtes sont envoyées immédiatement après la confirmation de réservation.'
                    : 'ሁሉም መርሃ ግብሮች በአስተናጋጆቻችን የግል የመኖሪያ ግቢ ውስጥ በሚገኙ ኩሽናዎች ውስጥ ይከናወናሉ። ትክክለኛው አድራሻ ቦታ ማስያዝዎ እንደተረጋገጠ ወዲያውኑ ይላካል።'}
              </p>
            </div>

            <div className="border border-teal/10 p-5 rounded-2xl bg-sandstone/20">
              <h4 className="font-serif font-bold text-sm text-teal">
                {currentLang === 'en' ? 'How does payment work?' : currentLang === 'fr' ? 'Comment fonctionne le paiement ?' : 'ክፍያ እንዴት ነው የሚሰራው?'}
              </h4>
              <p className="text-xs text-teal/70 leading-relaxed mt-2 font-sans">
                {currentLang === 'en'
                  ? 'This website simulates local booking authorization. No immediate cash is charged from your card. You pay your host directly on-site or via flexible electronic options (Telebirr/Cash) during your culinary session.'
                  : currentLang === 'fr'
                    ? 'Ce site simule une autorisation de réservation locale. Aucun débit immédiat n’est effectué sur votre carte. Vous payez votre hôte directement sur place ou par des moyens électroniques flexibles (Telebirr/espèces) durant votre atelier culinaire.'
                    : 'ይህ ድህረ ገጽ የግል ማስያዣ ሂደትን የሚያሳይ ነው። በእጅዎ ላይ ካለው ካርድ ላይ ምንም ዓይነት ቅድመ ክፍያ አይቆረጥም። በልምዱ ወቅት ለአስተናጋጅዎ በቀጥታ በአካል ወይም በቴሌብር መክፈል ይችላሉ።'}
              </p>
            </div>

            <div className="border border-teal/10 p-5 rounded-2xl bg-sandstone/20">
              <h4 className="font-serif font-bold text-sm text-teal">
                {currentLang === 'en' ? 'Can you accommodate dietary restrictions?' : currentLang === 'fr' ? 'Pouvez-vous adapter le menu aux restrictions alimentaires ?' : 'የምግብ አለርጂ ካለብኝ ማስተናገድ ትችላላችሁ?'}
              </h4>
              <p className="text-xs text-teal/70 leading-relaxed mt-2 font-sans">
                {currentLang === 'en'
                  ? 'Absolutely. Traditional Ethiopian cuisine is highly accommodating. Over half of our dishes are naturally vegan (the fasting "Bayenetu" platter). We also offer pure gluten-free Teff Injera, dairy-free options, and halal-vetted meats.'
                  : currentLang === 'fr'
                    ? 'Absolument. La cuisine éthiopienne traditionnelle s’adapte très facilement. Plus de la moitié de nos plats sont naturellement végétaliens (le plateau de jeûne "Bayenetu"). Nous proposons également de l’Injera de Teff pure sans gluten, des options sans produits laitiers et des viandes halal certifiées.'
                    : 'በፍጹም። የኢትዮጵያ ባህላዊ ምግቦች እጅግ አመቺ ናቸው። አብዛኛዎቹ የባህል ምግቦቻችን የጾም ምግቦች (የጾም ባየነቱ) ናቸው። በተጨማሪም ከግሉተን ነፃ የሆነ ንፁህ የጤፍ እንጀራ ማቅረብ እንችላለን።'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER (Traveling Spoon Clone Columns + Newsletter + popular destinations list) */}
      <footer id="booking-anchor" className="bg-teal text-linen-white pt-16 pb-8 border-t-8 border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-linen-white/10">
            {/* Col 1 Brand detail (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-serif font-bold text-2xl text-gold tracking-tight">
                {translations.brandName}
              </h3>
              <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
                {currentLang === 'en'
                  ? 'Connecting travelers directly to local grandmothers and home cooks in Addis Ababa for shared culinary joy, songs, stories, and coffee ritual mindfulness.'
                  : currentLang === 'fr'
                    ? 'Connecter directement les voyageurs aux grands-mères et cuisiniers locaux à Addis-Abeba pour partager la joie culinaire, des chants, des histoires et la pleine conscience du rituel du café.'
                    : 'ተጓዦችን ከአዲስ አበባ እናቶች ጋር በምግብ ዝግጅት፣ በታሪኮች እና በቡና ማሰላሰል ሥነ-ሥርዓቶች በቀጥታ የሚያገናኝ መድረክ።'}
              </p>
              <div className="flex space-x-3 text-linen-white/60 hover:text-gold transition-colors pt-2">
                <Facebook className="w-5 h-5 hover:scale-110 cursor-pointer" />
                <Twitter className="w-5 h-5 hover:scale-110 cursor-pointer" />
                <Instagram className="w-5 h-5 hover:scale-110 cursor-pointer" />
              </div>
            </div>

            {/* Col 2 Company Info links (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'COMPANY INFO' : currentLang === 'fr' ? 'INFOS SUR L’ENTREPRISE' : 'ስለ ኩባንያው'}
              </h4>
              <ul className="space-y-2 text-xs text-linen-white/70 font-sans">
                <li><a href="#about" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'About Us' : currentLang === 'fr' ? 'À propos de nous' : 'ስለ እኛ'}</a></li>
                <li><a href="#founders" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Founders' : currentLang === 'fr' ? 'Fondateurs' : 'መስራቾች'}</a></li>
                <li><a href="#works" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'How it works' : currentLang === 'fr' ? 'Comment ça marche' : 'እንዴት እንደሚሰራ'}</a></li>
                <li><a href="#safety" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Safety Guarantee' : currentLang === 'fr' ? 'Garantie de sécurité' : 'የደህንነት ዋስትና'}</a></li>
                <li><a href="#press" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Press Center' : currentLang === 'fr' ? 'Espace presse' : 'ሚዲያ ማዕከል'}</a></li>
                <li><a href="#careers" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Careers' : currentLang === 'fr' ? 'Carrières' : 'የስራ ዕድል'}</a></li>
              </ul>
            </div>

            {/* Col 3 Join us links (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'JOIN US' : currentLang === 'fr' ? 'REJOIGNEZ-NOUS' : 'ይቀላቀሉን'}
              </h4>
              <ul className="space-y-2 text-xs text-linen-white/70 font-sans">
                <li><a href="#host" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Become a Host' : currentLang === 'fr' ? 'Devenir hôte' : 'አስተናጋጅ ይሁኑ'}</a></li>
                <li><a href="#ambassador" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Become an Ambassador' : currentLang === 'fr' ? 'Devenir ambassadeur' : 'አምባሳደር ይሁኑ'}</a></li>
                <li><a href="#agency" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Travel Agency Login' : currentLang === 'fr' ? 'Accès agences de voyage' : 'የጉዞ ወኪል መግቢያ'}</a></li>
                <li><a href="#terms" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Host Terms & Guidelines' : currentLang === 'fr' ? 'Conditions & Directives des hôtes' : 'የአስተናጋጆች መመሪያ'}</a></li>
              </ul>
            </div>

            {/* Col 4 Newsletter subscription (3 cols) */}
            <div id="newsletter-col" className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'SUBSCRIBE TO NEWSLETTER!' : currentLang === 'fr' ? 'S’ABONNER À LA NEWSLETTER !' : 'ለዜና መጽሔታችን ይመዝገቡ!'}
              </h4>
              <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
                {currentLang === 'en' ? 'Follow the rich aroma of local spices and coffee ceremony events.' : currentLang === 'fr' ? 'Suivez le riche parfum des épices locales et des cérémonies du café.' : 'የአካባቢውን ቅመማ ቅመም እና የቡና መዓዛ ክስተቶች ይከተሉ።'}
              </p>

              {newsletterSubbed ? (
                <div className="p-3 bg-gold/20 border border-gold/40 text-gold rounded-xl text-xs flex items-center space-x-2 animate-bounce">
                  <Check className="w-4 h-4 text-linen-white" />
                  <span>{currentLang === 'en' ? 'Subscribed!' : currentLang === 'fr' ? 'Abonné !' : 'ተመዝግበዋል!'}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex rounded-full overflow-hidden border border-linen-white/20 bg-linen-white/10 p-1">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Enter Email Address' : currentLang === 'fr' ? 'Entrez votre e-mail' : 'የኢሜይል አድራሻ'}
                    className="bg-transparent text-linen-white text-xs px-3 focus:outline-none w-full placeholder-linen-white/50"
                  />
                  <button
                    id="newsletter-add-btn"
                    type="submit"
                    className="bg-gold hover:bg-gold/90 text-teal px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 transform active:scale-95"
                  >
                    {currentLang === 'en' ? 'ADD ME' : currentLang === 'fr' ? 'S’INSCRIRE' : 'ጨምር'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Popular Destinations footer section matching the Traveling Spoon layout */}
          <div className="py-8 border-b border-linen-white/10">
            <h4 className="text-center font-mono text-xs uppercase tracking-widest text-gold mb-6">
              {currentLang === 'en' ? 'MOST POPULAR ADDIS ABABA DESTINATIONS' : currentLang === 'fr' ? 'DESTINATIONS LES PLUS POPULAIRES À ADDIS-ABEBA' : 'ታዋቂ የአዲስ አበባ የምግብ ልምድ ሰፈሮች'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-linen-white/60 font-sans">
              {NEIGHBORHOOD_DESTINATIONS.map((dest, idx) => (
                <a
                  key={idx}
                  href={`#neighborhood-${idx}`}
                  className="hover:text-gold transition-colors py-1 block"
                >
                  {currentLang === 'en' ? dest.nameEn : currentLang === 'fr' ? dest.nameFr : dest.nameAm}
                </a>
              ))}
            </div>
          </div>

          {/* Copyrights and Terms */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-linen-white/50 font-mono">
            <p>
              {currentLang === 'en'
                ? `Traveling Spoon © 2026. Addis Flavor concept fully integrated. All Rights Reserved.`
                : currentLang === 'fr'
                  ? `Traveling Spoon © 2026. Concept Addis Flavor entièrement intégré. Tous droits réservés.`
                  : `ትራቭሊንግ ስፑን © 2026። አዲስ ፍሌቨር በተሳካ ሁኔታ ተዋህዷል። መብቱ በህግ የተጠበቀ ነው።`}
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
              <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#cookie" className="hover:text-gold transition-colors">Cookie Policy</a>
              <a href="#blog" className="hover:text-gold transition-colors">Our Blog</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. STICKY BOOKING BAR (PULSING bottom drawer for mobile trigger) */}
      <div
        id="sticky-mobile-trigger"
        className="fixed bottom-0 left-0 right-0 z-40 bg-sandstone/95 backdrop-blur-md py-3 px-4 border-t border-teal/10 flex items-center justify-between sm:hidden"
      >
        <div>
          <span className="text-[10px] uppercase font-mono text-teal/60">{currentLang === 'en' ? 'Private Experience' : currentLang === 'fr' ? 'Expérience privée' : 'የግል መስተንግዶ'}</span>
          <p className="text-sm font-bold text-coffee-red">$25 - $49 <span className="text-[10px] text-teal/70 font-sans">/ guest</span></p>
        </div>
        <button
          id="sticky-mobile-booking-btn"
          onClick={handleOpenBooking}
          className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs uppercase font-mono font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md animate-pulse active:scale-95 transition-all"
        >
          {translations.bookNowButton}
        </button>
      </div>

      {/* 14. BOOKING FLOW MODAL WIDGET */}
      <BookingWidget
        currentLang={currentLang}
        translations={translations}
        packages={PACKAGES}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPkgId={searchSelection}
      />
    </div>
  );
}
