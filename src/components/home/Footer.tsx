import React from 'react';
import { Translations } from '../../types';
import navigationData from '../../content/navigation.json';

interface NavFooterLink {
  label: string;
  link: string;
  external?: boolean;
}

interface FooterProps {
  _isGlobalDark: boolean;
  translations: Translations;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  newsletterSubbed: boolean;
  _setNewsletterSubbed: (subbed: boolean) => void;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
  NEIGHBORHOOD_DESTINATIONS: Array<{ name: string }>;
}

export const Footer: React.FC<FooterProps> = ({
  _isGlobalDark,
  translations,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSubbed,
  _setNewsletterSubbed,
  handleNewsletterSubmit,
  NEIGHBORHOOD_DESTINATIONS,
}) => {
  const footerColumns = navigationData.footer.columns;

  return (
    <footer
      id="booking-anchor"
      className="bg-teal text-linen-white pt-8 pb-4 md:pt-2 md:pb-1.5 border-t-4 border-gold"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-x-4 md:gap-y-1 lg:gap-6 pb-6 md:pb-1.5 border-b border-linen-white/10">
          {footerColumns.map((col: { title: string; links: NavFooterLink[] }, colIdx: number) => (
            <div key={colIdx} className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
                {col.title}
              </h4>
              <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
                {col.links.map((link: NavFooterLink, linkIdx: number) => (
                  <li key={linkIdx}>
                    {link.external ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.link}
                        className="hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Destinations footer section */}
        <div className="py-4 md:py-1.5 lg:py-4 border-b border-linen-white/10">
          <h4 className="text-center font-mono text-[10px] uppercase tracking-widest text-gold mb-3 md:mb-1.5 lg:mb-3 font-bold">
            {'MOST POPULAR ADDIS ABABA DESTINATIONS'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0.5 lg:gap-2 text-center text-xs text-linen-white/60 font-sans">
            {NEIGHBORHOOD_DESTINATIONS.map((dest: { name: string }, idx: number) => (
              <a
                key={idx}
                href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}/`}
                className="hover:text-gold transition-colors py-0.5 block"
              >
                {dest.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyrights, Johnny Technologies, and Terms */}
        <div className="pt-4 md:pt-1.5 lg:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-1 text-[10px] text-linen-white/50 font-mono text-center md:text-left">
          <p>{`Addis Ababa City Tours Powered by Sphere Tour & Travel`}</p>
          <p className="text-linen-white/40 font-semibold px-2 md:border-l md:border-r md:border-linen-white/10 py-0.5 md:py-0">
            Built with love by Johnny Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {footerColumns.find((c: { title: string; links: NavFooterLink[] }) => c.title === 'Legal')?.links.map((link: NavFooterLink, idx: number) => (
              <a key={idx} href={link.link} className="hover:text-gold transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};