import { Translations } from '../../types';

export interface NavDropdownItem {
  label: string;
  link: string;
  price?: string;
  duration?: string;
  description?: string;
}

export type NavMenuItemFromJSON = {
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
  cta?: { label: string; link: string };
  color?: string;
};

export type NavMobileItemFromJSON = {
  label: string;
  link: string;
  type: string;
  color?: string;
};

export interface NavbarProps {
  translations: Translations;
  onBookClick: () => void;
  onContactClick: () => void;
  isGlobalDark?: boolean;
}

export interface DesktopNavProps {
  isScrolled: boolean;
  isGlobalDark: boolean;
  translations: Translations;
  onBookClick: () => void;
  onContactClick: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export interface DesktopDropdownMenuProps {
  item: NavMenuItemFromJSON;
  isScrolled: boolean;
  isGlobalDark: boolean;
  onContactClick: () => void;
  translations: Translations;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark: boolean;
  translations: Translations;
  onBookClick: () => void;
}

export interface MobileAccordionItemProps {
  item: NavMobileItemFromJSON;
  isGlobalDark: boolean;
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
  onBookClick: () => void;
  onContactClick: () => void;
  closeMenu: () => void;
}
