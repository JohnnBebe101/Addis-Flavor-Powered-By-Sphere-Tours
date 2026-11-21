/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarProps } from './navbar/NavTypes';
import { DesktopNav } from './navbar/DesktopNav';

/*
 * The drawer is only mounted once the hamburger is pressed, so its code is
 * fetched on demand rather than sitting in the entry bundle.
 */
const MobileDrawer = lazy(() =>
  import('./navbar/MobileDrawer').then((m) => ({ default: m.MobileDrawer })),
);

export default function Navbar({
  translations,
  onBookClick,
  onContactClick,
  isGlobalDark = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = useCallback(() => {
    navigate('/book/');
  }, [navigate]);

  const handleContactClick = useCallback(() => {
    onContactClick();
  }, [onContactClick]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <DesktopNav
        isScrolled={isScrolled}
        isGlobalDark={isGlobalDark}
        translations={translations}
        onBookClick={handleBookClick}
        onContactClick={handleContactClick}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />
      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            isGlobalDark={isGlobalDark}
            translations={translations}
            onBookClick={handleBookClick}
          />
        </Suspense>
      )}
    </>
  );
}
