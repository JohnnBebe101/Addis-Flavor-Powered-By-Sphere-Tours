/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Lock, MessageSquare, ChevronDown, ChevronUp, Star } from 'lucide-react';
import heroBgImg from '../assets/images/addis_hero_bg_1782233695273.jpg';
import hostCommunityImg from '../assets/images/addis_host_community_1782240127083.jpg';
import hostDiningImg from '../assets/images/addis_host_dining_1782240144545.jpg';
import cookingClassImg from '../assets/images/addis_cooking_class_1782233734033.jpg';
import jebenaPourImg from '../assets/images/addis_jebena_pour_1782233715156.jpg';
import content from '../content/become-host.json';
import { ApplyModal } from './BecomeHost/ApplyModal';
import { AskHostModal } from './BecomeHost/AskHostModal';
import { Accordion } from '../ui/Accordion';

interface BecomeHostProps {
  isGlobalDark: boolean;
  onBackToHome: () => void;
}

export default function BecomeHost({ isGlobalDark, onBackToHome }: BecomeHostProps) {
  const [showFaqs, setShowFaqs] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className={`transition-colors duration-1000 ${isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'}`}>
      {/* 1. HERO BANNER */}
      <div
        id="become-host-hero"
        className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${hostCommunityImg})` }}
      >
        <div className="absolute top-28 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBackToHome}
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-linen-white/80 hover:text-gold transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>{content.backBtn}</span>
            </button>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-linen-white tracking-tight drop-shadow-md uppercase">
            {content.heroTitle}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* 2. CENTERED INTRO */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg sm:text-xl font-serif leading-relaxed italic opacity-90 max-w-2xl mx-auto">
          &ldquo;{content.introText}&rdquo;
        </p>
      </div>

      {/* 3. TWO-COLUMN IDEAL HOST & APP PROCESS */}
      <div className={`border-t ${isGlobalDark ? 'border-linen-white/10 bg-black/10' : 'border-teal/5 bg-sandstone/15'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif tracking-tight text-coffee-red">{content.idealHostTitle}</h2>
                <p className="text-sm sm:text-base leading-relaxed opacity-85">{content.idealHostDesc}</p>
              </div>
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-serif tracking-tight">{content.appProcessTitle}</h3>
                <div className="space-y-4">
                  {content.steps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gold text-teal font-sans font-bold flex items-center justify-center flex-shrink-0 shadow">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium opacity-90">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <button
                    id="host-apply-button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="px-8 py-3.5 bg-gold text-teal font-sans font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:bg-gold/95 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
                  >
                    {content.applyBtn}
                  </button>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px] flex items-end p-6 sm:p-10 group"
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.8)), url(${hostDiningImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="relative z-10 w-full bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-linen-white/10 text-center space-y-4 shadow-lg">
                <h4 className="text-xl sm:text-2xl font-serif text-linen-white font-bold uppercase tracking-wider">{content.askSuperHost}</h4>
                <p className="text-xs sm:text-sm text-gold/90 font-medium">{content.askSuperHostSub}</p>
                <div className="pt-2">
                  <button
                    id="host-ask-button"
                    onClick={() => setIsAskModalOpen(true)}
                    className="px-6 py-2.5 bg-linen-white text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-teal transition-all duration-300"
                  >
                    Click Here to Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRUST & SAFETY & FEEDBACK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-coffee-red">
                <Lock className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-2xl font-serif font-bold tracking-tight">{content.trustTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed opacity-80">{content.trustDesc}</p>
            </div>
            <div className="pt-4">
              <button
                id="toggle-faqs-btn"
                onClick={() => setShowFaqs(!showFaqs)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${isGlobalDark ? 'bg-linen-white/10 hover:bg-linen-white/20 text-linen-white' : 'bg-teal/5 hover:bg-teal/10 text-teal'}`}
              >
                <span>{content.faqBtn}</span>
                {showFaqs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-current/5 bg-sandstone/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gold">
                <MessageSquare className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-2xl font-serif font-bold tracking-tight">{content.feedbackTitle}</h3>
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic leading-relaxed opacity-95">
                &ldquo;{content.feedbackQuote}&rdquo;
              </blockquote>
            </div>
            <div className="pt-4 border-t border-current/10">
              <cite className="not-italic text-xs font-mono uppercase tracking-wider block text-coffee-red font-bold">{content.feedbackAuthor}</cite>
              <div className="flex items-center space-x-1 text-gold mt-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-current" />))}
              </div>
            </div>
          </div>
        </div>

        {showFaqs && (
          <div className="mt-12 max-w-4xl p-6 sm:p-8 rounded-3xl bg-sandstone/20 border border-current/5 animate-fadeIn">
            <h4 className="text-xl font-serif font-bold mb-6 text-center text-coffee-red">Frequently Asked Host Questions</h4>
            <Accordion
              items={content.faqs}
              openIndex={openFaqIdx}
              onToggle={toggleFaq}
              isGlobalDark={isGlobalDark}
            />
          </div>
        )}
      </div>

      {/* 5. MULTI-IMAGE CULINARY STRIP */}
      <div className="relative py-20 bg-cover bg-center overflow-hidden flex items-center justify-center min-h-[250px]"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${heroBgImg})` }}
      >
        <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
          <img src={cookingClassImg} className="w-40 h-40 object-cover rounded-full" referrerPolicy="no-referrer" />
          <img src={jebenaPourImg} className="w-40 h-40 object-cover rounded-full hidden sm:block" referrerPolicy="no-referrer" />
          <img src={hostDiningImg} className="w-40 h-40 object-cover rounded-full" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 text-center max-w-xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-linen-white tracking-tight leading-tight">{content.bottomText}</h2>
          <div className="mt-6">
            <button onClick={() => setIsApplyModalOpen(true)} className="px-8 py-3 bg-coffee-red text-linen-white font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:bg-coffee-red/90 hover:scale-105 transition-all duration-300">
              {content.applyBtn}
            </button>
          </div>
        </div>
      </div>

      {/* APPLICATION FORM MODAL */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        isGlobalDark={isGlobalDark}
      />

      {/* ASK SUPER HOST MODAL */}
      <AskHostModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        isGlobalDark={isGlobalDark}
      />
    </div>
  );
}