/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Languages, 
  Globe,
  MapPin,
  Phone,
  Mail,
  Compass,
  Sparkles,
  BookOpen,
  LogIn,
  UserPlus,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Language, Translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  translations: Translations;
  onBookClick: () => void;
  onContactClick: () => void;
  activeView: 'home' | 'become-host' | 'our-story';
  onViewChange: (view: 'home' | 'become-host' | 'our-story') => void;
  isGlobalDark?: boolean;
}

export default function Navbar({ 
  currentLang, 
  setLang, 
  translations, 
  onBookClick, 
  onContactClick,
  activeView, 
  onViewChange,
  isGlobalDark = false
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    if (currentLang === 'en') {
      setLang('am');
    } else if (currentLang === 'am') {
      setLang('fr');
    } else {
      setLang('en');
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'top-0 bg-sandstone/95 backdrop-blur-md shadow-md py-3 text-teal'
            : 'top-9 bg-gradient-to-b from-black/60 to-transparent py-5 text-linen-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            {/* Flexible Logo Image / Placeholder Container */}
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gold/15 border border-gold/30 rounded-xl overflow-hidden group-hover:border-gold/60 transition-colors">
              {/* Visual Logo Placeholder - Representing traditional coffee jebena + abstract flavor spark */}
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-gold fill-current" aria-hidden="true">
                <path d="M50,15 C45,15 42,20 42,25 C42,27 43,29 45,31 L45,45 C35,47 28,55 28,65 C28,77 38,85 50,85 C62,85 72,77 72,65 C72,55 65,47 55,45 L55,31 C57,29 58,27 58,25 C58,20 55,15 50,15 Z M50,21 C52,21 53,23 53,25 C53,27 52,28 50,29 C48,28 47,27 47,25 C47,23 48,21 50,21 Z M50,49 C59,49 66,56 66,65 C66,74 59,81 50,81 C41,81 34,74 34,65 C34,56 41,49 50,49 Z" />
                <circle cx="50" cy="65" r="5" className="text-coffee-red fill-current animate-pulse" />
              </svg>
              {/* Flexible logo image overlay placeholder (easily active if image asset is available) */}
              <div className="absolute inset-0 bg-transparent opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                {/* <img src="/assets/logo.png" alt="Addis Flavor" className="w-full h-full object-contain" /> */}
              </div>
            </div>
            <div className="flex flex-col">
              <span
                id="brand-logo"
                className={`text-xl sm:text-2xl font-serif font-bold tracking-tight leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-coffee-red font-extrabold' : 'text-linen-white hover:text-gold'
                }`}
              >
                {translations.brandName}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gold mt-1">
                {currentLang === 'en' ? 'Authentic Culinary' : currentLang === 'fr' ? 'Culinaire Authentique' : 'ባህላዊ የምግብ ጥበብ'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a
              id="nav-link-experiences"
              href="#experiences"
              onClick={() => onViewChange('home')}
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navExperiences}
            </a>
            <a
              id="nav-link-story"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onViewChange('our-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs ${
                activeView === 'our-story' ? 'text-gold font-bold scale-105' : ''
              }`}
            >
              {translations.navStory}
            </a>
            <a
              id="nav-link-book"
              href="#booking-anchor"
              onClick={(e) => {
                e.preventDefault();
                onViewChange('home');
                // Tiny timeout to let home view mount first so scrolling works
                setTimeout(() => {
                  onBookClick();
                }, 100);
              }}
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navBook}
            </a>
            <a
              id="nav-link-become-host"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onViewChange('become-host');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs ${
                activeView === 'become-host' ? 'text-gold font-bold scale-105' : ''
              }`}
            >
              {translations.navBecomeHost}
            </a>
            <a
              id="nav-link-help"
              href="#faq-section"
              onClick={() => onViewChange('home')}
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navHelp}
            </a>

            {/* Language Selection Group */}
            <div className={`flex space-x-1 p-0.5 rounded-full border text-[10px] transition-colors duration-300 ${
              isScrolled
                ? 'bg-teal/5 border-teal/10'
                : 'bg-black/20 border-linen-white/10'
            }`}>
              {(['en', 'am', 'fr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLang(lang)}
                  className={`px-2.5 py-1 rounded-full font-sans text-xs font-bold uppercase transition-all duration-300 ${
                    currentLang === lang
                      ? 'bg-gold text-teal font-extrabold shadow-sm'
                      : isScrolled
                        ? 'text-teal/60 hover:text-teal'
                        : 'text-linen-white/70 hover:text-linen-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'am' ? 'አማ' : 'FR'}
                </button>
              ))}
            </div>

            {/* Right hand quick links */}
            <div className="flex items-center border-l pl-6 border-current/20">
              <button
                onClick={onContactClick}
                className={`px-5 py-2 rounded-full uppercase text-xs tracking-wider font-bold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-coffee-red text-linen-white hover:bg-coffee-red/90 shadow-md'
                    : 'bg-linen-white text-teal hover:bg-sandstone hover:scale-105'
                }`}
              >
                {translations.navContact}
              </button>
            </div>
          </div>

          {/* Mobile Hamburger and Lang Button */}
          <div className="flex items-center md:hidden space-x-3">
            <button
              id="lang-toggle-mobile"
              onClick={toggleLanguage}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-semibold font-mono tracking-wider transition-all duration-300 shadow-sm ${
                isScrolled
                  ? 'border-teal/20 bg-teal/5 text-teal hover:bg-teal/10'
                  : 'border-linen-white/20 bg-linen-white/10 text-linen-white hover:bg-linen-white/25'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'EN' : currentLang === 'am' ? 'አማ' : 'FR'}</span>
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full focus:outline-none transition-colors relative ${
                isScrolled
                  ? 'hover:bg-teal/5 text-teal'
                  : 'hover:bg-white/10 text-linen-white'
              }`}
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0, scale: isMobileMenuOpen ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gold" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Animated Mobile Drawer Menu with Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto md:hidden ${
                isGlobalDark 
                  ? 'bg-dark-bg text-linen-white border-l border-linen-white/10' 
                  : 'bg-linen-white text-teal border-l border-teal/10'
              }`}
            >
              {/* Drawer Top Header (Hospitality Focus) */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-current/10">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl tracking-tight text-coffee-red font-bold">
                      {translations.brandName}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                      {currentLang === 'en' ? 'Addis Ababa' : currentLang === 'fr' ? 'Addis-Abeba' : 'አዲስ አበባ'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-2 rounded-full transition-colors ${
                      isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Warm Selam Greeting */}
                <div className={`mt-6 p-4 rounded-2xl border ${
                  isGlobalDark ? 'bg-white/5 border-linen-white/5' : 'bg-sandstone/15 border-teal/5'
                }`}>
                  <div className="flex items-center space-x-2 text-gold mb-1">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="font-serif font-bold text-sm">
                      {currentLang === 'en' ? 'Selam & Welcome!' : currentLang === 'fr' ? 'Selam & Bienvenue !' : 'ሰላም እና እንኳን ደህና መጡ!'}
                    </span>
                  </div>
                  <p className="text-xs opacity-75 font-serif leading-relaxed italic">
                    {currentLang === 'en' 
                      ? 'Savor authentic traditional Ethiopian culinary experiences with loving host families.' 
                      : currentLang === 'fr'
                        ? "Savourez l'hospitalité éthiopienne authentique avec des hôtes passionnés."
                        : 'እውነተኛውን የኢትዮጵያ መስተንግዶ ከሚያስተናግዱ አፍቃሪ ቤተሰቦች ጋር ይለማመዱ።'}
                  </p>
                </div>

                {/* Staggered Animated Links */}
                <motion.div 
                  initial="hidden"
                  animate="show"
                  className="flex flex-col space-y-2 mt-8 font-serif"
                >
                  {[
                    {
                      id: 'nav-link-experiences',
                      href: '#experiences',
                      label: translations.navExperiences,
                      icon: Compass,
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        onViewChange('home');
                      },
                      active: activeView === 'home'
                    },
                    {
                      id: 'nav-link-story',
                      href: '#',
                      label: translations.navStory,
                      icon: BookOpen,
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        onViewChange('our-story');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      },
                      active: activeView === 'our-story'
                    },
                    {
                      id: 'nav-link-book',
                      href: '#booking-anchor',
                      label: translations.navBook,
                      icon: Sparkles,
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        onViewChange('home');
                        setTimeout(() => {
                          onBookClick();
                        }, 100);
                      },
                      active: false
                    },
                    {
                      id: 'nav-link-become-host',
                      href: '#',
                      label: translations.navBecomeHost,
                      icon: Languages,
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        onViewChange('become-host');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      },
                      active: activeView === 'become-host'
                    },
                    {
                      id: 'nav-link-help',
                      href: '#faq-section',
                      label: translations.navHelp,
                      icon: MapPin,
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        onViewChange('home');
                      },
                      active: false
                    }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.a
                        key={item.id}
                        id={item.id}
                        href={item.href}
                        onClick={(e) => {
                          if (item.href === '#') e.preventDefault();
                          item.onClick();
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1, type: 'spring', stiffness: 200 }}
                        className={`flex items-center space-x-3 py-3 px-4 rounded-xl text-base font-semibold tracking-wide uppercase transition-all duration-300 border ${
                          item.active 
                            ? 'bg-gold/15 border-gold/40 text-gold font-bold'
                            : isGlobalDark
                              ? 'border-transparent text-linen-white/80 hover:bg-white/5 hover:text-gold'
                              : 'border-transparent text-teal hover:bg-teal/5 hover:text-coffee-red'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-sans tracking-wider uppercase">{item.label}</span>
                        {item.active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse ml-auto" />
                        )}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>

              {/* Drawer Bottom Actions & Footer */}
              <div className="space-y-6 pt-6 border-t border-current/10 mt-8">
                {/* Embedded Language Selection Inside Menu */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gold/95 font-bold">
                    {currentLang === 'en' ? 'Choose Language' : currentLang === 'fr' ? 'Choisir la langue' : 'ቋንቋ ይምረጡ'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['en', 'am', 'fr'] as Language[]).map((lang) => (
                      <motion.button
                        key={lang}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setLang(lang)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold font-sans uppercase tracking-wider text-center border transition-all duration-300 shadow-sm ${
                          currentLang === lang
                            ? 'bg-gold text-teal border-gold shadow'
                            : isGlobalDark
                              ? 'bg-white/5 border-linen-white/10 text-linen-white/75 hover:bg-white/10'
                              : 'bg-teal/5 border-teal/10 text-teal hover:bg-teal/10'
                        }`}
                      >
                        {lang === 'en' ? 'English' : lang === 'am' ? 'አማርኛ' : 'Français'}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Contact Action */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onContactClick();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all shadow-md active:scale-95"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{translations.navContact}</span>
                  </button>
                </div>

                {/* Grounded Info */}
                <div className="space-y-3 pt-4 border-t border-current/10">
                  <div className="flex items-center space-x-2 text-xs opacity-70">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-serif">Addis Ababa, Ethiopia</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="https://instagram.com" className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com" className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
