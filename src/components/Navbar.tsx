/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Languages, Globe } from 'lucide-react';
import { Language, Translations } from '../types';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  translations: Translations;
  onBookClick: () => void;
}

export default function Navbar({ currentLang, setLang, translations, onBookClick }: NavbarProps) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-sandstone/95 backdrop-blur-md shadow-md py-3 text-teal'
            : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-linen-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 focus:outline-none">
            <span
              id="brand-logo"
              className={`text-2xl sm:text-3xl font-serif tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-coffee-red' : 'text-linen-white hover:text-gold'
              }`}
            >
              {translations.brandName}
            </span>
            <span className="text-xs font-mono uppercase bg-gold/20 text-gold px-1.5 py-0.5 rounded border border-gold/40">
              {currentLang === 'en' ? 'Addis Ababa' : currentLang === 'fr' ? 'Addis-Abeba' : 'አዲስ አበባ'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a
              id="nav-link-experiences"
              href="#experiences"
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navExperiences}
            </a>
            <a
              id="nav-link-story"
              href="#story"
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navStory}
            </a>
            <a
              id="nav-link-book"
              href="#booking-anchor"
              onClick={(e) => {
                e.preventDefault();
                onBookClick();
              }}
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navBook}
            </a>
            <a
              id="nav-link-become-host"
              href="#host-section"
              className="hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs"
            >
              {translations.navBecomeHost}
            </a>
            <a
              id="nav-link-help"
              href="#faq-section"
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
            <div className="flex items-center space-x-4 border-l pl-6 border-current/20">
              <a href="#login" className="hover:text-coffee-red uppercase text-xs tracking-wider">
                {translations.navLogin}
              </a>
              <a
                href="#signup"
                className={`px-4 py-2 rounded-full uppercase text-xs tracking-wider font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-coffee-red text-linen-white hover:bg-coffee-red/90 shadow'
                    : 'bg-linen-white text-teal hover:bg-sandstone'
                }`}
              >
                {translations.navSignUp}
              </a>
            </div>
          </div>

          {/* Mobile Hamburguer and Lang Button */}
          <div className="flex items-center md:hidden space-x-3">
            <button
              id="lang-toggle-mobile"
              onClick={toggleLanguage}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border text-xs ${
                isScrolled
                  ? 'border-teal/30 bg-teal/5'
                  : 'border-linen-white/30 bg-linen-white/10'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'EN' : currentLang === 'am' ? 'አማ' : 'FR'}</span>
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-45 bg-teal text-linen-white flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-500 md:hidden"
        >
          <div className="flex flex-col space-y-6 text-center text-lg font-serif">
            <a
              href="#experiences"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-linen-white/10 hover:text-gold uppercase tracking-wider text-sm"
            >
              {translations.navExperiences}
            </a>
            <a
              href="#story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-linen-white/10 hover:text-gold uppercase tracking-wider text-sm"
            >
              {translations.navStory}
            </a>
            <a
              href="#booking-anchor"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="py-2 border-b border-linen-white/10 hover:text-gold uppercase tracking-wider text-sm"
            >
              {translations.navBook}
            </a>
            <a
              href="#host-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-linen-white/10 hover:text-gold uppercase tracking-wider text-sm"
            >
              {translations.navBecomeHost}
            </a>
            <a
              href="#faq-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-linen-white/10 hover:text-gold uppercase tracking-wider text-sm"
            >
              {translations.navHelp}
            </a>
          </div>

          <div className="flex flex-col space-y-4">
            <a
              href="#login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full border border-linen-white/30 text-sm uppercase tracking-wider font-medium hover:bg-linen-white/10"
            >
              {translations.navLogin}
            </a>
            <a
              href="#signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-coffee-red text-linen-white text-sm uppercase tracking-wider font-semibold hover:bg-coffee-red/90"
            >
              {translations.navSignUp}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
