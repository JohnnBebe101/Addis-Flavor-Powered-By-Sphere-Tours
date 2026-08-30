import { ChevronRight, Mountain, TreePine, Waves, Church, Landmark } from 'lucide-react';
import destinationsData from '../content/destinations.json';

export const DestinationListingPage: React.FC = () => {
  const destinationsWithIcons = destinationsData.destinations.map((dest, idx) => ({
    ...dest,
    icon: idx === 0 ? <Landmark className="w-7 h-7" /> : 
          idx === 1 ? <Church className="w-7 h-7" /> :
          idx === 2 ? <TreePine className="w-7 h-7" /> :
          idx === 3 ? <Waves className="w-7 h-7" /> :
          idx === 4 ? <Mountain className="w-7 h-7" /> :
          <Landmark className="w-7 h-7" />,
  }));

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            Destinations
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Explore Addis Ababa and nearby destinations: Debre Libanos Monastery, Tiya UNESCO Site, Menagesha Forest, Bishoftu Crater Lakes. Complete travel guides with attractions, tips, and tour recommendations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              Explore by Region
            </h2>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Each destination offers unique experiences. Click to explore detailed guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinationsWithIcons.map((dest) => {
              return (
              <a
                key={dest.slug}
                href={`/destinations/${dest.slug}/`}
                className="group p-6 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                  {dest.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
                  {dest.name}
                </h3>
                <p className="text-sm text-teal/70 leading-relaxed mb-4">
                  {dest.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                  <span className="font-mono text-xs text-gold font-bold">
                    View Guide
                  </span>
                  <span className="font-mono text-xs text-coffee-red group-hover:text-gold transition-colors flex items-center gap-1">
                    Explore
                    <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Plan Your Ethiopia Adventure
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            From ancient monasteries to crater lakes, Ethiopia's wonders await. Let us help you craft the perfect itinerary.
          </p>
          <a
            href="/custom-tour/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-wider transition-all duration-300"
          >
            <span>Build Your Custom Trip</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default DestinationListingPage;