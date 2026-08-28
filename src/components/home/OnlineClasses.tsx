import React from 'react';

interface OnlineClassesProps {
  translations: {
    notTravelingTitle: string;
    notTravelingSub: string;
    viewOnlineClasses: string;
  };
  handleOpenBooking: () => void;
}

const OnlineClasses: React.FC<OnlineClassesProps> = ({ translations, handleOpenBooking }) => {
  return (
    <section
      id="online-banner"
      className="bg-sandstone py-16 text-center border-t border-b border-teal/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <p className="text-xs font-mono uppercase text-coffee-red tracking-widest mb-2">
          {'VIRTUAL CLASSES'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif text-teal font-extrabold tracking-tight mb-4">
          {translations.notTravelingTitle}
        </h2>
        <p className="text-sm text-teal/80 max-w-lg mx-auto mb-8 leading-relaxed font-sans">
          {translations.notTravelingSub}
        </p>

        <button
          id="view-online-classes-btn"
          onClick={handleOpenBooking}
          className="px-8 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-widest transition-all duration-300 transform active:scale-95 shadow-md"
        >
          {translations.viewOnlineClasses}
        </button>
      </div>

      {/* Ambient Steam SVG Background Decorator */}
      <div className="absolute right-10 bottom-0 opacity-10">
        <svg viewBox="0 0 100 100" className="w-48 h-48 fill-teal">
          <path
            d="M50 80 Q30 60 40 40 T50 10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="steam-particle"
          />
          <path
            d="M60 80 Q40 60 50 40 T60 10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="steam-particle"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>
      </div>
    </section>
  );
};

export default OnlineClasses;