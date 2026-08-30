/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Calendar, Users, MapPin } from 'lucide-react';

interface BookingStep2Props {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    specialRequirements: string;
  };
  onChange: (field: string, value: any) => void;
  translations: {
    bookNowButton: string;
  };
}

export function BookingStep2({
  formData,
  onChange,
  translations,
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
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
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
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
          <Users className="w-3.5 h-3.5 text-gold" />
          <span>WhatsApp or Phone</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+251-911-XXX-XXX"
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
          required
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
          className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
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