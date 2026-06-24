/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, Users, Check, Sparkles, AlertCircle, ShoppingBag, Loader2 } from 'lucide-react';
import { Language, Translations, ExperiencePackage } from '../types';

interface BookingWidgetProps {
  currentLang: Language;
  translations: Translations;
  packages: ExperiencePackage[];
  isOpen: boolean;
  onClose: () => void;
  initialPkgId?: string;
}

export default function BookingWidget({
  currentLang,
  translations,
  packages,
  isOpen,
  onClose,
  initialPkgId,
}: BookingWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0].id);

  useEffect(() => {
    if (isOpen && initialPkgId) {
      setSelectedPkgId(initialPkgId);
    }
  }, [isOpen, initialPkgId]);
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
        {/* Colorful Ethiopian Pattern Banner top */}
        <div className="shema-border" />

        {/* Close Button */}
        <button
          id="booking-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-teal/40 hover:text-coffee-red p-1.5 rounded-full hover:bg-sandstone transition-colors focus:outline-none"
        >
          ✕
        </button>

        {/* Widget Header */}
        <div className="px-6 pt-6 pb-4 border-b border-teal/10">
          <h3 className="text-xl font-serif font-semibold text-coffee-red flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <span>
              {currentLang === 'en' ? 'Book Your Cultural Feast' : currentLang === 'fr' ? 'Réservez votre festin culturel' : 'የባህል ጉዞዎን ያስይዙ'}
            </span>
          </h3>
          <p className="text-xs text-teal/60 font-sans mt-1">
            {currentLang === 'en'
              ? 'Private customized experience with certified Addis local hosts.'
              : currentLang === 'fr'
                ? 'Expérience privée personnalisée avec des hôtes locaux certifiés d\'Addis.'
                : 'ከአዲስ አበባ ከተረጋገጡ የአካባቢው አስተናጋጆች ጋር የግል ልምድ።'}
          </p>
        </div>

        {/* 3-Step Progress indicator themed as coffee ceremony rounds */}
        <div className="px-6 py-3 bg-sandstone/60 flex items-center justify-between border-b border-teal/5">
          {/* Step 1: Abol */}
          <div className="flex items-center space-x-1.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                step >= 1 ? 'bg-coffee-red text-linen-white' : 'bg-teal/10 text-teal/40'
              }`}
            >
              {step > 1 ? <Check className="w-3 h-3" /> : '1'}
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider ${
                step === 1 ? 'text-coffee-red font-bold' : 'text-teal/50'
              }`}
            >
              {translations.stepAbol.split(' ')[0]}
            </span>
          </div>

          {/* Divider */}
          <div className="flex-1 h-0.5 mx-2 bg-teal/10" />

          {/* Step 2: Tona */}
          <div className="flex items-center space-x-1.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                step >= 2 ? 'bg-gold text-linen-white' : 'bg-teal/10 text-teal/40'
              }`}
            >
              {step > 2 ? <Check className="w-3 h-3" /> : '2'}
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider ${
                step === 2 ? 'text-gold font-bold' : 'text-teal/50'
              }`}
            >
              {translations.stepTona.split(' ')[0]}
            </span>
          </div>

          {/* Divider */}
          <div className="flex-1 h-0.5 mx-2 bg-teal/10" />

          {/* Step 3: Bereka */}
          <div className="flex items-center space-x-1.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                step >= 3 ? 'bg-teal text-linen-white' : 'bg-teal/10 text-teal/40'
              }`}
            >
              3
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider ${
                step === 3 ? 'text-teal font-bold' : 'text-teal/50'
              }`}
            >
              {translations.stepBereka.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Form Content Scrollable */}
        <div className="p-6 space-y-6 max-h-[380px] overflow-y-auto">
          {isSuccess ? (
            /* Success State screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif text-teal font-bold">
                {currentLang === 'en' ? 'Aroma Awaits You!' : currentLang === 'fr' ? "L'arôme vous attend !" : 'ቡናው ፈላ!'}
              </h4>
              <p className="text-sm text-teal/80 leading-relaxed max-w-sm mx-auto">
                {currentLang === 'en'
                  ? `Your private session for "${selectedPkg.nameEn}" has been successfully requested for ${bookingDate}. Mimi will message you shortly to coordinate arrival details!`
                  : currentLang === 'fr'
                    ? `Votre session privée pour « ${selectedPkg.nameFr} » a été demandée avec succès pour le ${bookingDate}. Mimi vous contactera sous peu pour coordonner les détails d'arrivée !`
                    : `የእርስዎ የግል ልምድ ለ "${selectedPkg.nameAm}" በተሳካ ሁኔታ ለ ${bookingDate} ተመዝግቧል። ዝርዝሩን ለማስተባበር አስተናጋጅዎ Mimi በአጭር ጊዜ ውስጥ ያነጋግርዎታል!`}
              </p>

              <div className="bg-sandstone/80 rounded-2xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
                <p className="text-xs font-mono text-teal/60 uppercase">Booking Details</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p>
                    <strong>Experience:</strong> {currentLang === 'en' ? selectedPkg.nameEn : currentLang === 'fr' ? selectedPkg.nameFr : selectedPkg.nameAm}
                  </p>
                  <p>
                    <strong>Date:</strong> {bookingDate}
                  </p>
                  <p>
                    <strong>Party Size:</strong> {guestCount} {currentLang === 'en' ? 'guests' : currentLang === 'fr' ? 'invités' : 'እንግዶች'}
                  </p>
                  <p>
                    <strong>Dietary:</strong>{' '}
                    {Object.entries(dietary)
                      .filter(([_, v]) => v)
                      .map(([k]) => k.toUpperCase())
                      .join(', ') || 'Standard Menu'}
                  </p>
                  <div className="border-t border-teal/10 pt-1.5 mt-1.5 flex justify-between font-bold text-sm">
                    <span>Total Paid:</span>
                    <span className="text-coffee-red">${totalPrice} USD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-xs text-gold font-mono uppercase font-bold bg-gold/10 py-2 px-3 rounded-full w-fit mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulated Secure Checkout Successful</span>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1 Form */
            <div className="space-y-4">
              {/* Select Package */}
              <div className="space-y-1.5">
                <label htmlFor="booking-package-select" className="text-xs font-mono uppercase text-teal/60 tracking-wider">
                  {currentLang === 'en' ? 'Select Experience' : currentLang === 'fr' ? "Sélectionner l'expérience" : 'ልምድ ይምረጡ'}
                </label>
                <select
                  id="booking-package-select"
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red focus:ring-1 focus:ring-coffee-red"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.emoji} {currentLang === 'en' ? pkg.nameEn : currentLang === 'fr' ? pkg.nameFr : pkg.nameAm} (${pkg.price}/{currentLang === 'en' ? 'guest' : currentLang === 'fr' ? 'invité' : 'እንግዳ'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Datepicker */}
              <div className="space-y-1.5">
                <label htmlFor="booking-date-picker" className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-coffee-red" />
                  <span>{currentLang === 'en' ? 'Choose Date' : currentLang === 'fr' ? 'Choisir la date' : 'ቀን ይምረጡ'}</span>
                </label>
                <input
                  id="booking-date-picker"
                  type="date"
                  value={bookingDate}
                  min="2026-06-24"
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-sandstone border border-teal/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-coffee-red"
                />
              </div>

              {/* Quick Info Box */}
              <div className="bg-sandstone/60 rounded-2xl p-4 flex items-start space-x-3 text-xs border border-teal/10">
                <AlertCircle className="w-4 h-4 text-coffee-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-teal">
                    {currentLang === 'en' ? 'No Instant Charged' : currentLang === 'fr' ? 'Aucun paiement immédiat' : 'ያለ ምንም ቅድመ ክፍያ'}
                  </p>
                  <p className="text-teal/70 leading-relaxed mt-0.5">
                    {currentLang === 'en'
                      ? 'Payment is completely local and flexible. This simulates booking validation for confirmation with Mimi.'
                      : currentLang === 'fr'
                        ? 'Le paiement est entièrement local et flexible. Cela simule la validation de la réservation pour confirmation avec Mimi.'
                        : 'ክፍያ ሙሉ በሙሉ በአካል እና ተለዋዋጭ ነው። ይህ ለ Mimi ማረጋገጫ ምዝገባን ያመቻቻል።'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2 Form */
            <div className="space-y-4">
              {/* Guest Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-teal/60 tracking-wider flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  <span>{currentLang === 'en' ? 'Number of Guests' : currentLang === 'fr' ? "Nombre d'invités" : 'የእንግዶች ብዛት'}</span>
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

              {/* Dietary Preferences checkboxes */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase text-teal/60 tracking-wider">
                  {translations.dietaryFilterLabel}
                </label>

                <div className="space-y-2">
                  {/* Vegan */}
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
                        {currentLang === 'en'
                          ? 'Traditional 100% plant-based Ethiopian Lentils/Veggie platter (Fasting bayenetu).'
                          : currentLang === 'fr'
                            ? 'Plat traditionnel éthiopien 100 % végétal à base de lentilles et légumes (Bayenetu de jeûne).'
                            : 'ባህላዊ 100% ከዕፅዋት የተቀመመ የምስር እና የአትክልት ዝግጅት (የጾም ባየነቱ)።'}
                      </p>
                    </div>
                  </label>

                  {/* Gluten-Free */}
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
                        {currentLang === 'en'
                          ? 'Host ensures 100% pure premium Teff Injera (no barley or wheat flour blend).'
                          : currentLang === 'fr'
                            ? "L'hôte garantit une Injera de Teff 100 % pure et de qualité supérieure (sans mélange d'orge ou de blé)."
                            : 'አስተናጋጁ 100% ንፁህ የጤፍ እንጀራ ያዘጋጃል (ገብስ ወይም ስንዴ ያልተቀላቀለበት)።'}
                      </p>
                    </div>
                  </label>

                  {/* Halal */}
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
                        {currentLang === 'en'
                          ? 'All meat dishes prepared according to traditional Halal standards.'
                          : currentLang === 'fr'
                            ? 'Tous les plats de viande sont préparés selon les normes traditionnelles Halal.'
                            : 'ሁሉም የስጋ ምግቦች በባህላዊው የሃላል ስርዓት መሰረት ይዘጋጃሉ።'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions and price summary */}
        {!isSuccess && (
          <div className="px-6 py-4 bg-sandstone border-t border-teal/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-teal/50 tracking-wider">
                {currentLang === 'en' ? 'Estimated Total' : currentLang === 'fr' ? 'Total estimé' : 'የታሰበው ድምር'}
              </span>
              <p className="text-lg font-mono font-bold text-coffee-red">${totalPrice} USD</p>
            </div>

            <div className="flex space-x-3">
              {step === 2 && (
                <button
                  id="booking-back-btn"
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-full border border-teal/20 text-teal hover:bg-linen-white text-xs uppercase font-mono font-bold tracking-wider transition-colors active:scale-95"
                >
                  {currentLang === 'en' ? 'Back' : currentLang === 'fr' ? 'Retour' : 'ተመለስ'}
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
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{currentLang === 'en' ? 'Verifying...' : currentLang === 'fr' ? 'Vérification...' : 'በማጣራት ላይ...'}</span>
                  </>
                ) : (
                  <span>
                    {step === 1
                      ? currentLang === 'en'
                        ? 'Next'
                        : currentLang === 'fr'
                          ? 'Suivant'
                          : 'ቀጥል'
                      : currentLang === 'en'
                        ? 'Book Now'
                        : currentLang === 'fr'
                          ? 'Réserver'
                          : 'ቦታ ያስይዙ'}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Success bottom actions */}
        {isSuccess && (
          <div className="px-6 py-4 bg-sandstone border-t border-teal/10 flex justify-center">
            <button
              id="booking-finish-btn"
              onClick={resetBooking}
              className="px-8 py-2.5 rounded-full bg-teal text-linen-white hover:bg-teal/90 text-xs uppercase font-mono font-bold tracking-wider transition-all duration-300 shadow active:scale-95"
            >
              {currentLang === 'en' ? 'Done & Close' : currentLang === 'fr' ? 'Terminer et fermer' : 'ጨርስ እና ዝጋ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
