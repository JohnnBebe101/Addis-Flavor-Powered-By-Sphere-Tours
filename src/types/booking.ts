/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BookingFormData {
  tourId: string;
  date: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  pickupLocation: string;
  specialRequirements: string;
  website_url?: string;
}

export type BookingStep = 1 | 2 | 3;
