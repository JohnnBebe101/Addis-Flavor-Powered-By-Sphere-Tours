import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import thingsToDoData from '../content/things-to-do.json';

const CATEGORIES = ['All', 'City Tours', 'Day Trips', 'Must-Sees'] as const;

export function ThingsToDoPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { hero, items, cta } = thingsToDoData;

  const filteredItems = items.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="relative bg-teal text-linen-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm font-mono text-linen-white/60 mb-6">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-linen-white">Things to Do</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold mt-6 mb-4">
            {hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-linen-white/80 max-w-3xl">
            {hero.subheadline}
          </p>
        </div>
      </section>

      <section className="py-8 bg-sandstone border-b border-teal/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-coffee-red text-linen-white shadow-md'
                    : 'bg-linen-white text-teal border border-teal/20 hover:border-coffee-red/50 hover:text-coffee-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-linen-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-teal/5">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-linen-white/90 text-teal text-xs font-mono uppercase rounded-full">{item.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-teal mb-2 group-hover:text-coffee-red transition-colors">{item.title}</h3>
                  <p className="text-teal/70 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-teal/60 font-mono mb-4">
                    {item.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>}
                    {item.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>}
                  </div>
                  <Link to={item.link} className="block w-full text-center px-6 py-3 border-2 border-teal/20 text-teal rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red hover:text-linen-white hover:border-coffee-red transition-all duration-300">
                    {'Learn More'} <ArrowRight className="w-4 h-4 inline ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-4">{cta.headline}</h2>
          <p className="text-teal/70 mb-8 max-w-2xl mx-auto">{cta.subheadline}</p>
          <Link to={cta.link} className="inline-block px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg hover:shadow-xl">
            {cta.buttonText} <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
