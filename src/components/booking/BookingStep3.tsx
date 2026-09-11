/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Users, MapPin, Check, User, Mail, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { Tour } from '../../types';
import type { BookingFormData } from '../../types/booking';

interface BookingStep3Props {
  tour: Tour;
  formData: Pick<BookingFormData, 'tourId' | 'date' | 'guests' | 'fullName' | 'email' | 'phone' | 'whatsapp' | 'pickupLocation' | 'specialRequirements'>;
  totalPrice: number;
  onEdit?: (step: 1 | 2) => void;
  policiesAgreed: boolean;
  onPoliciesChange: (agreed: boolean) => void;
  translations?: {
    bookNowButton: string;
  };
}

export function BookingStep3({
  tour,
  formData,
  totalPrice,
  onEdit,
  policiesAgreed,
  onPoliciesChange,
  translations: _translations,
}: BookingStep3Props) {
  return (
    <div className="space-y-4">
      <div className="bg-sandstone/60 rounded-2xl p-4 border border-teal/10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-mono text-teal/60 uppercase tracking-wider">
            Review Your Booking
          </p>
          {onEdit && (
            <button
              onClick={() => onEdit(1)}
              className="text-xs text-coffee-red hover:text-teal font-mono uppercase transition-colors"
            >
              Edit Tour
            </button>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-teal/60">Tour</p>
                <p className="font-semibold text-teal">{tour.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-teal/60">Date</p>
                <p className="font-semibold text-teal">
                  {new Date(formData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-teal/60">Guests</p>
                <p className="font-semibold text-teal">
                  {formData.guests} guest{formData.guests > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sandstone/60 rounded-2xl p-4 border border-teal/10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-mono text-teal/60 uppercase tracking-wider">
            Your Details
          </p>
          {onEdit && (
            <button
              onClick={() => onEdit(2)}
              className="text-xs text-coffee-red hover:text-teal font-mono uppercase transition-colors"
            >
              Edit Details
            </button>
          )}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Name</p>
              <p className="font-semibold text-teal">{formData.fullName}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Email</p>
              <p className="font-semibold text-teal">{formData.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Phone</p>
              <p className="font-semibold text-teal">{formData.phone}</p>
            </div>
          </div>

          {formData.whatsapp && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-teal/60">WhatsApp</p>
                <p className="font-semibold text-teal">{formData.whatsapp}</p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Pickup Location</p>
              <p className="font-semibold text-teal">{formData.pickupLocation}</p>
            </div>
          </div>

          {formData.specialRequirements && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-teal/60">Special Requirements</p>
                <p className="font-semibold text-teal">{formData.specialRequirements}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-sandstone/60 rounded-2xl p-4 border border-teal/10">
        <p className="text-xs font-mono text-teal/60 uppercase tracking-wider mb-3">Total Price</p>
        <div className="flex justify-between font-bold text-lg">
          <span className="text-teal">Total</span>
          <span className="text-coffee-red">${totalPrice} USD</span>
        </div>
        <p className="text-xs text-teal/60 mt-2">
          No instant charge - pay your guide directly on tour day
        </p>
      </div>

      <div className="border-t border-teal/10 pt-4">
        <details className="bg-sandstone/30 rounded-xl border border-teal/10 overflow-hidden">
          <summary className="flex items-center justify-between cursor-pointer p-4 font-serif font-bold text-sm text-teal hover:text-coffee-red transition-colors">
            Booking Policies
            <ChevronDown className="w-4 h-4 text-gold" />
          </summary>
          <div className="px-4 pb-4 space-y-2 text-xs text-teal/70">
            <p><strong>Cancellation:</strong> Free cancellation up to 24 hours before tour start time.</p>
            <p><strong>Payment:</strong> Pay your guide directly on tour day. No instant charge.</p>
            <p><strong>Pickup:</strong> Complimentary pickup from central Addis Ababa hotels.</p>
          </div>
        </details>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={policiesAgreed}
          onChange={(e) => onPoliciesChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-teal/30 text-coffee-red focus:ring-coffee-red"
          aria-describedby="booking-policies-desc"
        />
        <span id="booking-policies-desc" className="text-xs text-teal/70 group-hover:text-teal transition-colors">
          I have read and agree to the <span className="font-bold text-coffee-red">Booking Policies</span> including cancellation and payment terms.
        </span>
      </label>
    </div>
  );
}
