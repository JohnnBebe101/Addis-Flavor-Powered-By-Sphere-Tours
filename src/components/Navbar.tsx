/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  MapPin,
  Mail,
  Compass,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Translations } from '../types';
import navigationData from '../content/navigation.json';

type NavMenuItemFromJSON = {
  label: string;
  link: string;
  type: string;
  columns?: Array<{
    title: string;
    items: Array<{
      label: string;
      link: string;
      price?: string;
      duration?: string;
      description?: string;
    }>;
  }>;
  color?: string;
};

type NavMobileItemFromJSON = {
  label: string;
  link: string;
  type: string;
  color?: string;
};

interface NavbarProps {
  translations: Translations;
  onBookClick: () => void;
onContactClick: () => void;
  isGlobalDark?: boolean;
}

export default function Navbar({
  translations,
  onBookClick,
  onContactClick,
  isGlobalDark = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onBookClick();
  };

  const handleMobileBookClick = () => {
    setIsMobileMenuOpen(false);
    onBookClick();
  };

  const mainMenuItems = navigationData.header.mainMenu;

  return (
    <>
      <nav
        id="navbar"
        ref={desktopMenuRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'top-0 bg-sandstone/95 backdrop-blur-md shadow-md py-3 text-teal'
            : 'top-9 bg-gradient-to-b from-black/60 to-transparent py-5 text-linen-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gold/15 border border-gold/30 rounded-xl overflow-hidden group-hover:border-gold/60 transition-colors">
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7 text-gold fill-current"
                aria-hidden="true"
              >
                <path d="M50,15 C45,15 42,20 42,25 C42,27 43,29 45,31 L45,45 C35,47 28,55 28,65 C28,77 38,85 50,85 C62,85 72,77 72,65 C72,55 65,47 55,45 L55,31 C57,29 58,27 58,25 C58,20 55,15 50,15 Z M50,21 C52,21 53,23 53,25 C53,27 52,28 50,29 C48,28 47,27 47,25 C47,23 48,21 50,21 Z M50,49 C59,49 66,56 66,65 C66,74 59,81 50,81 C41,81 34,74 34,65 C34,56 41,49 50,49 Z" />
                <circle cx="50" cy="65" r="5" className="text-coffee-red fill-current animate-pulse" />
              </svg>
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
                {'Authentic City Tours'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {mainMenuItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isScrolled={isScrolled}
                isGlobalDark={isGlobalDark}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                onBookClick={handleBookClick}
                onContactClick={onContactClick}
                translations={translations}
              />
            ))}

            {/* BOOK A TOUR Button */}
            <a
              href="/tours/"
              onClick={handleBookClick}
              className={`px-5 py-2 rounded-full uppercase text-xs tracking-wider font-bold transition-all duration-300 ${
                isScrolled
                  ? 'bg-coffee-red text-linen-white hover:bg-coffee-red/90 shadow-md'
                  : 'bg-linen-white text-teal hover:bg-sandstone hover:scale-105'
              }`}
            >
              {translations.navBook}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden space-x-3">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full focus:outline-none transition-colors relative ${
                isScrolled ? 'hover:bg-teal/5 text-teal' : 'hover:bg-white/10 text-linen-white'
              }`}
              aria-label="Toggle Menu"
            >
              <div className={`hamburger-rotate ${isMobileMenuOpen ? 'open' : ''}`}>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gold" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu with Backdrop Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            ref={mobileMenuRef}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden animate-fade-in"
          />

          <div
            id="mobile-drawer"
            className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto md:hidden animate-slide-in-right ${
              isGlobalDark
                ? 'bg-dark-bg text-linen-white border-l border-linen-white/10'
                : 'bg-linen-white text-teal border-l border-teal/10'
            }`}
          >
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-current/10">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-tight text-coffee-red font-bold">
                    {translations.brandName}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                    {'Addis Ababa'}
                  </span>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    isGlobalDark
                      ? 'bg-white/5 hover:bg-white/10 text-linen-white'
                      : 'bg-black/5 hover:bg-black/10 text-teal'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Warm Selam Greeting */}
              <div
                className={`mt-6 p-4 rounded-2xl border ${
                  isGlobalDark ? 'bg-white/5 border-linen-white/5' : 'bg-sandstone/15 border-teal/5'
                }`}
              >
                <div className="flex items-center space-x-2 text-gold mb-1">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="font-serif font-bold text-sm">{'Selam & Welcome!'}</span>
                </div>
                <p className="text-xs opacity-75 font-serif leading-relaxed italic">
                  {'Discover Addis Ababa with licensed local guides. Authentic experiences, fair prices, unforgettable memories.'}
                </p>
              </div>

              {/* Mobile Accordion Navigation */}
              <div className="flex flex-col space-y-1 mt-8 font-serif">
                {navigationData.mobileMenu.items.map((item) => (
                  <MobileAccordionItem
                    key={item.label}
                    item={item}
                    isGlobalDark={isGlobalDark}
                    openAccordion={openMobileAccordion}
                    setOpenAccordion={setOpenMobileAccordion}
                    onBookClick={handleMobileBookClick}
                    onContactClick={onContactClick}
                    closeMenu={() => setIsMobileMenuOpen(false)}
                  />
                ))}

                {/* BOOK A TOUR Button at bottom of mobile menu */}
                <button
                  onClick={handleMobileBookClick}
                  className="mt-4 w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all shadow-md active:scale-95 animate-stagger-fade"
                >
                  <Compass className="w-4 h-4" />
                  <span>{translations.navBook}</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Actions & Footer */}
            <div className="space-y-6 pt-6 border-t border-current/10 mt-8">
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
                  <a
                    href="https://instagram.com/addisababacitytour"
                    className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/addisababacitytour"
                    className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://tripadvisor.com/Attraction_Review-g1-addis-ababa"
                    className="opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function DesktopNavItem({
  item,
  isScrolled,
  isGlobalDark,
  openDropdown,
  setOpenDropdown,
  onBookClick,
  onContactClick,
  translations,
}: {
  item: NavMenuItemFromJSON;
  isScrolled: boolean;
  isGlobalDark: boolean;
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
  onBookClick: () => void;
  onContactClick: () => void;
  translations: Translations;
}) {
  const isOpen = openDropdown === item.label;
  const isDropdown = item.type === 'dropdown';

  if (isDropdown && item.columns) {
    return (
      <div className="relative" onMouseEnter={() => setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
        <button
          className={`flex items-center space-x-1 uppercase tracking-wider text-xs transition-colors duration-200 ${
            isScrolled ? 'text-teal hover:text-coffee-red' : 'text-linen-white hover:text-gold'
          }`}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {translations[`nav${item.label.replace(/\s+/g, '')}` as keyof Translations] || item.label}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-50 grid grid-cols-1 md:grid-cols-3 gap-6 w-[720px] p-6 rounded-2xl shadow-2xl border animate-fade-in ${
            isGlobalDark
              ? 'bg-dark-bg border-linen-white/10 text-linen-white'
              : 'bg-linen-white border-teal/10 text-teal'
          }">
            {item.columns?.map((col, colIdx) => (
              <div key={colIdx} className="space-y-4">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold mb-2">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.items.map((subItem, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={subItem.link}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                          isGlobalDark
                            ? 'hover:bg-white/5 hover:text-gold'
                            : 'hover:bg-teal/5 hover:text-coffee-red'
                        }`}
                      >
                        <span className="font-medium">{subItem.label}</span>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-gold">
                          {subItem.price && <span>{subItem.price}</span>}
                          {subItem.duration && <span>{subItem.duration}</span>}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const label = translations[`nav${item.label.replace(/\s+/g, '')}` as keyof Translations] || item.label;

  if (item.label === 'Contact') {
    return (
      <button
        onClick={onContactClick}
        className={`px-5 py-2 rounded-full uppercase text-xs tracking-wider font-bold transition-all duration-300 ${
          isScrolled
            ? 'bg-coffee-red text-linen-white hover:bg-coffee-red/90 shadow-md'
            : 'bg-linen-white text-teal hover:bg-sandstone hover:scale-105'
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={item.link}
      className={`hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs ${
        isScrolled ? 'text-teal' : 'text-linen-white'
      }`}
    >
      {label}
    </a>
  );
}

function MobileAccordionItem({
  item,
  isGlobalDark,
  openAccordion,
  setOpenAccordion,
  onBookClick,
  onContactClick,
  closeMenu,
}: {
  item: NavMobileItemFromJSON;
  isGlobalDark: boolean;
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
  onBookClick: () => void;
  onContactClick: () => void;
  closeMenu: () => void;
}) {
  const isOpen = openAccordion === item.label;
  const isAccordion = item.type === 'accordion';
  const isCta = item.type === 'cta';

  if (isCta) {
    return (
      <button
        onClick={() => {
          closeMenu();
          onBookClick();
        }}
        className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all shadow-md active:scale-95 animate-stagger-fade`}
      >
        <Compass className="w-4 h-4" />
        <span>{item.label}</span>
      </button>
    );
  }

  if (isAccordion) {
    const desktopItem = navigationData.header.mainMenu.find((m: NavMenuItemFromJSON) => m.label === item.label);
    return (
      <div className="border-b border-current/10">
        <button
          onClick={() => setOpenAccordion(isOpen ? null : item.label)}
          className={`w-full flex items-center justify-between py-3 px-2 text-base font-semibold tracking-wide uppercase transition-all duration-300 ${
            isGlobalDark
              ? 'text-linen-white/80 hover:text-gold'
              : 'text-teal hover:text-coffee-red'
          }`}
        >
          <span>{item.label}</span>
          <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        {isOpen && desktopItem?.columns && (
          <div className={`py-3 space-y-4 animate-fade-in ${isGlobalDark ? 'bg-white/5' : 'bg-teal/5'}`}>
{desktopItem.columns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-3">
                <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold pl-2">
                  {col.title}
                </h5>
                <ul className="space-y-1 pl-2">
                  {col.items.map((subItem: NavDropdownItem, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={subItem.link}
                        onClick={closeMenu}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors text-sm ${
                          isGlobalDark
                            ? 'text-linen-white/80 hover:bg-white/5 hover:text-gold'
                            : 'text-teal hover:bg-teal/5 hover:text-coffee-red'
                        }`}
                      >
                        <span className="font-medium">{subItem.label}</span>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-gold">
                          {subItem.price && <span>{subItem.price}</span>}
                          {subItem.duration && <span>{subItem.duration}</span>}
                          {subItem.description && <span className="text-[9px] opacity-60">{subItem.description}</span>}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.link}
      onClick={closeMenu}
      className={`flex items-center justify-between py-3 px-2 text-base font-semibold tracking-wide uppercase transition-all duration-300 border-b border-current/10 ${
        isGlobalDark
          ? 'text-linen-white/80 hover:text-gold'
          : 'text-teal hover:text-coffee-red'
      }`}
    >
      <span>{item.label}</span>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />
    </a>
  );
}