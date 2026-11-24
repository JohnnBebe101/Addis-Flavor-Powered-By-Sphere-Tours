import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(_onStoreChange: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};

  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', _onStoreChange);
  return () => mq.removeEventListener('change', _onStoreChange);
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
