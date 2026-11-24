import { useEffect } from 'react';

export function useKeyboard(handlers: Record<string, () => void>, active = true) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (handlers[e.key]) {
        handlers[e.key]();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handlers, active]);
}
