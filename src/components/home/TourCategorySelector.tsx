/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */



interface TourCategorySelectorProps {
  categories: Array<{
    id: string;
    title: string;
    description: string;
    priceFrom: string;
    link: string;
    icon: React.ReactNode;
  }>;
  headline: string;
  subheadline: string;
}

export const TourCategorySelector: React.FC<TourCategorySelectorProps> = ({
  categories,
  headline,
  subheadline,
}) => {
  return (
    <section id="tour-category-selector" className="py-16 bg-sandstone/10 border-b border-teal/10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative p-8 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-teal/70 leading-relaxed mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold font-bold">
                  {category.priceFrom}
                </span>
                <span className="font-mono text-xs text-coffee-red group-hover:text-gold transition-colors flex items-center gap-1">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};