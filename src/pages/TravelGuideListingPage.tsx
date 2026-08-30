import { ChevronRight } from 'lucide-react';
import travelGuideData from '../content/travel-guide.json';

export const TravelGuideListingPage: React.FC = () => {
  const categories = travelGuideData.categories || [];

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            Ethiopia Travel Guide
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Expert travel guides for Addis Ababa and Ethiopia: best time to visit, what to wear, coffee ceremony etiquette, day trip itineraries, practical tips. Plan your perfect Ethiopian adventure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button key={cat.id} className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-teal/5 text-sm font-mono uppercase font-bold">
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelGuideData.articles.map((article) => {
              return (
              <a key={article.id} href={`/travel-guide/${article.slug}/`} className="group bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">{article.category}</span>
                  <span className="text-[10px] text-teal/60">· {article.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-teal/70 leading-relaxed mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-teal/10">
                  <span className="font-mono text-xs text-coffee-red hover:text-gold transition-colors flex items-center gap-1">
                    Read Article
                    <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a href="/contact/" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              <span>Can't Find What You Need? Contact Us</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Plan Your Perfect Ethiopian Adventure
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            From ancient history to modern culture, our expert guides help you experience the real Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/tours/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              Browse Tours
            </a>
            <a href="/custom-tour/" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              Custom Itinerary
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelGuideListingPage;