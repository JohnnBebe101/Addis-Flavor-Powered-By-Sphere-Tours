/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
  isGlobalDark?: boolean;
  className?: string;
}

export function Accordion({
  items,
  openIndex,
  onToggle,
  isGlobalDark = false,
  className = '',
}: AccordionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`border-b pb-4 last:border-0 last:pb-0 transition-colors ${
            isGlobalDark ? 'border-linen-white/10' : 'border-teal/5'
          }`}
        >
          <button
            onClick={() => onToggle(idx)}
            className="w-full flex items-center justify-between text-left font-serif font-bold text-base py-2 hover:text-coffee-red transition-colors"
          >
            <span>{item.q}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-4.5 h-4.5 text-gold flex-shrink-0 ml-4" />
            ) : (
              <ChevronDown className="w-4.5 h-4.5 text-gold flex-shrink-0 ml-4" />
            )}
          </button>
          {openIndex === idx && (
            <p className="text-sm leading-relaxed opacity-85 mt-2 pl-2 border-l-2 border-gold py-1">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
