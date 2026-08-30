/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Flame, Search, ChevronRight, ChevronLeft, Pause, Play } from 'lucide-react';
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
  translations: {
    heroSearchPlaceholder: string;
    heroSearchGo: string;
  };
  tours: Tour[];
  searchSelection: string;
  isSelectFocused: boolean;
  setIsSelectFocused: (value: boolean) => void;
  handleSelectSearchPackage: (value: string) => void;
  handleOpenBooking: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  translations,
  tours,
  searchSelection,
  isSelectFocused,
  setIsSelectFocused,
  handleSelectSearchPackage,
  handleOpenBooking,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

    progressRef.current = 0;
    progressIntervalRef.current = setInterval(() => {
      progressRef.current += 100 / 800; // 8 seconds = 800 * 10ms
      if (progressRef.current >= 100) progressRef.current = 0;
    }, 10);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeSlide, isPlaying, isHovered]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    // Reset progress on manual change
    progressRef.current = 0;
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
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
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
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${slides[activeSlide].image})`,
          opacity: 1,
        }}
        aria-hidden="true"
      />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linen-white/20 z-20">
        <div
          className="h-full bg-gold transition-all duration-10000 ease-linear"
          style={{
            width: `${progressRef.current}%`,
            transitionDuration: isPlaying && !isHovered ? '8000ms' : '0ms',
          }}
          role="progressbar"
          aria-valuenow={Math.round(progressRef.current)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Slide progress"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Announcement Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-pulse">
          <Flame className="w-3.5 h-3.5 text-coffee-red fill-coffee-red" />
          <span>{slides[activeSlide].trustSignal}</span>
        </div>

        {/* Slide Title */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-6xl font-serif font-extrabold text-linen-white tracking-tight leading-tight uppercase animate-fade-in"
        >
          {slides[activeSlide].title}
        </h1>

        {/* Slide Subtitle */}
        <p
          id="hero-subheadline"
          className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-light leading-relaxed animate-fade-in"
        >
          {slides[activeSlide].subtitle}
        </p>

        {/* Search & CTA */}
        <div className="max-w-md mx-auto pt-4 animate-fade-in">
          <div
            className="bg-linen-white/10 backdrop-blur-md border border-linen-white/20 p-2 rounded-full flex items-center shadow-2xl transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring_offset-2 has-[:focus-visible]:ring-offset-teal"
            aria-haspopup="listbox"
            aria-expanded={isSelectFocused}
          >
            <div className="pl-4 text-linen-white/80">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <label htmlFor="hero-tour-search" className="sr-only">
              {translations.heroSearchPlaceholder}
            </label>
            <select
              id="hero-tour-search"
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
              {slides.flatMap((slide) => 
                slide.id === 1 
                  ? tours.filter(t => t.tourType === 'city-tour').map((tour) => (
                      <option key={tour.id} value={tour.id} className="text-teal font-sans">
                        {tour.name} (${tour.pricing.smallGroup.adult}/guest)
                      </option>
                    ))
                  : slide.id === 2
                  ? tours.filter(t => t.tourType === 'day-trip').map((tour) => (
                      <option key={tour.id} value={tour.id} className="text-teal font-sans">
                        {tour.name} (${tour.pricing.smallGroup.adult}/guest)
                      </option>
                    ))
                  : tours.filter(t => t.tourType === 'private' || t.tourType === 'custom').map((tour) => (
                      <option key={tour.id} value={tour.id} className="text-teal font-sans">
                        {tour.name} (Price on Request)
                      </option>
                    ))
              )}
            </select>
            <button
              id="hero-search-go-btn"
              onClick={handleOpenBooking}
              className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider px-8 py-3 sm:px-6 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-1 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
            >
              <span>{translations.heroSearchGo || 'GO'}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-linen-white/20 border border-linen-white/30 text-linen-white hover:bg-linen-white/30 hover:text-gold transition-all duration-300 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-linen-white/20 border border-linen-white/30 text-linen-white hover:bg-linen-white/30 hover:text-gold transition-all duration-300 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-linen-white/20 border border-linen-white/30 text-linen-white hover:bg-linen-white/30 hover:text-gold transition-all duration-300 z-20"
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:block">
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeSlide ? 'w-8 bg-gold' : 'w-2 bg-linen-white/40 hover:bg-linen-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Live Capture Info */}
        <div className="absolute bottom-6 right-6 hidden sm:block bg-black/40 backdrop-blur-sm border border-linen-white/10 p-2.5 rounded-xl text-left text-[10px] text-linen-white font-mono leading-tight">
          <p className="text-gold uppercase tracking-wider font-semibold">'Live Capture'</p>
          <p>'Preparing authentic Injera and Shiro, ADDIS ABABA, ETHIOPIA'</p>
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-6 left-6 hidden sm:block bg-black/40 backdrop-blur-sm border border-linen-white/10 p-2 rounded-lg text-[9px] text-linen-white/60 font-mono">
        Use ← → keys to navigate
      </div>
    </header>
  );
};