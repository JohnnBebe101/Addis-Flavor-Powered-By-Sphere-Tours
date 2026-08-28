/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExperiencePackage } from '../../types';

interface BookingSuccessProps {
  selectedPkg: ExperiencePackage;
  bookingDate: string;
  guestCount: number;
  dietary: {
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
  };
  totalPrice: number;
  resetBooking: () => void;
  translations: {
    stepAbol: string;
    stepTona: string;
    stepBereka: string;
  };
}

export function BookingSuccess({
  selectedPkg,
  bookingDate,
  guestCount,
  dietary,
  totalPrice,
  resetBooking,
}: BookingSuccessProps) {
  return (
    <div className="text-center py-6 space-y-4">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
        <span className="w-8 h-8">✓</span>
      </div>
      <h4 className="text-2xl font-serif text-teal font-bold">Aroma Awaits You!</h4>
      <p className="text-sm text-teal/80 leading-relaxed max-w-sm mx-auto">
        Your private session for "{selectedPkg.name}" has been successfully requested for {bookingDate}. Mimi will message you shortly to coordinate arrival details!
      </p>

      <div className="bg-sandstone/80 rounded-2xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
        <p className="text-xs font-mono text-teal/60 uppercase">Booking Details</p>
        <div className="mt-2 space-y-1 text-xs">
          <p>
            <strong>Experience:</strong> {selectedPkg.name}
          </p>
          <p>
            <strong>Date:</strong> {bookingDate}
          </p>
          <p>
            <strong>Party Size:</strong> {guestCount} guests
          </p>
          <p>
            <strong>Dietary:</strong> {' '}
            {Object.entries({ vegan: false, glutenFree: false, halal: false })
              .filter(([_, v]) => v)
              .map(([k]) => k.toUpperCase())
              .join(', ') || 'Standard Menu'}
          </p>
          <div className="border-t border-teal/10 pt-1.5 mt-1.5 flex justify-between font-bold text-sm">
            <span>Total Paid:</span>
            <span className="text-coffee-red">${0} USD</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-1.5 text-xs text-gold font-mono uppercase font-bold bg-gold/10 py-2 px-3 rounded-full w-fit mx-auto">
        <span className="w-3.5 h-3.5">✨</span>
        <span>Simulated Secure Checkout Successful</span>
      </div>
    </div>
  );
}