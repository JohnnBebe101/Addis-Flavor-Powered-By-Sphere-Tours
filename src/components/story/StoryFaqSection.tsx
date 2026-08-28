import React from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

interface StoryFaqSectionProps {
  content: {
    title: string;
    q0: string;
    a0: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
  isGlobalDark: boolean;
  faqOpen: Record<number, boolean>;
  setFaqOpen: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  toggleFaq: (idx: number) => void;
}

export default function StoryFaqSection({
  content,
  isGlobalDark,
  faqOpen,
  setFaqOpen,
  toggleFaq,
}: StoryFaqSectionProps) {
  return (
    <section id="story-section-faq" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          <HelpCircle className="w-4 h-4 text-coffee-red" />
          <span>FAQ</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {content.title}
        </h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          { q: content.q0, a: content.a0 },
          { q: content.q1, a: content.a1 },
          { q: content.q2, a: content.a2 },
          { q: content.q3, a: content.a3 },
        ].map((item, idx) => {
          const isOpen = !!faqOpen[idx];
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 ${
                isGlobalDark
                  ? 'bg-white/5 border-linen-white/10 hover:border-gold/55'
                  : 'bg-sandstone/15 border-teal/5 hover:border-gold/55'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 focus:outline-none text-left"
              >
                <span className="font-serif font-bold text-base pr-4">{item.q}</span>
                {isOpen ? (
                  <Minus className="w-4 h-4 text-gold flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-gold flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm opacity-80 leading-relaxed font-sans border-t border-current/5">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}