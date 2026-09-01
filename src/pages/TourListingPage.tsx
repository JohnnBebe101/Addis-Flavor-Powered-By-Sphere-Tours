import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCardGrid from '../components/home/TourCardGrid';

import { Tour } from '../types';
import toursData from '../content/tours.json';

export const TourListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  const allTours = toursData.tours as Tour[];
  const filteredTours =
    activeFilter === 'all'
      ? allTours
      : allTours.filter((t) => t.tourType === activeFilter);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: filter });
    }
  };

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            {activeFilter === 'all'
              ? 'All Addis Ababa Tours'
              : activeFilter === 'city-tour'
                ? 'City Tours'
                : activeFilter === 'day-trip'
                  ? 'Day Trips'
                  : 'Private & Custom Tours'}
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Browse our{activeFilter === 'all' ? '' : ' filtered'} city tours, day trips, and private excursions. Book direct and save 15%.
          </p>
        </div>
      </section>

      <section className="py-8 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'all', label: 'All Tours' },
              { key: 'city-tour', label: 'City Tours' },
              { key: 'day-trip', label: 'Day Trips' },
              { key: 'private', label: 'Private & Custom' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-mono uppercase font-bold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-coffee-red text-linen-white shadow-md'
                    : 'border border-teal/20 text-teal hover:bg-teal/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              {activeFilter === 'all'
                ? 'All Available Tours'
                : activeFilter === 'city-tour'
                  ? 'City Tours'
                  : activeFilter === 'day-trip'
                    ? 'Day Trips'
                    : 'Private & Custom Tours'}
            </h2>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <TourCardGrid
            tours={filteredTours}
          />
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            We specialize in custom itineraries. Tell us your interests, dates, and group size, and
            we'll create a personalized tour just for you.
          </p>
          <a
            href="/custom-tour/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-wider transition-all duration-300"
          >
            <span>Build Your Custom Tour</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default TourListingPage;
