/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useHasConsent } from '../context/CookieConsentContext';

export const GoogleReviewsWidget: React.FC = () => {
  const hasConsent = useHasConsent('functional');

  if (!hasConsent) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-teal/50 font-mono">
          Google Reviews are loaded only after you accept functional cookies.
        </p>
      </div>
    );
  }

  return (
    <div className="elfsight-app-b8704ce5-aa31-448d-a1d5-d5147f5d3560" data-elfsight-app-lazy />
  );
};
