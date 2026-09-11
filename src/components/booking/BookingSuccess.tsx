/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, MessageCircle, Mail, MapPin, Calendar, Users, Phone } from 'lucide-react';
import { Tour } from '../../types';
import type { BookingFormData } from '../../types/booking';

interface BookingSuccessProps {
  selectedTour: Tour;
  formData: Pick<BookingFormData, 'tourId' | 'date' | 'guests' | 'fullName' | 'email' | 'phone' | 'whatsapp' | 'pickupLocation' | 'specialRequirements'>;
  totalPrice: number;
  resetBooking?: () => void;
  translations?: {
    bookNowButton: string;
  };
}

export function BookingSuccess({
  selectedTour,
  formData,
  totalPrice,
  resetBooking: _resetBooking,
  translations: _translations,
}: BookingSuccessProps) {
  const generateRef = (): string => {
    const tourPart = selectedTour.id.slice(0, 3).toUpperCase();
    const datePart = formData.date.slice(5).replace('-', '');
    const phonePart = formData.phone.replace(/\D/g, '').slice(-4);
    return `${tourPart}-${datePart}-${phonePart}`;
  };

  const whatsappNumber = '251911209882';
  const whatsappMessage = encodeURIComponent(
    `🎯 *New Booking Request*\n\n` +
    `📋 Reference: ${generateRef()}\n` +
    `🏔️ Tour: ${selectedTour.name}\n` +
    `📅 Date: ${new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\n` +
    `👥 Guests: ${formData.guests}\n` +
    `👤 Name: ${formData.fullName}\n` +
    `📧 Email: ${formData.email}\n` +
    `📞 Phone: ${formData.phone}\n` +
    (formData.whatsapp ? `📱 WhatsApp: ${formData.whatsapp}\n` : '') +
    `📍 Pickup: ${formData.pickupLocation}\n` +
    (formData.specialRequirements ? `💬 Requirements: ${formData.specialRequirements}\n` : '') +
    `💰 Total: $${totalPrice} USD\n\n` +
    `Please confirm this booking. Thank you!`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(`Booking Request - ${selectedTour.name} (${generateRef()})`);
  const emailBody = encodeURIComponent(
    `Booking Reference: ${generateRef()}\n\n` +
    `Tour: ${selectedTour.name}\n` +
    `Date: ${new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\n` +
    `Guests: ${formData.guests}\n` +
    `Name: ${formData.fullName}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone}\n` +
    (formData.whatsapp ? `WhatsApp: ${formData.whatsapp}\n` : '') +
    `Pickup: ${formData.pickupLocation}\n` +
    (formData.specialRequirements ? `Requirements: ${formData.specialRequirements}\n` : '') +
    `Total: $${totalPrice} USD\n\n` +
    `Please confirm this booking. Thank you!`
  );
  const emailUrl = `mailto:info@addisababacitytour.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="text-center py-6 space-y-4 animate-fade-in" role="status" aria-live="polite">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10" />
      </div>

      <h4 className="text-2xl font-serif text-teal font-bold">Booking Confirmed!</h4>

      <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full">
        <span className="text-xs font-mono text-teal/60">Reference:</span>
        <span className="text-sm font-mono font-bold text-coffee-red">{generateRef()}</span>
      </div>

      <div className="bg-sandstone/80 rounded-2xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
        <p className="text-xs font-mono text-teal/60 uppercase mb-3">Booking Details</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-start space-x-2">
            <Calendar className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-teal">{selectedTour.name}</p>
              <p className="text-teal/70">
                {new Date(formData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <p className="font-semibold text-teal">
              {formData.guests} guest{formData.guests > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <p className="font-semibold text-teal">{formData.pickupLocation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <p className="font-semibold text-teal">{formData.phone}</p>
          </div>
          <div className="border-t border-teal/10 pt-2 mt-2 flex justify-between font-bold text-sm">
            <span className="text-teal">Total</span>
            <span className="text-coffee-red">${totalPrice} USD</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left max-w-sm mx-auto">
        <p className="text-xs text-amber-800 font-mono uppercase tracking-wider mb-2">What Happens Next?</p>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>• Your guide will contact you via WhatsApp within 2 hours</li>
          <li>• You'll receive confirmation with guide details and pickup time</li>
          <li>• No instant charge — pay your guide directly on tour day</li>
          <li>• Free cancellation up to 24 hours before tour</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase font-bold tracking-wider transition-all shadow-md"
        >
          <MessageCircle className="w-4 h-4" /> Send Booking via WhatsApp
        </a>
        <a
          href={emailUrl}
          className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-coffee-red text-coffee-red text-xs uppercase font-bold tracking-wider hover:bg-coffee-red/5 transition-all"
        >
          <Mail className="w-4 h-4" /> Email Booking Details
        </a>
      </div>

      <div className="flex items-center justify-center space-x-1.5 text-xs text-gold font-mono uppercase font-bold bg-gold/10 py-2 px-3 rounded-full w-fit mx-auto">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Booking Request Sent Successfully</span>
      </div>
    </div>
  );
}
