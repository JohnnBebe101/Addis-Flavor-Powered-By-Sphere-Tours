/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle } from 'lucide-react';
import { Tour } from '../../types';

interface BookingSuccessProps {
  selectedTour: Tour;
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
  resetBooking: () => void;
  translations: {
    bookNowButton: string;
  };
}

export function BookingSuccess({
  selectedTour,
  formData,
  totalPrice,
  resetBooking,
  translations,
}: BookingSuccessProps) {
  return (
    <div className="text-center py-6 space-y-4">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
        <CheckCircle className="w-10 h-10" />
      </div>
      <h4 className="text-2xl font-serif text-teal font-bold">Booking Confirmed!</h4>
      <p className="text-sm text-teal/80 leading-relaxed max-w-sm mx-auto">
        Your private session for "{selectedTour.name}" has been successfully requested for{' '}
        {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
        Your guide will message you shortly to coordinate arrival details!
      </p>

      <div className="bg-sandstone/80 rounded-2xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
        <p className="text-xs font-mono text-teal/60 uppercase">Booking Details</p>
        <div className="mt-2 space-y-1 text-xs">
          <p><strong>Tour:</strong> {selectedTour.name}</p>
          <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Guests:</strong> {formData.guests} guest{formData.guests > 1 ? 's' : ''}</p>
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Pickup:</strong> {formData.pickupLocation}</p>
          <div className="border-t border-teal/10 pt-1.5 mt-1.5 flex justify-between font-bold text-sm">
            <span>Total:</span>
            <span className="text-coffee-red">${totalPrice} USD</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-1.5 text-xs text-gold font-mono uppercase font-bold bg-gold/10 py-2 px-3 rounded-full w-fit mx-auto">
        <span className="w-3.5 h-3.5">✨</span>
        <span>Booking Request Sent Successfully</span>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
        <p className="text-xs text-amber-800 font-mono uppercase tracking-wider mb-2">What Happens Next?</p>
        <ul className="text-xs text-amber-700 space-y-1 text-left">
          <li>• Your guide will contact you via WhatsApp within 2 hours</li>
          <li>• You'll receive confirmation with guide details and pickup time</li>
          <li>• No instant charge - pay your guide directly on tour day</li>
          <li>• Free cancellation up to 24 hours before tour</li>
        </ul>
      </div>
    </div>
  );
}