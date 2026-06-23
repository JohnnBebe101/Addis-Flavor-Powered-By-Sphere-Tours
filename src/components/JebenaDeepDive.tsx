/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Flame, Info, Eye, Moon, Sun } from 'lucide-react';
import { Language, Translations } from '../types';

interface JebenaDeepDiveProps {
  currentLang: Language;
  translations: Translations;
  isGlobalDark: boolean;
  setGlobalDark: (dark: boolean) => void;
}

export default function JebenaDeepDive({
  currentLang,
  translations,
  isGlobalDark,
  setGlobalDark,
}: JebenaDeepDiveProps) {
  const [activeRound, setActiveRound] = useState<'abol' | 'tona' | 'bereka'>('abol');

  const roundsData = {
    abol: {
      titleEn: "Abol – The First Brew (Strength & Presence)",
      titleFr: "Abol – Le premier brassage (Force et présence)",
      titleAm: "አቦል – አንደኛ ዙር (ኃይል እና ኅልውና)",
      descEn: "The first, strongest brew. Freshly roasted coffee grounds are boiled in pure water. It is thick, robust, and served in quiet reverence. This round is for offering blessings, making formal introductions, and showing respect to the elders.",
      descFr: "Le premier et le plus fort des brassages. Le café fraîchement torréfié est bouilli dans de l'eau pure. Épais, robuste et servi dans un silence respectueux, ce premier tour est dédié aux bénédictions, aux présentations formelles et au respect des aînés.",
      descAm: "የመጀመሪያው እና በጣም ጠንካራው ዙር። አዲስ የተቆላው ቡና በንፁህ ውሃ ውስጥ ይፈላል። ወፍራም፣ ኃይለኛ እና በታላቅ አክብሮት የሚቀርብ ነው። ይህ ዙር ቡራኬን ለመስጠት፣ እራስን ለማስተዋወቅ እና ለአባቶች አክብሮት ለማሳየት ይውላል።",
      flavorEn: "Rich cocoa, dark molasses, deep earthiness",
      flavorFr: "Cacao riche, mélasse noire, nuances terreuses profondes",
      flavorAm: "ወፍራም ካካዎ፣ ጥቁር ማር፣ የዕጣን መዓዛ",
      moodEn: "Focused, silent, reverent",
      moodFr: "Concentré, silencieux, respectueux",
      moodAm: "የረጋ፣ ጸጥ ያለ፣ በአክብሮት የተሞላ",
      color: "bg-coffee-red",
      steamCount: 5,
    },
    tona: {
      titleEn: "Tona – The Second Brew (Dialogue & Connection)",
      titleFr: "Tona – Le second brassage (Dialogue et connexion)",
      titleAm: "ቶና – ሁለተኛ ዙር (ውይይት እና መቀራረብ)",
      descEn: "Warm water is added to the remaining grounds in the Jebena and brewed a second time. It is slightly milder, encouraging the start of open-hearted dialogue. Politics, gossip, neighborhood events, and family life are discussed here.",
      descFr: "De l'eau chaude est ajoutée au marc de café restant dans la Jebena pour un deuxième brassage. Plus doux, il favorise un dialogue ouvert et chaleureux sur la politique, l'actualité locale ou la vie de famille.",
      descAm: "በጀበናው ውስጥ ለቀረው የቡና አተላ ላይ ሞቅ ያለ ውሃ ተጨምሮ ለሁለተኛ ጊዜ ይፈላል። መጠነኛ ጥንካሬ ስላለው ግልጽ ውይይቶችን ለመጀመር ይረዳል። ፖለቲካ፣ ወሬዎች፣ የአካባቢ ጉዳዮች እና የቤተሰብ ህይወት እዚህ ላይ ይወራሉ።",
      flavorEn: "Spiced clove, roasted hazelnut, citrus notes",
      flavorFr: "Clou de girofle épicé, noisette torréfiée, notes d'agrumes",
      flavorAm: "የቅርንፉድ ቅመም፣ የለውዝ መዓዛ፣ የሎሚ ቃና",
      moodEn: "Warm, communicative, laughter-filled",
      moodFr: "Chaleureux, communicatif, joyeux",
      moodAm: "ሞቅ ያለ፣ ተግባቢ፣ በሳቅ የተሞላ",
      color: "bg-gold",
      steamCount: 3,
    },
    bereka: {
      titleEn: "Bereka – The Third Brew (Blessing & Parting)",
      titleFr: "Bereka – Le troisième brassage (Bénédiction et séparation)",
      titleAm: "በረካ – ሦስተኛ ዙር (በረከት እና ፍቅር)",
      descEn: "The final brew. Water is added once more, producing a light, relaxing cup. This round symbolizes the sealing of friendship and the distribution of final blessings (Bereka) before guests step out into the Addis sun.",
      descFr: "L'ultime infusion. De l'eau est rajoutée pour produire une tasse légère et relaxante. Ce tour scelle l'amitié et distribue les dernières bénédictions (Bereka) avant que les convives ne repartent.",
      descAm: "የመጨረሻው ዙር። ውሃ እንደገና ተጨምሮ ቀላል እና ዘና የሚያደርግ ቡና ይዘጋጃል። ይህ ዙር የጓደኝነትን ማህተም እና እንግዶች ወደ አዲሱ ቀን ከመውጣታቸው በፊት የመጨረሻውን በረከት ማካፈልን ያመለክታል።",
      flavorEn: "Light herbal tea, soft jasmine, subtle honey",
      flavorFr: "Infusion légère d'herbes, jasmin doux, miel subtil",
      flavorAm: "ቀላል የዕፅዋት ሻይ፣ የጃስሚን አበባ፣ ማር ማር የሚል ቃና",
      moodEn: "Peaceful, meditative, blissful",
      moodFr: "Paisible, méditatif, serein",
      moodAm: "ሰላማዊ፣ የሚያሰላስል፣ በደስታ የተሞላ",
      color: "bg-teal",
      steamCount: 2,
    },
  };

  const currentRound = roundsData[activeRound];

  return (
    <section
      id="jebena-deep-dive"
      className={`py-16 md:py-24 transition-colors duration-1000 ${
        isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-sandstone text-teal'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark Mode Switcher Indicator */}
        <div className="flex justify-center mb-8">
          <button
            id="dimmer-switch"
            onClick={() => setGlobalDark(!isGlobalDark)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isGlobalDark
                ? 'border-gold/40 bg-gold/10 text-gold hover:bg-gold/20'
                : 'border-teal/30 bg-teal/5 text-teal hover:bg-teal/10'
            }`}
          >
            {isGlobalDark ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              {isGlobalDark ? translations.darkRitualActive : translations.darkRitualToggle}
            </span>
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {translations.jebenaInteractiveTitle}
          </h2>
          <p className="text-sm md:text-base leading-relaxed opacity-80">
            {translations.jebenaInteractiveSub}
          </p>
        </div>

        {/* Interactive Layout: Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: The Interactive Jebena clay pot illustration (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Background Glow when dark */}
            <div
              className={`absolute w-72 h-72 rounded-full blur-3xl transition-opacity duration-1000 -z-10 ${
                isGlobalDark ? 'bg-coffee-red/10' : 'bg-gold/10'
              }`}
            />

            {/* Coffee Steam Container */}
            <div className="h-24 w-full flex justify-center items-end relative overflow-visible mb-2">
              {/* Animated Steam Particles */}
              {Array.from({ length: currentRound.steamCount }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-16 bg-gradient-to-t from-linen-white/20 via-linen-white/5 to-transparent rounded-full steam-particle"
                  style={{
                    left: `${48 + (i - (currentRound.steamCount - 1) / 2) * 6}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${3.5 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* The Jebena (Styled Clay Pot representation in SVG) */}
            <div className="w-64 h-64 relative flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className={`w-52 h-52 transition-transform duration-500 drop-shadow-2xl ${
                  activeRound === 'abol' ? 'rotate-[-3deg] scale-100' :
                  activeRound === 'tona' ? 'rotate-[-8deg] scale-102' :
                  'rotate-[-15deg] scale-105'
                }`}
              >
                {/* Clay pot body */}
                <circle cx="100" cy="130" r="50" fill="#2E1C15" stroke="#1A100C" strokeWidth="4" />
                {/* Cultural patterns on clay pot */}
                <circle cx="100" cy="130" r="35" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 65,130 L 135,130" stroke="#C44B3B" strokeWidth="3" />
                <path d="M 100,95 L 100,165" stroke="#C44B3B" strokeWidth="3" />

                {/* Neck */}
                <path d="M 90,80 L 90,40 L 110,40 L 110,80 Z" fill="#2E1C15" stroke="#1A100C" strokeWidth="4" />
                {/* Neck Ring decorative */}
                <ellipse cx="100" cy="55" rx="12" ry="4" fill="#D4AF37" />

                {/* Spout spout pouring */}
                <path d="M 60,110 L 35,95 L 40,88 L 65,103 Z" fill="#2E1C15" stroke="#1A100C" strokeWidth="3" />

                {/* Handle */}
                <path d="M 110,50 Q 160,80 145,120 Q 135,140 120,135" fill="none" stroke="#2E1C15" strokeWidth="12" strokeLinecap="round" />
                <path d="M 110,50 Q 160,80 145,120 Q 135,140 120,135" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />

                {/* Fire coals under Jebena */}
                {activeRound !== 'bereka' && (
                  <path d="M 70,185 Q 100,165 130,185" fill="none" stroke="#C44B3B" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
                )}
              </svg>

              {/* Incense Burner Mockup (Rekebot side element) */}
              <div className="absolute right-0 bottom-4 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                </div>
                <span className="text-[9px] font-mono uppercase mt-1 opacity-60">
                  {currentLang === 'en' ? 'Frankincense' : currentLang === 'fr' ? 'Encens' : 'ዕጣን'}
                </span>
              </div>
            </div>

            {/* Pour Indicator */}
            <div className="mt-4 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-gold animate-pulse">
                {activeRound === 'abol'
                  ? currentLang === 'en' ? '★ Abol Pouring' : currentLang === 'fr' ? "★ Versement d'Abol" : '★ አቦል መፍሰስ'
                  : activeRound === 'tona'
                    ? currentLang === 'en' ? '★★ Tona Pouring' : currentLang === 'fr' ? '★★ Versement de Tona' : '★★ ቶና መፍሰስ'
                    : currentLang === 'en' ? '★★★ Bereka Blessing' : currentLang === 'fr' ? '★★★ Bénédiction de Bereka' : '★★★ በረካ በረከት'}
              </span>
            </div>
          </div>

          {/* Column 2: Timeline controls & Descriptions (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step Selector Tab Pills */}
            <div className="flex border-b border-current/10 pb-4 justify-between sm:justify-start sm:space-x-4">
              {(['abol', 'tona', 'bereka'] as const).map((round) => {
                const isSelected = activeRound === round;
                const roundDetail = roundsData[round];
                return (
                  <button
                    key={round}
                    id={`round-tab-${round}`}
                    onClick={() => setActiveRound(round)}
                    className={`flex-1 sm:flex-none text-left px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden focus:outline-none ${
                      isSelected
                        ? 'bg-current/10 shadow-md font-bold'
                        : 'opacity-50 hover:opacity-85 hover:bg-current/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${roundDetail.color}`} />
                      <span className="font-mono text-xs uppercase tracking-wider">
                        {round === 'abol' ? translations.stepAbol : round === 'tona' ? translations.stepTona : translations.stepBereka}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Description Panel */}
            <div className="min-h-[220px] transition-all duration-500 transform translate-x-0">
              <h3 className="text-2xl font-serif font-medium mb-3 text-gold">
                {currentLang === 'en' ? currentRound.titleEn : currentLang === 'fr' ? currentRound.titleFr : currentRound.titleAm}
              </h3>
              <p className="text-base leading-relaxed opacity-90 mb-6">
                {currentLang === 'en' ? currentRound.descEn : currentLang === 'fr' ? currentRound.descFr : currentRound.descAm}
              </p>

              {/* Grid with flavor & mood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-current/10">
                <div className="flex items-start space-x-2">
                  <div className="p-1.5 rounded-lg bg-coffee-red/10 text-coffee-red mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-gold">
                      {currentLang === 'en' ? 'Flavor Notes' : currentLang === 'fr' ? 'Notes de dégustation' : 'የጣዕም መግለጫ'}
                    </h4>
                    <p className="text-sm opacity-80">
                      {currentLang === 'en' ? currentRound.flavorEn : currentLang === 'fr' ? currentRound.flavorFr : currentRound.flavorAm}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="p-1.5 rounded-lg bg-teal/10 text-teal mt-0.5">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-gold">
                      {currentLang === 'en' ? 'Social Mood' : currentLang === 'fr' ? 'Ambiance sociale' : 'የመንፈስ ሁኔታ'}
                    </h4>
                    <p className="text-sm opacity-80">
                      {currentLang === 'en' ? currentRound.moodEn : currentLang === 'fr' ? currentRound.moodFr : currentRound.moodAm}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
