import TourCardGrid from '../components/home/TourCardGrid';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import { MapPin, Mountain, Crown } from 'lucide-react';

import { Tour } from '../types';
import toursData from '../content/tours.json';

export const TourListingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            All Addis Ababa Tours
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Browse all our city tours, day trips, and private excursions. Book direct and save 15%.
          </p>
        </div>
      </section>

      <section className="py-8 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-4 py-2 rounded-full bg-coffee-red text-linen-white text-sm font-mono uppercase font-bold">All Tours</button>
            <button className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-teal/5 text-sm font-mono uppercase font-bold">City Tours</button>
            <button className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-teal/5 text-sm font-mono uppercase font-bold">Day Trips</button>
            <button className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-teal/5 text-sm font-mono uppercase font-bold">Private & Custom</button>
          </div>

          <TourCategorySelector
            categories={[
              { id: 'city-tours', title: 'City Tours', description: "Half-day and full-day tours of Addis Ababa's top attractions", priceFrom: 'From $42', link: '/tours/', icon: <MapPin className="w-7 h-7" /> },
              { id: 'day-trips', title: 'Day Trips', description: 'Escape the city: Debre Libanos, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes', priceFrom: 'From $75', link: '/tours/', icon: <Mountain className="w-7 h-7" /> },
              { id: 'private-custom', title: 'Private & Custom', description: 'Fully customizable itineraries, flexible pickup times, dedicated guide', priceFrom: 'Price on Request', link: '/custom-tour/', icon: <Crown className="w-7 h-7" /> },
            ]}
            headline="Browse by Category"
            subheadline="Choose the type of experience that matches your travel style"
          />
        </div>
      </section>

      <section className="py-16 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              All Available Tours
            </h2>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Choose from our complete collection of Addis Ababa city tours and day trips
            </p>
          </div>

          <TourCardGrid
            translations={{
              subheadline: 'Choose from our complete collection of Addis Ababa city tours and day trips',
            }}
            tours={toursData.tours as Tour[]}
            expandedTourId={null}
            setExpandedTourId={() => {}} // TODO: wire expansion state
            handleSelectSearchPackage={() => {}} // TODO: wire to Layout search
          />
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            We specialize in custom itineraries. Tell us your interests, dates, and group size, and we'll create a personalized tour just for you.
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