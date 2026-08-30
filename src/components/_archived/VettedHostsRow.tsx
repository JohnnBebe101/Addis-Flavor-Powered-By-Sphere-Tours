import React from 'react';
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
    <section id="vetted-and-ritual-row" className="py-12 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: 100% Vetted Guides (5 cols out of 12) */}
          <div
            id="guide-section-compact"
            className="lg:col-span-5 flex flex-col justify-between space-y-5"
          >
            <div>
              <span className="text-[9px] font-mono uppercase text-coffee-red tracking-widest block font-bold">
                {'LOCAL EXPERTISE'}
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
              {/* 1. Expert Local Guides */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0 text-lg">
                  🗺️
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'Expert Local Guides'}
                    <span className="font-mono text-[9px] text-coffee-red font-semibold ml-2">
                      (Born & raised in Addis)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    Our guides are born and raised in Addis Ababa, speak fluent English, and share stories you won't find in guidebooks.
                  </p>
                </div>
              </div>

              {/* 2. Private Vehicles */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 text-lg">
                  🚐
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'Private Vehicles'}
                    <span className="font-mono text-[9px] text-gold font-semibold ml-2">
                      (Fully insured & maintained)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    Travel in comfort with our fleet of modern, air-conditioned vehicles. Fully insured for your peace of mind.
                  </p>
                </div>
              </div>

              {/* 3. Flexible Pickup */}
              <div className="flex items-start space-x-3 bg-sandstone/30 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 text-lg">
                  📍
                </div>
                <div>
                  <h4 className="font-serif font-bold text-teal text-xs sm:text-sm">
                    {'Flexible Pickup'}
                    <span className="font-mono text-[9px] text-teal font-semibold ml-2">
                      (Hotel or airport)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-teal/75 leading-relaxed mt-0.5">
                    Complimentary pickup from all hotels in central Addis Ababa (Bole, Piassa, Meskel Square) and airport transfers available.
                  </p>
                </div>
              </div>
            </div>

            {/* Compact elegant quote block */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm p-4 bg-gradient-to-r from-teal to-teal/90 text-white border border-teal/10">
              <blockquote className="text-sm sm:text-base font-serif italic text-gold leading-relaxed">
                {'"Addis Ababa City Tours is a brilliant idea. The world needs it."'}
              </blockquote>
              <p className="font-mono text-[9px] uppercase tracking-widest text-linen-white/70 mt-1.5 text-right">
                {'– Alice Waters, Chef & Activist'}
              </p>
            </div>
          </div>

          {/* Right Column: Why Choose Us Preview (7 cols out of 12) */}
          <div className="lg:col-span-7 h-full border border-teal/5 bg-sandstone/15 rounded-3xl p-6 shadow-md flex flex-col justify-center">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-coffee-red">
                {'Why Book With Addis Ababa City Tour?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-sandstone/30 border border-teal/5">
                  <div className="w-10 h-10 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center mb-2">
                    🗺️
                  </div>
                  <h4 className="font-serif font-bold text-teal mb-1">Local Experts</h4>
                  <p className="text-xs text-teal/75">We live here, guide here, and know Addis Ababa better than any OTA.</p>
                </div>
                <div className="p-4 rounded-xl bg-sandstone/30 border border-teal/5">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-2">
                    💰
                  </div>
                  <h4 className="font-serif font-bold text-teal mb-1">Best Price Guarantee</h4>
                  <p className="text-xs text-teal/75">Book direct and save 15% vs. GetYourGuide and Viator. No hidden fees.</p>
                </div>
                <div className="p-4 rounded-xl bg-sandstone/30 border border-teal/5">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center mb-2">
                    🛡️
                  </div>
                  <h4 className="font-serif font-bold text-teal mb-1">Flexible & Safe</h4>
                  <p className="text-xs text-teal/75">Free cancellation up to 24 hours. Licensed & insured. 24/7 WhatsApp support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VettedHostsRow;