/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Tag, MessageCircle } from 'lucide-react';

interface TrustBookingStripProps {
  tripAdvisorRating?: number;
  tripAdvisorReviewCount?: number;
  whatsappNumber?: string;
}

export const TrustBookingStrip: React.FC<TrustBookingStripProps> = ({
  tripAdvisorRating = 4.9,
  tripAdvisorReviewCount = 500,
  whatsappNumber = '+251-911-209-882',
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 fill-current text-gold" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} className="w-5 h-5 fill-current text-gold" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gold/30" />);
      }
    }
    return stars;
  };

  return (
    <section id="trust-booking-strip" className="bg-linen-white py-8 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
          {/* Column 1: TripAdvisor Rating */}
          <div className="flex flex-col items-center md:items-start gap-3 p-4">
            <div className="flex items-center gap-2">
              {renderStars(tripAdvisorRating)}
              <span className="font-mono text-xs uppercase tracking-widest text-teal/80">
                {tripAdvisorRating.toFixed(1)} / 5 from {tripAdvisorReviewCount}+ reviews on TripAdvisor
              </span>
            </div>
          </div>

          {/* Column 2: Direct Booking Benefit */}
          <div className="flex flex-col items-center md:items-center gap-3 p-4 border-l border-r border-teal/10 md:border-l md:border-r md:border-y-0">
            <Tag className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center" />
            <div className="text-center md:text-left">
              <p className="font-mono text-xs uppercase tracking-widest text-teal/60 mb-1">Book Direct & Save</p>
              <p className="font-serif font-bold text-lg text-coffee-red">15% vs. GetYourGuide/Viator</p>
              <p className="text-xs text-teal/60">No hidden fees, no service charges</p>
            </div>
          </div>

          {/* Column 3: WhatsApp CTA */}
          <div className="flex flex-col items-center md:items-end gap-3 p-4">
            <MessageCircle className="w-10 h-10 rounded-xl bg-coffee-red/10 text-coffee-red flex items-center justify-center" />
            <div className="text-center md:text-right">
              <p className="font-mono text-xs uppercase tracking-widest text-teal/60 mb-1">Questions?</p>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-bold text-coffee-red hover:text-gold transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};