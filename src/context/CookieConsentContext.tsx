import { useState, useCallback, type ReactNode } from 'react';
import { CookieConsentContext, type ConsentPreferences } from './cookieConsent';

const STORAGE_KEY = 'cookie-consent';

const DEFAULT_NECESSARY: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

function loadConsent(): ConsentPreferences | null {
  // There is no localStorage during the build-time prerender. Returning null
  // there is what keeps the prerendered markup identical to the markup the
  // browser produces on its first (hydration) render.
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_NECESSARY, ...parsed, necessary: true };
  } catch {
    return null;
  }
}

function saveConsent(prefs: ConsentPreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentPreferences | null>(loadConsent);
  const hasInteracted = consent !== null;

  const setConsent = useCallback((prefs: ConsentPreferences) => {
    const next = { ...prefs, necessary: true };
    setConsentState(next);
    saveConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true, marketing: true, functional: true });
  }, [setConsent]);

  const rejectAll = useCallback(() => {
    setConsent({ necessary: true, analytics: false, marketing: false, functional: false });
  }, [setConsent]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConsentState(null);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, hasInteracted, setConsent, acceptAll, rejectAll, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}
