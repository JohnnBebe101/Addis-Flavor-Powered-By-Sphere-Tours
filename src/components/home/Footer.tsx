import React from 'react';
import navigationData from '../../content/navigation.json';

interface NavFooterLink {
  label: string;
  link: string;
  external?: boolean;
}

interface FooterProps {
  NEIGHBORHOOD_DESTINATIONS: Array<{ name: string }>;
}

export const Footer: React.FC<FooterProps> = ({ NEIGHBORHOOD_DESTINATIONS }) => {
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
                      <a href={link.link} className="hover:text-gold transition-colors">
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

        {/* Copyrights, Card Icons, Johnny Technologies, and Terms */}
        <div className="pt-4 md:pt-1.5 lg:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-1 text-[10px] text-linen-white/50 font-mono text-center md:text-left">
          <p>{`Addis Ababa City Tours Powered by Sphere Tour & Travel`}</p>

          {/* Card brand icons — inline, zero extra height */}
          <div className="flex items-center gap-1.5 opacity-60">
            {/* Visa */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M20.4 21.2h-3.1l1.9-11.6h3.1l-1.9 11.6zm10.1-11.3c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.3 3.9 0 1.7 1.6 2.6 2.7 3.2 1.2.5 1.6.9 1.6 1.4 0 .8-.9 1.2-1.8 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.6c.7.3 2 .6 3.3.6 3.3 0 5.4-1.6 5.4-4 0-1.3-.8-2.3-2.6-3.1-1.1-.5-1.8-.9-1.8-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.5-2.5zm7.5 0h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.7h3.2l.6-1.8h3.9l.4 1.8h2.8l-2.5-11.6zm-3.8 7.5c.3-.7 1.3-3.4 1.3-3.4l.7 3.4h-2zm-18.3-7.5l-3 7.5-.3-1.5c-.6-1.9-2.3-3.9-4.3-5l2.8 10.1h3.2l4.8-11.1h-3.2zm-5.6 7.5l1.9-5.3.5 2.6c.4 1.1 1.5 2.4 2.8 3.1l-.7 2.7c-1.4-.5-2.3-1.7-2.8-3.1h-2.7z"/></svg>
            {/* Mastercard */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M17.5 6.5A7.5 7.5 0 0 0 10 15a7.5 7.5 0 0 0 7.5 8.5 7.5 7.5 0 0 0 7.5-8.5A7.5 7.5 0 0 0 17.5 6.5zm0 12.8a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm13-12.8A7.5 7.5 0 0 0 23 15a7.5 7.5 0 0 0 7.5 8.5 7.5 7.5 0 0 0 7.5-8.5A7.5 7.5 0 0 0 30.5 6.5zm0 12.8a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6z"/></svg>
            {/* Amex */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M6 8l-1 3v12l1 3h4l1-2 1 2h8l-1-3 1-2.5L20 26h8l-1-3h3l1-1.5 1 1.5h5l1-3v-1.5l-1-1.5h-3.5l-.5-1h4l1-1.5 1 1.5h3l1-3v-1.5l-1-1.5h-3.5L34.5 8h-4l.5 1.5h-4l-.5-1.5h-8l.5 1.5h-4L13 8H6zm6.5 7.5l1.5 4.5 1.5-4.5h-3zm15.5 0h-2v4.5l2-1.5V15.5zm6.5 0h-2v4.5l2-1.5V15.5z"/></svg>
            {/* Discover */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8c6.6 0 12-3.6 12-8s-5.4-8-12-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5c3.9 0 9 2.2 9 5s-5.1 5-9 5zm14-13h9v16h-9V8z"/></svg>
            {/* JCB */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M8 6h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6H8V6zm12 12c0-2.2-1.8-4-4-4H12v8h4c2.2 0 4-1.8 4-4zm10-12h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6h-8V6zm12 12c0-2.2-1.8-4-4-4h-4v8h4c2.2 0 4-1.8 4-4z"/></svg>
            {/* UnionPay */}
            <svg viewBox="0 0 48 32" className="h-4 w-auto" fill="currentColor"><path d="M6 8h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6H6V8zm12 12c0-2.2-1.8-4-4-4H10v8h4c2.2 0 4-1.8 4-4zm10-12h8c3.3 0 6 2.7 6 6v8c0 3.3-2.7 6-6 6h-8V6zm12 12c0-2.2-1.8-4-4-4h-4v8h4c2.2 0 4-1.8 4-4z"/></svg>
          </div>

          <p className="text-linen-white/40 font-semibold px-2 md:border-l md:border-r md:border-linen-white/10 py-0.5 md:py-0">
            Built with love by Johnny Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {footerColumns
              .find((c: { title: string; links: NavFooterLink[] }) => c.title === 'Legal')
              ?.links.map((link: NavFooterLink, idx: number) => (
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
