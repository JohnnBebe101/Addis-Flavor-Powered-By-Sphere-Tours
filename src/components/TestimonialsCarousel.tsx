/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  onBookClick: () => void;
  tripAdvisorRating?: number;
  tripAdvisorReviewCount?: number;
}

export default function TestimonialsCarousel({
  testimonials,
  onBookClick,
  tripAdvisorRating = 4.9,
  tripAdvisorReviewCount = 500,
}: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  if (!testimonials.length) return null;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-current text-gold" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} className="w-4 h-4 fill-current text-gold" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gold/30" />);
      }
    }
    return stars;
  };

  return (
    <section
      id="testimonials"
      className="bg-sandstone py-6 md:py-8 border-t border-b border-teal/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* TripAdvisor Widget Placeholder */}
        <div className="mb-6 p-4 bg-sandstone/50 border border-teal/10 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {renderStars(tripAdvisorRating)}
            <span className="font-mono text-xs uppercase tracking-widest text-teal/80">
              {tripAdvisorRating.toFixed(1)} / 5 from {tripAdvisorReviewCount}+ reviews on TripAdvisor
            </span>
          </div>
          <p className="text-[10px] text-teal/50">[TripAdvisor embed code will be inserted here]</p>
        </div>

        <p className="text-center font-mono text-[10px] text-teal/60 uppercase tracking-widest mb-2">
          {'Featured Traveler Reviews'}
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
              "{activeTestimonial.text}"
            </blockquote>

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-teal/80">
                {activeTestimonial.author}
                <span className="text-teal/30 mx-2">|</span>
                <span className="font-sans text-teal/60">{activeTestimonial.location}</span>
                <span className="text-teal/30 mx-2">|</span>
                <span className="font-sans text-teal/60">{activeTestimonial.tourName}</span>
              </p>

              <button
                id={`book-now-review-${activeTestimonial.id}`}
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
          {testimonials.map((_, idx) => (
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