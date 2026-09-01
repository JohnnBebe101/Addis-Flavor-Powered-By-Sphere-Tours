/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, ChevronLeft, Pause, Play, Camera, Bed, UtensilsCrossed, MapPin } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(true);
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
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
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
          backgroundImage: `linear-gradient(to bottom, rgba(45, 41, 38, 0.10), rgba(45, 41, 38, 0.35)), url(${slides[activeSlide].image})`,
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

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Announcement Badge */}
        <div className="inline-flex items-center bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest animate-hero-slide-up" style={{ animationDelay: '0ms' }}>
          <span>{slides[activeSlide].trustSignal}</span>
        </div>

        {/* Slide Title */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-6xl font-serif font-black text-linen-white tracking-tight leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-hero-slide-up"
          style={{ animationDelay: '150ms' }}
        >
          {slides[activeSlide].title}
        </h1>

        {/* Slide Subtitle */}
        <p
          id="hero-subheadline"
          className="text-base sm:text-xl text-sandstone max-w-2xl mx-auto font-sans font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] animate-hero-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          {slides[activeSlide].subtitle}
        </p>

        {/* Search Bar with Category Tabs */}
        <div className="max-w-3xl mx-auto pt-4 animate-hero-slide-up" style={{ animationDelay: '450ms' }}>
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1 mb-3 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-linen-white/20 text-linen-white border border-linen-white/30'
                      : 'text-linen-white/60 hover:text-linen-white/80 hover:bg-linen-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                const cat = categories.find((c) => c.id === activeCategory);
                window.location.href = `${cat?.searchPath || '/tours/'}?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="bg-linen-white/15 backdrop-blur-xl border border-linen-white/30 p-2 rounded-full flex items-center shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold has-[:focus-visible]:border-gold has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-teal"
          >
            <div className="pl-4 text-linen-white/80">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={categories.find((c) => c.id === activeCategory)?.placeholder || 'Search...'}
              className="w-full bg-transparent text-linen-white text-sm font-sans py-2.5 px-3 focus:outline-none placeholder-linen-white/50"
              aria-label="Search"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold/90 text-teal font-mono text-sm uppercase font-black tracking-wider px-8 py-3 min-h-[48px] rounded-full transition-all duration-300 transform active:scale-95 shadow-[0_2px_12px_rgba(166,124,82,0.5)] hover:shadow-[0_4px_20px_rgba(166,124,82,0.6)] flex items-center justify-center flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-linen-white/25 border border-linen-white/40 text-linen-white hover:bg-linen-white/40 hover:text-gold transition-all duration-300 z-20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
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


    </header>
  );
};
