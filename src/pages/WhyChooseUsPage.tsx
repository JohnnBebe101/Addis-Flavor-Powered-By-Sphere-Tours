import { MapPin, Tag, Shield, ChevronRight, Users, Truck, Check, Calendar, Heart, ShieldCheck } from 'lucide-react';
import faqsData from '../content/faqs.json';

export const WhyChooseUsPage: React.FC = () => {
  const faqs = faqsData.faqs.general || [];

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            Why Book Direct With Addis Ababa City Tour?
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Book direct and save 15% vs. OTAs. Licensed local guides, private vehicles, flexible pickup, 24/7 WhatsApp support. 500+ five-star reviews. Free cancellation up to 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              What Sets Us Apart
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              We live here, guide here, and know Addis Ababa better than any online travel agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-teal/10 bg-sandstone/50 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-coffee-red" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">Local Knowledge & Expertise</h3>
              <p className="text-teal/70 text-center">Our guides are born and raised in Addis Ababa, speak fluent English, and share stories you won't find in guidebooks. We live here, guide here, and know the city's hidden gems.</p>
            </div>

            <div className="p-8 rounded-2xl border border-teal/10 bg-sandstone/50 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">Private & Small-Group Options</h3>
              <p className="text-teal/70 text-center">Choose from private tours (1-6 people) or small groups (max 6). Flexible pickup times, personalized attention, and itineraries tailored to your interests.</p>
            </div>

            <div className="p-8 rounded-2xl border border-teal/10 bg-sandstone/50 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">Transport & Pickup</h3>
              <p className="text-teal/70 text-center">Complimentary hotel pickup from all central Addis Ababa locations (Bole, Piassa, Meskel Square). Airport transfers available. Modern, air-conditioned vehicles.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              Safety & Responsibility
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-coffee-red/10 text-coffee-red flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">100% Vetted Guides</h3>
              <p className="text-teal/70 text-center">Every guide is personally interviewed, background-checked, and trained for safety and expertise. We visit each guide's home and meet their family.</p>
            </div>

            <div className="p-8 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-coffee-red/10 text-coffee-red flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">Health & Care</h3>
              <p className="text-teal/70 text-center">Our guides are trained in safe food preparation, clean water, and managing dietary needs including severe allergies. Bottled water provided on all tours.</p>
            </div>

            <div className="p-8 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-coffee-red/10 text-coffee-red flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold text-teal text-center mb-3">Safe Transits</h3>
              <p className="text-teal/70 text-center">Located in secure, highly accessible neighborhoods. Optional Sphere Travel transport arrangements available with professional drivers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              Booking & Cancellation Policy
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-teal/10 bg-sandstone/50">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-coffee-red" />
                Cancellation Policy
              </h3>
              <ul className="space-y-2 text-teal/70">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Free cancellation up to 24 hours before tour start time</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Cancellations within 24 hours or no-shows are non-refundable</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Weather-related cancellations: full refund or free rescheduling</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Refunds processed within 5&ndash;7 business days</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-teal/10 bg-sandstone/50">
              <h3 className="text-xl font-serif font-bold text-teal mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6 text-gold" />
                Pricing Transparency
              </h3>
              <ul className="space-y-2 text-teal/70">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Book direct and save 15% vs. GetYourGuide/Viator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> No hidden fees &mdash; all entrance fees, guide, vehicle included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Children (6-17) discounted, infants (0-5) free</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Pay in USD, EUR, or ETB &mdash; cash or card</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              Compare: Us vs. Online Travel Agencies
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-linen-white rounded-2xl overflow-hidden border border-teal/10">
              <thead className="bg-sandstone/50">
                <tr>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-teal/60">Feature</th>
                  <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-teal/60">Addis Ababa City Tour</th>
                  <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-teal/60">GetYourGuide / Viator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal/10">
                <tr className="hover:bg-sandstone/50">
                  <td className="px-6 py-4 font-medium text-teal">Price</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-coffee-red">Save 15%</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-red-500">+15-25% markup</td>
                </tr>
                <tr className="hover:bg-sandstone/50">
                  <td className="px-6 py-4 font-medium text-teal">Guide Quality</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">Born & raised locals</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">Contracted freelancers</td>
                </tr>
                <tr className="hover:bg-sandstone/50">
                  <td className="px-6 py-4 font-medium text-teal">Flexibility</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">Fully customizable</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">Fixed itineraries</td>
                </tr>
                <tr className="hover:bg-sandstone/50">
                  <td className="px-6 py-4 font-medium text-teal">Support</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">24/7 WhatsApp</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">Email only (slow)</td>
                </tr>
                <tr className="hover:bg-sandstone/50">
                  <td className="px-6 py-4 font-medium text-teal">Cancellation</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">Free up to 24h</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">Strict policies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-teal mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.slice(0, 8).map((faq, idx) => (
              <details key={idx} className="group bg-linen-white rounded-xl p-6 border border-teal/10">
                <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-teal text-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Book Direct & Save 15%?
          </h2>
          <p className="text-lg text-linen-white/80 max-w-xl mx-auto mb-8">
            Browse our tours and experience the difference of booking with local experts.
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

export default WhyChooseUsPage;