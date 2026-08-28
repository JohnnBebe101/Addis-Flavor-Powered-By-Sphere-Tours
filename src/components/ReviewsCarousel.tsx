/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { HostReview } from '../types';

interface ReviewsCarouselProps {
  reviews: HostReview[];
  onBookClick: () => void;
}

export default function ReviewsCarousel({ reviews, onBookClick }: ReviewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const activeReview = reviews[activeIndex];

  return (
    <section
      id="traveler-reviews"
      className="bg-sandstone py-6 md:py-8 border-t border-b border-teal/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <p className="text-center font-mono text-[10px] text-teal/60 uppercase tracking-widest mb-2">
          {'Traveler Review from '}
          <span className="font-semibold text-coffee-red">June 19, 2026</span>
        </p>

        {/* Carousel Frame */}
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button
            id="review-prev-btn"
            onClick={handlePrev}
            className="hidden sm:flex p-1.5 rounded-full border border-teal/20 text-teal/40 hover:text-coffee-red hover:border-coffee-red hover:bg-white transition-all duration-300 focus:outline-none"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Quote Content */}
          <div className="text-center px-4 md:px-8 transition-all duration-500 transform scale-100 flex-1">
            <div className="flex justify-center mb-2">
              <Quote className="w-6 h-6 text-gold/60 rotate-180" />
            </div>

            <blockquote className="text-base md:text-lg font-serif text-teal leading-relaxed max-w-2xl mx-auto">
              "{activeReview.quote}"
            </blockquote>

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-teal/80">
                {activeReview.author}
                <span className="text-teal/30 mx-2">|</span>
                <span className="font-sans text-teal/60">{activeReview.location}</span>
              </p>

              <button
                id={`book-now-review-${activeReview.id}`}
                onClick={onBookClick}
                className="mt-2.5 inline-block font-mono text-[10px] font-bold text-coffee-red hover:text-gold uppercase tracking-widest border-b border-coffee-red hover:border-gold pb-0.5 transition-all duration-200"
              >
                {'BOOK NOW'}
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            id="review-next-btn"
            onClick={handleNext}
            className="hidden sm:flex p-1.5 rounded-full border border-teal/20 text-teal/40 hover:text-coffee-red hover:border-coffee-red hover:bg-white transition-all duration-300 focus:outline-none"
            aria-label="Next Review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Swipe / Click Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              id={`review-indicator-dot-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex ? 'w-4 bg-coffee-red' : 'w-1.5 bg-teal/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
