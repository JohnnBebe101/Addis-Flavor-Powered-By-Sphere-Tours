/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Tag, Star, Headphones } from 'lucide-react';

interface WhyChooseUsHeroProps {
  headline: string;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

const ICONS = [MapPin, Tag, Star, Headphones];
const ICON_COLORS = [
  'bg-coffee-red/10 text-coffee-red',
  'bg-gold/10 text-gold',
  'bg-teal/10 text-teal',
  'bg-coffee-red/10 text-coffee-red',
];

export const WhyChooseUsHero: React.FC<WhyChooseUsHeroProps> = ({
  headline,
  benefits,
}) => {
  return (
    <section id="why-choose-us-hero" className="py-10 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title — Left-aligned like screenshot */}
        <h2 className="text-xl md:text-2xl font-serif font-bold text-teal mb-6 tracking-tight">
          {headline}
        </h2>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => {
            const Icon = ICONS[idx] || MapPin;
            const colorClass = ICON_COLORS[idx] || ICON_COLORS[0];
            return (
              <div
                key={benefit.id}
                className="bg-sandstone/30 border border-teal/10 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-teal mb-1.5 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-teal/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
