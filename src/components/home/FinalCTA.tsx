/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface FinalCTAProps {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryLink: string;
  ctaSecondaryLink: string;
  backgroundImage?: string;
  image?: string;
  badge?: {
    text: string;
    label: string;
  };
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
  backgroundImage,
  image,
  badge,
}) => {
  const imgSrc = image || backgroundImage;

  return (
    <section id="final-cta" className="bg-teal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

          {/* LEFT PANEL — Dark background with text */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 space-y-6">
            {/* Badge */}
            {badge && (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-serif font-bold text-lg">{badge.text}</span>
                </div>
                <span className="text-gold/80 font-mono text-xs uppercase tracking-wider">{badge.label}</span>
              </div>
            )}

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-linen-white tracking-tight leading-tight">
              {headline}
            </h2>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-sandstone/80 font-sans font-light leading-relaxed max-w-lg">
              {subheadline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <a
                href={ctaPrimaryLink}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow-md"
              >
                {ctaPrimary}
              </a>
              <a
                href={ctaSecondaryLink}
                className="px-8 py-3.5 rounded-full bg-transparent border-2 border-gold/50 hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95"
              >
                {ctaSecondary}
              </a>
            </div>
          </div>

          {/* RIGHT PANEL — Full image, no overlay */}
          <div className="relative min-h-[300px] lg:min-h-0">
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Explore Addis Ababa"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Gold badge overlay on image */}
            {badge && (
              <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-gold/90 flex flex-col items-center justify-center shadow-lg">
                <span className="text-teal font-serif font-bold text-[10px] uppercase leading-none">{badge.label}</span>
                <span className="text-teal font-serif font-bold text-xl leading-none mt-0.5">{badge.text}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
