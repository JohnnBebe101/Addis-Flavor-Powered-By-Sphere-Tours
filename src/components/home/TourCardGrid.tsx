import { Check, Star } from 'lucide-react';
import { Tour } from '../../types';

interface TourCardGridProps {
  translations: {
    subheadline?: string;
  };
  tours: Tour[];
  expandedTourId: string | null;
  setExpandedTourId: (id: string | null) => void;
  handleSelectSearchPackage: (tourId: string) => void;
}

export default function TourCardGrid({
  translations,
  tours,
  expandedTourId,
  setExpandedTourId,
  handleSelectSearchPackage,
}: TourCardGridProps) {
  const getPriceDisplay = (tour: Tour) => {
    const smallGroup = tour.pricing.smallGroup;
    return `${smallGroup.adult}`;
  };

  return (
    <section id="tours" className="py-16 md:py-24 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {'Our Most Popular Tours'}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">
            {translations.subheadline || 'Choose from our top-rated Addis Ababa city tours and day trips. All tours include expert local guides, hotel pickup, and best price guarantee.'}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${expandedTourId ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}
        >
          {tours.map((tour) => {
            const isExpanded = expandedTourId === tour.id;
            const priceDisplay = getPriceDisplay(tour);

            return (
              <div
                key={tour.id}
                id={`tour-card-${tour.id}`}
                className={`bg-linen-white text-teal rounded-3xl border border-teal/10 shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                  isExpanded
                    ? 'lg:col-span-2 border-gold/40 ring-1 ring-gold/20 order-first'
                    : expandedTourId
                      ? 'lg:col-span-1 order-last'
                      : 'lg:col-span-1'
                }`}
              >
                <div className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-12' : ''} gap-0`}>
                  <div
                    className={`relative ${isExpanded ? 'lg:col-span-5 h-[280px] lg:h-full' : 'h-[220px]'}`}
                  >
                    <img
                      src={tour.images[0]}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-linen-white text-xl p-2 rounded-2xl shadow">
                      🗺️
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-linen-white flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                          {'Duration'}
                        </p>
                        <p className="text-xs font-semibold">{tour.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                          {'Starting price'}
                        </p>
                        <p className="text-base font-bold text-gold">{priceDisplay} USD</p>
                      </div>
                    </div>
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-gold/95 text-teal px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{tour.rating.toFixed(1)}</span>
                      <span className="text-[9px] opacity-80">({tour.reviewCount})</span>
                    </div>
                  </div>

                  <div
                    className={`p-6 sm:p-8 flex flex-col justify-between ${isExpanded ? 'lg:col-span-7 space-y-6' : 'space-y-4'}`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-coffee-red bg-coffee-red/10 px-2.5 py-1 rounded-full">
                        {tour.tourType === 'city-tour' ? 'City Tour' : 'Day Trip'}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal tracking-tight mt-3">
                        {tour.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-teal/75 leading-relaxed mt-3">
                        {tour.shortDescription}
                      </p>

                      {/* Availability badge */}
                      <span className={`inline-block mt-3 px-2 py-1 text-[9px] font-mono uppercase rounded-full ${
                        tour.availability === 'available'
                          ? 'bg-emerald-100 text-emerald-700'
                          : tour.availability === 'limited'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {tour.availability.charAt(0).toUpperCase() + tour.availability.slice(1)}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="bg-sandstone/60 p-5 rounded-2xl border border-teal/5 space-y-4 animate-fade-in">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-coffee-red border-b border-teal/10 pb-2">
                          {'Tour Itinerary'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tour.itinerary.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3 text-xs">
                              <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="font-bold text-teal">{item.time} — {item.activity}</h5>
                                <p className="text-[10px] text-teal/70 leading-relaxed mt-0.5">
                                  {item.duration}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Highlights */}
                        <div className="pt-2 border-t border-teal/10">
                          <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-coffee-red mb-2">
                            {'Highlights'}
                          </h5>
                          <ul className="space-y-1 text-xs text-teal/75">
                            {tour.highlights.slice(0, 4).map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                      <button
                        id={`explore-trigger-${tour.id}`}
                        onClick={() => {
                          const willExpand = !isExpanded;
                          setExpandedTourId(willExpand ? tour.id : null);
                          if (willExpand) {
                            setTimeout(() => {
                              const element = document.getElementById(`tour-card-${tour.id}`);
                              if (element) {
                                element.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                              }
                            }, 300);
                          }
                        }}
                        className="flex items-center space-x-1 font-mono text-xs font-bold text-teal hover:text-coffee-red transition-colors py-2 focus:outline-none"
                      >
                        <span>{isExpanded ? 'COLLAPSE DETAILS' : 'EXPLORE ITINERARY'}</span>
                        <span
                          className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>

                      <button
                        id={`book-trigger-${tour.id}`}
                        onClick={() => {
                          handleSelectSearchPackage(tour.id);
                        }}
                        className="px-5 py-2 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow"
                      >
                        {'Book Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}