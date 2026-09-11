import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle,
  ChevronRight, Phone, MessageCircle, Star, Shield,
  ArrowLeft, Loader2, Minus, Plus,
} from 'lucide-react';
import bookingContent from '../content/booking.json';
import toursData from '../content/tours.json';
import { ToursData } from '../types';
import type { BookingFormData, BookingStep } from '../types/booking';
import { STEP_LABELS, STEP_ICONS } from '../constants/booking';
import { BookingStep1 } from '../components/booking/BookingStep1';
import { BookingStep2 } from '../components/booking/BookingStep2';
import { BookingStep3 } from '../components/booking/BookingStep3';
import { BookingSuccess } from '../components/booking/BookingSuccess';

const bookingJson = bookingContent as {
  page: {
    hero: { headline: string; subheadline: string; trustSignals: { rating: string; reviewCount: string; badges: string[] } };
    howItWorks: { headline: string; steps: { title: string; description: string; icon: string }[] };
    sidebar: { helpHeadline: string; helpText: string; whatsappCta: string; callCta: string; emailCta: string };
    included: { headline: string; items: string[] };
    policies: { headline: string };
  };
  policies: { cancellation: { headline: string; points: string[] }; pricing: { headline: string; points: string[] }; booking: { headline: string; points: string[] } };
};

export const BookPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typedToursData = toursData as ToursData;
  const tours = typedToursData.tours;

  const [step, setStep] = useState<BookingStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openPolicy, setOpenPolicy] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [policiesAgreed, setPoliciesAgreed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    const card = document.getElementById('booking-form-card');
    if (card) { card.setAttribute('tabindex', '-1'); card.focus(); }
  }, [step]);

  const initialTourId = searchParams.get('tour') || tours[0]?.id || '';

  const [formData, setFormData] = useState<BookingFormData>(() => ({
    tourId: initialTourId,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2,
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    pickupLocation: '',
    specialRequirements: '',
    website_url: '',
  }));

  useEffect(() => {
    const tourId = searchParams.get('tour');
    if (tourId) setFormData((prev) => ({ ...prev, tourId }));
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      const viewport = window.visualViewport;
      if (viewport) {
        const form = document.getElementById('booking-form-card');
        if (form) {
          form.style.maxHeight = `${viewport.height - 32}px`;
          form.style.marginTop = `${Math.max(0, viewport.offsetTop)}px`;
        }
      }
    };
    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize();
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  const selectedTour = useMemo(
    () => tours.find((t) => t.id === formData.tourId) || tours[0],
    [tours, formData.tourId]
  );

  const totalPrice = useMemo(
    () => selectedTour ? selectedTour.pricing.smallGroup.adult * formData.guests : 0,
    [selectedTour, formData.guests]
  );

  if (!selectedTour) {
    return (
      <div className="min-h-screen bg-linen-white flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <p className="text-lg font-serif text-teal">No tours available at the moment.</p>
          <p className="text-sm text-teal/60">Please check back later or contact us for assistance.</p>
          <a href="/contact/" className="inline-block px-6 py-3 rounded-full bg-coffee-red text-linen-white text-xs uppercase font-bold tracking-wider">
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  const handleInputChange = useCallback((field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateStep = useCallback((stepToValidate: BookingStep): boolean => {
    if (stepToValidate === 1) return !!formData.tourId && !!formData.date && formData.guests >= 1;
    if (stepToValidate === 2) {
      return !!formData.fullName.trim()
        && !!formData.email.trim()
        && formData.email.includes('@')
        && !!formData.phone.trim()
        && !!formData.pickupLocation.trim();
    }
    if (stepToValidate === 3) return policiesAgreed;
    return true;
  }, [formData, policiesAgreed]);

  const handleNext = useCallback(() => {
    if (!validateStep(step)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step === 2) {
      setIsSubmitting(true);
      timeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setStep(3);
      }, 1800);
    } else {
      setStep((prev) => (prev + 1) as BookingStep);
    }
  }, [step, validateStep]);

  const handleBack = useCallback(() => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
    setShowErrors(false);
  }, [step]);

  const handleEdit = useCallback((targetStep: 1 | 2) => {
    setStep(targetStep);
    setShowErrors(false);
  }, []);

  const p = bookingJson.page;

  const handleGuestChange = useCallback((delta: number) => {
    const newGuests = Math.max(1, Math.min(10, formData.guests + delta));
    handleInputChange('guests', newGuests);
  }, [formData.guests, handleInputChange]);

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-12 sm:py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-teal tracking-tight mb-4">
            {p.hero.headline}
          </h1>
          <p className="text-base sm:text-lg text-teal/70 max-w-2xl mx-auto mb-6">
            {p.hero.subheadline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-gold/10 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-sm font-bold text-teal">{p.hero.trustSignals.rating}</span>
              <span className="text-xs text-teal/60">({p.hero.trustSignals.reviewCount} reviews)</span>
            </div>
            {p.hero.trustSignals.badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-teal/5 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-mono uppercase tracking-wider text-teal/80">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                {STEP_LABELS.map((label, idx) => {
                  const StepIcon = STEP_ICONS[idx];
                  const stepNum = (idx + 1) as BookingStep;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum || isSuccess;
                  return (
                    <div key={idx} className="flex items-center gap-2 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCompleted ? 'bg-gold text-teal' : isActive ? 'bg-coffee-red text-linen-white' : 'bg-teal/10 text-teal/40'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs font-mono uppercase tracking-wider hidden sm:block ${
                        isActive ? 'text-coffee-red font-bold' : isCompleted ? 'text-gold font-bold' : 'text-teal/40'
                      }`}>{label}</span>
                      {idx < 2 && <div className={`h-px flex-1 ${isCompleted ? 'bg-gold' : 'bg-teal/10'}`} />}
                    </div>
                  );
                })}
              </div>

              <div id="booking-form-card" className="bg-sandstone/30 rounded-2xl border border-teal/10 p-6 sm:p-8 overflow-y-auto">
                {isSuccess ? (
                  <BookingSuccess
                    selectedTour={selectedTour}
                    formData={{
                      tourId: formData.tourId,
                      date: formData.date,
                      guests: formData.guests,
                      fullName: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      whatsapp: formData.whatsapp,
                      pickupLocation: formData.pickupLocation,
                      specialRequirements: formData.specialRequirements,
                    }}
                    totalPrice={totalPrice}
                  />
                ) : step === 1 ? (
                  <BookingStep1
                    tours={tours}
                    formData={{ tourId: formData.tourId, date: formData.date, guests: formData.guests, website_url: formData.website_url }}
                    onChange={handleInputChange}
                    showErrors={showErrors}
                  />
                ) : step === 2 ? (
                  <BookingStep2
                    formData={{
                      fullName: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      whatsapp: formData.whatsapp,
                      pickupLocation: formData.pickupLocation,
                      specialRequirements: formData.specialRequirements,
                    }}
                    onChange={handleInputChange}
                    showErrors={showErrors}
                  />
                ) : (
                  <BookingStep3
                    tour={selectedTour}
                    formData={{
                      tourId: formData.tourId,
                      date: formData.date,
                      guests: formData.guests,
                      fullName: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      whatsapp: formData.whatsapp,
                      pickupLocation: formData.pickupLocation,
                      specialRequirements: formData.specialRequirements,
                    }}
                    totalPrice={totalPrice}
                    onEdit={handleEdit}
                    policiesAgreed={policiesAgreed}
                    onPoliciesChange={setPoliciesAgreed}
                  />
                )}
              </div>

              {!isSuccess && (
                <div className="flex items-center justify-between mt-6">
                  {step > 1 ? (
                    <button onClick={handleBack} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal/20 text-teal text-xs uppercase font-mono font-bold tracking-wider hover:bg-sandstone transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : <div />}
                  <button onClick={handleNext} disabled={isSubmitting || (step === 3 && !policiesAgreed)}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-coffee-red text-linen-white text-xs uppercase font-mono font-bold tracking-wider hover:bg-coffee-red/90 transition-all shadow-md disabled:opacity-50 active:scale-95">
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> <span>Processing...</span></>
                    ) : step === 3 ? (
                      <span>Confirm & Book</span>
                    ) : (
                      <span>Next Step</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              {selectedTour && (
                <div className="bg-sandstone/30 rounded-2xl border border-teal/10 overflow-hidden">
                  <img src={selectedTour.images[0]} alt={selectedTour.name}
                    loading="lazy" className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{selectedTour.tourType}</span>
                      <span className="text-xs text-teal/60">{selectedTour.duration}</span>
                    </div>
                    <h3 className="font-serif font-bold text-teal text-lg">{selectedTour.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-mono font-bold text-coffee-red">${selectedTour.pricing.smallGroup.adult}</span>
                      <span className="text-xs text-teal/60">/ person × {formData.guests} = <strong className="text-coffee-red">${totalPrice}</strong></span>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <button onClick={() => handleGuestChange(-1)}
                        className="w-9 h-9 rounded-lg hover:bg-teal/5 flex items-center justify-center border border-teal/10 active:scale-95">
                        <Minus className="w-4 h-4 text-teal" />
                      </button>
                      <span className="font-mono font-bold text-lg w-8 text-center text-teal">{formData.guests}</span>
                      <button onClick={() => handleGuestChange(1)}
                        className="w-9 h-9 rounded-lg hover:bg-teal/5 flex items-center justify-center border border-teal/10 active:scale-95">
                        <Plus className="w-4 h-4 text-teal" />
                      </button>
                      <span className="text-xs text-teal/60">guests</span>
                    </div>
                    <div className="border-t border-teal/10 pt-3">
                      <p className="text-xs font-mono uppercase text-teal/60 mb-2">{p.included.headline}</p>
                      <ul className="space-y-1.5">
                        {p.included.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-teal/80">
                            <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-teal rounded-2xl p-5 text-linen-white space-y-3">
                <h4 className="font-serif font-bold">{p.sidebar.helpHeadline}</h4>
                <p className="text-xs text-linen-white/70">{p.sidebar.helpText}</p>
                <div className="space-y-2">
                  <a href="https://wa.me/251911209882" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold uppercase tracking-wider transition-colors">
                    <MessageCircle className="w-4 h-4" /> {p.sidebar.whatsappCta}
                  </a>
                  <a href="tel:+251911209882"
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-coffee-red hover:bg-coffee-red/90 text-xs font-bold uppercase tracking-wider transition-colors">
                    <Phone className="w-4 h-4" /> {p.sidebar.callCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-10">{p.howItWorks.headline}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {p.howItWorks.steps.map((s, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-coffee-red/10 text-coffee-red flex items-center justify-center mx-auto">
                  <span className="font-mono font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="font-serif font-bold text-teal">{s.title}</h3>
                <p className="text-sm text-teal/70">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-linen-white border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{p.policies.headline}</h2>
          <div className="space-y-3">
            {Object.entries(bookingJson.policies).map(([key, policy]) => (
              <details key={key} className="bg-sandstone/30 rounded-xl border border-teal/10 overflow-hidden"
                open={openPolicy === key} onToggle={(e) => setOpenPolicy(e.currentTarget.open ? key : null)}>
                <summary className="flex items-center justify-between cursor-pointer p-5 font-serif font-bold text-teal hover:text-coffee-red transition-colors">
                  {policy.headline}
                  <ChevronRight className={`w-5 h-5 text-gold transition-transform duration-300 ${openPolicy === key ? 'rotate-90' : ''}`} />
                </summary>
                <div className="px-5 pb-5 space-y-2 animate-fade-in">
                  {policy.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-teal/80">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> {point}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;
