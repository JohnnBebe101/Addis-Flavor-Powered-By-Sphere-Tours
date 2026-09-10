import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import { MapPin, Mountain, Crown } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'City Tours': '#a67c52',
  'Day Trips': '#5a5a40',
  'Private & Custom': '#2d2926',
  'Private': '#2d2926',
  'Addis Ababa': '#a67c52',
  'Day Trip Destinations': '#5a5a40',
};

const CATEGORY_ICONS: Record<string, typeof MapPin> = {
  'City Tours': MapPin,
  'Day Trips': Mountain,
  'Private & Custom': Crown,
  'Private': Crown,
  'Addis Ababa': MapPin,
  'Day Trip Destinations': Mountain,
};

type MegaMenuItem = {
  label: string;
  link: string;
  price?: string;
  duration?: string;
  description?: string;
};

type MegaMenuColumn = {
  title: string;
  items: MegaMenuItem[];
};

interface MegaMenuDropdownProps {
  isOpen: boolean;
  columns: MegaMenuColumn[];
  link?: string;
  label: string;
  isGlobalDark: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const DROPDOWN_WIDTH = 480;
const EDGE_PADDING = 16;
const TRIGGER_GAP = 8;

export function MegaMenuDropdown({
  isOpen,
  columns,
  link,
  label,
  isGlobalDark,
  triggerRef,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle open/close animation lifecycle
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      closeTimerRef.current = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
        closeTimerRef.current = null;
      }, 200);
    }
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, shouldRender]);

  // Cleanup close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const recalculate = useCallback(() => {
    if (!triggerRef.current || !isOpen) return;
    const rect = triggerRef.current.getBoundingClientRect();
    let left = rect.left;
    let top = rect.bottom + TRIGGER_GAP;

    // Clamp right edge
    if (left + DROPDOWN_WIDTH > window.innerWidth - EDGE_PADDING) {
      left = window.innerWidth - DROPDOWN_WIDTH - EDGE_PADDING;
    }
    // Clamp left edge
    if (left < EDGE_PADDING) {
      left = EDGE_PADDING;
    }

    // Estimate dropdown height and flip above if needed
    const estimatedHeight = columns.reduce((acc, col) => acc + col.items.length * 30 + 32, 0) + 64;
    if (top + estimatedHeight > window.innerHeight - EDGE_PADDING) {
      top = rect.top - TRIGGER_GAP - estimatedHeight;
    }

    setPosition({ top, left });
  }, [isOpen, triggerRef, columns]);

  useLayoutEffect(() => {
    if (isOpen) {
      recalculate();
    }
  }, [isOpen, recalculate]);

  // Recalculate on scroll and resize
  useEffect(() => {
    if (!isOpen) return;
    const handler = () => recalculate();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [isOpen, recalculate]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onMouseLeave();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onMouseLeave]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMouseLeave();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onMouseLeave]);

  if (!shouldRender) return null;

  const dropdown = (
    <div
      ref={dropdownRef}
      className={`fixed z-[999] flex flex-col gap-5 w-[480px] p-5 rounded-2xl shadow-2xl shadow-black/15 border ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      } ${
        isGlobalDark
          ? 'bg-dark-bg shadow-black/30 border-linen-white/15 text-linen-white'
          : 'bg-linen-white border-teal/15 text-teal'
      }`}
      style={{ top: position.top, left: position.left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
    >
      {columns.map((col, colIdx) => {
        const color = CATEGORY_COLORS[col.title] || '#5a5a40';
        const Icon = CATEGORY_ICONS[col.title];
        return (
          <div key={colIdx} className={colIdx > 0 ? 'pt-1' : ''}>
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-[3px] h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />}
              <h4
                className="font-mono text-[11px] uppercase tracking-widest font-bold"
                style={{ color }}
              >
                {col.title}
              </h4>
            </div>
            <div className="flex flex-col">
              {col.items.map((subItem, itemIdx) => (
                <a
                  key={itemIdx}
                  href={subItem.link}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-150 group ${
                    isGlobalDark
                      ? 'hover:bg-white/5 hover:text-gold'
                      : 'hover:bg-teal/5 hover:text-coffee-red'
                  }`}
                >
                  <span className="font-sans font-medium text-sm truncate">{subItem.label}</span>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-gold flex-shrink-0 ml-3">
                    {subItem.price && <span>{subItem.price}</span>}
                    {subItem.duration && (
                      <span className="opacity-60">· {subItem.duration}</span>
                    )}
                    {subItem.description && (
                      <span className="text-[10px] opacity-60">{subItem.description}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
      {link && (
        <div className="border-t border-teal/10 pt-3 mt-1">
          <a
            href={link}
            className={`flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              isGlobalDark
                ? 'text-gold hover:text-linen-white'
                : 'text-coffee-red hover:text-teal'
            }`}
          >
            View All {label} →
          </a>
        </div>
      )}
    </div>
  );

  return createPortal(dropdown, document.body);
}

export default MegaMenuDropdown;
