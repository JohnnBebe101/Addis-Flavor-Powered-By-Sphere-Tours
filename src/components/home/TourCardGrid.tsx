import { Tour } from '../../types';

interface TourCardGridProps {
  tours: Tour[];
}

function getTourTypeTag(tourType: string): { label: string; className: string } {
  switch (tourType) {
    case 'city-tour':
      return { label: 'City Tour', className: 'bg-pink-100 text-pink-700' };
    case 'day-trip':
      return { label: 'Day Trip', className: 'bg-emerald-100 text-emerald-700' };
    case 'private':
      return { label: 'Private Tour', className: 'bg-amber-100 text-amber-700' };
    default:
      return { label: tourType, className: 'bg-gray-100 text-gray-700' };
  }
}

function TourCard({ tour, price }: { tour: Tour; price: string }) {
  const typeTag = getTourTypeTag(tour.tourType);

  return (
    <a
      href={`/tours/${tour.slug}/`}
      className="group bg-linen-white rounded-2xl border border-teal/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.images[0]}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Tour Type Tag */}
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${typeTag.className}`}>
            {typeTag.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-teal leading-snug line-clamp-2 group-hover:text-coffee-red transition-colors">
          {tour.name}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-xs text-teal/70">
          <svg className="w-3.5 h-3.5 text-teal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tour.duration}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-teal">{tour.rating.toFixed(1)}</span>
          <span className="text-[10px] text-teal/50">({tour.reviewCount})</span>
        </div>

        {/* Group Size */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{tour.groupSize}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="pt-2 border-t border-teal/10">
          <span className="text-[10px] text-teal/50 font-sans">From </span>
          <span className="text-lg font-bold text-coffee-red font-sans">${price}</span>
          <span className="text-[10px] text-teal/50 font-sans"> / person</span>
        </div>
      </div>
    </a>
  );
}

export default function TourCardGrid({ tours }: TourCardGridProps) {
  const getPrice = (tour: Tour) => String(tour.pricing.smallGroup.adult);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} price={getPrice(tour)} />
      ))}
    </div>
  );
}
