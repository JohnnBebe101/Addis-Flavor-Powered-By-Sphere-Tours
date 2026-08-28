/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users } from 'lucide-react';

interface BookingStep2Props {
  guestCount: number;
  setGuestCount: (count: number) => void;
  dietary: {
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
  };
  setDietary: (dietary: { vegan: boolean; glutenFree: boolean; halal: boolean }) => void;
  translations: {
    dietaryFilterLabel: string;
    dietaryVegan: string;
    dietaryGlutenFree: string;
    dietaryHalal: string;
  };
}

export function BookingStep2({
  guestCount,
  setGuestCount,
  dietary,
  setDietary,
  translations,
}: BookingStep2Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <Users className="w-3.5 h-3.5 text-gold" />
          <span>Number of Guests</span>
        </label>
        <div className="flex items-center space-x-4 bg-sandstone rounded-xl p-1.5 w-fit">
          <button
            id="guest-decrement"
            type="button"
            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            className="w-8 h-8 rounded-lg bg-linen-white hover:bg-teal/5 flex items-center justify-center font-bold text-sm text-teal active:scale-95 border border-teal/10"
          >
            -
          </button>
          <span className="font-mono text-sm font-bold px-2">{guestCount}</span>
          <button
            id="guest-increment"
            type="button"
            onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
            className="w-8 h-8 rounded-lg bg-linen-white hover:bg-teal/5 flex items-center justify-center font-bold text-sm text-teal active:scale-95 border border-teal/10"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider">
          {translations.dietaryFilterLabel}
        </label>

        <div className="space-y-2">
          <label className="flex items-center space-x-3 bg-sandstone/40 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/80 cursor-pointer transition-colors">
            <input
              id="diet-vegan"
              type="checkbox"
              checked={dietary.vegan}
              onChange={(e) => setDietary({ ...dietary, vegan: e.target.checked })}
              className="rounded border-teal/30 text-coffee-red focus:ring-coffee-red"
            />
            <div>
              <p className="text-xs font-bold text-teal">{translations.dietaryVegan}</p>
              <p className="text-[10px] text-teal/60">
                Traditional 100% plant-based Ethiopian Lentils/Veggie platter (Fasting bayenetu).
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 bg-sandstone/40 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/80 cursor-pointer transition-colors">
            <input
              id="diet-gf"
              type="checkbox"
              checked={dietary.glutenFree}
              onChange={(e) => setDietary({ ...dietary, glutenFree: e.target.checked })}
              className="rounded border-teal/30 text-coffee-red focus:ring-coffee-red"
            />
            <div>
              <p className="text-xs font-bold text-teal">{translations.dietaryGlutenFree}</p>
              <p className="text-[10px] text-teal/60">
                Host ensures 100% pure premium Teff Injera (no barley or wheat flour blend).
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 bg-sandstone/40 p-3 rounded-xl border border-teal/5 hover:bg-sandstone/80 cursor-pointer transition-colors">
            <input
              id="diet-halal"
              type="checkbox"
              checked={dietary.halal}
              onChange={(e) => setDietary({ ...dietary, halal: e.target.checked })}
              className="rounded border-teal/30 text-coffee-red focus:ring-coffee-red"
            />
            <div>
              <p className="text-xs font-bold text-teal">{translations.dietaryHalal}</p>
              <p className="text-[10px] text-teal/60">
                All meat dishes prepared according to traditional Halal standards.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}