import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Translations } from '../../types';
import navigationData from '../../content/navigation.json';
import { BrandLogo } from '../BrandLogo';
import { DesktopDropdownMenu } from './DesktopDropdownMenu';
import { DesktopNavProps, NavMenuItemFromJSON } from './NavTypes';

export function DesktopNav({
  isScrolled,
  isGlobalDark,
  translations,
  onBookClick,
  onContactClick,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: DesktopNavProps) {
  const navigate = useNavigate();
  const mainMenuItems = navigationData.header.mainMenu;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleExploreClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    navigate('/tours/');
  };

  return (
    <nav
      id="navbar"
      aria-label="Main navigation"
      className={`fixed left-0 right-0 z-[999] transition-all duration-300 ${
        isScrolled
          ? 'top-9 bg-sandstone/95 backdrop-blur-md shadow-md py-3 text-teal'
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
          <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gold/15 border border-gold/30 rounded-xl overflow-hidden group-hover:border-gold/60 transition-colors">
            <BrandLogo variant="mark" size="md" priority />
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
              {'Powered by Sphere Tour & Travel'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainMenuItems.map((item) => {
            if (item.type === 'dropdown' && item.columns) {
              return (
                <DesktopDropdownMenu
                  key={item.label}
                  item={item as NavMenuItemFromJSON}
                  isScrolled={isScrolled}
                  isGlobalDark={isGlobalDark}
                  onContactClick={onContactClick}
                  translations={translations}
                />
              );
            }

            // Simple link items
            const label =
              translations[
                `nav${item.label.replace(/\s+/g, '')}` as keyof Translations
              ] || item.label;

            if (item.label === 'Contact') {
              return (
                <button
                  key={item.label}
                  onClick={onContactClick}
                  className={`inline-flex min-h-[44px] items-center px-5 py-3 rounded-full uppercase text-xs tracking-wider font-bold transition-all duration-300 ${
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
                key={item.label}
                href={item.link}
                className={`inline-flex min-h-[44px] items-center hover:text-coffee-red transition-colors duration-200 uppercase tracking-wider text-xs ${
                  isScrolled ? 'text-teal' : 'text-linen-white'
                }`}
              >
                {label}
              </a>
            );
          })}

          {/* EXPLORE TOURS Button */}
          <a
            href="/tours/"
            onClick={handleExploreClick}
            className={`inline-flex min-h-[44px] items-center px-5 py-3 rounded-full uppercase text-xs tracking-wider font-bold transition-all duration-300 ${
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
            onClick={onToggleMobileMenu}
            className={`p-2.5 rounded-full focus:outline-none transition-colors relative ${
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
  );
}
