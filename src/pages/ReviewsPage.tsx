import { Star } from 'lucide-react';
import reviewsData from '../content/reviews.json';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            What Travelers Say About Us
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Read what travelers say about our Addis Ababa city tours and day trips. 500+ five-star reviews on TripAdvisor. 4.9/5 average rating. Licensed local operator. Book with confidence.
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TripAdvisor Widget Placeholder */}
          <div className="mb-12 p-8 bg-sandstone/50 border border-teal/10 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-current text-gold" />
                ))}
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-teal/80">
                4.9 / 5 from 500+ reviews on TripAdvisor
              </span>
            </div>
            <p className="text-[10px] text-teal/50">[TripAdvisor widget embed code will be inserted here]</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-teal mb-4">
              Recent Traveler Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.reviews.map((review) => (
              <div key={review.id} className="bg-linen-white rounded-2xl p-6 border border-teal/10 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => {
                    return <Star key={i} className="w-5 h-5 fill-current text-gold" />;
                  })}
                </div>
                <blockquote className="text-teal leading-relaxed mb-4 flex-1">
                  "{review.text}"
                </blockquote>
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-teal/80">
                    {review.author}
                    <span className="text-teal/30 mx-2">|</span>
                    <span className="font-sans text-teal/60">{review.location}</span>
                    <span className="text-teal/30 mx-2">|</span>
                    <span className="font-sans text-teal/60">{review.date}</span>
                  </p>
                  <p className="text-[10px] text-teal/50 mt-1">{review.tourName}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://tripadvisor.com/Attraction_Review-g1-addis-ababa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-teal hover:bg-teal/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              <span>View All Reviews on TripAdvisor</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the real Addis Ababa with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/tours/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              View All Tours
            </a>
            <a href="/contact/" className="px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;