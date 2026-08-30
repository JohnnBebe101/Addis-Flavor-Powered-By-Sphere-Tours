/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqsData from '../../content/faqs.json';

interface FAQAccordionProps {
  category?: keyof typeof faqsData.faqs;
  translations?: {
    headline: string;
  };
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ category = 'general', translations }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = faqsData.faqs[category] || [];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD FAQPage Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq-section" className="py-12 md:py-16 bg-linen-white border-b border-teal/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-teal">
            {translations?.headline || 'Frequently Asked Questions'}
          </h2>
          <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-3 divide-y divide-teal/10">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="pt-3">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
              >
                <h3 className="font-serif font-bold text-sm sm:text-base text-teal group-hover:text-coffee-red transition-colors pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-gold flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-teal/40 group-hover:text-coffee-red transition-transform duration-300 flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs sm:text-sm text-teal/70 leading-relaxed font-sans pb-3">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};