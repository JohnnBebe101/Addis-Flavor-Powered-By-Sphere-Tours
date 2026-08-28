/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  title: string;
  description: string;
  details?: Record<string, string>;
  onClose: () => void;
  isGlobalDark?: boolean;
  closeBtnText?: string;
}

export function SuccessMessage({ title, description, details, onClose, isGlobalDark = false, closeBtnText = 'Close' }: SuccessMessageProps) {
  return (
    <div className="text-center py-6 space-y-6 animate-scaleIn">
      <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/30">
        <CheckCircle className="w-10 h-10 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-serif font-bold text-coffee-red">{title}</h3>
        <p className="text-sm leading-relaxed opacity-85 max-w-md mx-auto">{description}</p>
      </div>
      {details && (
        <div className="pt-4 border-t border-current/10">
          <div className="text-left text-xs space-y-1 opacity-70 bg-sandstone/25 p-4 rounded-xl border border-current/5">
            {Object.entries(details).map(([k, v]) => (
              <div key={k}><strong className="font-sans font-bold">{k}:</strong> {v}</div>
            ))}
          </div>
        </div>
      )}
      <div className="pt-2">
        <button onClick={onClose} className="px-8 py-3 bg-teal text-linen-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal/90 transition-all">
          {closeBtnText}
        </button>
      </div>
    </div>
  );
}