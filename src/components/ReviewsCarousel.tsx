/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { HostReview, Language } from '../types';

interface ReviewsCarouselProps {
  reviews: HostReview[];
  currentLang: Language;
  onBookClick: () => void;
}

export default function ReviewsCarousel({ reviews, currentLang, onBookClick }: ReviewsCarouselProps) {
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
      className="bg-sandstone py-12 md:py-16 border-t border-b border-teal/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <p className="text-center font-mono text-xs text-teal/60 uppercase tracking-widest mb-4">
          {currentLang === 'en' ? 'Traveler Review from ' : currentLang === 'fr' ? 'Avis de voyageur du ' : 'የጎብኚ አስተያየት - '}
          <span className="font-semibold text-coffee-red">June 19, 2026</span>
        </p>

        {/* Carousel Frame */}
        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button
            id="review-prev-btn"
            onClick={handlePrev}
            className="hidden sm:flex p-2 rounded-full border border-teal/20 text-teal/40 hover:text-coffee-red hover:border-coffee-red hover:bg-white transition-all duration-300 focus:outline-none"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Quote Content */}
          <div className="text-center px-4 md:px-8 transition-all duration-500 transform scale-100 flex-1">
            <div className="flex justify-center mb-4">
              <Quote className="w-8 h-8 text-gold/60 rotate-180" />
            </div>

            <blockquote className="text-lg md:text-xl font-serif text-teal leading-relaxed md:leading-loose">
              "{currentLang === 'en' ? activeReview.quoteEn : currentLang === 'fr' ? activeReview.quoteFr : activeReview.quoteAm}"
            </blockquote>

            <div className="mt-6">
              <p className="font-mono text-xs uppercase tracking-wider text-teal/80">
                {currentLang === 'en' ? activeReview.authorEn : currentLang === 'fr' ? activeReview.authorFr : activeReview.authorAm}
                <span className="text-teal/30 mx-2">|</span>
                <span className="font-sans text-teal/60">
                  {currentLang === 'en' ? activeReview.locationEn : currentLang === 'fr' ? activeReview.locationFr : activeReview.locationAm}
                </span>
              </p>

              <button
                id={`book-now-review-${activeReview.id}`}
                onClick={onBookClick}
                className="mt-4 inline-block font-mono text-xs font-bold text-coffee-red hover:text-gold uppercase tracking-widest border-b border-coffee-red hover:border-gold pb-0.5 transition-all duration-200"
              >
                {currentLang === 'en' ? 'BOOK NOW' : currentLang === 'fr' ? 'RÉSERVER MAINTENANT' : 'ቦታ ያስይዙ'}
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            id="review-next-btn"
            onClick={handleNext}
            className="hidden sm:flex p-2 rounded-full border border-teal/20 text-teal/40 hover:text-coffee-red hover:border-coffee-red hover:bg-white transition-all duration-300 focus:outline-none"
            aria-label="Next Review"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Swipe / Click Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              id={`review-indicator-dot-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === activeIndex ? 'w-6 bg-coffee-red' : 'w-2 bg-teal/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
