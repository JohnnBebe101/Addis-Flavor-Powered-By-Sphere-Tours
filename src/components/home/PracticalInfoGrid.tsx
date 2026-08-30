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
    <section id="practical-info" className="py-16 bg-sandstone/10 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {headline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="p-6 rounded-2xl border border-teal/10 bg-linen-white hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                {column.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-teal mb-2">
                {column.title}
              </h3>
              <p className="text-sm text-teal/70 leading-relaxed">
                {column.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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