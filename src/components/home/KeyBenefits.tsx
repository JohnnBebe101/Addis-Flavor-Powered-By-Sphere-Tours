import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface KeyBenefitsProps {
  translations: {
    guaranteeVetted: string;
    guaranteeVettedSub: string;
    guaranteeTitle: string;
    guaranteeTitleSub: string;
    guaranteePrivate: string;
    guaranteePrivateSub: string;
  };
}

export const KeyBenefits: React.FC<KeyBenefitsProps> = ({ translations }) => {
  return (
    <section id="key-benefits" className="py-6 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Vetted badge */}
          <div id="benefit-vetted" className="flex flex-col items-center p-2 group">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center transition-all duration-300 mb-2 border border-gold/20 group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-coffee-red" />
            </div>
            <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
              {translations.guaranteeVetted}
            </h3>
            <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
              {translations.guaranteeVettedSub}
            </p>
          </div>

          {/* Satisfaction badge */}
          <div id="benefit-satisfaction" className="flex flex-col items-center p-2 group">
            <div className="w-12 h-12 rounded-full bg-coffee-red/10 text-coffee-red flex items-center justify-center transition-all duration-300 mb-2 border border-coffee-red/20 group-hover:scale-105">
              <span className="font-serif font-extrabold text-xs text-gold">100%</span>
            </div>
            <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
              {translations.guaranteeTitle}
            </h3>
            <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
              {translations.guaranteeTitleSub}
            </p>
          </div>

          {/* Private experience badge */}
          <div id="benefit-private" className="flex flex-col items-center p-2 group">
            <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center transition-all duration-300 mb-2 border border-teal/20 group-hover:scale-105">
              <Heart className="w-5 h-5 text-gold animate-none" />
            </div>
            <h3 className="text-sm font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
              {translations.guaranteePrivate}
            </h3>
            <p className="text-[11px] text-teal/60 max-w-xs mt-1 leading-relaxed">
              {translations.guaranteePrivateSub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};