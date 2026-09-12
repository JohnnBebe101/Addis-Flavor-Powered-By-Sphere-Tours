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
                      <a href={link.link} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
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

          {/* Column 5: Payment Methods — brand-colored card icons */}
          <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              Payment Methods
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 120 40" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <text x="60" y="30" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="30" fill="#1A1F71" fontStyle="italic" textAnchor="middle">VISA</text>
                </svg>
              </div>
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 40 26" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="13" r="10" fill="#EB001B"/>
                  <circle cx="25" cy="13" r="10" fill="#F79E1B"/>
                  <path d="M20 4.5a10 10 0 0 1 0 17" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 60 40" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="60" height="40" rx="4" fill="#006FCF"/>
                  <text x="30" y="26" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="white" textAnchor="middle">AMEX</text>
                </svg>
              </div>
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 90 30" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" fill="#FF6000"/>
                  <text x="32" y="21" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="#333">DISCOVER</text>
                </svg>
              </div>
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 50 36" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="14" height="34" rx="4" fill="#007B40"/>
                  <rect x="18" y="1" width="14" height="34" rx="4" fill="#006DBA"/>
                  <rect x="35" y="1" width="14" height="34" rx="4" fill="#E30138"/>
                  <text x="8" y="24" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="white" textAnchor="middle">J</text>
                  <text x="25" y="24" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="white" textAnchor="middle">C</text>
                  <text x="42" y="24" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="white" textAnchor="middle">B</text>
                </svg>
              </div>
              <div className="bg-white rounded px-1.5 py-1 flex items-center justify-center">
                <svg viewBox="0 0 60 36" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="1" width="20" height="34" rx="3" fill="#D10429"/>
                  <rect x="12" y="1" width="20" height="34" rx="3" fill="#022E64"/>
                  <rect x="24" y="1" width="20" height="34" rx="3" fill="#076F74"/>
                  <text x="22" y="24" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="white" textAnchor="middle">UnionPay</text>
                </svg>
              </div>
            </div>
          </div>
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

        {/* Copyrights and Legal Links */}
        <div className="pt-4 md:pt-1.5 lg:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-1 text-[10px] text-linen-white/50 font-mono text-center md:text-left">
          <p>{`© 2026 Addis Ababa by Locals. All rights reserved. Powered by Sphere Tour & Travel.`}</p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {footerColumns
              .find((c: { title: string; links: NavFooterLink[] }) => c.title === 'Support & Legal')
              ?.links.filter((l: NavFooterLink) => ['Terms & Conditions', 'Privacy Policy', 'Cancellation Policy'].includes(l.label))
              .map((link: NavFooterLink, idx: number) => (
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
