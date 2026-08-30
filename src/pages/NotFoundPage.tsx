import { Link } from 'react-router-dom';
import { Compass, Home, MapPin } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linen-white flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-sandstone/50 flex items-center justify-center">
            <Compass className="w-12 h-12 text-gold" />
          </div>
        </div>
        <h1 className="text-7xl md:text-9xl font-serif font-extrabold text-teal tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-teal/70 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off the map. Let's get you back on the right path.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/tours/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300"
          >
            <MapPin className="w-4 h-4" />
            <span>Explore Tours</span>
          </Link>
        </div>

        <div className="border-t border-teal/10 pt-8">
          <p className="text-teal/50 font-mono text-xs uppercase tracking-widest mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'About Us', to: '/about/' },
              { label: 'Why Choose Us', to: '/why-choose-us/' },
              { label: 'Travel Guide', to: '/travel-guide/' },
              { label: 'Reviews', to: '/reviews/' },
              { label: 'Contact', to: '/contact/' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full bg-sandstone/30 text-teal/70 hover:text-teal hover:bg-sandstone/50 text-xs font-mono uppercase tracking-wider transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
