import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

const STORAGE_KEY = 'cookie-consent';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentContextValue {
  consent: ConsentPreferences | null;
  hasInteracted: boolean;
  setConsent: (prefs: ConsentPreferences) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const DEFAULT_NECESSARY: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

function loadConsent(): ConsentPreferences | null {
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
  const [hasInteracted, setHasInteracted] = useState(() => consent !== null);

  useEffect(() => {
    setHasInteracted(consent !== null);
  }, [consent]);

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
    setHasInteracted(false);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, hasInteracted, setConsent, acceptAll, rejectAll, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return ctx;
}

export function useHasConsent(category: keyof ConsentPreferences): boolean {
  const { consent } = useCookieConsent();
  return consent?.[category] ?? false;
}
