import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  openFaqIndex: number | null;
  setOpenFaqIndex: (index: number | null) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ openFaqIndex, setOpenFaqIndex }) => {
  return (
    <section
      id="faq-section"
      className="py-12 md:py-16 bg-linen-white border-b border-teal/10"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-teal">
            {'Frequently Asked Questions'}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-3 divide-y divide-teal/10">
          {/* FAQ 1 */}
          <div className="pt-3">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
              className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
            >
              <h3 className="font-serif font-bold text-sm sm:text-base text-teal group-hover:text-coffee-red transition-colors">
                {'Where do these experiences take place?'}
              </h3>
              <ChevronDown
                className={`w-4 h-4 text-teal/40 group-hover:text-coffee-red transition-transform duration-300 flex-shrink-0 ml-4 ${openFaqIndex === 0 ? 'rotate-180 text-coffee-red' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openFaqIndex === 0 ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-xs sm:text-sm text-teal/70 leading-relaxed font-sans pb-3">
                {
                  'Most of these home cooking experiences and coffee ceremonies are held inside cozy, real local host kitchens and residential compounds. The exact address is sent immediately after booking validation.'
                }
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="pt-3">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
              className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
            >
              <h3 className="font-serif font-bold text-sm sm:text-base text-teal group-hover:text-coffee-red transition-colors">
                {'How does payment work?'}
              </h3>
              <ChevronDown
                className={`w-4 h-4 text-teal/40 group-hover:text-coffee-red transition-transform duration-300 flex-shrink-0 ml-4 ${openFaqIndex === 1 ? 'rotate-180 text-coffee-red' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openFaqIndex === 1 ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-xs sm:text-sm text-teal/70 leading-relaxed font-sans pb-3">
                {
                  'This website simulates local booking authorization. No immediate cash is charged from your card. You pay your host directly on-site or via flexible electronic options (Telebirr/Cash) during your culinary session.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};