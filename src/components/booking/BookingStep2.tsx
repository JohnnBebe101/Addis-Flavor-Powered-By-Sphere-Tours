/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Calendar, Users, MapPin, MessageCircle } from 'lucide-react';
import { PhoneInput } from '../ui/PhoneInput';
import type { BookingFormData } from '../../types/booking';

interface BookingStep2Props {
  formData: Pick<BookingFormData, 'fullName' | 'email' | 'phone' | 'whatsapp' | 'pickupLocation' | 'specialRequirements'>;
  onChange: (field: string, value: string | number) => void;
  showErrors?: boolean;
  translations?: {
    bookNowButton: string;
  };
}

export function BookingStep2({
  formData,
  onChange,
  showErrors,
  translations: _translations,
}: BookingStep2Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <User className="w-3.5 h-3.5 text-gold" />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="John Doe"
          className={`w-full bg-sandstone border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red ${
            showErrors && !formData.fullName ? 'border-red-400' : 'border-teal/10'
          }`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span>Email Address</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="john@example.com"
          className={`w-full bg-sandstone border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red ${
            showErrors && !formData.email ? 'border-red-400' : 'border-teal/10'
          }`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <Users className="w-3.5 h-3.5 text-gold" />
          <span>Phone Number *</span>
        </label>
        <PhoneInput
          id="booking-phone"
          value={formData.phone}
          onChange={(val) => onChange('phone', val)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <MessageCircle className="w-3.5 h-3.5 text-gold" />
          <span>WhatsApp Number</span>
        </label>
        <PhoneInput
          id="booking-whatsapp"
          value={formData.whatsapp}
          onChange={(val) => onChange('whatsapp', val)}
          helperText="For instant confirmation & guide coordination"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-gold" />
          <span>Pickup Location</span>
        </label>
        <input
          type="text"
          value={formData.pickupLocation}
          onChange={(e) => onChange('pickupLocation', e.target.value)}
          placeholder="Hotel name or address"
          className={`w-full bg-sandstone border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red ${
            showErrors && !formData.pickupLocation ? 'border-red-400' : 'border-teal/10'
          }`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider">
          Special Requirements
        </label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => onChange('specialRequirements', e.target.value)}
          placeholder="Dietary needs, mobility issues, special occasions, etc."
          rows={3}
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
        />
      </div>
    </div>
  );
}
