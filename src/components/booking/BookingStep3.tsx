/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Users, MapPin, Check, User } from 'lucide-react';
import { Tour } from '../../types';

interface BookingStep3Props {
  tour: Tour;
  formData: {
    tourId: string;
    date: string;
    guests: number;
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    specialRequirements: string;
  };
  totalPrice: number;
  translations: {
    bookNowButton: string;
  };
}

export function BookingStep3({
  tour,
  formData,
  totalPrice,
  translations,
}: BookingStep3Props) {
  return (
    <div className="space-y-4">
      <div className="bg-sandstone/60 rounded-2xl p-4 border border-teal/10">
        <p className="text-xs font-mono text-teal/60 uppercase tracking-wider mb-4">Review Your Booking</p>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Tour</p>
              <p className="font-semibold text-teal">{tour.name}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Date</p>
              <p className="font-semibold text-teal">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Guests</p>
              <p className="font-semibold text-teal">{formData.guests} guest{formData.guests > 1 ? 's' : ''}</p>
            </div>
          </div>

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
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Email</p>
              <p className="font-semibold text-teal">{formData.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items_center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Phone</p>
              <p className="font-semibold text-teal">{formData.phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items_center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-teal/60">Pickup Location</p>
              <p className="font-semibold text-teal">{formData.pickupLocation}</p>
            </div>
          </div>

          {formData.specialRequirements && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items_center justify-center flex-shrink-0">
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
        <p className="text-xs text-teal/60 mt-2">No instant charge - pay your guide directly on tour day</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800 font-mono uppercase tracking-wider mb-2">Cancellation Policy</p>
        <p className="text-xs text-amber-700">Free cancellation up to 24 hours before the tour start time. Cancellations within 24 hours or no-shows are non-refundable. Weather-related cancellations qualify for full refund or free rescheduling.</p>
      </div>
    </div>
  );
}