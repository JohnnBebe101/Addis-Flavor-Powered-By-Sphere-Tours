import React from 'react';
import { Flame, Search, ChevronRight } from 'lucide-react';
import { PACKAGES } from '../../data';

interface HeroBannerProps {
  heroBgImg: string;
  translations: {
    heroTitle: string;
    heroSub: string;
    heroSearchPlaceholder: string;
  };
  searchSelection: string;
  isSelectFocused: boolean;
  setIsSelectFocused: (value: boolean) => void;
  handleSelectSearchPackage: (value: string) => void;
  handleOpenBooking: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  heroBgImg,
  translations,
  searchSelection,
  isSelectFocused,
  setIsSelectFocused,
  handleSelectSearchPackage,
  handleOpenBooking,
}) => (
  <header
    id="hero-banner"
    className="relative h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${heroBgImg})`,
    }}
  >
    <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="inline-flex items-center space-x-1.5 bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-pulse">
        <Flame className="w-3.5 h-3.5 text-coffee-red fill-coffee-red" />
        <span>'Authentic Ethiopian Hospitality'</span>
      </div>

      <h1
        id="hero-headline"
        className="text-4xl sm:text-6xl font-serif font-extrabold text-linen-white tracking-tight leading-tight uppercase"
      >
        {translations.heroTitle}
      </h1>

      <p
        id="hero-subheadline"
        className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-light leading-relaxed"
      >
        {translations.heroSub}
      </p>

      <div className="max-w-md mx-auto pt-4">
        <div
          className="bg-linen-white/10 backdrop-blur-md border border-linen-white/20 p-2 rounded-full flex items-center shadow-2xl transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          aria-haspopup="listbox"
          aria-expanded={isSelectFocused}
        >
          <div className="pl-4 text-linen-white/80">
            <Search className="w-5 h-5 text-gold" />
          </div>
          <label htmlFor="hero-experience-search" className="sr-only">
            {translations.heroSearchPlaceholder}
          </label>
          <select
            id="hero-experience-search"
            aria-label={translations.heroSearchPlaceholder}
            value={searchSelection}
            onChange={(e) => handleSelectSearchPackage(e.target.value)}
            onFocus={() => setIsSelectFocused(true)}
            onBlur={() => setIsSelectFocused(false)}
            className="w-full bg-transparent text-linen-white text-xs sm:text-sm font-semibold py-2.5 px-3 focus:outline-none cursor-pointer placeholder-linen-white/60 select-reset appearance-none focus-visible:outline-none"
            style={{ WebkitAppearance: 'none' }}
          >
            <option value="" className="text-teal font-sans">
              {translations.heroSearchPlaceholder}
            </option>
            {PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.id} className="text-teal font-sans">
                {pkg.name} (${pkg.price}/guest)
              </option>
            ))}
          </select>
          <button
            id="hero-search-go-btn"
            onClick={handleOpenBooking}
            className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider px-8 py-3 sm:px-6 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-1 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
          >
            <span>'GO'</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {[1, 2, 3].map((dot, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-500 ${
            index === 0 ? 'w-8 bg-gold' : 'w-2 bg-linen-white/40'
          }`}
        />
      ))}
    </div>

    <div className="absolute bottom-6 right-6 hidden sm:block bg-black/40 backdrop-blur-sm border border-linen-white/10 p-2.5 rounded-xl text-left text-[10px] text-linen-white font-mono leading-tight">
      <p className="text-gold uppercase tracking-wider font-semibold">'Live Capture'</p>
      <p>'Preparing authentic Injera and Shiro, ADDIS ABABA, ETHIOPIA'</p>
    </div>
  </header>
);