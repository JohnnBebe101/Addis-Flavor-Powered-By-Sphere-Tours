import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tour } from '../../types';

interface TourCardGridProps {
  tours: Tour[];
  carousel?: boolean;
}

export default function TourCardGrid({ tours, carousel = false }: TourCardGridProps) {
  const getPrice = (tour: Tour) => String(tour.pricing.smallGroup.adult);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    if (!carousel) return;
    const handleResize = () => {
      if (window.innerWidth >= 768) setPerPage(8);
      else setPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carousel]);

  useEffect(() => {
    setCurrentPage(0);
  }, [tours]);

  const totalPages = Math.ceil(tours.length / perPage);
  const visibleTours = tours.slice(currentPage * perPage, (currentPage + 1) * perPage);

  if (!carousel) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {visibleTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10 shadow-sm"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage >= totalPages - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 p-2 rounded-full bg-linen-white/90 border border-teal/10 text-teal hover:text-coffee-red hover:bg-white hover:border-coffee-red disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 z-10 shadow-sm"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Page dots */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentPage ? 'w-4 bg-coffee-red' : 'w-1.5 bg-teal/20'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TourCard({ tour, price }: { tour: Tour; price: string }) {
  return (
    <a
      href={`/tours/${tour.slug}/`}
      className="group bg-linen-white rounded-xl border border-teal/10 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.images[0]}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 bg-teal/80 backdrop-blur-sm px-3 py-2">
          <p className="text-linen-white text-sm font-bold">
            from ${price} per adult
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-teal leading-snug line-clamp-2 group-hover:text-coffee-red transition-colors">
          {tour.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 mt-auto">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.round(tour.rating)
                    ? 'bg-emerald-500'
                    : 'bg-teal/15'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-teal">
            {tour.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-teal/50">
            ({tour.reviewCount})
          </span>
        </div>
      </div>
    </a>
  );
}
