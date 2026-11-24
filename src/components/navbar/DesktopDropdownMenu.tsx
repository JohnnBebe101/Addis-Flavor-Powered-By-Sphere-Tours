import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Translations } from '../../types';
import { DesktopDropdownMenuProps } from './NavTypes';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function DesktopDropdownMenu({ item, isScrolled, translations }: DesktopDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    item.columns?.[0]?.title ?? null,
  );
  const [panelPosition, setPanelPosition] = useState<'left' | 'right'>('left');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useReducedMotion();

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const clearCategoryTimeout = useCallback(() => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
      categoryTimeoutRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearCloseTimeout();
    if (!isOpen) {
      setIsOpen(true);
      if (item.columns?.length) {
        setActiveCategory(item.columns[0].title);
      }
    }
  }, [clearCloseTimeout, item.columns, isOpen]);

  const close = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategory(item.columns?.[0]?.title ?? null);
    }, 200);
  }, [item.columns]);

  const handleMouseEnter = useCallback(() => {
    open();
  }, [open]);

  const handlePanelEnter = useCallback(() => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleMouseLeave = useCallback(() => {
    close();
  }, [close]);

  const handleCategoryEnter = useCallback(
    (catTitle: string) => {
      clearCategoryTimeout();
      setActiveCategory(catTitle);
    },
    [clearCategoryTimeout],
  );

  const handleCategoryLeave = useCallback(() => {
    categoryTimeoutRef.current = setTimeout(() => {
      // Keep current category active — don't reset to first column.
      // The active category persists until another category is hovered
      // or the panel closes via handleMouseLeave.
    }, 150);
  }, []);

  const handleCategoryClick = useCallback(
    (catTitle: string) => {
      clearCategoryTimeout();
      setActiveCategory(catTitle);
    },
    [clearCategoryTimeout],
  );

  // Escape key to close
  useKeyboard({ Escape: () => setIsOpen(false) }, isOpen);

  // Click outside to close
  useClickOutside(wrapperRef, () => setIsOpen(false), isOpen);

  // Viewport edge detection
  useEffect(() => {
    if (!isOpen || !wrapperRef.current || !panelRef.current) return;
    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const panelWidth = panelRef.current.offsetWidth;
    if (triggerRect.left + panelWidth > window.innerWidth - 16) {
      setPanelPosition('right');
    } else {
      setPanelPosition('left');
    }
  }, [isOpen]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearCloseTimeout();
      clearCategoryTimeout();
    };
  }, [clearCloseTimeout, clearCategoryTimeout]);

  const activeItems = item.columns?.find((c) => c.title === activeCategory)?.items ?? [];

  const positionClass = panelPosition === 'right' ? 'right-0' : 'left-0';

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center space-x-1 uppercase tracking-wider text-xs transition-colors duration-200 ${
          isScrolled ? 'text-teal hover:text-coffee-red' : 'text-linen-white hover:text-gold'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={isOpen ? () => setIsOpen(false) : open}
      >
        {translations[`nav${item.label.replace(/\s+/g, '')}` as keyof Translations] || item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Invisible bridge zone — extends hover area between trigger and panel */}
      <div className="absolute top-full left-0 right-0 h-2" aria-hidden="true" />

      <div
        ref={panelRef}
        className={`absolute top-full ${positionClass} mt-2 min-w-[420px] bg-linen-white rounded-xl shadow-xl border border-teal/10 ${
          prefersReduced ? '' : 'transition-all duration-150 ease-out'
        } ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        onMouseEnter={handlePanelEnter}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="flex min-h-[200px]">
          {/* Level 1 — Category headers */}
          <div className="w-[160px] border-r border-teal/5 py-2 flex-shrink-0">
            {item.columns?.map((col, colIdx) => (
              <button
                key={colIdx}
                onMouseEnter={() => handleCategoryEnter(col.title)}
                onMouseLeave={handleCategoryLeave}
                onClick={() => handleCategoryClick(col.title)}
                role="menuitem"
                className={`w-full min-h-[44px] text-left px-4 py-2.5 text-xs font-mono transition-colors duration-150 border-l-2 ${
                  activeCategory === col.title
                    ? 'bg-teal/5 text-coffee-red font-bold border-coffee-red'
                    : 'text-teal hover:bg-teal/5 hover:text-coffee-red border-transparent'
                }`}
              >
                {col.title}
              </button>
            ))}
            {item.cta && (
              <div className="border-t border-teal/5 mt-1 pt-1">
                <a
                  href={item.cta.link}
                  role="menuitem"
                  className="flex min-h-[44px] items-center px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-coffee-red hover:bg-teal/5 transition-colors"
                >
                  {item.cta.label} →
                </a>
              </div>
            )}
          </div>

          {/* Level 2 — Items for active category */}
          <div className="flex-1 py-2 px-3">
            {activeItems.length > 0 ? (
              activeItems.map((subItem, itemIdx) => (
                <a
                  key={itemIdx}
                  href={subItem.link}
                  role="menuitem"
                  className="flex min-h-[44px] items-center justify-between py-2 px-3 rounded-lg text-sm text-teal hover:bg-teal/5 hover:text-coffee-red transition-colors duration-150"
                >
                  <span className="font-medium">{subItem.label}</span>
                </a>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-teal/40 font-mono">
                No items
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
