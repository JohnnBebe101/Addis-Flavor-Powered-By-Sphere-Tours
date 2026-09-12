/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';

interface WhyChooseUsHeroProps {
  headline: string;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
    image?: string;
    link?: string;
    cta?: string;
  }>;
}

export const WhyChooseUsHero: React.FC<WhyChooseUsHeroProps> = ({
  headline,
  benefits,
}) => {
  if (!benefits.length) return null;

  return (
    <section id="why-choose-us-hero" className="py-5 lg:py-6 bg-linen-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg md:text-xl font-serif font-bold text-teal mb-4 tracking-tight text-center">
          {headline}
        </h2>

        {/* ROW 1: Hero card (8/12) + 1 small card (4/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
          {/* Hero card — 8 columns on desktop, full width on mobile */}
          {benefits[0] && (
            <a
              href={benefits[0].link || '#'}
              className="group lg:col-span-8 flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative sm:w-[45%] aspect-[2/1] overflow-hidden">
                {benefits[0].image ? (
                  <img
                    src={benefits[0].image}
                    alt={benefits[0].title}
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-teal" />
                )}
              </div>
              <div className="sm:w-[55%] flex flex-col justify-center p-3 lg:p-4">
                <h3 className="text-sm lg:text-base font-bold text-teal mb-1 leading-snug group-hover:text-coffee-red transition-colors duration-200">
                  {benefits[0].title}
                </h3>
                <p className="text-[11px] text-teal/60 leading-relaxed mb-2 line-clamp-1">
                  {benefits[0].description}
                </p>
                {benefits[0].cta && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-coffee-red group-hover:underline transition-all duration-200">
                    {benefits[0].cta}
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          )}

          {/* Single small card — 4 columns on desktop, full width on mobile */}
          {benefits[1] && (
            <a
              href={benefits[1].link || '#'}
              className="group lg:col-span-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[2/1] overflow-hidden">
                {benefits[1].image ? (
                  <img
                    src={benefits[1].image}
                    alt={benefits[1].title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-sandstone" />
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                  {benefits[1].title}
                </h3>
                <p className="text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1">
                  {benefits[1].description}
                </p>
                {benefits[1].cta && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1.5">
                    {benefits[1].cta}
                    <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                )}
              </div>
            </a>
          )}
        </div>

        {/* ROW 2: 3 equal compact cards */}
        {benefits.length > 2 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {benefits.slice(2).map((benefit) => (
              <a
                key={benefit.id}
                href={benefit.link || '#'}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-teal/10 bg-white transition-shadow duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  {benefit.image ? (
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-sandstone" />
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-1">
                  <h3 className="text-xs font-bold text-teal mb-0.5 leading-snug group-hover:text-coffee-red transition-colors duration-200 line-clamp-1">
                    {benefit.title}
                  </h3>
                  <p className="text-[10px] text-teal/60 leading-relaxed line-clamp-1 flex-1">
                    {benefit.description}
                  </p>
                  {benefit.cta && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-coffee-red group-hover:underline transition-all duration-200 mt-1">
                      {benefit.cta}
                      <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
