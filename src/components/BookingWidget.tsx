/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Translations, ExperiencePackage } from '../types';
import bookingContent from '../content/booking.json';
import { BookingProgressBar } from './booking/BookingProgressBar';
import { BookingStep1 } from './booking/BookingStep1';
import { BookingStep2 } from './booking/BookingStep2';
import { BookingSuccess } from './booking/BookingSuccess';

interface BookingWidgetProps {
  translations: Translations;
  packages: ExperiencePackage[];
  isOpen: boolean;
  onClose: () => void;
  initialPkgId?: string;
}

export default function BookingWidget({
  translations,
  packages,
  isOpen,
  onClose,
  initialPkgId,
}: BookingWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPkgId || packages[0].id);
  const [bookingDate, setBookingDate] = useState<string>('2026-06-25');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState({
    vegan: false,
    glutenFree: false,
    halal: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];
  const totalPrice = selectedPkg.price * guestCount;

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
  };

  const resetBooking = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
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
            <span>{bookingContent.title}</span>
          </h3>
          <p className="text-xs text-teal/60 font-sans mt-1">
            {bookingContent.subtitle}
          </p>
        </div>

        <BookingProgressBar step={step} translations={translations} />

        <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto">
          {isSuccess ? (
            <BookingSuccess
              selectedPkg={selectedPkg}
              bookingDate={bookingDate}
              guestCount={guestCount}
              dietary={dietary}
              totalPrice={totalPrice}
              resetBooking={resetBooking}
              translations={translations}
            />
          ) : step === 1 ? (
            <BookingStep1
              packages={packages}
              selectedPkgId={selectedPkgId}
              setSelectedPkgId={setSelectedPkgId}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              translations={translations}
            />
          ) : (
            <BookingStep2
              guestCount={guestCount}
              setGuestCount={setGuestCount}
              dietary={dietary}
              setDietary={setDietary}
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
              <p className="text-lg font-mono font-bold text-coffee-red">${selectedPkg.price * guestCount} USD</p>
            </div>

            <div className="flex space-x-3">
              {step === 2 && (
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
                ) : (
                  <span>{step === 1 ? 'Next' : 'Book Now'}</span>
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