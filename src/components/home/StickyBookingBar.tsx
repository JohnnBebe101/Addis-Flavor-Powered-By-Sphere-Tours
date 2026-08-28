import React from 'react';

interface StickyBookingBarProps {
  translations: {
    bookNowButton: string;
  };
  handleOpenBooking: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({
  translations,
  handleOpenBooking,
}) => {
  return (
    <div
      id="sticky-mobile-trigger"
      className="fixed bottom-0 left-0 right-0 z-40 bg-sandstone/95 backdrop-blur-md py-3 px-4 border-t border-teal/10 flex items-center justify-between sm:hidden"
    >
      <div>
        <span className="text-[10px] uppercase font-mono text-teal/60">
          Private Experience
        </span>
        <p className="text-sm font-bold text-coffee-red">
          $25 - $49 <span className="text-[10px] text-teal/70 font-sans">/ guest</span>
        </p>
      </div>
      <button
        id="sticky-mobile-booking-btn"
        onClick={handleOpenBooking}
        className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs uppercase font-mono font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md animate-pulse active:scale-95 transition-all"
      >
        {translations.bookNowButton}
      </button>
    </div>
  );
};