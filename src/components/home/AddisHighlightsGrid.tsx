/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight } from 'lucide-react';

interface AddisHighlightsGridProps {
  attractions: Array<{
    id: number;
    title: string;
    description: string;
    link: string;
  }>;
  headline: string;
  subheadline: string;
}

export const AddisHighlightsGrid: React.FC<AddisHighlightsGridProps> = ({
  attractions,
  headline,
  subheadline,
}) => {
  return (
    <section id="addis-highlights" className="py-16 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {headline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">
            {subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction) => (
            <a
              key={attraction.id}
              href={attraction.link}
              className="group p-6 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
                {attraction.title}
              </h3>
              <p className="text-sm text-teal/70 leading-relaxed mb-4">
                {attraction.description}
              </p>
              <span className="font-mono text-xs text-coffee-red group-hover:text-gold transition-colors flex items-center gap-1">
                Visit on Our Tours
                <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};