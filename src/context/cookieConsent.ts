import { createContext, useContext } from 'react';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieConsentContextValue {
  consent: ConsentPreferences | null;
  hasInteracted: boolean;
  setConsent: (prefs: ConsentPreferences) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
}

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return ctx;
}

export function useHasConsent(category: keyof ConsentPreferences): boolean {
  const { consent } = useCookieConsent();
  return consent?.[category] ?? false;
}
