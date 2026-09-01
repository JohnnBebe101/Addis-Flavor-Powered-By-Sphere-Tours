import { Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const NotificationBar = () => {
  return (
    <div className="hidden sm:flex fixed top-0 left-0 right-0 z-[1000] h-9 bg-teal items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Contact Info */}
      <div className="flex items-center space-x-4">
        <a
          href="tel:+251911209882"
          className="flex items-center space-x-1.5 text-linen-white/80 hover:text-gold transition-colors"
        >
          <Phone className="w-3 h-3" />
          <span className="text-[10px] font-mono tracking-wider">+251-911-209-882</span>
        </a>
        <span className="text-linen-white/20">|</span>
        <a
          href="mailto:info@addisababacitytour.com"
          className="flex items-center space-x-1.5 text-linen-white/80 hover:text-gold transition-colors"
        >
          <Mail className="w-3 h-3" />
          <span className="text-[10px] font-mono tracking-wider">info@addisababacitytour.com</span>
        </a>
      </div>

      {/* Right: Social Icons */}
      <div className="flex items-center space-x-3">
        <a
          href="https://instagram.com/addisababacitytour"
          target="_blank"
          rel="noopener noreferrer"
          className="text-linen-white/60 hover:text-gold transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://facebook.com/addisababacitytour"
          target="_blank"
          rel="noopener noreferrer"
          className="text-linen-white/60 hover:text-gold transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://tripadvisor.com/Attraction_Review-g1-addis-ababa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-linen-white/60 hover:text-gold transition-colors"
          aria-label="TripAdvisor"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NotificationBar;
