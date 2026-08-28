import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import { Translations } from '../../types';

interface FooterProps {
  _isGlobalDark: boolean;
  translations: Translations;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  newsletterSubbed: boolean;
  _setNewsletterSubbed: (subbed: boolean) => void;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
  NEIGHBORHOOD_DESTINATIONS: Array<{ name: string }>;
  onBecomeHostClick: () => void;
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
  onBecomeHostClick,
}) => {
  return (
    <footer
      id="booking-anchor"
      className="bg-teal text-linen-white pt-8 pb-4 md:pt-2 md:pb-1.5 border-t-4 border-gold"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-x-4 md:gap-y-1 lg:gap-6 pb-6 md:pb-1.5 border-b border-linen-white/10">
          {/* Col 1 Brand detail */}
          <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h3 className="font-serif font-bold text-xl text-gold tracking-tight animate-fade-in">
              {translations.brandName}
            </h3>
            <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
              {'Connecting travelers directly to local grandmothers and home cooks in Addis Ababa for shared culinary joy, songs, stories, and coffee ritual mindfulness.'}
            </p>
            <div className="flex space-x-3 text-linen-white/60 hover:text-gold transition-colors pt-0.5">
              <Facebook className="w-4 h-4 hover:scale-110 cursor-pointer" />
              <Twitter className="w-4 h-4 hover:scale-110 cursor-pointer" />
              <Instagram className="w-4 h-4 hover:scale-110 cursor-pointer" />
            </div>
          </div>

          {/* Col 2 Company Info links */}
          <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              {'COMPANY INFO'}
            </h4>
            <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  {'About Us'}
                </a>
              </li>
              <li>
                <a href="#founders" className="hover:text-gold transition-colors">
                  {'Founders'}
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-gold transition-colors">
                  {'How it works'}
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-gold transition-colors">
                  {'Safety Guarantee'}
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-gold transition-colors">
                  {'Press Center'}
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-gold transition-colors">
                  {'Careers'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 Join us links */}
          <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              {'JOIN US'}
            </h4>
            <ul className="space-y-1.5 md:space-y-0.5 lg:space-y-1.5 text-xs text-linen-white/70 font-sans">
              <li>
                <button
                  onClick={onBecomeHostClick}
                  className="hover:text-gold transition-colors text-left"
                >
                  {'Become a Host'}
                </button>
              </li>
              <li>
                <a href="#ambassador" className="hover:text-gold transition-colors">
                  {'Become an Ambassador'}
                </a>
              </li>
              <li>
                <a href="#agency" className="hover:text-gold transition-colors">
                  {'Travel Agency Login'}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-gold transition-colors">
                  {'Host Terms & Guidelines'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 Newsletter subscription */}
          <div id="newsletter-col" className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              {'SUBSCRIBE TO NEWSLETTER!'}
            </h4>
            <p className="text-xs text-linen-white/70 leading-relaxed font-sans">
              {'Follow the rich aroma of local spices and coffee ceremony events.'}
            </p>

            {newsletterSubbed ? (
              <div className="p-2.5 bg-gold/20 border border-gold/40 text-gold rounded-xl text-xs flex items-center space-x-2 animate-bounce">
                <Check className="w-3.5 h-3.5 text-linen-white" />
                <span>{'Subscribed!'}</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex rounded-full overflow-hidden border border-linen-white/20 bg-linen-white/10 p-0.5"
              >
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={'Enter Email Address'}
                  className="bg-transparent text-linen-white text-xs px-2.5 focus:outline-none w-full placeholder-linen-white/40"
                />
                <button
                  id="newsletter-add-btn"
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-teal px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-300 transform active:scale-95 flex-shrink-0"
                >
                  {'ADD ME'}
                </button>
              </form>
            )}
          </div>

          {/* Col 5 Sphere Head Office */}
          <div className="space-y-2.5 md:space-y-0.5 lg:space-y-2.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              {'SPHERE HEAD OFFICE'}
            </h4>
            <div className="space-y-2 md:space-y-0.5 lg:space-y-2 text-xs text-linen-white/70 font-sans">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220, Addis
                  Ababa
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a
                  href="tel:0911209882"
                  className="hover:text-gold transition-colors font-mono font-sans"
                >
                  091 120 9882
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@addisababacitytours.com"
                  className="hover:text-gold transition-colors break-all font-sans"
                >
                  info@addisababacitytours.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations footer section matching the Traveling Spoon layout */}
        <div className="py-4 md:py-1.5 lg:py-4 border-b border-linen-white/10">
          <h4 className="text-center font-mono text-[10px] uppercase tracking-widest text-gold mb-3 md:mb-1.5 lg:mb-3 font-bold">
            {'MOST POPULAR ADDIS ABABA DESTINATIONS'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0.5 lg:gap-2 text-center text-xs text-linen-white/60 font-sans">
            {NEIGHBORHOOD_DESTINATIONS.map((dest, idx) => (
              <a
                key={idx}
                href={`#dest-${idx}`}
                className="hover:text-gold transition-colors py-0.5 block"
              >
                {dest.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyrights, Johnny Technologies, and Terms (Tablet & Mobile Repositioned and Curated) */}
        <div className="pt-4 md:pt-1.5 lg:pt-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-1 text-[10px] text-linen-white/50 font-mono text-center md:text-left">
          <p>{`Addis Ababa City Tours Powered by Sphere Tour & Travel`}</p>
          <p className="text-linen-white/40 font-semibold px-2 md:border-l md:border-r md:border-linen-white/10 py-0.5 md:py-0">
            Built with love by Johnny Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <a href="#terms" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
            <a href="#privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#cookie" className="hover:text-gold transition-colors">
              Cookie Policy
            </a>
            <a href="#blog" className="hover:text-gold transition-colors">
              Our Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};