/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Users, Minus, Plus } from 'lucide-react';
import { Tour } from '../../types';

interface BookingStep1Props {
  tours: Tour[];
  formData: {
    tourId: string;
    date: string;
    guests: number;
  };
  onChange: (field: string, value: any) => void;
  translations: {
    bookNowButton: string;
  };
}

export function BookingStep1({
  tours,
  formData,
  onChange,
  translations,
}: BookingStep1Props) {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleGuestChange = (delta: number) => {
    const newGuests = Math.max(1, Math.min(10, formData.guests + delta));
    onChange('guests', newGuests);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="booking-tour-select"
          className="text-xs font-mono uppercase text-teal/60 tracking-wider"
        >
          Select Your Tour
        </label>
        <select
          id="booking-tour-select"
          value={formData.tourId}
          onChange={(e) => onChange('tourId', e.target.value)}
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red focus:ring-1 focus:ring-coffee-red"
        >
          {tours.map((tour) => (
            <option key={tour.id} value={tour.id}>
              {tour.name} (${tour.pricing.smallGroup.adult}/guest)
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
          value={formData.date}
          min={tomorrow}
          onChange={(e) => onChange('date', e.target.value)}
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <Users className="w-3.5 h-3.5 text-gold" />
          <span>Number of Guests</span>
        </label>
        <div className="flex items-center space-x-4 bg-sandstone rounded-xl p-1.5 w-fit">
          <button
            type="button"
            onClick={() => handleGuestChange(-1)}
            className="w-8 h-8 rounded-lg bg-linen-white hover:bg-teal/5 flex items-center justify-center font-bold text-sm text-teal active:scale-95 border border-teal/10"
            aria-label="Decrease guests"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={formData.guests}
            min={1}
            max={10}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= 10) {
                onChange('guests', val);
              }
            }}
            className="w-12 font-mono text-sm font-bold px-2 text-center bg-transparent border-none focus:outline-none text-teal"
            readOnly
            aria-label="Number of guests"
          />
          <button
            type="button"
            onClick={() => handleGuestChange(1)}
            className="w-8 h-8 rounded-lg bg-linen-white hover:bg-teal/5 flex items-center justify-center font-bold text-sm text-teal active:scale-95 border border-teal/10"
            aria-label="Increase guests"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-sandstone/60 rounded-2xl p-4 flex items-start space-x-3 text-xs border border-teal/10">
        <span className="w-4 h-4 text-coffee-red flex-shrink-0 mt-0.5">⚠</span>
        <div>
          <p className="font-semibold text-teal">No Instant Charge</p>
          <p className="text-teal/70 leading-relaxed mt-0.5">
            Payment is completely local and flexible. This simulates booking validation for
            confirmation with your guide.
          </p>
        </div>
      </div>
    </div>
  );
}