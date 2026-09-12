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
    icon?: React.ReactNode;
    image?: string;
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
    <section id="tour-category-selector" className="py-10 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight mb-1">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 font-sans">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              {/* Image on dark gradient background */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-teal via-teal/90 to-dark-bg overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : category.icon ? (
                  <div className="absolute inset-0 flex items-center justify-center text-linen-white/20">
                    {category.icon}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-teal" />
                )}

                {/* Price badge — top right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-linen-white bg-coffee-red/90 backdrop-blur-sm">
                    {category.priceFrom}
                  </span>
                </div>
              </div>

              {/* Text body — dark background */}
              <div className="bg-teal p-4">
                <h3 className="text-base font-bold text-linen-white mb-1 leading-snug group-hover:text-gold transition-colors duration-200">
                  {category.title}
                </h3>
                <p className="text-xs text-linen-white/60 leading-relaxed mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* CTA button */}
                <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm font-semibold bg-coffee-red text-linen-white group-hover:bg-gold transition-colors duration-200">
                  View Tours
                  <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
