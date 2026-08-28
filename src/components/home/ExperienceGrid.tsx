import { Check } from 'lucide-react';
import { Translations, ExperiencePackage } from '../../types';

interface ExperienceGridProps {
  translations: Translations;
  packages: ExperiencePackage[];
  expandedPkgId: string | null;
  setExpandedPkgId: (id: string | null) => void;
  handleSelectSearchPackage: (pkgId: string) => void;
}

export default function ExperienceGrid({
  translations,
  packages,
  expandedPkgId,
  setExpandedPkgId,
  handleSelectSearchPackage,
}: ExperienceGridProps) {
  return (
    <section id="experiences" className="py-16 md:py-24 bg-sandstone/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {'Which story will you taste?'}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          <p className="text-sm opacity-80 leading-relaxed font-sans">
            {
              'Select an immersive experience. Click explore to expand steps inline and map out your culinary adventure.'
            }
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${expandedPkgId ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}
        >
          {packages.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            return (
              <div
                key={pkg.id}
                id={`experience-card-${pkg.id}`}
                className={`bg-linen-white text-teal rounded-3xl border border-teal/10 shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                  isExpanded
                    ? 'lg:col-span-2 border-gold/40 ring-1 ring-gold/20 order-first'
                    : expandedPkgId
                    ? 'lg:col-span-1 order-last'
                    : 'lg:col-span-1'
                }`}
              >
                <div
                  className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-12' : ''} gap-0`}
                >
                  <div
                    className={`relative ${isExpanded ? 'lg:col-span-5 h-[280px] lg:h-full' : 'h-[220px]'}`}
                  >
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-linen-white text-xl p-2 rounded-2xl shadow">
                      {pkg.emoji}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-linen-white flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                          {translations.durationLabel}
                        </p>
                        <p className="text-xs font-semibold">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-mono tracking-wider opacity-85">
                          {translations.priceLabel}
                        </p>
                        <p className="text-base font-bold text-gold">${pkg.price} USD</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 sm:p-8 flex flex-col justify-between ${isExpanded ? 'lg:col-span-7 space-y-6' : 'space-y-4'}`}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-coffee-red bg-coffee-red/10 px-2.5 py-1 rounded-full">
                        {pkg.tag}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal tracking-tight mt-3">
                        {pkg.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-teal/75 leading-relaxed mt-3">
                        {pkg.desc}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="bg-sandstone/60 p-5 rounded-2xl border border-teal/5 space-y-4 animate-fade-in">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-coffee-red border-b border-teal/10 pb-2">
                          {'Core Milestones & Timeline'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pkg.steps.map((stepText, idx) => {
                            const stepDesc = pkg.stepsDesc[idx];
                            return (
                              <div key={idx} className="flex items-start space-x-3 text-xs">
                                <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-teal">{stepText}</h5>
                                  <p className="text-[10px] text-teal/70 leading-relaxed mt-0.5">
                                    {stepDesc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                      <button
                        id={`explore-trigger-${pkg.id}`}
                        onClick={() => {
                          const willExpand = !isExpanded;
                          setExpandedPkgId(willExpand ? pkg.id : null);
                          if (willExpand) {
                            setTimeout(() => {
                              const element = document.getElementById(
                                `experience-card-${pkg.id}`,
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                              }
                            }, 300);
                          }
                        }}
                        className="flex items-center space-x-1 font-mono text-xs font-bold text-teal hover:text-coffee-red transition-colors py-2 focus:outline-none"
                      >
                        <span>{isExpanded ? 'COLLAPSE STEPS' : 'EXPLORE CULINARY STEPS'}</span>
                        <span
                          className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          ▼
                        </span>
                      </button>

                      <button
                        id={`book-trigger-${pkg.id}`}
                        onClick={() => {
                          handleSelectSearchPackage(pkg.id);
                        }}
                        className="px-5 py-2 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 transform active:scale-95 shadow"
                      >
                        {translations.bookNowButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}