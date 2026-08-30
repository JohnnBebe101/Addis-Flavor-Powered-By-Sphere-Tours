import { useParams } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Clock, DollarSign, TreePine, Church, Landmark, Waves, ShieldCheck, Coffee, Check } from 'lucide-react';
import destinationsData from '../content/destinations.json';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = destinationsData.destinations.find((d) => d.slug === slug) || destinationsData.destinations[0];

  const getIcon = (slug: string) => {
    if (slug === 'addis-ababa') return <Landmark className="w-7 h-7" />;
    if (slug === 'debre-libanos') return <Church className="w-7 h-7" />;
    if (slug === 'tiya') return <Landmark className="w-7 h-7" />;
    if (slug === 'menagesha-forest') return <TreePine className="w-7 h-7" />;
    if (slug === 'bishoftu') return <Waves className="w-7 h-7" />;
    return <Landmark className="w-7 h-7" />;
  };

  return (
    <div className="min-h-screen bg-linen-white">
      {/* Hero Section */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(/images/destinations/${dest.slug}-hero.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-linen-white">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
              {getIcon(dest.slug)}
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold">
              Destination Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight mb-4">
            {dest.name}
          </h1>
          <p className="text-lg md:text-xl text-sandstone max-w-2xl mx-auto mb-8">
            {dest.subtitle}
          </p>
        </div>
      </header>

      {/* Quick Answer Box */}
      <section className="py-12 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linen-white rounded-2xl p-8 border border-teal/10">
            <h2 className="text-2xl font-serif font-bold text-teal mb-4">
              What is {dest.name} known for?
            </h2>
            <p className="text-teal/80 leading-relaxed mb-6">
              {dest.shortDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Best Time to Visit</p>
                  <p className="font-semibold text-teal">{dest.bestTimeToVisit.season}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Distance from Addis</p>
                  <p className="font-semibold text-teal">{dest.gettingThere.fromAddisAbaba || 'In Addis Ababa'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sandstone/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-teal/60">Avg. Tour Price</p>
                  <p className="font-semibold text-teal">From $65</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-linen-white border-b border-teal/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sandstone/50 rounded-xl p-6 border border-teal/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-gold mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#attractions" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Top Attractions</span>
              </a>
              <a href="#tours" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Best Tours</span>
              </a>
              <a href="#when-to-visit" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>When to Visit</span>
              </a>
              <a href="#getting-there" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Getting There</span>
              </a>
              <a href="#where-to-stay" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Where to Stay</span>
              </a>
              <a href="#safety" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Safety &amp; Tips</span>
              </a>
              <a href="#culture" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Cultural Etiquette</span>
              </a>
              <a href="#faq" className="flex items-center gap-2 text-teal/80 hover:text-coffee-red transition-colors p-2 rounded-lg hover:bg-sandstone/50">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>FAQs</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Top Attractions */}
      <section id="attractions" className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Top Attractions in {dest.name}
            </h2>
          </div>
          <div className="space-y-6">
            {dest.topAttractions.map((attraction, idx) => {
              return (
                <div key={idx} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                      {getIcon(dest.slug)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-teal mb-1">{attraction.name}</h3>
                      <p className="text-teal/70 leading-relaxed mb-2">{attraction.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs font-mono text-teal/60">
                        <span><strong>Visit Duration:</strong> {attraction.visitDuration}</span>
                        <span><strong>Entrance Fee:</strong> {attraction.entranceFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Tours */}
      <section id="tours" className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Best Tours in {dest.name}
            </h2>
            <p className="text-teal/70">Recommended tours that include this destination</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dest.relatedTours.slice(0, 3).map((tourSlug) => {
              return (
                <div key={tourSlug} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-serif font-bold text-teal mb-2 capitalize">{tourSlug.replace(/-/g, ' ')}</h3>
                  <p className="text-sm text-teal/70 mb-4">Discover {dest.name} with our expert guides.</p>
                  <a href={`/tours/${tourSlug}/`} className="font-mono text-xs text-coffee-red hover:text-gold transition-colors flex items-center gap-1">
                    View Tour
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Visit */}
      <section id="when-to-visit" className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            When to Visit {dest.name}
          </h2>
          <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10 mb-12">
            <h3 className="text-xl font-serif font-bold text-teal mb-4">{dest.bestTimeToVisit.season}</h3>
            <p className="text-teal/80 leading-relaxed mb-6">
              {dest.bestTimeToVisit.bestFor}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-sandstone/50">
                  <tr>
                    <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-teal/60">Season</th>
                    <th className="px-6 py-3 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Months</th>
                    <th className="px-6 py-3 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Weather</th>
                    <th className="px-6 py-3 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Crowds</th>
                    <th className="px-6 py-3 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal/10">
                  <tr>
                    <td className="px-6 py-3 font-medium text-teal">Dry Season</td>
                    <td className="px-6 py-3 text-center font-mono text-teal">{dest.bestTimeToVisit.season.split(' ')[0]}</td>
                    <td className="px-6 py-3 text-center font-mono text-teal">{dest.bestTimeToVisit.temperature}</td>
                    <td className="px-6 py-3 text-center font-mono text-teal">{dest.bestTimeToVisit.rainfall}</td>
                    <td className="px-6 py-3 text-center font-mono text-teal">{dest.bestTimeToVisit.bestFor}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section id="getting-there" className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            Getting to {dest.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <div className="w-12 h-12 rounded-xl bg-coffee-red/10 text-coffee-red flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-teal mb-2">From Addis Ababa</h3>
              <p className="text-teal/70">{dest.gettingThere.fromAddisAbaba || 'In Addis Ababa'}</p>
              <p className="text-xs text-teal/60 mt-2">{dest.gettingThere.transport || 'Private vehicle recommended'}</p>
            </div>
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-teal mb-2">Transport Options</h3>
              <p className="text-teal/70">{dest.gettingThere.transport || 'Private vehicle, organized tour'}</p>
            </div>
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-teal mb-2">Travel Time</h3>
              <p className="text-teal/70">{dest.gettingThere.roadConditions || 'Varies by destination'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section id="where-to-stay" className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            Where to Stay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">Neighborhoods</h3>
              <ul className="space-y-2">
                {dest.whereToStay.neighborhoods?.map((n, i) => {
                  return (
                    <li key={i} className="text-teal/70 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold"></span>
                      {n}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">Hotel Types</h3>
              <p className="text-teal/70">{dest.whereToStay.hotelTypes || 'Various options available'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Practical Tips */}
      <section id="safety" className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            Safety &amp; Practical Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-coffee-red" />
                Safety Tips
              </h3>
              <ul className="space-y-2">
                {dest.safetyTips.map((tip, i) => {
                  return (
                    <li key={i} className="text-teal/70 flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-linen-white rounded-2xl p-6 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-gold" />
                Cultural Etiquette
              </h3>
              <ul className="space-y-2">
                {dest.culturalEtiquette.map((tip, i) => {
                  return (
                    <li key={i} className="text-teal/70 flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-2">
              Frequently Asked Questions About {dest.name}
            </h2>
          </div>
          <div className="space-y-4">
            <details className="group bg-linen-white rounded-xl p-6 border border-teal/10">
              <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                What is {dest.name} known for?
                <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                {dest.shortDescription}
              </div>
            </details>
            <details className="group bg-linen-white rounded-xl p-6 border border-teal/10">
              <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                What is the best time to visit?
                <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                {dest.bestTimeToVisit.bestFor}
              </div>
            </details>
            <details className="group bg-linen-white rounded-xl p-6 border border-teal/10">
              <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                How do I get there from Addis Ababa?
                <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                {dest.gettingThere.fromAddisAbaba} via {dest.gettingThere.transport || 'private vehicle'}. Road conditions: {dest.gettingThere.roadConditions || 'varies'}.
              </div>
            </details>
            <details className="group bg-linen-white rounded-xl p-6 border border-teal/10">
              <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                What should I wear/pack?
                <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                Comfortable walking shoes, layers for temperature changes, sun protection. For religious sites: modest clothing covering shoulders and knees.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-sandstone/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            More Ethiopia Travel Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinationsData.destinations.filter((d) => d.slug !== dest.slug).slice(0, 3).map((d) => {
              return (
                <a key={d.slug} href={`/destinations/${d.slug}/`} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                    {getIcon(d.slug)}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-teal mb-2">{d.name}</h3>
                  <p className="text-sm text-teal/70 leading-relaxed mb-4">{d.shortDescription}</p>
                  <span className="font-mono text-xs text-coffee-red hover:text-gold transition-colors flex items-center gap-1">
                    Read Guide
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-teal text-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Explore {dest.name}?
          </h2>
          <p className="text-lg text-linen-white/80 max-w-xl mx-auto mb-8">
            Book a tour with our expert local guides and experience the best of {dest.name}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/tours/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              View All Tours
            </a>
            <a href="/custom-tour/" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              Build Custom Trip
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetailPage;
