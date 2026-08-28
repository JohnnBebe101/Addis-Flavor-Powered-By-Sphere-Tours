/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar } from 'lucide-react';
import { ExperiencePackage } from '../../types';

interface BookingStep1Props {
  packages: ExperiencePackage[];
  selectedPkgId: string;
  setSelectedPkgId: (id: string) => void;
  bookingDate: string;
  setBookingDate: (date: string) => void;
  translations: {
    dietaryFilterLabel: string;
    dietaryAll: string;
  };
}

export function BookingStep1({
  packages,
  selectedPkgId,
  setSelectedPkgId,
  bookingDate,
  setBookingDate,
  translations,
}: BookingStep1Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="booking-package-select"
          className="text-xs font-mono uppercase text-teal/60 tracking-wider"
        >
          Select Experience
        </label>
        <select
          id="booking-package-select"
          value={selectedPkgId}
          onChange={(e) => setSelectedPkgId(e.target.value)}
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red focus:ring-1 focus:ring-coffee-red"
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.emoji} {pkg.name} (${pkg.price}/guest)
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="booking-date-picker"
          className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1"
        >
          <Calendar className="w-3.5 h-3.5 text-coffee-red" />
          <span>Choose Date</span>
        </label>
        <input
          id="booking-date-picker"
          type="date"
          value={bookingDate}
          min="2026-06-24"
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
        />
      </div>

      <div className="bg-sandstone/60 rounded-2xl p-4 flex items-start space-x-3 text-xs border border-teal/10">
        <span className="w-4 h-4 text-coffee-red flex-shrink-0 mt-0.5">⚠</span>
        <div>
          <p className="font-semibold text-teal">No Instant Charged</p>
          <p className="text-teal/70 leading-relaxed mt-0.5">
            Payment is completely local and flexible. This simulates booking validation for confirmation with Mimi.
          </p>
        </div>
      </div>
    </div>
  );
}