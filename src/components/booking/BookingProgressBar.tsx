/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from 'lucide-react';

interface BookingProgressBarProps {
  step: 1 | 2 | 3;
  stepLabels: string[];
}

export function BookingProgressBar({ step, stepLabels }: BookingProgressBarProps) {
  return (
    <div className="px-6 py-3 bg-sandstone/60 flex items-center justify-between border-b border-teal/5">
      <div className="flex items-center space-x-1.5">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
            step >= 1 ? 'bg-coffee-red text-linen-white' : 'bg-teal/10 text-teal/40'
          }`}
        >
          {step > 1 ? <Check className="w-3 h-3" /> : '1'}
        </div>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider ${
            step === 1 ? 'text-coffee-red font-bold' : 'text-teal/50'
          }`}
        >
          {stepLabels[0]}
        </span>
      </div>

      <div className="flex-1 h-0.5 mx-2 bg-teal/10" />

      <div className="flex items-center space-x-1.5">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
            step >= 2 ? 'bg-gold text-linen-white' : 'bg-teal/10 text-teal/40'
          }`}
        >
          {step > 2 ? <Check className="w-3 h-3" /> : '2'}
        </div>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider ${
            step === 2 ? 'text-gold font-bold' : 'text-teal/50'
          }`}
        >
          {stepLabels[1]}
        </span>
      </div>

      <div className="flex-1 h-0.5 mx-2 bg-teal/10" />

      <div className="flex items-center space-x-1.5">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
            step >= 3 ? 'bg-teal text-linen-white' : 'bg-teal/10 text-teal/40'
          }`}
        >
          3
        </div>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider ${
            step === 3 ? 'text-teal font-bold' : 'text-teal/50'
          }`}
        >
          {stepLabels[2]}
        </span>
      </div>
    </div>
  );
}