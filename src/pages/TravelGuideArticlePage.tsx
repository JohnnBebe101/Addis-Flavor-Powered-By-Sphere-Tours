import { useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import travelGuideData from '../content/travel-guide.json';

export const TravelGuideArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = travelGuideData.articles.find((a) => a.slug === slug) || travelGuideData.articles[0];

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <a href="/travel-guide/" className="flex items-center gap-2 text-teal/70 hover:text-coffee-red transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest">Back to Guides</span>
            </a>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">{article.category}</span>
            <span className="text-[10px] text-teal/60">· {article.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-teal tracking-tight mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-sm text-teal/60">
            <span className="font-mono text-xs uppercase tracking-widest">{article.readTime}</span>
            <span className="text-teal/30">|</span>
            <span className="font-sans text-teal/70">{article.category}</span>
          </div>
        </div>
      </section>

      <article className="py-16 bg-linen-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-teal max-w-none">
            <div className="text-teal/70 leading-relaxed mb-8 text-lg">
              {article.content}
            </div>
            
            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10 mb-12">
              <h2 className="text-2xl font-serif font-bold text-teal mb-4">Key Takeaways</h2>
              <ul className="space-y-3 list-disc list-inside text-teal/70">
                <li>Plan ahead: book tours and accommodation in advance, especially during peak season (Nov-Feb)</li>
                <li>Respect local customs: dress modestly, remove shoes at churches, use right hand for eating</li>
                <li>Stay hydrated: Addis Ababa is at 2,400m altitude - take it easy your first day</li>
                <li>Try the coffee ceremony: it's a cultural experience, not just a caffeine fix</li>
                <li>Use reputable tour operators: licensed guides, insured vehicles, fair prices</li>
              </ul>
            </div>

            <div className="bg-teal text-linen-white rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-serif font-bold mb-4">Ready to Experience Ethiopia?</h2>
              <p className="text-linen-white/80 mb-6 max-w-xl mx-auto">
                Let our expert local guides show you the real Ethiopia. From ancient history to modern culture, we'll craft the perfect journey for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/tours/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
                  Browse All Tours
                </a>
                <a href="/custom-tour/" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
                  Build Custom Itinerary
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-8 text-center">
            More Travel Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelGuideData.articles.filter(a => a.slug !== 'best-time-to-visit').slice(0, 3).map((a) => (
              <a key={a.slug} href={`/travel-guide/${a.slug}/`} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">{a.category}</span>
                  <span className="text-[10px] text-teal/60">· {a.readTime}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-teal mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-teal/70 leading-relaxed mb-4 flex-1">
                  {a.excerpt}
                </p>
                <span className="font-mono text-xs text-coffee-red hover:text-gold transition-colors flex items-center gap-1">
                  Read Article
                  <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelGuideArticlePage;