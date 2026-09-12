/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface PracticalInfoGridProps {
  columns: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
    link?: string;
  }>;
  headline: string;
  ctaLink: string;
  ctaText: string;
}

export const PracticalInfoGrid: React.FC<PracticalInfoGridProps> = ({
  columns,
  headline,
  ctaLink,
  ctaText,
}) => {
  return (
    <section id="practical-info" className="py-10 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight mb-1">
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <a
              key={column.id}
              href={column.link || ctaLink}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2"
            >
              {/* Image on dark gradient background */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-teal via-teal/90 to-dark-bg overflow-hidden">
                {column.image ? (
                  <img
                    src={column.image}
                    alt={column.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-linen-white/20">
                    {column.icon}
                  </div>
                )}

                {/* Icon badge — top right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-coffee-red/90 text-linen-white backdrop-blur-sm">
                    {column.icon}
                  </span>
                </div>
              </div>

              {/* Text body — dark background */}
              <div className="bg-teal p-4">
                <h3 className="text-base font-bold text-linen-white mb-1 leading-snug group-hover:text-gold transition-colors duration-200">
                  {column.title}
                </h3>
                <p className="text-xs text-linen-white/60 leading-relaxed line-clamp-2">
                  {column.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
          >
            <span>{ctaText}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
