import React from 'react';
import JebenaDeepDive from '../JebenaDeepDive';
import { Translations } from '../../types';

interface VettedHostsRowProps {
  translations: Translations;
  isGlobalDark: boolean;
  setGlobalDark: (value: boolean) => void;
}

const VettedHostsRow: React.FC<VettedHostsRowProps> = ({
  translations,
  isGlobalDark,
  setGlobalDark,
}) => {
  return (
    <section
      id="vetted-and-ritual-row"
      className="py-12 bg-linen-white border-b border-teal/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: 100% Vetted Hosts (5 cols out of 12) */}
          <div
            id="host-section-compact"
            className="lg:col-span-5 flex flex-col justify-between space-y-5"
          >
            <div>
              <span className="text-[9px] font-mono uppercase text-coffee-red tracking-widest block font-bold">
                {'LOCAL TRUST'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-teal font-extrabold mt-1">
                {translations.vettedTitle}
              </h2>
              <div className="w-12 h-1 bg-coffee-red mt-2 mb-4 rounded-full" />
              <p className="text-xs sm:text-sm text-teal/85 font-bold leading-relaxed mb-3">
                {translations.vettedSub}
              </p>
              <p className="text-xs sm:text-sm text-teal/70 leading-relaxed">
                {translations.vettedDesc}
              </p>
            </div>

            {/* Three detailed list items in compact format */}
            <div className="grid grid-cols-1 gap-2.5">
              {/* 1. In-home Meals */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0 text-lg">
                  🍲
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'In-home Meals'}
                    <span className="font-mono text-[9px] text-coffee-red font-semibold ml-2">
                      (1.5 - 2 hrs)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    {
                      'Experience the joy of an authentic homemade feast, eating exactly the way the locals do while discussing local history, culinary lore, and social customs.'
                    }
                  </p>
                </div>
              </div>

              {/* 2. Cooking Experiences */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 text-lg">
                  🍳
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'Cooking Experiences'}
                    <span className="font-mono text-[9px] text-gold font-semibold ml-2">
                      (3 - 4 hrs)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    {
                      'Discover ancient culinary traditions passed down through generations. Whip stews, knead teff, and learn to roast raw beans over live charcoal.'
                    }
                  </p>
                </div>
              </div>

              {/* 3. Market Visits */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 text-lg">
                  🌍
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'Market visits'}
                    <span className="font-mono text-[9px] text-teal font-semibold ml-2">
                      (1 - 2 hrs)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    {
                      'Explore a vibrant nearby open-air market with your host, discovering the best local cardamoms, cinnamon, pure butter, and organic produce.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Compact elegant quote block with custom styling to replace the giant image column */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm p-4 bg-gradient-to-r from-teal to-teal/90 text-white border border-teal/10">
              <blockquote className="text-sm sm:text-base font-serif italic text-gold leading-relaxed">
                {'"Addis Ababa City Tours is a brilliant idea. The world needs it."'}
              </blockquote>
              <p className="font-mono text-[9px] uppercase tracking-widest text-linen-white/70 mt-1.5 text-right">
                {'– Alice Waters, Chef & Activist'}
              </p>
            </div>
          </div>

          {/* Right Column: The Sacred Coffee Ritual (JebenaDeepDive rendered inside) (7 cols out of 12) */}
          <div className="lg:col-span-7 h-full border border-teal/5 bg-sandstone/15 rounded-3xl p-6 shadow-md flex flex-col justify-center">
            <JebenaDeepDive
              translations={translations}
              isGlobalDark={isGlobalDark}
              setGlobalDark={setGlobalDark}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VettedHostsRow;