/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, TouchEvent } from 'react';
import {
  Check,
  ChevronDown,
  ChevronLeft,
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
  Minus,
  MapPin,
  Phone
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
import BecomeHost from './components/BecomeHost';
import OurStory from './components/OurStory';
import ContactModal from './components/ContactModal';

import heroBgImg from './assets/images/addis_hero_bg_1782233695273.jpg';
import jebenaPourImg from './assets/images/addis_jebena_pour_1782233715156.jpg';

const getShortName = (pkgId: string, lang: Language) => {
  if (pkgId === 'cooking-class') {
    return lang === 'en' ? 'Cooking Class' : lang === 'fr' ? 'Cours de cuisine' : 'የምግብ ዝግጅት';
  }
  if (pkgId === 'home-meal') {
    return lang === 'en' ? 'Home Meal' : lang === 'fr' ? "Repas chez l'habitant" : 'የቤት ውስጥ ምግብ';
  }
  return lang === 'en' ? 'Coffee Ritual' : lang === 'fr' ? 'Rituel du café' : 'የቡና ሥነ-ሥርዓት';
};

export default function App() {
  const [currentLang, setLang] = useState<Language>('en');
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
    'coffee-only': 0
  });
  const [activeView, setActiveView] = useState<'home' | 'become-host' | 'our-story'>('home');
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const translations = TRANSLATIONS[currentLang];

  const [activeBehindTheScenesId, setActiveBehindTheScenesId] = useState<string>('cooking-class');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrevBehindTheScenes = () => {
    const currentIndex = PACKAGES.findIndex(p => p.id === activeBehindTheScenesId);
    const prevIndex = (currentIndex - 1 + PACKAGES.length) % PACKAGES.length;
    setActiveBehindTheScenesId(PACKAGES[prevIndex].id);
  };

  const handleNextBehindTheScenes = () => {
    const currentIndex = PACKAGES.findIndex(p => p.id === activeBehindTheScenesId);
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
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional Dynamic SEO, AEO, and GEO Optimization Hook
  useEffect(() => {
    // 1. Set dynamic, intent-focused page title and description
    let pageTitle = "Addis Flavor | Authentic Cooking Classes & Home Meals in Addis Ababa";
    let pageDesc = "Discover authentic culinary experiences in Addis Ababa, Ethiopia. Book private cooking classes, traditional coffee ceremonies, and home cooked meals with vetted local host families. Powered by Sphere Tour and Travel.";
    
    if (currentLang === 'fr') {
      pageTitle = "Addis Flavor | Cours de cuisine authentiques & repas chez l'habitant à Addis-Abeba";
      pageDesc = "Découvrez des expériences culinaires authentiques à Addis-Abeba, Éthiopie. Réservez des cours de cuisine privés, des cérémonies du café et des repas faits maison avec des familles locales agréées. Propulsé par Sphere Tour & Travel.";
    } else if (currentLang === 'am') {
      pageTitle = "አዲስ ፍሌቨር | በአዲስ አበባ ውስጥ የባህል ምግብ ዝግጅት እና የቤት ውስጥ ምግቦች";
      pageDesc = "በአዲስ አበባ ውስጥ እውነተኛ ባህላዊ የኢትዮጵያ ምግብ ዝግጅት እና የቤት ውስጥ ምግቦች ልምዶችን ያስይዙ። በስፌር ቱር ኤንድ ትራቭል (Sphere Tour & Travel) የተዘጋጀ።";
    }

    if (activeView === 'become-host') {
      if (currentLang === 'en') {
        pageTitle = "Become a Host - Share Ethiopian Hospitality | Addis Flavor";
        pageDesc = "Join our network of passionate home cooks and host families in Addis Ababa. Earn a sustainable income while sharing traditional Ethiopian recipes and hospitality with travelers from around the globe.";
      } else if (currentLang === 'fr') {
        pageTitle = "Devenir Hôte - Partagez l'hospitalité éthiopienne | Addis Flavor";
        pageDesc = "Rejoignez notre réseau de cuisiniers passionnés et de familles d'accueil à Addis-Abeba. Gagnez un revenu durable tout en partageant des recettes traditionnelles éthiopiennes.";
      } else if (currentLang === 'am') {
        pageTitle = "አስተናጋጅ ይሁኑ - የኢትዮጵያን እንግዳ ተቀባይነት ያካፍሉ | አዲስ ፍሌቨር";
        pageDesc = "በአዲስ አበባ ውስጥ ፍቅር ካላቸው የቤት ውስጥ አብሳይዎች እና አስተናጋጅ ቤተሰቦች ጋር ይቀላቀሉ። ባህላዊ የኢትዮጵያ ምግቦችን እና እንግዳ ተቀባይነትን ለአለም ያጋሩ።";
      }
    } else if (activeView === 'our-story') {
      if (currentLang === 'en') {
        pageTitle = "Our Story - Powered by Sphere Tour & Travel Ethiopia | Addis Flavor";
        pageDesc = "Learn about Addis Flavor, a premium culinary initiative operated by Sphere Tour and Travel, Addis Ababa's leading sustainable tour agency. Meet our founders and read our community vetting safety guidelines.";
      } else if (currentLang === 'fr') {
        pageTitle = "Notre histoire - Par Sphere Tour & Travel Éthiopie | Addis Flavor";
        pageDesc = "Découvrez l'histoire d'Addis Flavor, une initiative culinaire exclusive opérée par Sphere Tour and Travel, l'agence leader du tourisme durable à Addis-Abeba.";
      } else if (currentLang === 'am') {
        pageTitle = "ታሪካችን - በስፌር ቱር ኤንድ ትራቭል ኢትዮጵያ የተዘጋጀ | አዲስ ፍሌቨር";
        pageDesc = "ስለ አዲስ ፍሌቨር እና ስለ ስፌር ቱር ኤንድ ትራቭል ኢትዮጵያ ትብብር ይረዱ። የአካባቢውን ቤተሰቦች በዘላቂ ቱሪዝም እና በምግብ ጥበብ እናበቃለን።";
      }
    }

    document.title = pageTitle;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // 2. Generate and inject JSON-LD multi-entity structured data graph
    const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://sphere-voyage-ethiopie.com';
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TravelAgency",
          "@id": "https://sphere-voyage-ethiopie.com/#agency",
          "name": "Sphere Tour and Travel Ethiopia",
          "alternateName": "Sphere Voyage Éthiopie",
          "url": "https://sphere-voyage-ethiopie.com/en/sphere-travel-ethiopia.html",
          "logo": `${siteOrigin}/assets/images/addis_jebena_pour_1782233715156.jpg`,
          "image": `${siteOrigin}/assets/images/addis_hero_bg_1782233695273.jpg`,
          "description": "Licensed and leading tour operator based in Addis Ababa, Ethiopia, specializing in sustainable, immersive, and cultural journeys like Addis Flavor.",
          "telephone": "+251911209882",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220",
            "addressLocality": "Addis Ababa",
            "addressRegion": "Addis Ababa",
            "addressCountry": "ET"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "9.0145",
            "longitude": "38.7505"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+251911209882",
            "contactType": "customer service",
            "areaServed": "Worldwide",
            "availableLanguage": ["English", "Amharic", "French"]
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": `${siteOrigin}/#brand`,
          "name": "Addis Flavor",
          "parentOrganization": {
            "@type": "TravelAgency",
            "@id": "https://sphere-voyage-ethiopie.com/#agency"
          },
          "description": "Premium local culinary initiative offering immersive home dining, cooking classes, and traditional coffee ceremonies with local vetted hosts in Addis Ababa.",
          "url": `${siteOrigin}/`,
          "telephone": "+251911209882",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bole, Piazza, Yeka, Guellele",
            "addressLocality": "Addis Ababa",
            "addressCountry": "ET"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${siteOrigin}/#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${siteOrigin}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": activeView === 'become-host' ? "Become a Host" : activeView === 'our-story' ? "Our Story" : "Experiences",
              "item": activeView === 'become-host' 
                ? `${siteOrigin}/#become-host`
                : activeView === 'our-story'
                  ? `${siteOrigin}/#our-story`
                  : `${siteOrigin}/#experiences`
            }
          ]
        },
        {
          "@type": "TouristTrip",
          "@id": `${siteOrigin}/#trip-cooking-class`,
          "name": "Addis Ababa Master Cooking Class",
          "description": "Learn the secrets of ancient Ethiopian cooking under the guidance of a friendly neighborhood host. Bake teff sourdough Injera and stir spicy wots from scratch.",
          "touristType": "Food and Culture Lovers",
          "subTrip": {
            "@type": "TouristTrip",
            "duration": "PT4H"
          },
          "provider": {
            "@type": "TravelAgency",
            "@id": "https://sphere-voyage-ethiopie.com/#agency"
          },
          "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "eligibleRegion": {
              "@type": "Place",
              "name": "Addis Ababa, Ethiopia"
            },
            "category": "Culinary Tour"
          }
        },
        {
          "@type": "TouristTrip",
          "@id": `${siteOrigin}/#trip-home-meal`,
          "name": "Local Home Meal Experience & Coffee Ceremony",
          "description": "Dine around a traditional Mesob basket, share the multi-dish Beyaynetu feast (or rich meat doro wat), and experience authentic warmth with songs and stories inside a private Addis Ababa family home.",
          "touristType": "Culinary Travelers",
          "subTrip": {
            "@type": "TouristTrip",
            "duration": "PT2.5H"
          },
          "provider": {
            "@type": "TravelAgency",
            "@id": "https://sphere-voyage-ethiopie.com/#agency"
          },
          "offers": {
            "@type": "Offer",
            "price": "35.00",
            "priceCurrency": "USD",
            "eligibleRegion": {
              "@type": "Place",
              "name": "Addis Ababa, Ethiopia"
            },
            "category": "Private Home Dining"
          }
        },
        {
          "@type": "TouristTrip",
          "@id": `${siteOrigin}/#trip-coffee-only`,
          "name": "The Sacred Coffee Ceremony & Mindfulness Ritual",
          "description": "An intimate, spiritual immersion into the world's original coffee culture. Learn the slow three-pour brewing method using the clay Jebena.",
          "touristType": "Coffee Enthusiasts & Spiritual Seekers",
          "subTrip": {
            "@type": "TouristTrip",
            "duration": "PT1.5H"
          },
          "provider": {
            "@type": "TravelAgency",
            "@id": "https://sphere-voyage-ethiopie.com/#agency"
          },
          "offers": {
            "@type": "Offer",
            "price": "25.00",
            "priceCurrency": "USD",
            "eligibleRegion": {
              "@type": "Place",
              "name": "Addis Ababa, Ethiopia"
            },
            "category": "Cultural Ritual"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${siteOrigin}/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where do the Addis Flavor cooking classes and food experiences take place?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All sessions and traditional coffee ceremonies are held inside the private family kitchens and green gardens of vetted local host families in cozy Addis Ababa neighborhoods like Bole, Piazza, Yeka, and Guellele. Secure addresses are sent immediately upon booking confirmation."
              }
            },
            {
              "@type": "Question",
              "name": "How does pricing and payment work for Addis Flavor tours?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Addis Flavor offers professional private tours starting at $25 to $49 per person. Payment is highly flexible: no immediate credit card charges are made on our website. You pay your host directly on-site during your session using cash or local electronic wallet options like Telebirr."
              }
            },
            {
              "@type": "Question",
              "name": "What are the durations of the culinary tours?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Addis Ababa Master Cooking Class lasts between 3.5 to 4 hours. The Local Home Meal Experience takes 2 to 2.5 hours, and The Sacred Coffee Ceremony is a 1.5-hour intimate mindfulness ritual."
              }
            },
            {
              "@type": "Question",
              "name": "Can traditional Ethiopian meals accommodate vegan, vegetarian, or gluten-free diets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Ethiopian Orthodox Christian fasting rules make more than half of our dishes naturally vegan (the 'Bayenetu' platter). Additionally, we provide 100% pure gluten-free Teff Injera, dairy-free options, and strictly halal-vetted meats upon request."
              }
            },
            {
              "@type": "Question",
              "name": "What is the relationship between Addis Flavor and Sphere Tour and Travel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Addis Flavor is an exclusive, locally managed culinary experience designed, operated, and backed by Sphere Tour and Travel, a leading fully licensed tour operator based in Addis Ababa, Ethiopia. Sphere Travel ensures optimal transit safety, certified hosts, and sustainable tourism standards."
              }
            }
          ]
        }
      ]
    };

    let script = document.getElementById('json-ld-seo');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('id', 'json-ld-seo');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [activeView, currentLang]);

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
      {/* FULL PAGE PROGRESS SCROLL BAR FIXED AT TOP */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gold/25 z-[100] pointer-events-none">
        <div 
          className="h-full bg-coffee-red transition-all duration-75 ease-out shadow-[0_0_8px_rgba(196,75,59,0.8)]" 
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

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
        onContactClick={() => setIsContactOpen(true)}
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        isGlobalDark={isGlobalDark}
      />

      {activeView === 'become-host' ? (
        <BecomeHost
          currentLang={currentLang}
          isGlobalDark={isGlobalDark}
          onBackToHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : activeView === 'our-story' ? (
        <OurStory
          currentLang={currentLang}
          isGlobalDark={isGlobalDark}
          onBackToHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBookClick={handleOpenBooking}
        />
      ) : (
        <>
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
            <div 
              className="bg-linen-white/10 backdrop-blur-md border border-linen-white/20 p-2 rounded-full flex items-center shadow-2xl transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
              aria-haspopup="listbox"
              aria-expanded={isSelectFocused}
            >
              <div className="pl-4 text-linen-white/80">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <label htmlFor="hero-experience-search" className="sr-only">
                {translations.heroSearchPlaceholder}
              </label>
              <select
                id="hero-experience-search"
                aria-label={translations.heroSearchPlaceholder}
                value={searchSelection}
                onChange={(e) => handleSelectSearchPackage(e.target.value)}
                onFocus={() => setIsSelectFocused(true)}
                onBlur={() => setIsSelectFocused(false)}
                className="w-full bg-transparent text-linen-white text-xs sm:text-sm font-semibold py-2.5 px-3 focus:outline-none cursor-pointer placeholder-linen-white/60 select-reset appearance-none focus-visible:outline-none"
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
                className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider px-8 py-3 sm:px-6 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-1 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
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
      <section id="key-benefits" className="py-6 bg-linen-white border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Vetted badge */}
            <div id="benefit-vetted" className="flex flex-col items-center p-2 group">
              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center transition-all duration-300 mb-2 border border-gold/20 group-hover:scale-105">
                <ShieldCheck className="w-6 h-6 text-coffee-red" />
              </div>
              <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteeVetted}
              </h3>
              <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
                {translations.guaranteeVettedSub}
              </p>
            </div>

            {/* Satisfaction badge */}
            <div id="benefit-satisfaction" className="flex flex-col items-center p-2 group">
              <div className="w-12 h-12 rounded-full bg-coffee-red/10 text-coffee-red flex items-center justify-center transition-all duration-300 mb-2 border border-coffee-red/20 group-hover:scale-105">
                <span className="font-serif font-extrabold text-xs text-gold">100%</span>
              </div>
              <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteeTitle}
              </h3>
              <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
                {translations.guaranteeTitleSub}
              </p>
            </div>

            {/* Private experience badge */}
            <div id="benefit-private" className="flex flex-col items-center p-2 group">
              <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center transition-all duration-300 mb-2 border border-teal/20 group-hover:scale-105">
                <Heart className="w-5 h-5 text-gold animate-none" />
              </div>
              <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                {translations.guaranteePrivate}
              </h3>
              <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
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
          <div className={`grid grid-cols-1 ${expandedPkgId ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
            {PACKAGES.map((pkg) => {
              const isExpanded = expandedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  id={`experience-card-${pkg.id}`}
                  className={`bg-linen-white text-teal rounded-3xl border border-teal/10 shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                    isExpanded 
                      ? 'lg:col-span-2 border-gold/40 ring-1 ring-gold/20 order-first' 
                      : expandedPkgId 
                        ? 'lg:col-span-1 order-last' 
                        : 'lg:col-span-1'
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
                        loading="lazy"
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
                          onClick={() => {
                            const willExpand = !isExpanded;
                            setExpandedPkgId(willExpand ? pkg.id : null);
                            if (willExpand) {
                              setTimeout(() => {
                                const element = document.getElementById(`experience-card-${pkg.id}`);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 300);
                            }
                          }}
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

      {/* 8. BEHIND THE SCENES VIBRANT ACCORDION SLIDER */}
      <section id="scrollytelling-showcase" className="py-16 bg-sandstone/35 relative overflow-hidden border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-teal font-extrabold">
              {currentLang === 'en' ? 'Taste the Soul: Behind the Scenes' : currentLang === 'fr' ? 'Goûtez l’âme : Coulisses' : 'የአዲስ ፍሌቨር በስተጀርባ ታሪኮች'}
            </h2>
            <p className="text-[10px] font-mono uppercase text-coffee-red tracking-widest mt-1.5 font-bold">
              {currentLang === 'en' ? 'SENSORY IMMERSION STAGE' : currentLang === 'fr' ? 'PHASE D’IMMERSION SENSORIELLE' : 'የስሜት ህዋሳት ማነቃቂያ ደረጃ'}
            </p>
          </div>
          {/* Navigation Controls on top-right */}
          <div className="flex justify-center md:justify-end items-center space-x-2">
            <button
              onClick={handlePrevBehindTheScenes}
              className={`p-2.5 rounded-full border transition-all duration-300 focus:outline-none shadow-sm ${
                isGlobalDark 
                  ? 'border-linen-white/10 text-linen-white hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-dark-bg/60' 
                  : 'border-teal/10 text-teal hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-linen-white'
              }`}
              aria-label="Previous Section"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextBehindTheScenes}
              className={`p-2.5 rounded-full border transition-all duration-300 focus:outline-none shadow-sm ${
                isGlobalDark 
                  ? 'border-linen-white/10 text-linen-white hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-dark-bg/60' 
                  : 'border-teal/10 text-teal hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-linen-white'
              }`}
              aria-label="Next Section"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DESKTOP ACCORDION SLIDER VIEW (md: and above) */}
        <div 
          className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[540px] gap-4 w-full select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {PACKAGES.map((pkg, pIdx) => {
            const isSelected = activeBehindTheScenesId === pkg.id;
            const currentActiveIdx = activeScrollyStep[pkg.id] || 0;
            const steps = currentLang === 'en' ? pkg.stepsEn : currentLang === 'fr' ? pkg.stepsFr : pkg.stepsAm;
            const stepsDesc = currentLang === 'en' ? pkg.stepsDescEn : currentLang === 'fr' ? pkg.stepsDescFr : pkg.stepsDescAm;

            if (!isSelected) {
              return (
                <button
                  key={pkg.id}
                  onClick={() => setActiveBehindTheScenesId(pkg.id)}
                  className={`flex-[0.5] min-w-[90px] h-full relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-700 ease-in-out border shadow-md hover:flex-[0.7] focus:outline-none ${
                    isGlobalDark ? 'border-linen-white/10 bg-dark-bg/40' : 'border-teal/10 bg-linen-white'
                  }`}
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.nameEn}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-75 filter brightness-[0.45] saturate-[0.8] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />
                  
                  {/* Rotated text and indicators */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between py-10 select-none">
                    <span className="font-mono text-xs border border-linen-white/20 rounded-full w-8 h-8 flex items-center justify-center bg-black/30 text-gold shadow-md font-bold">
                      0{pIdx + 1}
                    </span>
                    <div className="whitespace-nowrap uppercase text-xs tracking-widest font-serif font-bold text-linen-white/90 [writing-mode:vertical-lr] rotate-180 bg-black/35 backdrop-blur-[2px] py-3 px-2 rounded-xl border border-white/5 shadow-md">
                      {getShortName(pkg.id, currentLang)}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" />
                  </div>
                </button>
              );
            }

            return (
              <div
                key={pkg.id}
                className={`flex-[3.5] h-full relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out border shadow-xl bg-linen-white ring-1 ${
                  isGlobalDark ? 'border-gold/30 ring-gold/15' : 'border-gold/20 ring-gold/10'
                }`}
              >
                <img
                  src={pkg.imageUrl}
                  alt={pkg.nameEn}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter saturate-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

                {/* Top Info Header Overlay */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-gold/90 text-teal rounded-full shadow-sm">
                      {currentLang === 'en' ? pkg.tagEn : currentLang === 'fr' ? pkg.tagFr : pkg.tagAm}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white drop-shadow-md">
                      {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm}
                    </h3>
                  </div>
                  <div className="bg-black/35 backdrop-blur-[2px] border border-white/10 text-gold px-4 py-2 rounded-2xl text-right flex flex-col justify-center">
                    <span className="font-mono text-[9px] uppercase opacity-75">{currentLang === 'en' ? 'Price' : currentLang === 'fr' ? 'Tarif' : 'ዋጋ'}</span>
                    <span className="text-sm font-serif font-bold text-linen-white">${pkg.price} USD</span>
                  </div>
                </div>

                {/* Bottom Interactive Dashboard Glass Card - Optimised transparency */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/45 backdrop-blur-[4px] border border-white/10 rounded-2xl p-5 text-white space-y-4 shadow-lg z-10">
                  <p className="text-xs text-white/95 leading-relaxed max-w-4xl font-sans drop-shadow-xs">
                    {currentLang === 'en' ? pkg.descEn : currentLang === 'fr' ? pkg.descFr : pkg.descAm}
                  </p>
                  
                  {/* Step Detail Inside Glass Block */}
                  <div className="pt-3.5 border-t border-white/10 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                    <div className="space-y-1 max-w-2xl">
                      <span className="text-[10px] font-mono text-gold uppercase tracking-widest block font-bold">
                        {currentLang === 'en' ? `STAGE 0${currentActiveIdx + 1} OF 0${steps.length}: ` : currentLang === 'fr' ? `ÉTAPE 0${currentActiveIdx + 1} SUR 0${steps.length}: ` : `ደረጃ 0${currentActiveIdx + 1} ከ 0${steps.length}: `}
                        <span className="text-white font-extrabold ml-1">{steps[currentActiveIdx]}</span>
                      </span>
                      <p className="text-xs text-white/90 leading-relaxed font-sans drop-shadow-xs">
                        {stepsDesc[currentActiveIdx]}
                      </p>
                    </div>
                    
                    {/* Circle buttons to toggle step */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {steps.map((_, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setActiveScrollyStep({
                              ...activeScrollyStep,
                              [pkg.id]: sIdx
                            });
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                            sIdx === currentActiveIdx
                              ? 'bg-coffee-red text-white scale-110 shadow-md ring-2 ring-white/30'
                              : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                          }`}
                        >
                          {sIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE CAROUSEL & IMMERSIVE STAGE VIEW (Below md) - Full Width Enhanced */}
        <div className="block md:hidden w-full max-w-3xl mx-auto px-4 sm:px-6">
          {(() => {
            const pkg = PACKAGES.find(p => p.id === activeBehindTheScenesId) || PACKAGES[0];
            const currentActiveIdx = activeScrollyStep[pkg.id] || 0;
            const steps = currentLang === 'en' ? pkg.stepsEn : currentLang === 'fr' ? pkg.stepsFr : pkg.stepsAm;
            const stepsDesc = currentLang === 'en' ? pkg.stepsDescEn : currentLang === 'fr' ? pkg.stepsDescFr : pkg.stepsDescAm;

            return (
              <div 
                className={`border rounded-3xl overflow-hidden shadow-lg select-none transition-all duration-300 ${
                  isGlobalDark ? 'border-linen-white/10 bg-dark-bg/60' : 'border-teal/10 bg-linen-white'
                }`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Hero Image Section */}
                <div className="h-[250px] relative">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.nameEn}
                    className="w-full h-full object-cover filter saturate-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Top indicators */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <span className="inline-block px-2.5 py-1 text-[8px] font-mono font-bold bg-gold text-teal rounded-full shadow-sm">
                      {currentLang === 'en' ? pkg.tagEn : currentLang === 'fr' ? pkg.tagFr : pkg.tagAm}
                    </span>
                    <span className="bg-black/35 backdrop-blur-[2px] border border-white/10 text-white font-mono text-[9px] px-2 py-1 rounded-lg">
                      ${pkg.price} USD
                    </span>
                  </div>

                  {/* Experience Title */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-lg font-serif font-extrabold text-white drop-shadow-sm">
                      {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm}
                    </h3>
                  </div>
                </div>

                {/* Experience Body details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs opacity-80 leading-relaxed font-sans">
                    {currentLang === 'en' ? pkg.descEn : currentLang === 'fr' ? pkg.descFr : pkg.descAm}
                  </p>

                  {/* Quick step selectors */}
                  <div className="border-t border-teal/10 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-red font-bold">
                        {currentLang === 'en' ? 'Sensory Stage' : currentLang === 'fr' ? 'Étape Sensorielle' : 'የስሜት ህዋሳት ደረጃ'}
                      </span>
                      <div className="flex space-x-1.5">
                        {steps.map((_, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              setActiveScrollyStep({
                                ...activeScrollyStep,
                                [pkg.id]: sIdx
                              });
                            }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                              sIdx === currentActiveIdx
                                ? 'bg-coffee-red text-white scale-115 shadow-sm'
                                : 'bg-teal/5 text-teal hover:bg-teal/10'
                            }`}
                          >
                            {sIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isGlobalDark ? 'bg-linen-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
                    }`}>
                      <h4 className="text-[10px] font-mono uppercase tracking-wider text-teal font-extrabold">
                        {steps[currentActiveIdx]}
                      </h4>
                      <p className="text-xs opacity-80 mt-1.5 font-sans leading-relaxed">
                        {stepsDesc[currentActiveIdx]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* DOTS PAGINATION (Vibrant indicators matching screenshot) */}
        <div className="flex justify-center space-x-2 mt-6">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setActiveBehindTheScenesId(pkg.id)}
              className={`h-2 transition-all duration-300 rounded-full ${
                activeBehindTheScenesId === pkg.id 
                  ? 'w-6 bg-coffee-red shadow-[0_0_8px_rgba(196,75,59,0.5)]' 
                  : 'w-2 bg-teal/20'
              }`}
              aria-label={`Go to ${pkg.nameEn}`}
            />
          ))}
        </div>
      </section>

      {/* 9 & 10. VETTED HOSTS & COFFEE RITUAL DEEP DIVE (SIDE BY SIDE ROW ON DESKTOP) */}
      <section id="vetted-and-ritual-row" className="py-12 bg-linen-white border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: 100% Vetted Hosts (5 cols out of 12) */}
            <div id="host-section-compact" className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[9px] font-mono uppercase text-coffee-red tracking-widest block font-bold">
                  {currentLang === 'en' ? 'LOCAL TRUST' : currentLang === 'fr' ? 'CONFIANCE LOCALE' : 'የአካባቢ እምነት'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-teal font-extrabold mt-1">
                  {translations.vettedTitle}
                </h2>
                <div className="w-12 h-1 bg-coffee-red mt-2 mb-4 rounded-full" />
                <p className="text-xs sm:text-sm text-teal/85 font-bold leading-relaxed mb-3">
                  {translations.vettedSub}
                </p>
                <p className="text-xs sm:text-sm text-teal/70 leading-relaxed">
                  {translations.vettedDesc}
                </p>
              </div>

              {/* Three detailed list items in compact format */}
              <div className="grid grid-cols-1 gap-2.5">
                {/* 1. In-home Meals */}
                <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0 text-lg">
                    🍲
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                      {currentLang === 'en' ? 'In-home Meals' : currentLang === 'fr' ? 'Repas à la maison' : 'የቤት ውስጥ ባህላዊ ምግቦች'}
                      <span className="font-mono text-[9px] text-coffee-red font-semibold ml-2">
                        (1.5 - 2 hrs)
                      </span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                      {currentLang === 'en'
                        ? 'Experience the joy of an authentic homemade feast, eating exactly the way the locals do while discussing local history, culinary lore, and social customs.'
                        : currentLang === 'fr'
                          ? 'Découvrez la joie d’un festin fait maison authentique, en mangeant exactement comme les locaux tout en discutant de l’histoire locale, des traditions culinaires et des coutumes sociales.'
                          : 'የእውነተኛ የቤት ውስጥ የባህል ምግቦችን ደስታ ይለማመዱ፣ ስለ አካባቢው ታሪክ፣ ባህላዊ የምግብ አሰራር ዘዴዎች እና ማህበራዊ ልማዶች እየተጫወቱ ልክ እንደ ሃገሩ ሰው ይመገቡ።'}
                    </p>
                  </div>
                </div>

                {/* 2. Cooking Experiences */}
                <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 text-lg">
                    🍳
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                      {currentLang === 'en' ? 'Cooking Experiences' : currentLang === 'fr' ? 'Expériences culinaires' : 'የምግብ ማብሰል ልምዶች'}
                      <span className="font-mono text-[9px] text-gold font-semibold ml-2">
                        (3 - 4 hrs)
                      </span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                      {currentLang === 'en'
                        ? 'Discover ancient culinary traditions passed down through generations. Whip stews, knead teff, and learn to roast raw beans over live charcoal.'
                        : currentLang === 'fr'
                          ? 'Découvrez des traditions culinaires ancestrales transmises de génération en génération. Préparez des ragoûts, pétrissez le teff et apprenez à torréfier les grains crus sur du charbon de bois.'
                          : 'ለትውልድ የተላለፉ ጥንታዊ የምግብ ዝግጅት ወጎችን ያግኙ። ወጦችን ማብሰል፣ ጤፍ ማቡካት እና ጥሬ የቡና ፍሬዎችን በከሰል እሳት ላይ መቁላት ይማሩ።'}
                    </p>
                  </div>
                </div>

                {/* 3. Market Visits */}
                <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 text-lg">
                    🌍
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                      {currentLang === 'en' ? 'Market visits' : currentLang === 'fr' ? 'Visites de marchés' : 'የገበያ ጉብኝቶች'}
                      <span className="font-mono text-[9px] text-teal font-semibold ml-2">
                        (1 - 2 hrs)
                      </span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                      {currentLang === 'en'
                        ? 'Explore a vibrant nearby open-air market with your host, discovering the best local cardamoms, cinnamon, pure butter, and organic produce.'
                        : currentLang === 'fr'
                          ? 'Explorez un marché de plein air animé à proximité avec votre hôte, en découvrant les meilleures cardamomes locales, la cannelle, le beurre pur et les produits biologiques.'
                          : 'ከአስተናጋጅዎ ጋር በመሆን በአቅራቢያዎ የሚገኘውን ደማቅ ክፍት ገበያ ይጎብኙ፣ ምርጡን ኮረሪማ፣ የቁንዶ በርበሬ፣ ቂቤ እና ኦርጋኒክ ሰብሎችን ያግኙ።'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact elegant quote block with custom styling to replace the giant image column */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm p-4 bg-gradient-to-r from-teal to-teal/90 text-white border border-teal/10">
                <blockquote className="text-sm sm:text-base font-serif italic text-gold leading-relaxed">
                  {currentLang === 'en'
                    ? '"Addis Flavor is a brilliant idea. The world needs it."'
                    : currentLang === 'fr'
                      ? '"Addis Flavor est une idée géniale. Le monde en a besoin."'
                      : '«አዲስ ፍሌቨር ድንቅ ሃሳብ ነው። ዓለም እጅግ ይፈልገዋል!»'}
                </blockquote>
                <p className="font-mono text-[9px] uppercase tracking-widest text-linen-white/70 mt-1.5 text-right">
                  {currentLang === 'en' ? '– Alice Waters, Chef & Activist' : currentLang === 'fr' ? '– Alice Waters, Chef & Activiste' : '– አሊስ ዋተርስ፣ ታዋቂ ሼፍ'}
                </p>
              </div>
            </div>

            {/* Right Column: The Sacred Coffee Ritual (JebenaDeepDive rendered inside) (7 cols out of 12) */}
            <div className="lg:col-span-7 h-full border border-teal/5 bg-sandstone/15 rounded-3xl p-6 shadow-md flex flex-col justify-center">
              <JebenaDeepDive
                currentLang={currentLang}
                translations={translations}
                isGlobalDark={isGlobalDark}
                setGlobalDark={setGlobalDark}
              />
            </div>

          </div>
        </div>
      </section>

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
      <section id="faq-section" className="py-12 md:py-16 bg-linen-white border-b border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-teal">
              {currentLang === 'en' ? 'Frequently Asked Questions' : currentLang === 'fr' ? 'Foire Aux Questions' : 'ተደጋግመው የሚጠየቁ ጥያቄዎች'}
            </h2>
            <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded-full" />
          </div>

          <div className="space-y-3 divide-y divide-teal/10">
            {/* FAQ 1 */}
            <div className="pt-3">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
              >
                <h3 className="font-serif font-bold text-sm sm:text-base text-teal group-hover:text-coffee-red transition-colors">
                  {currentLang === 'en' ? 'Where do these experiences take place?' : currentLang === 'fr' ? 'Où se déroulent ces expériences ?' : 'ልምዶቹ የት ነው የሚከናወኑት?'}
                </h3>
                <ChevronDown className={`w-4 h-4 text-teal/40 group-hover:text-coffee-red transition-transform duration-300 flex-shrink-0 ml-4 ${openFaqIndex === 0 ? 'rotate-180 text-coffee-red' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === 0 ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs sm:text-sm text-teal/70 leading-relaxed font-sans pb-3">
                  {currentLang === 'en'
                    ? 'Most of these home cooking experiences and coffee ceremonies are held inside cozy, real local host kitchens and residential compounds. The exact address is sent immediately after booking validation.'
                    : currentLang === 'fr'
                      ? "La plupart de ces expériences de cuisine à domicile et de cérémonies du café se déroulent au sein de cuisines d'hôtes locales chaleureuses et authentiques. L'adresse exacte vous sera envoyée dès la confirmation de votre réservation."
                      : 'አብዛኞቹ የቤት ውስጥ የምግብ ዝግጅት እና የቡና ሥነ-ሥርዓት ተሞክሮዎች ምቹ በሆኑ የአካባቢው አስተናጋጅ የመኖሪያ ግቢ ውስጥ በሚገኙ ኩሽናዎች ውስጥ ይከናወናሉ። ትክክለኛው አድራሻ ቦታ ማስያዝዎ እንደተረጋገጠ ወዲያውኑ ይላካል።'}
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="pt-3">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
              >
                <h3 className="font-serif font-bold text-sm sm:text-base text-teal group-hover:text-coffee-red transition-colors">
                  {currentLang === 'en' ? 'How does payment work?' : currentLang === 'fr' ? 'Comment fonctionne le paiement ?' : 'ክፍያ እንዴት ነው የሚሰራው?'}
                </h3>
                <ChevronDown className={`w-4 h-4 text-teal/40 group-hover:text-coffee-red transition-transform duration-300 flex-shrink-0 ml-4 ${openFaqIndex === 1 ? 'rotate-180 text-coffee-red' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === 1 ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs sm:text-sm text-teal/70 leading-relaxed font-sans pb-3">
                  {currentLang === 'en'
                    ? 'This website simulates local booking authorization. No immediate cash is charged from your card. You pay your host directly on-site or via flexible electronic options (Telebirr/Cash) during your culinary session.'
                    : currentLang === 'fr'
                      ? 'Ce site simule une autorisation de réservation locale. Aucun débit immédiat n’est effectué sur votre carte. Vous payez votre hôte directement sur place ou par des moyens électroniques flexibles (Telebirr/espèces) durant votre atelier culinaire.'
                      : 'ይህ ድረ-ገጽ የቦታ ማስያዣዎችን ሂደት የሚያሳይ ነው። ምንም ዓይነት ክፍያ ከካርድዎ ላይ በቀጥታ አይቆረጥም። የአስተናጋጅዎን ክፍያ በአካል ሲገናኙ ወይም በቴሌብር/በጥሬ ገንዘብ በቀጥታ መክፈል ይችላሉ።'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER (Traveling Spoon Clone Columns + Newsletter + popular destinations list) - Vertically Compressed & Optimized */}
      <footer id="booking-anchor" className="bg-teal text-linen-white pt-8 pb-4 md:pt-2 md:pb-1.5 border-t-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-x-4 md:gap-y-1 lg:gap-6 pb-6 md:pb-1.5 border-b border-linen-white/10">
            {/* Col 1 Brand detail */}
            <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h3 className="font-serif font-bold text-xl text-gold tracking-tight animate-fade-in">
                {translations.brandName}
              </h3>
              <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
                {currentLang === 'en'
                  ? 'Connecting travelers directly to local grandmothers and home cooks in Addis Ababa for shared culinary joy, songs, stories, and coffee ritual mindfulness.'
                  : currentLang === 'fr'
                    ? 'Connecter directement les voyageurs aux grands-mères et cuisiniers locaux à Addis-Abeba pour partager la joie culinaire, des chants, des histoires et la pleine conscience du rituel du café.'
                    : 'ተጓዦችን ከአዲስ አበባ እናቶች ጋር በምግብ ዝግጅት፣ በታሪኮች እና በቡና ማሰላሰል ሥነ-ሥርዓቶች በቀጥታ የሚያገናኝ መድረክ።'}
              </p>
              <div className="flex space-x-3 text-linen-white/60 hover:text-gold transition-colors pt-0.5">
                <Facebook className="w-4 h-4 hover:scale-110 cursor-pointer" />
                <Twitter className="w-4 h-4 hover:scale-110 cursor-pointer" />
                <Instagram className="w-4 h-4 hover:scale-110 cursor-pointer" />
              </div>
            </div>

            {/* Col 2 Company Info links */}
            <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'COMPANY INFO' : currentLang === 'fr' ? 'INFOS SUR L’ENTREPRISE' : 'ስለ ኩባንያው'}
              </h4>
              <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
                <li><a href="#about" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'About Us' : currentLang === 'fr' ? 'À propos de nous' : 'ስለ እኛ'}</a></li>
                <li><a href="#founders" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Founders' : currentLang === 'fr' ? 'Fondateurs' : 'መስራቾች'}</a></li>
                <li><a href="#works" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'How it works' : currentLang === 'fr' ? 'Comment ça marche' : 'እንዴት እንደሚሰራ'}</a></li>
                <li><a href="#safety" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Safety Guarantee' : currentLang === 'fr' ? 'Garantie de sécurité' : 'የደህንነት ዋስትና'}</a></li>
                <li><a href="#press" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Press Center' : currentLang === 'fr' ? 'Espace presse' : 'ሚዲያ ማዕከል'}</a></li>
                <li><a href="#careers" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Careers' : currentLang === 'fr' ? 'Carrières' : 'የስራ ዕድል'}</a></li>
              </ul>
            </div>

            {/* Col 3 Join us links */}
            <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'JOIN US' : currentLang === 'fr' ? 'REJOIGNEZ-NOUS' : 'ይቀላቀሉን'}
              </h4>
              <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
                <li>
                  <button
                    onClick={() => {
                      setActiveView('become-host');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-gold transition-colors text-left"
                  >
                    {currentLang === 'en' ? 'Become a Host' : currentLang === 'fr' ? 'Devenir hôte' : 'አስተናጋጅ ይሁኑ'}
                  </button>
                </li>
                <li><a href="#ambassador" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Become an Ambassador' : currentLang === 'fr' ? 'Devenir ambassadeur' : 'አምባሳደር ይሁኑ'}</a></li>
                <li><a href="#agency" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Travel Agency Login' : currentLang === 'fr' ? 'Accès agences de voyage' : 'የጉዞ ወኪል መግቢያ'}</a></li>
                <li><a href="#terms" className="hover:text-gold transition-colors">{currentLang === 'en' ? 'Host Terms & Guidelines' : currentLang === 'fr' ? 'Conditions & Directives des hôtes' : 'የአስተናጋጆች መመሪያ'}</a></li>
              </ul>
            </div>

            {/* Col 4 Newsletter subscription */}
            <div id="newsletter-col" className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'SUBSCRIBE TO NEWSLETTER!' : currentLang === 'fr' ? 'S’ABONNER À LA NEWSLETTER !' : 'ለዜና መጽሔታችን ይመዝገቡ!'}
              </h4>
              <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
                {currentLang === 'en' ? 'Follow the rich aroma of local spices and coffee ceremony events.' : currentLang === 'fr' ? 'Suivez le riche parfum des épices locales et des cérémonies du café.' : 'የአካባቢውን ቅመማ ቅመም እና የቡና መዓዛ ክስተቶች ይከተሉ።'}
              </p>

              {newsletterSubbed ? (
                <div className="p-2.5 bg-gold/20 border border-gold/40 text-gold rounded-xl text-xs flex items-center space-x-2 animate-bounce">
                  <Check className="w-3.5 h-3.5 text-linen-white" />
                  <span>{currentLang === 'en' ? 'Subscribed!' : currentLang === 'fr' ? 'Abonné !' : 'ተመዝግበዋል!'}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex rounded-full overflow-hidden border border-linen-white/20 bg-linen-white/10 p-0.5">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Enter Email Address' : currentLang === 'fr' ? 'Entrez votre e-mail' : 'የኢሜይል አድራሻ'}
                    className="bg-transparent text-linen-white text-xs px-2.5 focus:outline-none w-full placeholder-linen-white/40"
                  />
                  <button
                    id="newsletter-add-btn"
                    type="submit"
                    className="bg-gold hover:bg-gold/90 text-teal px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-300 transform active:scale-95 flex-shrink-0"
                  >
                    {currentLang === 'en' ? 'ADD ME' : currentLang === 'fr' ? 'S’INSCRIRE' : 'ጨምር'}
                  </button>
                </form>
              )}
            </div>

            {/* Col 5 Sphere Head Office */}
            <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                {currentLang === 'en' ? 'SPHERE HEAD OFFICE' : currentLang === 'fr' ? 'SIÈGE SOCIAL SPHERE' : 'ስፌር ዋና መስሪያ ቤት'}
              </h4>
              <div className="space-y-2 md:space-y-0.5 lg:space-y-2 text-xs text-linen-white/70 font-sans">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220, Addis Ababa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <a href="tel:0911209882" className="hover:text-gold transition-colors font-mono font-sans">091 120 9882</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <a href="mailto:info@sphere-voyage-ethiopie.com" className="hover:text-gold transition-colors break-all font-sans">info@sphere-voyage-ethiopie.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations footer section matching the Traveling Spoon layout */}
          <div className="py-4 md:py-1.5 lg:py-4 border-b border-linen-white/10">
            <h4 className="text-center font-mono text-[10px] uppercase tracking-widest text-gold mb-3 md:mb-1.5 lg:mb-3 font-bold">
              {currentLang === 'en' ? 'MOST POPULAR ADDIS ABABA DESTINATIONS' : currentLang === 'fr' ? 'DESTINATIONS LES PLUS POPULAIRES À ADDIS-ABEBA' : 'ታዋቂ የአዲስ አበባ የምግብ ልምድ ሰፈሮች'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0.5 lg:gap-2 text-center text-xs text-linen-white/60 font-sans">
              {NEIGHBORHOOD_DESTINATIONS.map((dest, idx) => (
                <a
                  key={idx}
                  href={`#dest-${idx}`}
                  className="hover:text-gold transition-colors py-0.5 block"
                >
                  {currentLang === 'en' ? dest.nameEn : currentLang === 'fr' ? dest.nameFr : dest.nameAm}
                </a>
              ))}
            </div>
          </div>

          {/* Copyrights, Johnny Technologies, and Terms (Tablet & Mobile Repositioned and Curated) */}
          <div className="pt-4 md:pt-1.5 lg:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-1 text-[10px] text-linen-white/50 font-mono text-center md:text-left">
            <p>
              {currentLang === 'en'
                ? `Addis Flavor Powered by Sphere Tour & Travel`
                : currentLang === 'fr'
                  ? `Addis Flavor propulsé par Sphere Tour and Travel`
                  : `አዲስ ፍሌቨር በስፌር ቱር ኤንድ ትራቭል (Sphere Tour and Travel) የተዘጋጀ`}
            </p>
            <p className="text-linen-white/40 font-semibold px-2 md:border-l md:border-r md:border-linen-white/10 py-0.5 md:py-0">
              Built with love by Johnny Technologies
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
              <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#cookie" className="hover:text-gold transition-colors">Cookie Policy</a>
              <a href="#blog" className="hover:text-gold transition-colors">Our Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </>)}

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
        onClose={() => {
          setIsBookingOpen(false);
          setSearchSelection('');
        }}
        initialPkgId={searchSelection}
      />

      {/* 15. CONTACT FLOW MODAL */}
      <ContactModal
        currentLang={currentLang}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isGlobalDark={isGlobalDark}
      />
    </div>
  );
}
