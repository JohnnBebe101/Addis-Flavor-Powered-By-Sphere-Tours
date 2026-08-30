/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DestinationCardProps {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  priceFrom: string;
}

interface DayTripDestinationsCarouselProps {
  destinations: DestinationCardProps[];
  headline: string;
  subheadline: string;
}

export const DayTripDestinationsCarousel: React.FC<DayTripDestinationsCarouselProps> = ({
  destinations,
  headline,
  subheadline,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(destinations.length - itemsPerView, prev + 1));
  };

  const visibleDestinations = destinations.slice(activeIndex, activeIndex + itemsPerView);

  return (
    <section id="day-trip-destinations" className="py-16 bg-sandstone/10 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {headline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">
            {subheadline}
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)` }}
            >
              {visibleDestinations.map((dest) => (
                <a
                  key={dest.id}
                  href={dest.link}
                  className={`w-full ${itemsPerView === 1 ? 'max-w-md mx-auto' : 'flex-1'} px-2 group`}
                >
                  <div className="h-full p-6 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                      {dest.icon}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
                      {dest.title}
                    </h3>
                    <p className="text-sm text-teal/70 leading-relaxed mb-4 flex-1">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                      <span className="font-mono text-xs text-gold font-bold">
                        {dest.priceFrom}
                      </span>
                      <span className="font-mono text-xs text-coffee-red hover:text-gold transition-colors flex items-center gap-1">
                        Visit Guide
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10"
            aria-label="Previous Destination"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex >= destinations.length - itemsPerView}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10"
            aria-label="Next Destination"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile Indicators */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {Array.from({ length: Math.ceil(destinations.length / itemsPerView) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx * itemsPerView)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === Math.floor(activeIndex / itemsPerView) ? 'w-4 bg-coffee-red' : 'w-1.5 bg-teal/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};