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
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
  backgroundImage,
}) => {
  return (
    <section
      id="final-cta"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(27, 58, 75, 0.45)), url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-3xl md:text-5xl font-serif text-linen-white tracking-tight leading-tight">
          {headline}
        </h2>
        <p className="text-base md:text-xl text-sandstone max-w-2xl mx-auto font-sans font-light leading-relaxed">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={ctaPrimaryLink}
            className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-1"
          >
            <span>{ctaPrimary}</span>
          </a>
          <a
            href={ctaSecondaryLink}
            className="px-8 py-3 rounded-full bg-transparent border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1"
          >
            <span>{ctaSecondary}</span>
          </a>
        </div>
      </div>
    </section>
  );
};