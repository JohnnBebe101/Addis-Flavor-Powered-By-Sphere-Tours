import { useState } from 'react';
import { useCookieConsent } from '../context/CookieConsentContext';
import { CookiePreferences } from './CookiePreferences';

export function CookieConsentBanner() {
  const { hasInteracted, acceptAll, rejectAll } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (hasInteracted) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[2000] p-4 sm:p-6"
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
      >
        <div className="max-w-4xl mx-auto bg-teal text-linen-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-linen-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-serif font-bold mb-2">
                We value your privacy
              </h2>
              <p className="text-sm text-linen-white/70 leading-relaxed mb-1">
                We use cookies to improve your experience, analyse site traffic, and serve relevant content.
                You can accept all cookies, reject non-essential ones, or customise your preferences.
              </p>
              <a
                href="/cookies/"
                className="text-xs text-gold underline hover:text-gold/80 transition-colors"
              >
                Read our Cookie Policy
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider border border-linen-white/30 text-linen-white rounded-lg hover:bg-linen-white/10 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
              >
                Manage
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider bg-coffee-red text-linen-white rounded-lg hover:bg-coffee-red/90 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPreferences && (
        <CookiePreferences onClose={() => setShowPreferences(false)} />
      )}
    </>
  );
}
