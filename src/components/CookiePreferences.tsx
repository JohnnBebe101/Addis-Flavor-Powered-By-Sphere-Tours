import { useState, useEffect, useRef } from 'react';
import { useCookieConsent, type ConsentPreferences } from '../context/CookieConsentContext';

interface CookiePreferencesProps {
  onClose: () => void;
}

const CATEGORIES = [
  {
    key: 'necessary' as const,
    label: 'Necessary',
    description: 'Required for the website to function. These cannot be disabled.',
    alwaysOn: true,
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    description: 'Help us understand how visitors interact with our site. All data is anonymised.',
    alwaysOn: false,
  },
  {
    key: 'functional' as const,
    label: 'Functional',
    description: 'Enable features like Google Reviews widgets and embedded content.',
    alwaysOn: false,
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to deliver relevant advertisements and track campaign performance.',
    alwaysOn: false,
  },
];

export function CookiePreferences({ onClose }: CookiePreferencesProps) {
  const { consent, setConsent } = useCookieConsent();
  const [draft, setDraft] = useState<ConsentPreferences>(
    consent ?? { necessary: true, analytics: false, marketing: false, functional: false }
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, []);

  const handleToggle = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return;
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setConsent(draft);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2001] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-lg bg-linen-white rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-teal">Cookie Preferences</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-teal/50 hover:text-teal hover:bg-teal/5 transition-colors"
              aria-label="Close"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="p-4 rounded-xl border border-teal/10 bg-sandstone/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-mono text-sm font-semibold text-teal">{cat.label}</h3>
                    <p className="text-xs text-teal/60 mt-1 leading-relaxed">{cat.description}</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={draft[cat.key]}
                    aria-label={`${cat.label} cookies`}
                    disabled={cat.alwaysOn}
                    onClick={() => handleToggle(cat.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coffee-red focus-visible:ring-offset-2 ${
                      draft[cat.key]
                        ? 'bg-coffee-red'
                        : cat.alwaysOn
                          ? 'bg-teal/30'
                          : 'bg-teal/20'
                    } ${cat.alwaysOn ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        draft[cat.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-xs font-mono uppercase tracking-wider border border-teal/20 text-teal rounded-lg hover:bg-teal/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 text-xs font-mono uppercase tracking-wider bg-coffee-red text-linen-white rounded-lg hover:bg-coffee-red/90 transition-colors"
            >
              Save Preferences
            </button>
          </div>

          <p className="mt-4 text-[10px] text-teal/50 text-center">
            You can change your preferences at any time by clicking &ldquo;Cookie Settings&rdquo; in the footer.
          </p>
        </div>
      </div>
    </div>
  );
}
