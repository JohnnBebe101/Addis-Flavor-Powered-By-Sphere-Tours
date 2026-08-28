/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Flame, Info, Eye } from 'lucide-react';
import { Translations } from '../types';
import jebenaContent from '../content/jebena.json';

interface JebenaDeepDiveProps {
  translations: Translations;
  isGlobalDark: boolean;
  setGlobalDark: (dark: boolean) => void;
}

export default function JebenaDeepDive({
  translations,
  isGlobalDark,
  setGlobalDark: _setGlobalDark,
}: JebenaDeepDiveProps) {
  const [activeRound, setActiveRound] = useState<'abol' | 'tona' | 'bereka'>('abol');

  const currentRound = jebenaContent.rounds[activeRound];

  return (
    <div
      id="jebena-deep-dive"
      className={`transition-colors duration-1000 ${
        isGlobalDark ? 'bg-dark-bg/20 text-linen-white' : 'text-teal'
      }`}
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-5">
          <h2 className="text-xl sm:text-2xl font-serif tracking-tight font-extrabold text-teal mb-1">
            {translations.jebenaInteractiveTitle}
          </h2>
          <p className="text-[11px] sm:text-xs leading-relaxed opacity-85">
            {translations.jebenaInteractiveSub}
          </p>
        </div>

        {/* Interactive Layout: Split columns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Column 1: The Interactive Jebena clay pot illustration (5 cols) */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Background Glow when dark */}
            <div
              className={`absolute w-48 h-48 rounded-full blur-3xl transition-opacity duration-1000 -z-10 ${
                isGlobalDark ? 'bg-coffee-red/10' : 'bg-gold/10'
              }`}
            />

            {/* Coffee Steam Container */}
            <div className="h-10 w-full flex justify-center items-end relative overflow-visible mb-1">
              {/* Animated Steam Particles */}
              {Array.from({ length: currentRound.steamCount }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-10 bg-gradient-to-t from-linen-white/20 via-linen-white/5 to-transparent rounded-full steam-particle"
                  style={{
                    left: `${48 + (i - (currentRound.steamCount - 1) / 2) * 6}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${2.5 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* The Jebena (Styled Clay Pot representation in SVG) */}
            <div className="w-48 h-48 relative flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className={`w-36 h-36 transition-transform duration-500 drop-shadow-2xl ${
                  activeRound === 'abol'
                    ? 'rotate-[-3deg] scale-100'
                    : activeRound === 'tona'
                      ? 'rotate-[-8deg] scale-102'
                      : 'rotate-[-15deg] scale-105'
                }`}
              >
                {/* Clay pot body */}
                <circle cx="100" cy="130" r="50" fill="#2E1C15" stroke="#1A100C" strokeWidth="4" />
                {/* Cultural patterns on clay pot */}
                <circle
                  cx="100"
                  cy="130"
                  r="35"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <path d="M 65,130 L 135,130" stroke="#C44B3B" strokeWidth="3" />
                <path d="M 100,95 L 100,165" stroke="#C44B3B" strokeWidth="3" />

                {/* Neck */}
                <path
                  d="M 90,80 L 90,40 L 110,40 L 110,80 Z"
                  fill="#2E1C15"
                  stroke="#1A100C"
                  strokeWidth="4"
                />
                {/* Neck Ring decorative */}
                <ellipse cx="100" cy="55" rx="12" ry="4" fill="#D4AF37" />

                {/* Spout spout pouring */}
                <path
                  d="M 60,110 L 35,95 L 40,88 L 65,103 Z"
                  fill="#2E1C15"
                  stroke="#1A100C"
                  strokeWidth="3"
                />

                {/* Handle */}
                <path
                  d="M 110,50 Q 160,80 145,120 Q 135,140 120,135"
                  fill="none"
                  stroke="#2E1C15"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 110,50 Q 160,80 145,120 Q 135,140 120,135"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                />

                {/* Fire coals under Jebena */}
                {activeRound !== 'bereka' && (
                  <path
                    d="M 70,185 Q 100,165 130,185"
                    fill="none"
                    stroke="#C44B3B"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Incense Burner Mockup (Rekebot side element) */}
              <div className="absolute right-0 bottom-4 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                  <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
                </div>
                <span className="text-[8px] font-mono uppercase mt-0.5 opacity-60">
                  Frankincense
                </span>
              </div>
            </div>

            {/* Pour Indicator */}
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold animate-pulse">
                {activeRound === 'abol'
                  ? '★ Abol Pouring'
                  : activeRound === 'tona'
                    ? '★★ Tona Pouring'
                    : '★★★ Bereka Blessing'}
              </span>
            </div>
          </div>

          {/* Column 2: Timeline controls & Descriptions (7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            {/* Step Selector Tab Pills */}
            <div className="flex border-b border-current/10 pb-2 justify-between sm:justify-start sm:space-x-2">
              {(['abol', 'tona', 'bereka'] as const).map((round) => {
                const isSelected = activeRound === round;
                const roundDetail = jebenaContent.rounds[round];
                return (
                  <button
                    key={round}
                    id={`round-tab-${round}`}
                    onClick={() => setActiveRound(round)}
                    className={`flex-1 sm:flex-none text-left px-3 py-2 rounded-lg transition-all duration-300 relative overflow-hidden focus:outline-none ${
                      isSelected
                        ? 'bg-current/10 shadow-sm font-bold'
                        : 'opacity-50 hover:opacity-85 hover:bg-current/5'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${roundDetail.color}`} />
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {round === 'abol'
                          ? translations.stepAbol
                          : round === 'tona'
                            ? translations.stepTona
                            : translations.stepBereka}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Description Panel */}
            <div className="min-h-[140px] transition-all duration-500 transform translate-x-0">
              <h3 className="text-xl font-serif font-medium mb-1.5 text-gold">
                {currentRound.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90 mb-3">
                {currentRound.desc}
              </p>

              {/* Grid with flavor & mood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-current/10">
                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-lg bg-coffee-red/10 text-coffee-red mt-0.5">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold">
                      Flavor Notes
                    </h4>
                    <p className="text-xs opacity-80">{currentRound.flavor}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-lg bg-teal/10 text-teal mt-0.5">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold">
                      Social Mood
                    </h4>
                    <p className="text-xs opacity-80">{currentRound.mood}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
