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
    <section id="tour-category-selector" className="py-12 bg-sandstone/10 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 mt-2 font-sans">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, _index) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative p-6 rounded-2xl border border-teal/10 bg-linen-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-teal transition-all duration-300">
                {category.icon}
              </div>
              <h3 className="text-base font-sans font-bold text-teal group-hover:text-coffee-red transition-colors mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-teal/60 leading-relaxed line-clamp-3 mb-4">{category.description}</p>
              <div className="pt-3 border-t border-teal/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-coffee-red font-sans">{category.priceFrom}</span>
                  <span className="text-xs text-teal/60 group-hover:text-coffee-red transition-colors flex items-center gap-1 font-sans">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
