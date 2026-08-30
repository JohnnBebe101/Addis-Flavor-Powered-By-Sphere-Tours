/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, MapPin, Check, Star, ChevronRight } from 'lucide-react';
import toursData from '../content/tours.json';
import reviewsData from '../content/reviews.json';

export const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tour = toursData.tours.find((t) => t.slug === slug) || toursData.tours[0];
  const tourReviews = reviewsData.reviews.filter((r) => r.tourId === tour.id);

  const [showFullPricing, setShowFullPricing] = useState(false);

  const pricingRows = (() => {
    const rows: { label: string; adult: number; child: number }[] = [];
    const p = tour.pricing;
    if (p?.smallGroup && p.smallGroup.adult > 0) {
      rows.push({ label: 'Small Group (per person)', adult: p.smallGroup.adult, child: p.smallGroup.child });
    }
    Object.entries(p?.private || {}).forEach(([key, val]: any) => {
      if (val && val.adult > 0) {
        rows.push({ label: `Private Tour (${key} people)`, adult: val.adult, child: val.child });
      }
    });
    return rows;
  })();

  const startingPrice = pricingRows.length ? Math.min(...pricingRows.map((r) => r.adult)) : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? 'fill-current text-gold' :
              i === Math.floor(rating) && rating % 1 >= 0.5 ? 'fill-current text-gold clip-path' :
              'text-gold/30'
            }`}
            style={i === Math.floor(rating) && rating % 1 >= 0.5 ? { clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' } : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linen-white">
      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${tour.images[0]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-linen-white">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-gold">
              {tour.tourType === 'city-tour' ? 'City Tour' : 'Day Trip'}
            </span>
            <div className="flex items-center gap-1">
              {renderStars(tour.rating)}
              <span className="font-mono text-sm text-gold">{tour.rating.toFixed(1)}</span>
              <span className="text-teal/30 mx-1">|</span>
              <span className="text-sm text-linen-white/80">({tour.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight mb-4">
            {tour.name}
          </h1>
          <p className="text-lg md:text-xl text-sandstone max-w-2xl mx-auto mb-8">
            {tour.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              Book Now
            </a>
            <a href={`https://wa.me/251911209882`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>

      {/* Quick Answer Box */}
      <section className="py-12 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linen-white rounded-2xl p-8 border border-teal/10">
            <h2 className="text-2xl font-serif font-bold text-teal mb-4">
              What is the {tour.name}?
            </h2>
            <p className="text-teal/80 leading-relaxed mb-6">
              {tour.fullDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Duration</p>
                  <p className="font-semibold text-teal">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Group Size</p>
                  <p className="font-semibold text-teal">{tour.groupSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Pickup</p>
                  <p className="font-semibold text-teal text-sm">Central Addis Ababa hotels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Tour Highlights
            </h2>
            <p className="text-teal/70">What makes this tour special</p>
          </div>
          <ul className="space-y-4">
            {tour.highlights.map((highlight: string, idx: number) => (
              <li key={idx} className="flex items-start gap-4 p-4 bg-sandstone/50 rounded-xl hover:bg-sandstone/80 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0 group-hover:bg-coffee-red group-hover:text-linen-white transition-colors">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-teal leading-relaxed">{highlight}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Detailed Itinerary
            </h2>
          </div>
          <div className="space-y-4">
            {tour.itinerary.map((item: any, idx: number) => (
              <div key={idx} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xl font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-bold text-teal mb-1">{item.time} — {item.activity}</h3>
                    <p className="text-sm text-teal/70">{item.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included / Excluded */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {tour.included.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-teal/80">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <span className="text-xs">✕</span>
                </span>
                What's Excluded
              </h3>
              <ul className="space-y-2">
                {tour.excluded.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-teal/80">
                    <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <span className="text-xs">✕</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — Starting From */}
      <section className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Pricing
            </h2>
            <p className="text-teal/70">Per person in USD. Book direct and save 15% vs. GetYourGuide/Viator.</p>
          </div>

          <div className="bg-linen-white rounded-2xl p-8 border border-teal/10 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-teal/60 mb-2">Starting from</p>
            <p className="text-5xl font-serif font-extrabold text-coffee-red mb-2">
              ${startingPrice}
              <span className="text-lg text-teal/60 font-sans font-normal"> / person</span>
            </p>
            <p className="text-sm text-teal/70 mb-6">Group pricing available. No hidden fees.</p>

            <button
              type="button"
              onClick={() => setShowFullPricing(!showFullPricing)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300"
            >
              {showFullPricing ? 'Hide Full Pricing' : 'View Full Pricing'}
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showFullPricing ? 'rotate-90' : ''}`} />
            </button>

            {showFullPricing && (
              <div className="mt-8 overflow-x-auto animate-fade-in">
                <table className="w-full bg-linen-white rounded-2xl overflow-hidden border border-teal/10">
                  <thead className="bg-sandstone/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-teal/60">Tour Type</th>
                      <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Adult (18+)</th>
                      <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Child (6-17)</th>
                      <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Infant (0-5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal/10">
                    {pricingRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-sandstone/50">
                        <td className="px-6 py-4 font-medium text-teal">{row.label}</td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-coffee-red">${row.adult}</td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-teal">${row.child}</td>
                        <td className="px-6 py-4 text-center font-mono font-bold text-teal">Free</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-center text-xs text-teal/60 mt-4">Book direct and save 15% vs. GetYourGuide/Viator prices. No hidden fees.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              What Travelers Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-gold" />
                ))}
              </div>
              <span className="font-mono text-sm text-teal/80">4.9/5 from 500+ reviews on TripAdvisor</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tourReviews.map((review) => (
              <div key={review.id} className="bg-linen-white rounded-xl p-6 border border-teal/10">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current text-gold' : 'text-gold/30'}`} />
                  ))}
                </div>
                <p className="font-serif text-teal leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-teal/60">
                  <span>{review.author} &mdash; {review.location}</span>
                  <span>{review.tourName}</span>
                </div>
              </div>
            ))}
            {tourReviews.length === 0 && (
              <p className="col-span-full text-center text-teal/60">No reviews yet for this tour.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {tour.faqs.map((faq: any, idx: number) => (
              <details key={idx} className="group bg-linen-white rounded-xl p-6 border border-teal/10">
                <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Licensed & Trusted
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Licensed by Ministry of Tourism</h3>
              <p className="text-linen-white/80">Fully licensed tour operator in Ethiopia</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Fully Insured</h3>
              <p className="text-linen-white/80">Comprehensive liability insurance for your peace of mind</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">24/7 WhatsApp Support</h3>
              <p className="text-linen-white/80">We're here for you before, during, and after your tour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-4">
            Ready to Book Your {tour.name}?
          </h2>
          <p className="text-teal/70 max-w-xl mx-auto mb-8">
            Secure your spot today and experience the best of Addis Ababa with our expert local guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              Book Now
            </a>
            <a href="/contact/" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};