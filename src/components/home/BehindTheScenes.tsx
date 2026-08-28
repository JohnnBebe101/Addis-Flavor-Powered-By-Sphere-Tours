import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Translations, ExperiencePackage } from '../../types';

interface BehindTheScenesProps {
  _translations: Pick<Translations, 'vettedTitle' | 'vettedSub' | 'vettedDesc'>;
  PACKAGES: ExperiencePackage[];
  activeBehindTheScenesId: string;
  setActiveBehindTheScenesId: (id: string) => void;
  activeScrollyStep: Record<string, number>;
  setActiveScrollyStep: (steps: Record<string, number>) => void;
  handlePrevBehindTheScenes: () => void;
  handleNextBehindTheScenes: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  isGlobalDark: boolean;
  _getShortName: (id: string) => string;
}

export function BehindTheScenes({
  _translations,
  PACKAGES,
  activeBehindTheScenesId,
  setActiveBehindTheScenesId,
  activeScrollyStep,
  setActiveScrollyStep,
  handlePrevBehindTheScenes,
  handleNextBehindTheScenes,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  isGlobalDark,
  _getShortName,
}: BehindTheScenesProps) {
  return (
    <section
      id="scrollytelling-showcase"
      className="py-16 bg-sandstone/35 relative overflow-hidden border-b border-teal/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-teal font-extrabold">
            {'Taste the Soul: Behind the Scenes'}
          </h2>
          <p className="text-[10px] font-mono uppercase text-coffee-red tracking-widest mt-1.5 font-bold">
            {'SENSORY IMMERSION STAGE'}
          </p>
        </div>
        <div className="flex justify-center md:justify-end items-center space-x-2">
          <button
            onClick={handlePrevBehindTheScenes}
            className={`p-2.5 rounded-full border transition-all duration-300 focus:outline-none shadow-sm ${
              isGlobalDark
                ? 'border-linen-white/10 text-linen-white hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-dark-bg/60'
                : 'border-teal/10 text-teal hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-linen-white'
            }`}
            aria-label="Previous Section"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextBehindTheScenes}
            className={`p-2.5 rounded-full border transition-all duration-300 focus:outline-none shadow-sm ${
              isGlobalDark
                ? 'border-linen-white/10 text-linen-white hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-dark-bg/60'
                : 'border-teal/10 text-teal hover:bg-coffee-red hover:text-white hover:border-coffee-red bg-linen-white'
            }`}
            aria-label="Next Section"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[540px] gap-4 w-full select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {PACKAGES.map((pkg, pIdx) => {
          const isSelected = activeBehindTheScenesId === pkg.id;
          const currentActiveIdx = activeScrollyStep[pkg.id] || 0;
          const steps = pkg.steps;
          const stepsDesc = pkg.stepsDesc;

          if (!isSelected) {
            return (
              <button
                key={pkg.id}
                onClick={() => setActiveBehindTheScenesId(pkg.id)}
                className={`flex-[0.5] min-w-[90px] h-full relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-700 ease-in-out border shadow-md hover:flex-[0.7] focus:outline-none ${
                  isGlobalDark
                    ? 'border-linen-white/10 bg-dark-bg/40'
                    : 'border-teal/10 bg-linen-white'
                }`}
              >
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-75 filter brightness-[0.45] saturate-[0.8] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-between py-10 select-none">
                  <span className="font-mono text-xs border border-linen-white/20 rounded-full w-8 h-8 flex items-center justify-center bg-black/30 text-gold shadow-md font-bold">
                    0{pIdx + 1}
                  </span>
                  <div className="whitespace-nowrap uppercase text-xs tracking-widest font-serif font-bold text-linen-white/90 [writing-mode:vertical-lr] rotate-180 bg-black/35 backdrop-blur-[2px] py-3 px-2 rounded-xl border border-white/5 shadow-md">
                    {_getShortName(pkg.id)}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" />
                </div>
              </button>
            );
          }

          return (
            <div
              key={pkg.id}
              className={`flex-[3.5] h-full relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out border shadow-xl bg-linen-white ring-1 ${
                isGlobalDark ? 'border-gold/30 ring-gold/15' : 'border-gold/20 ring-gold/10'
              }`}
            >
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter saturate-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-gold/90 text-teal rounded-full shadow-sm">
                    {pkg.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white drop-shadow-md">
                    {pkg.name}
                  </h3>
                </div>
                <div className="bg-black/35 backdrop-blur-[2px] border border-white/10 text-gold px-4 py-2 rounded-2xl text-right flex flex-col justify-center">
                  <span className="font-mono text-[9px] uppercase opacity-75">{'Price'}</span>
                  <span className="text-sm font-serif font-bold text-linen-white">
                    ${pkg.price} USD
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-black/45 backdrop-blur-[4px] border border-white/10 rounded-2xl p-5 text-white space-y-4 shadow-lg z-10">
                <p className="text-xs text-white/95 leading-relaxed max-w-4xl font-sans drop-shadow-xs">
                  {pkg.desc}
                </p>

                <div className="pt-3.5 border-t border-white/10 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                  <div className="space-y-1 max-w-2xl">
                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest block font-bold">
                      {'STAGE 0'}
                      {currentActiveIdx + 1}{' OF 0'}
                      {steps.length}:{' '}
                      <span className="text-white font-extrabold ml-1">
                        {steps[currentActiveIdx]}
                      </span>
                    </span>
                    <p className="text-xs text-white/90 leading-relaxed font-sans drop-shadow-xs">
                      {stepsDesc[currentActiveIdx]}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {steps.map((_step: unknown, sIdx: number) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setActiveScrollyStep({
                            ...activeScrollyStep,
                            [pkg.id]: sIdx,
                          });
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                          sIdx === currentActiveIdx
                            ? 'bg-coffee-red text-white scale-110 shadow-md ring-2 ring-white/30'
                            : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                        }`}
                      >
                        {sIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="block md:hidden w-full max-w-3xl mx-auto px-4 sm:px-6">
        {(() => {
          const pkg = PACKAGES.find((p) => p.id === activeBehindTheScenesId) || PACKAGES[0];
          const currentActiveIdx = activeScrollyStep[pkg.id] || 0;
          const steps = pkg.steps;
          const stepsDesc = pkg.stepsDesc;

          return (
            <div
              className={`border rounded-3xl overflow-hidden shadow-lg select-none transition-all duration-300 ${
                isGlobalDark
                  ? 'border-linen-white/10 bg-dark-bg/60'
                  : 'border-teal/10 bg-linen-white'
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="h-[250px] relative">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="w-full h-full object-cover filter saturate-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                  <span className="inline-block px-2.5 py-1 text-[8px] font-mono font-bold bg-gold text-teal rounded-full shadow-sm">
                    {pkg.tag}
                  </span>
                  <span className="bg-black/35 backdrop-blur-[2px] border border-white/10 text-white font-mono text-[9px] px-2 py-1 rounded-lg">
                    ${pkg.price} USD
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-lg font-serif font-extrabold text-white drop-shadow-sm">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs opacity-80 leading-relaxed font-sans">{pkg.desc}</p>

                <div className="border-t border-teal/10 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-red font-bold">
                      {'Sensory Stage'}
                    </span>
                    <div className="flex space-x-1.5">
                      {steps.map((_step: unknown, sIdx: number) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setActiveScrollyStep({
                              ...activeScrollyStep,
                              [pkg.id]: sIdx,
                            });
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                            sIdx === currentActiveIdx
                              ? 'bg-coffee-red text-white scale-115 shadow-sm'
                              : 'bg-teal/5 text-teal hover:bg-teal/10'
                          }`}
                        >
                          {sIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isGlobalDark
                        ? 'bg-linen-white/5 border-linen-white/10'
                        : 'bg-sandstone/15 border-teal/5'
                    }`}
                  >
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-teal font-extrabold">
                      {steps[currentActiveIdx]}
                    </h4>
                    <p className="text-xs opacity-80 mt-1.5 font-sans leading-relaxed">
                      {stepsDesc[currentActiveIdx]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setActiveBehindTheScenesId(pkg.id)}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeBehindTheScenesId === pkg.id
                ? 'w-6 bg-coffee-red shadow-[0_0_8px_rgba(196,75,59,0.5)]'
                : 'w-2 bg-teal/20'
            }`}
            aria-label={`Go to ${pkg.name}`}
          />
        ))}
      </div>
    </section>
  );
}