/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Translations, Tour } from '../types';
import bookingContent from '../content/booking.json';
import { BookingProgressBar } from './booking/BookingProgressBar';
import { BookingStep1 } from './booking/BookingStep1';
import { BookingStep2 } from './booking/BookingStep2';
import { BookingStep3 } from './booking/BookingStep3';
import { BookingSuccess } from './booking/BookingSuccess';

interface TourBookingModalProps {
  translations: Translations;
  tours: Tour[];
  isOpen: boolean;
  onClose: () => void;
  initialTourId?: string;
}

interface BookingFormData {
  tourId: string;
  date: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  specialRequirements: string;
}

const STEP_LABELS = [
  'Select Tour & Date',
  'Your Details',
  'Review & Confirm',
];

const bookingJson = bookingContent as any;

export default function TourBookingModal({
  translations,
  tours,
  isOpen,
  onClose,
  initialTourId,
}: TourBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    tourId: initialTourId || tours[0].id,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    guests: 2,
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    specialRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedTour = tours.find((t) => t.id === formData.tourId) || tours[0];
  const totalPrice = selectedTour.pricing.smallGroup.adult * formData.guests;

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setStep(3);
      }, 1800);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const resetBooking = () => {
    setStep(1);
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({
      tourId: tours[0].id,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      guests: 2,
      fullName: '',
      email: '',
      phone: '',
      pickupLocation: '',
      specialRequirements: '',
    });
    onClose();
  };

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="booking-widget-container"
        className="bg-linen-white text-teal rounded-3xl w-full max-w-lg shadow-2xl border border-teal/10 overflow-hidden relative"
      >
        <div className="shema-border" />

        <button
          id="booking-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-teal/40 hover:text-coffee-red p-1.5 rounded-full hover:bg-sandstone transition-colors focus:outline-none"
        >
          ✕
        </button>

        <div className="px-6 pt-6 pb-4 border-b border-teal/10">
          <h3 className="text-xl font-serif font-semibold text-coffee-red flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <span>{bookingJson.bookingFlow.step1.title}</span>
          </h3>
          <p className="text-xs text-teal/60 font-sans mt-1">Select your tour, date, and number of guests</p>
        </div>

        <BookingProgressBar step={step} stepLabels={STEP_LABELS} />

        <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto">
          {isSuccess ? (
            <BookingSuccess
              selectedTour={selectedTour}
              formData={formData}
              totalPrice={totalPrice}
              resetBooking={resetBooking}
              translations={translations}
            />
          ) : step === 1 ? (
            <BookingStep1
              tours={tours}
              formData={formData}
              onChange={handleInputChange}
              translations={translations}
            />
          ) : step === 2 ? (
            <BookingStep2
              formData={formData}
              onChange={handleInputChange}
              translations={translations}
            />
          ) : (
            <BookingStep3
              tour={selectedTour}
              formData={formData}
              totalPrice={totalPrice}
              translations={translations}
            />
          )}
        </div>

        {!isSuccess && (
          <div className="px-6 py-4 bg-sandstone border-t border-teal/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-teal/50 tracking-wider">
                Estimated Total
              </span>
              <p className="text-lg font-mono font-bold text-coffee-red">
                ${totalPrice} USD
              </p>
            </div>

            <div className="flex space-x-3">
              {(step === 2 || step === 3) && (
                <button
                  id="booking-back-btn"
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-linen-white text-xs uppercase font-mono font-bold tracking-wider transition-colors active:scale-95"
                >
                  Back
                </button>
              )}

              <button
                id="booking-submit-btn"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-full bg-coffee-red text-linen-white hover:bg-coffee-red/90 text-xs uppercase font-mono font-bold tracking-wider transition-all duration-300 shadow active:scale-95 flex items-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 animate-spin">⟳</span>
                    <span>Verifying...</span>
                  </>
                ) : step === 3 ? (
                  <span>Confirm & Pay</span>
                ) : (
                  <span>Next</span>
                )}
              </button>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="px-6 py-4 bg-sandstone border-t border-teal/10 flex justify-center">
            <button
              id="booking-finish-btn"
              onClick={resetBooking}
              className="px-8 py-2.5 rounded-full bg-teal text-linen-white hover:bg-teal/90 text-xs uppercase font-mono font-bold tracking-wider transition-all duration-300 shadow active:scale-95"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}