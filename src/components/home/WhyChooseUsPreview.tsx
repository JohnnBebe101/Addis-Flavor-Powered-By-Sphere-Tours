import React from 'react';
import { MapPin, Tag, Shield } from 'lucide-react';

interface WhyChooseUsPreviewProps {
  translations: {
    whyChooseUsHeadline: string;
    localExpertsTitle: string;
    localExpertsDesc: string;
    bestPriceTitle: string;
    bestPriceDesc: string;
    flexibleSafeTitle: string;
    flexibleSafeDesc: string;
  };
}

export const WhyChooseUsPreview: React.FC<WhyChooseUsPreviewProps> = ({ translations }) => {
  return (
    <section id="why-choose-us-preview" className="py-16 bg-linen-white border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            {translations.whyChooseUsHeadline}
          </h2>
          <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Local Experts */}
          <div className="flex flex-col items-center p-6 group">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center transition-all duration-300 mb-4 border border-gold/20 group-hover:scale-105">
              <MapPin className="w-8 h-8 text-coffee-red" />
            </div>
            <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
              {translations.localExpertsTitle}
            </h3>
            <p className="text-sm text-teal/70 max-w-xs leading-relaxed">
              {translations.localExpertsDesc}
            </p>
          </div>

          {/* Best Price Guarantee */}
          <div className="flex flex-col items-center p-6 group">
            <div className="w-16 h-16 rounded-2xl bg-coffee-red/10 text-coffee-red flex items-center justify-center transition-all duration-300 mb-4 border border-coffee-red/20 group-hover:scale-105">
              <Tag className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
              {translations.bestPriceTitle}
            </h3>
            <p className="text-sm text-teal/70 max-w-xs leading-relaxed">
              {translations.bestPriceDesc}
            </p>
          </div>

          {/* Flexible & Safe */}
          <div className="flex flex-col items-center p-6 group">
            <div className="w-16 h-16 rounded-2xl bg-teal/10 text-teal flex items-center justify-center transition-all duration-300 mb-4 border border-teal/20 group-hover:scale-105">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-teal group-hover:text-coffee-red transition-colors mb-2">
              {translations.flexibleSafeTitle}
            </h3>
            <p className="text-sm text-teal/70 max-w-xs leading-relaxed">
              {translations.flexibleSafeDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};