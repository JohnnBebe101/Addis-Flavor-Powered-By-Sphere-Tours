/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface AddisHighlightsGridProps {
  attractions: Array<{
    id: number;
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
    image?: string;
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
    <section id="addis-highlights" className="py-12 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
            {headline}
          </h2>
          <p className="text-xs text-teal/60 mt-2 font-sans">{subheadline}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction) => (
            <a
              key={attraction.id}
              href={attraction.link}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              {/* Background image */}
              {attraction.image ? (
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-teal flex items-center justify-center">
                  <div className="text-linen-white/15">
                    {attraction.icon || <span className="text-6xl">🏛️</span>}
                  </div>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-serif font-bold text-linen-white leading-snug group-hover:text-gold transition-colors duration-300 drop-shadow-lg">
                  {attraction.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
