/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, ChevronLeft, Camera, Bed, UtensilsCrossed, MapPin } from 'lucide-react';
import { Tour } from '../../types';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustSignal: string;
  image: string;
}

interface HeroBannerProps {
  slides: HeroSlide[];
  tours: Tour[];
  handleOpenBooking: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  tours,
  handleOpenBooking,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Search category tabs
  const categories = [
    { id: 'all', label: 'Search All', icon: Search, placeholder: 'Attraction, activity or destination', searchPath: '/tours/' },
    { id: 'tours', label: 'Things to Do', icon: Camera, placeholder: 'Search tours and activities', searchPath: '/tours/' },
    { id: 'hotels', label: 'Hotels', icon: Bed, placeholder: 'Find hotels and accommodations', searchPath: '/travel-guide/' },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, placeholder: 'Restaurants and food experiences', searchPath: '/travel-guide/' },
    { id: 'destinations', label: 'Destinations', icon: MapPin, placeholder: 'Explore destinations', searchPath: '/destinations/' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tour type sub-tabs (using existing tourType field from tours.json)
  const tourTypes = [
    { id: 'all', label: 'All Tours', icon: Search },
    { id: 'city-tour', label: 'City Tours', icon: MapPin },
    { id: 'day-trip', label: 'Day Trips', icon: Camera },
    { id: 'private', label: 'Private', icon: Bed },
  ];

  const [activeTourType, setActiveTourType] = useState('all');

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isHovered, slides.length]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    let started = false;
    progressIntervalRef.current = setInterval(() => {
      if (!started) {
        started = true;
        setProgress(0);
        return;
      }
      setProgress((prev) => {
        const next = prev + 100 / 800; // 8 seconds = 800 * 10ms
        return next >= 100 ? 0 : next;
      });
    }, 10);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeSlide, isPlaying, isHovered]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    // Reset progress on manual change
    setProgress(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (e.key === 'ArrowRight') {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }
  };

  return (
    <header
      id="hero-banner"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden py-[15vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Hero carousel"
    >
      {/* Background with slide transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${slides[activeSlide].image})`,
        }}
        aria-hidden="true"
      />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linen-white/20 z-20">
        <div
          className="h-full bg-gold transition-all duration-10000 ease-linear"
          style={{
            width: `${progress}%`,
            transitionDuration: isPlaying && !isHovered ? '8000ms' : '0ms',
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Slide progress"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Per-slide text content — key forces remount on slide change */}
        <div key={activeSlide} className="space-y-4">
          {/* Announcement Badge */}
          <div className="inline-flex items-center bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-hero-slide-up" style={{ animationDelay: '0ms', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            <span>{slides[activeSlide].trustSignal}</span>
          </div>

          {/* Slide Title */}
          <h1
            id="hero-headline"
            className="text-2xl sm:text-4xl font-serif font-bold text-linen-white tracking-tight leading-tight uppercase animate-hero-slide-up"
            style={{ animationDelay: '100ms', textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}
          >
            {slides[activeSlide].title}
          </h1>

          {/* Slide Subtitle */}
          <p
            id="hero-subheadline"
            className="text-xs sm:text-sm text-sandstone font-sans font-light leading-relaxed animate-hero-slide-up mb-2"
            style={{ animationDelay: '200ms', textShadow: '0 1px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)' }}
          >
            {slides[activeSlide].subtitle}
          </p>
        </div>

        {/* Search Bar with Category Tabs */}
        <div className="animate-hero-slide-up mt-8" style={{ animationDelay: '350ms' }}>
          {/* Category Tabs — OUTSIDE Search Box */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-linen-white font-bold border-b-2 border-coffee-red'
                      : 'text-linen-white/50 hover:text-linen-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const cat = categories.find((c) => c.id === activeCategory);
                const typeParam = activeTourType !== 'all' ? `&type=${activeTourType}` : '';
                window.location.href = `${cat?.searchPath || '/tours/'}?q=${encodeURIComponent(searchQuery.trim())}${typeParam}`;
              }
            }}
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            {/* Sub-tabs — Tour Types (Row 1) */}
            <div className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-linen-white/10 overflow-x-auto no-scrollbar">
              {tourTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTourType(type.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all duration-300 ${
                      activeTourType === type.id
                        ? 'bg-coffee-red/80 text-linen-white font-bold shadow-sm'
                        : 'text-linen-white/50 hover:text-linen-white/80 hover:bg-linen-white/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Field Label + Input (Row 2) */}
            <div className="flex items-center px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-linen-white/80 mr-3">
                <Search className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-linen-white/50 mb-1">
                  Search Tours
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
                  className="w-full bg-transparent text-linen-white text-sm font-sans focus:outline-none placeholder-linen-white/50"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Search Button — Full Width (Row 3) */}
            <button
              type="submit"
className="w-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs sm:text-sm uppercase font-black tracking-wider py-3 sm:py-4 transition-all duration-300 transform active:scale-[0.98] shadow-[0_2px_12px_rgba(166,50,50,0.4)] hover:shadow-[0_4px_20px_rgba(166,50,50,0.5)] flex items-center justify-center gap-2"
>
  <Search className="w-4 h-4" />
  <span>Search Tours</span>
            </button>
          </form>

          {/* Trust Signals + Action Links — OUTSIDE Search Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 mt-3">
            {/* Trust Signals */}
            <div className="flex items-center gap-2 text-linen-white/70 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to search
              </span>
              <span className="text-linen-white/30">·</span>
              <span>No hidden fees</span>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 text-xs">
              <a
                href="/tours/"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                View Deals
              </a>
              <span className="text-linen-white/30">|</span>
              <a
                href="tel:+251911209882"
                className="flex items-center gap-1.5 text-linen-white/70 hover:text-gold transition-colors font-mono uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-3 sm:left-6 top-[40%] -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 sm:right-6 top-[40%] -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeSlide
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-linen-white/40 hover:bg-linen-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom gradient for search bar readability */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" aria-hidden="true" />

    </header>
  );
};
