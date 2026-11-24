/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

const ELSIGHT_WIDGET_ID = 'b8704ce5-aa31-448d-a1d5-d5147f5d3560';
const ELSIGHT_SCRIPT_URL = 'https://elfsightcdn.com/platform.js';
const SCRIPT_SELECTOR = 'script[src*="elfsightcdn.com"]';

function SkeletonPlaceholder() {
  return (
    <div className="py-12 animate-pulse">
      <div className="h-4 bg-teal/5 rounded w-3/4 mx-auto mb-4" />
      <div className="h-4 bg-teal/5 rounded w-1/2 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-teal/5 rounded-xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-4 h-4 bg-teal/10 rounded" />
              ))}
            </div>
            <div className="h-3 bg-teal/5 rounded w-full mb-2" />
            <div className="h-3 bg-teal/5 rounded w-4/5 mb-2" />
            <div className="h-3 bg-teal/5 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const GoogleReviewsWidget: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scriptRequestedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        if (!scriptRequestedRef.current) {
          scriptRequestedRef.current = true;
          if (!document.querySelector(SCRIPT_SELECTOR)) {
            const script = document.createElement('script');
            script.src = ELSIGHT_SCRIPT_URL;
            script.async = true;
            document.head.appendChild(script);
          }
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {!isVisible ? (
        <SkeletonPlaceholder />
      ) : (
        <div className={`elfsight-app-${ELSIGHT_WIDGET_ID}`} />
      )}
    </div>
  );
};
