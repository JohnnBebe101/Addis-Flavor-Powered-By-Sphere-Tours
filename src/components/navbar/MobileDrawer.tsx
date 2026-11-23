import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Mail,
  Compass,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
} from 'lucide-react';
import navigationData from '../../content/navigation.json';
import { BrandLogo } from '../BrandLogo';
import { MobileDrawerProps, NavDropdownItem, NavMobileItemFromJSON } from './NavTypes';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function MobileAccordionItem({
  item,
  isGlobalDark,
  openAccordion,
  setOpenAccordion,
  onNavigate,
  onContactClick: _onContactClick,
  closeMenu,
}: {
  item: NavMobileItemFromJSON;
  isGlobalDark: boolean;
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
  onNavigate: (link: string) => void;
  onContactClick: () => void;
  closeMenu: () => void;
}) {
  const isOpen = openAccordion === item.label;
  const isAccordion = item.type === 'accordion';
  const isCta = item.type === 'cta';
  const prefersReduced = useReducedMotion();

  if (isCta) {
    return (
      <a
        href={item.link}
        onClick={(e) => {
          e.preventDefault();
          closeMenu();
          onNavigate(item.link);
        }}
        className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all shadow-md active:scale-95 animate-stagger-fade`}
      >
        <Compass className="w-4 h-4" />
        <span>{item.label}</span>
      </a>
    );
  }

  if (isAccordion) {
    const desktopItem = navigationData.header.mainMenu.find(
      (m: NavMobileItemFromJSON) => m.label === item.label,
    );

    return (
      <div className="border-b border-current/10">
        <button
          onClick={() => setOpenAccordion(isOpen ? null : item.label)}
          aria-expanded={isOpen}
          className={`w-full flex items-center justify-between py-3 px-2 text-base font-semibold tracking-wide uppercase transition-all duration-300 ${
            isGlobalDark ? 'text-linen-white/80 hover:text-gold' : 'text-teal hover:text-coffee-red'
          }`}
        >
          <span>{item.label}</span>
          <ChevronRight
            className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
        </button>

        <div
          className={`${
            prefersReduced ? '' : 'transition-[grid-template-rows] duration-300 ease-out'
          } ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          style={{ display: 'grid' }}
        >
          <div className="overflow-hidden">
            {desktopItem?.columns && (
              <div
                className={`py-3 space-y-4 ${isGlobalDark ? 'bg-white/5' : 'bg-teal/5'}`}
              >
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
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.link}
      onClick={closeMenu}
      className={`flex items-center justify-between py-3 px-2 text-base font-semibold tracking-wide uppercase transition-all duration-300 border-b border-current/10 ${
        isGlobalDark ? 'text-linen-white/80 hover:text-gold' : 'text-teal hover:text-coffee-red'
      }`}
    >
      <span>{item.label}</span>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />
    </a>
  );
}

export function MobileDrawer({
  isOpen,
  onClose,
  isGlobalDark,
  translations,
  onBookClick,
}: MobileDrawerProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen);

  useBodyScrollLock(isOpen);
  useKeyboard({ Escape: onClose }, isOpen);

  const handleBookClick = useCallback(() => {
    onClose();
    onBookClick();
  }, [onClose, onBookClick]);

  const handleContactClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[980] bg-black/60 backdrop-blur-md md:hidden ${
          prefersReduced ? '' : 'animate-fade-in'
        }`}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={`fixed top-0 right-0 bottom-0 z-[1000] w-[85%] max-w-sm h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto md:hidden ${
          prefersReduced ? '' : 'animate-slide-in-right'
        } ${
          isGlobalDark
            ? 'bg-dark-bg text-linen-white border-l border-linen-white/10'
            : 'bg-linen-white text-teal border-l border-teal/10'
        }`}
      >
        {/* Drawer Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-current/10">
            <div className="flex items-center gap-3">
              <BrandLogo variant="mark" size="sm" />
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-tight text-coffee-red font-bold">
                  {translations.brandName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                  {'Addis Ababa'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-full transition-colors ${
                isGlobalDark
                  ? 'bg-white/5 hover:bg-white/10 text-linen-white'
                  : 'bg-black/5 hover:bg-black/10 text-teal'
              }`}
              aria-label="Close menu"
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
              {
                'Discover Addis Ababa with licensed local guides. Authentic experiences, fair prices, unforgettable memories.'
              }
            </p>
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="flex flex-col space-y-1 mt-8 font-serif">
            {navigationData.mobileMenu.items.map((item) => (
              <MobileAccordionItem
                key={item.label}
                item={item}
                isGlobalDark={isGlobalDark}
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
                onNavigate={(link: string) => {
                  onClose();
                  navigate(link);
                }}
                onContactClick={handleContactClick}
                closeMenu={onClose}
              />
            ))}

            {/* BOOK A TOUR Button */}
            <button
              onClick={handleBookClick}
              className="mt-4 w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all shadow-md active:scale-95 animate-stagger-fade"
            >
              <Compass className="w-4 h-4" />
              <span>{translations.bookNowButton}</span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Actions & Footer */}
        <div className="space-y-6 pt-6 border-t border-current/10 mt-8">
          {/* Contact Action */}
          <div className="pt-2">
            <button
              onClick={handleContactClick}
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
                href="https://instagram.com/addisabababylocals"
                className="p-2 -m-2 opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/addisabababylocals"
                className="p-2 -m-2 opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://tripadvisor.com/Attraction_Review-g1-addis-ababa"
                className="p-2 -m-2 opacity-70 hover:opacity-100 hover:text-gold transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
