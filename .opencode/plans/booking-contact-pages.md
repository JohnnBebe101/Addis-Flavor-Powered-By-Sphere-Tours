# Booking & Contact Pages — Detailed Actionable Plan

## File Change Summary

| # | File | Action | Est. Lines Changed |
|---|------|--------|-------------------|
| 1 | `src/pages/BookPage.tsx` | **Create** | ~320 new |
| 2 | `src/pages/ContactPage.tsx` | **Rewrite** | ~280 new (replace 264) |
| 3 | `src/content/booking.json` | **Edit** | +30 lines (append `page` section) |
| 4 | `src/content/contact.json` | **Edit** | +40 lines (append `page` section) |
| 5 | `src/router/routes.tsx` | **Edit** | +5 lines (add `/book/` route) |
| 6 | `src/router/Layout.tsx` | **Edit** | ~20 lines changed |
| 7 | `src/components/Navbar.tsx` | **Edit** | ~12 lines changed |
| 8 | `src/pages/TourDetailPage.tsx` | **Edit** | ~10 lines changed |
| 9 | `src/components/home/StickyBookingBar.tsx` | **Edit** | ~8 lines changed |

---

## Step 1: Add `page` section to `booking.json`

**File:** `src/content/booking.json`  
**After line 159** (before the closing `}`) — insert new `page` section.

```json
// AFTER the "metadata" object (line 156-159), add:
"page": {
  "hero": {
    "headline": "Book Your Addis Ababa Adventure",
    "subheadline": "Secure your spot with our easy 3-step booking. No instant charge — pay your guide directly on tour day.",
    "trustSignals": {
      "rating": "4.9",
      "reviewCount": "500+",
      "badges": ["Free Cancellation", "Licensed Local Operator", "No Hidden Fees"]
    }
  },
  "howItWorks": {
    "headline": "How It Works",
    "steps": [
      { "title": "Choose Your Tour", "description": "Browse our curated tours and select your perfect experience.", "icon": "Search" },
      { "title": "Enter Your Details", "description": "Pick your date, number of guests, and contact information.", "icon": "User" },
      { "title": "Confirmed!", "description": "Your guide contacts you within 2 hours with pickup details.", "icon": "CheckCircle" }
    ]
  },
  "sidebar": {
    "helpHeadline": "Need Help Booking?",
    "helpText": "Our team is available 24/7 on WhatsApp to help you choose the perfect tour.",
    "whatsappCta": "Chat on WhatsApp",
    "callCta": "Call Us",
    "emailCta": "Email Us"
  },
  "included": {
    "headline": "What's Included",
    "items": [
      "Licensed English-speaking local guide",
      "Private vehicle with AC",
      "Hotel pickup & drop-off (central Addis)",
      "All entrance fees",
      "Bottled water"
    ]
  },
  "policies": {
    "headline": "Booking Policies"
  }
}
```

---

## Step 2: Add `page` section to `contact.json`

**File:** `src/content/contact.json`  
**After line 165** (before closing `}`) — insert new `page` section.

```json
// AFTER the "metadata" object, add:
"page": {
  "hero": {
    "headline": "Get in Touch",
    "subheadline": "Have questions about our tours? Want to customize your itinerary? We're here to help — respond within 24 hours.",
    "responseTime": "Average response time: 2 hours on WhatsApp"
  },
  "quickContact": {
    "headline": "Quick Contact",
    "channels": [
      { "type": "whatsapp", "label": "WhatsApp Us", "responseTime": "Instant response", "description": "Chat with us directly for instant answers", "primary": true },
      { "type": "phone", "label": "Call Us", "responseTime": "Office hours", "description": "Speak with our team directly" },
      { "type": "email", "label": "Email Us", "responseTime": "Within 24 hours", "description": "Detailed inquiries and written follow-up" }
    ]
  },
  "socialProof": {
    "rating": "4.9",
    "reviewCount": "500+",
    "source": "TripAdvisor",
    "badge": "Travelers' Choice 2026"
  },
  "form": {
    "headline": "Send Us a Message",
    "subheadline": "Fill out the form below and we'll get back to you within 24 hours.",
    "successTitle": "Message Sent!",
    "successNext": "What happens next?",
    "successSteps": [
      "Our team reviews your message within 2 hours",
      "You'll receive a personalized response within 24 hours",
      "For urgent inquiries, WhatsApp us directly"
    ]
  }
}
```

---

## Step 3: Add `/book/` route

**File:** `src/router/routes.tsx`  
**After line 67** (the `contact/` route block), insert the booking route.

```tsx
// AFTER the contact route (lines 64-67):
      {
        path: 'contact/',
        lazy: () => import('../pages/ContactPage').then((m) => ({ Component: m.ContactPage })),
      },

// INSERT:
      {
        path: 'book/',
        lazy: () => import('../pages/BookPage').then((m) => ({ Component: m.BookPage })),
      },
```

---

## Step 4: Rewrite Layout.tsx

**File:** `src/router/Layout.tsx`  
Replace lines 1–74 entirely. Key changes:
- Import `useNavigate` instead of `useSearchParams` for booking navigation
- Remove modal open/close state for booking — navigate to `/book/` instead
- Keep contact modal for quick access from navbar
- Add `?book=<id>` → navigate to `/book/?tour=<id>` redirect

```tsx
// BEFORE (full file):
import { Outlet, ScrollRestoration, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotificationBar } from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import { HeroBanner } from '../components/home/HeroBanner';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import TourBookingModal from '../components/TourBookingModal';
import ContactModal from '../components/ContactModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';
import { Tour } from '../types';
import toursData from '../content/tours.json';
import homeData from '../content/home.json';

export const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const bookTourId = searchParams.get('book');
    if (bookTourId) {
      setIsBookingOpen(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('book');
      setSearchParams(newParams, { replace: true });
    }
  }, [search, searchParams, setSearchParams]);

  const handleOpenBooking = () => setIsBookingOpen(true);

  return (
    <>
      <NotificationBar />
      <Navbar
        translations={TRANSLATIONS}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
      />
      {pathname === '/' && (
        <HeroBanner
          slides={homeData.hero.slides}
          tours={toursData.tours as Tour[]}
          handleOpenBooking={handleOpenBooking}
        />
      )}
      <main id="main-content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <ScrollRestoration />
      <Footer NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS} />
      <StickyBookingBar
        translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
        handleOpenBooking={handleOpenBooking}
      />
      <TourBookingModal
        translations={TRANSLATIONS}
        tours={toursData.tours as Tour[]}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTourId={undefined}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;

// AFTER:
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotificationBar } from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import { HeroBanner } from '../components/home/HeroBanner';
import { Footer } from '../components/home/Footer';
import { StickyBookingBar } from '../components/home/StickyBookingBar';
import ContactModal from '../components/ContactModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TRANSLATIONS, NEIGHBORHOOD_DESTINATIONS } from '../data';
import { Tour } from '../types';
import toursData from '../content/tours.json';
import homeData from '../content/home.json';

export const Layout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // Redirect legacy ?book=<id> to /book/?tour=<id>
  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const bookTourId = urlParams.get('book');
    if (bookTourId) {
      navigate(`/book/?tour=${bookTourId}`, { replace: true });
    }
  }, [search, navigate]);

  const handleOpenBooking = () => navigate('/book/');

  return (
    <>
      <NotificationBar />
      <Navbar
        translations={TRANSLATIONS}
        onBookClick={handleOpenBooking}
        onContactClick={() => setIsContactOpen(true)}
      />
      {pathname === '/' && (
        <HeroBanner
          slides={homeData.hero.slides}
          tours={toursData.tours as Tour[]}
          handleOpenBooking={handleOpenBooking}
        />
      )}
      <main id="main-content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <ScrollRestoration />
      <Footer NEIGHBORHOOD_DESTINATIONS={NEIGHBORHOOD_DESTINATIONS} />
      <StickyBookingBar
        translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
        handleOpenBooking={handleOpenBooking}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
```

**Key changes:**
- Removed `TourBookingModal` import and rendering
- Removed `useSearchParams` — replaced with `useNavigate`
- `handleOpenBooking` now calls `navigate('/book/')` instead of `setIsBookingOpen(true)`
- `?book=<id>` useEffect now navigates to `/book/?tour=<id>` instead of opening modal
- Removed `isBookingOpen` state entirely
- Contact modal preserved for quick navbar access

---

## Step 5: Update Navbar.tsx

**File:** `src/components/Navbar.tsx`

### Step 5.1 — Change `handleBookClick` to navigate

**Lines 102-105** — Replace `onBookClick()` call with `navigate('/book/')`.

```tsx
// BEFORE (lines 102-105):
  const handleBookClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onBookClick();
  };

// AFTER:
  const handleBookClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    navigate('/book/');
  };
```

### Step 5.2 — Change `handleMobileBookClick` to navigate

**Lines 107-110** — Replace `onBookClick()` call with `navigate('/book/')`.

```tsx
// BEFORE (lines 107-110):
  const handleMobileBookClick = () => {
    setIsMobileMenuOpen(false);
    onBookClick();
  };

// AFTER:
  const handleMobileBookClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/book/');
  };
```

### Step 5.3 — Change desktop "BOOK A TOUR" link href

**Lines 179-181** — Change `href="/tours/"` to `href="/book/"`.

```tsx
// BEFORE (line 179-181):
            <a
              href="/tours/"
              onClick={handleBookClick}

// AFTER:
            <a
              href="/book/"
              onClick={handleBookClick}
```

### Step 5.4 — Change mobile drawer "Contact" button to navigate

**Lines 302-306** — Replace `onContactClick()` with `navigate('/contact/')`.

```tsx
// BEFORE (lines 302-306):
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}

// AFTER:
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/contact/');
                  }}
```

---

## Step 6: Update TourDetailPage.tsx

**File:** `src/pages/TourDetailPage.tsx`

### Step 6.1 — Add `useNavigate` import

**Line 7** — Add `useNavigate` to the react-router-dom import.

```tsx
// BEFORE (line 7):
import { useParams } from 'react-router-dom';

// AFTER:
import { useParams, useNavigate } from 'react-router-dom';
```

### Step 6.2 — Add navigate hook

**After line 14** (after `const { slug } = useParams<...>()`) — add navigate.

```tsx
// BEFORE (line 14):
  const { slug } = useParams<{ slug: string }>();

// AFTER:
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
```

### Step 6.3 — Replace hero "Book Now" button onClick

**Lines 95-104** — Replace the `params.set('book', ...)` logic with `navigate`.

```tsx
// BEFORE (lines 95-104):
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set('book', tour.id);
                window.location.search = params.toString();
              }}
              className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
            >
              Book Now
            </button>

// AFTER:
            <button
              onClick={() => navigate(`/book/?tour=${tour.id}`)}
              className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
            >
              Book Now
            </button>
```

### Step 6.4 — Replace bottom CTA "Book Now" button onClick

**Lines 512-521** — Same replacement.

```tsx
// BEFORE (lines 512-521):
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set('book', tour.id);
                window.location.search = params.toString();
              }}
              className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
            >
              Book Now
            </button>

// AFTER:
            <button
              onClick={() => navigate(`/book/?tour=${tour.id}`)}
              className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
            >
              Book Now
            </button>
```

---

## Step 7: Update StickyBookingBar.tsx

**File:** `src/components/home/StickyBookingBar.tsx`

**Lines 1-34** — Replace entirely. Change from callback prop to using `useNavigate`.

```tsx
// BEFORE (full file):
import React from 'react';

interface StickyBookingBarProps {
  translations: {
    bookNowButton: string;
  };
  handleOpenBooking: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({
  translations,
  handleOpenBooking,
}) => {
  return (
    <div
      id="sticky-mobile-trigger"
      className="fixed bottom-0 left-0 right-0 z-40 bg-sandstone/95 backdrop-blur-md py-3 px-4 border-t border-teal/10 flex items-center justify-between sm:hidden"
    >
      <div>
        <span className="text-[10px] uppercase font-mono text-teal/60">Private Experience</span>
        <p className="text-sm font-bold text-coffee-red">
          $25 - $49 <span className="text-[10px] text-teal/70 font-sans">/ guest</span>
        </p>
      </div>
      <button
        id="sticky-mobile-booking-btn"
        onClick={handleOpenBooking}
        className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs uppercase font-mono font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md animate-pulse active:scale-95 transition-all"
      >
        {translations.bookNowButton}
      </button>
    </div>
  );
};

// AFTER:
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StickyBookingBarProps {
  translations: {
    bookNowButton: string;
  };
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({
  translations,
}) => {
  const navigate = useNavigate();

  return (
    <div
      id="sticky-mobile-trigger"
      className="fixed bottom-0 left-0 right-0 z-40 bg-sandstone/95 backdrop-blur-md py-3 px-4 border-t border-teal/10 flex items-center justify-between sm:hidden"
    >
      <div>
        <span className="text-[10px] uppercase font-mono text-teal/60">Private Experience</span>
        <p className="text-sm font-bold text-coffee-red">
          $25 - $49 <span className="text-[10px] text-teal/70 font-sans">/ guest</span>
        </p>
      </div>
      <button
        id="sticky-mobile-booking-btn"
        onClick={() => navigate('/book/')}
        className="bg-coffee-red hover:bg-coffee-red/90 text-linen-white text-xs uppercase font-mono font-bold tracking-wider px-5 py-2.5 rounded-full shadow-md animate-pulse active:scale-95 transition-all"
      >
        {translations.bookNowButton}
      </button>
    </div>
  );
};
```

### Step 7.1 — Update Layout.tsx StickyBookingBar usage

Since `StickyBookingBar` no longer accepts `handleOpenBooking` prop, update Layout.tsx.

**In Layout.tsx** (already rewritten in Step 4), the StickyBookingBar line is:
```tsx
<StickyBookingBar
  translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
  handleOpenBooking={handleOpenBooking}
/>
```

Change to:
```tsx
<StickyBookingBar
  translations={{ bookNowButton: TRANSLATIONS.bookNowButton }}
/>
```

---

## Step 8: Create BookPage.tsx

**File:** `src/pages/BookPage.tsx`  
**Create new file** — ~320 lines.

```tsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, User, Calendar, Users, MapPin, CheckCircle,
  ChevronRight, Phone, MessageCircle, Mail, Star, Shield,
  Clock, ArrowLeft, Loader2,
} from 'lucide-react';
import bookingContent from '../content/booking.json';
import toursData from '../content/tours.json';
import { ToursData, Tour } from '../types';

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

type BookingStep = 1 | 2 | 3;

const STEP_LABELS = ['Tour & Date', 'Your Details', 'Review & Confirm'];
const STEP_ICONS = [Search, User, CheckCircle];

const bookingJson = bookingContent as unknown as {
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
  const navigate = useNavigate();
  const typedToursData = toursData as unknown as ToursData;
  const tours = typedToursData.tours;

  const [step, setStep] = useState<BookingStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openPolicy, setOpenPolicy] = useState<string | null>(null);

  const initialTourId = searchParams.get('tour') || tours[0]?.id || '';

  const [formData, setFormData] = useState<BookingFormData>(() => ({
    tourId: initialTourId,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2,
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    specialRequirements: '',
  }));

  useEffect(() => {
    const tourId = searchParams.get('tour');
    if (tourId) setFormData((prev) => ({ ...prev, tourId }));
  }, [searchParams]);

  const selectedTour = useMemo(
    () => tours.find((t) => t.id === formData.tourId) || tours[0],
    [tours, formData.tourId]
  );

  const totalPrice = selectedTour ? selectedTour.pricing.smallGroup.adult * formData.guests : 0;

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
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

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const p = bookingJson.page;
  const policies = bookingJson.policies;

  return (
    <div className="min-h-screen bg-linen-white">
      {/* Hero */}
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

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Booking Form — 2/3 width */}
            <div className="lg:col-span-2">
              {/* Progress Bar */}
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

              {/* Step Content */}
              <div className="bg-sandstone/30 rounded-2xl border border-teal/10 p-6 sm:p-8">
                {isSuccess ? (
                  /* Success State */
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-teal">Booking Confirmed!</h3>
                    <p className="text-teal/70 max-w-md mx-auto">
                      Your booking for "{selectedTour.name}" has been received. Your guide will contact you via WhatsApp within 2 hours.
                    </p>
                    <div className="bg-linen-white rounded-xl p-4 border border-teal/10 text-left max-w-sm mx-auto space-y-1 text-sm">
                      <p><strong>Tour:</strong> {selectedTour.name}</p>
                      <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <p><strong>Guests:</strong> {formData.guests}</p>
                      <p><strong>Total:</strong> <span className="text-coffee-red font-bold">${totalPrice} USD</span></p>
                    </div>
                    <button onClick={() => navigate('/tours/')} className="px-6 py-2.5 rounded-full bg-coffee-red text-linen-white text-xs uppercase font-bold tracking-wider hover:bg-coffee-red/90 transition-all">
                      Browse More Tours
                    </button>
                  </div>
                ) : step === 1 ? (
                  /* Step 1: Tour & Date */
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 block">Select Your Tour</label>
                      <select value={formData.tourId} onChange={(e) => handleInputChange('tourId', e.target.value)}
                        className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red focus:ring-1 focus:ring-coffee-red">
                        {tours.map((tour) => (
                          <option key={tour.id} value={tour.id}>{tour.name} — ${tour.pricing.smallGroup.adult}/guest</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-coffee-red" /> Tour Date
                      </label>
                      <input type="date" value={formData.date} min={tomorrow} onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                      <p className="text-xs text-teal/50 mt-1">Tours depart daily at 08:00 or 14:00. Book at least 24 hours in advance.</p>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold" /> Number of Guests
                      </label>
                      <div className="flex items-center gap-4 bg-linen-white rounded-xl p-2 w-fit border border-teal/10">
                        <button onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                          className="w-9 h-9 rounded-lg hover:bg-teal/5 flex items-center justify-center border border-teal/10 active:scale-95">
                          <span className="text-lg">−</span>
                        </button>
                        <span className="font-mono font-bold text-lg w-8 text-center">{formData.guests}</span>
                        <button onClick={() => handleInputChange('guests', Math.min(10, formData.guests + 1))}
                          className="w-9 h-9 rounded-lg hover:bg-teal/5 flex items-center justify-center border border-teal/10 active:scale-95">
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : step === 2 ? (
                  /* Step 2: Your Details */
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold" /> Full Name
                        </label>
                        <input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required placeholder="John Doe"
                          className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gold" /> Email Address
                        </label>
                        <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required placeholder="john@example.com"
                          className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold" /> WhatsApp or Phone
                      </label>
                      <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required placeholder="+251-911-XXX-XXX"
                        className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" /> Pickup Location
                      </label>
                      <input type="text" value={formData.pickupLocation} onChange={(e) => handleInputChange('pickupLocation', e.target.value)} required placeholder="Hotel name or address"
                        className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                      <p className="text-xs text-teal/50 mt-1">Complimentary pickup from central Addis Ababa (Bole, Piassa, Meskel Square).</p>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-teal/60 tracking-wider mb-1.5">Special Requirements</label>
                      <textarea value={formData.specialRequirements} onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                        placeholder="Dietary needs, mobility issues, special occasions..." rows={3}
                        className="w-full bg-linen-white border border-teal/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-coffee-red" />
                    </div>
                  </div>
                ) : (
                  /* Step 3: Review */
                  <div className="space-y-5">
                    <p className="text-xs font-mono text-teal/60 uppercase tracking-wider">Review Your Booking</p>
                    {[
                      { label: 'Tour', value: selectedTour.name, icon: CheckCircle },
                      { label: 'Date', value: new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }), icon: Calendar },
                      { label: 'Guests', value: `${formData.guests} guest${formData.guests > 1 ? 's' : ''}`, icon: Users },
                      { label: 'Name', value: formData.fullName, icon: User },
                      { label: 'Email', value: formData.email, icon: Mail },
                      { label: 'Phone', value: formData.phone, icon: Phone },
                      { label: 'Pickup', value: formData.pickupLocation, icon: MapPin },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-teal/60">{item.label}</p>
                          <p className="font-semibold text-sm text-teal">{item.value}</p>
                        </div>
                      </div>
                    ))}
                    {formData.specialRequirements && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-coffee-red/10 text-coffee-red flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase text-teal/60">Special Requirements</p>
                          <p className="font-semibold text-sm text-teal">{formData.specialRequirements}</p>
                        </div>
                      </div>
                    )}
                    <div className="border-t border-teal/10 pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-mono text-teal/60 uppercase">Estimated Total</p>
                        <p className="text-2xl font-mono font-bold text-coffee-red">${totalPrice} USD</p>
                        <p className="text-xs text-teal/50">No instant charge — pay on tour day</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-xs text-amber-800 font-mono uppercase tracking-wider mb-1">Cancellation Policy</p>
                      <p className="text-xs text-amber-700">Free cancellation up to 24 hours before the tour start time.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              {!isSuccess && (
                <div className="flex items-center justify-between mt-6">
                  {step > 1 ? (
                    <button onClick={handleBack} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal/20 text-teal text-xs uppercase font-mono font-bold tracking-wider hover:bg-sandstone transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : <div />}
                  <button onClick={handleNext} disabled={isSubmitting}
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

            {/* Sidebar — 1/3 width */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tour Summary Card */}
              {selectedTour && (
                <div className="bg-sandstone/30 rounded-2xl border border-teal/10 overflow-hidden">
                  <img src={selectedTour.gallery[0] || selectedTour.image} alt={selectedTour.name}
                    className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{selectedTour.type}</span>
                      <span className="text-xs text-teal/60">{selectedTour.duration}</span>
                    </div>
                    <h3 className="font-serif font-bold text-teal text-lg">{selectedTour.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-mono font-bold text-coffee-red">${selectedTour.pricing.smallGroup.adult}</span>
                      <span className="text-xs text-teal/60">/ person × {formData.guests} = <strong className="text-coffee-red">${totalPrice}</strong></span>
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

              {/* Help Card */}
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

      {/* How It Works */}
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

      {/* Policies */}
      <section className="py-12 sm:py-16 bg-linen-white border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{p.policies.headline}</h2>
          <div className="space-y-3">
            {Object.entries(policies).map(([key, policy]) => (
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
```

---

## Step 9: Rewrite ContactPage.tsx

**File:** `src/pages/ContactPage.tsx`  
**Replace entire file** — ~280 lines.

```tsx
import { useState, FormEvent } from 'react';
import {
  MapPin, Phone, Mail, Send, MessageCircle, Clock,
  Star, Shield, ChevronRight, CheckCircle, Building2, Globe, Users,
} from 'lucide-react';
import contactData from '../content/contact.json';

interface ContactData {
  hero: { headline: string; subheadline: string; image: string };
  contactInfo: { headline: string; phone: string; whatsapp: string; email: string; address: string; officeHours: string };
  contactForm: { headline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  customTourInquiry: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  travelAgentPartnership: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  faqs: { headline: string; items: Array<{ question: string; answer: string }> };
  map: { headline: string; address: string; coordinates: { lat: number; lng: number }; embedCode: string };
  page: {
    hero: { headline: string; subheadline: string; responseTime: string };
    quickContact: { headline: string; channels: { type: string; label: string; responseTime: string; description: string; primary?: boolean }[] };
    socialProof: { rating: string; reviewCount: string; source: string; badge: string };
    form: { headline: string; subheadline: string; successTitle: string; successNext: string; successSteps: string[] };
  };
}

const cj = contactData as unknown as ContactData;

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setIsSuccess(true); }, 1500);
  };

  const p = cj.page;
  const channelIcons: Record<string, typeof Phone> = { whatsapp: MessageCircle, phone: Phone, email: Mail };

  return (
    <div className="min-h-screen bg-linen-white">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-teal tracking-tight mb-4">{p.hero.headline}</h1>
          <p className="text-base sm:text-lg text-teal/70 max-w-2xl mx-auto mb-4">{p.hero.subheadline}</p>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" /> {p.hero.responseTime}
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Info + Social Proof */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal mb-3">{cj.contactInfo.headline}</h2>
                <p className="text-teal/70 text-sm sm:text-base">{cj.contactInfo.headline}</p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: cj.contactInfo.address },
                  { icon: Phone, label: 'Phone / WhatsApp', value: cj.contactInfo.phone, href: `tel:${cj.contactInfo.phone.replace(/\D/g, '')}` },
                  { icon: Mail, label: 'Email', value: cj.contactInfo.email, href: `mailto:${cj.contactInfo.email}` },
                  { icon: Clock, label: 'Office Hours', value: cj.contactInfo.officeHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-teal/80 hover:text-gold transition-colors font-mono font-semibold text-sm">{item.value}</a>
                      ) : (
                        <p className="text-teal/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              {/* Social Proof */}
              <div className="bg-sandstone/30 rounded-2xl p-5 border border-teal/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-lg font-bold text-teal">{p.socialProof.rating}</span>
                  <span className="text-sm text-teal/60">on {p.socialProof.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-teal/80">{p.socialProof.reviewCount} verified reviews</span>
                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{p.socialProof.badge}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-sandstone/30 rounded-2xl p-6 sm:p-8 border border-teal/10">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal">{p.form.successTitle}</h3>
                  <p className="text-teal/70 text-sm">{cj.contactForm.successMessage}</p>
                  <div className="bg-linen-white rounded-xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
                    <p className="text-xs font-mono uppercase text-teal/60 mb-2">{p.form.successNext}</p>
                    <ul className="space-y-1.5">
                      {p.form.successSteps.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-teal/80">
                          <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal mb-1">{p.form.headline}</h3>
                  <p className="text-sm text-teal/60 mb-6">{p.form.subheadline}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251-911-XXX-XXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Topic *</label>
                      <select required value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                        <option value="" disabled>Select inquiry topic...</option>
                        {cj.contactForm.fields.find((f) => f.name === 'topic')?.options?.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <button type="submit" disabled={isSending}
                      className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                      <Send className="w-4 h-4" />
                      <span>{isSending ? 'Sending...' : cj.contactForm.submitText}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-teal text-center mb-8">{p.quickContact.headline}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {p.quickContact.channels.map((ch, i) => {
              const Icon = channelIcons[ch.type] || Phone;
              const href = ch.type === 'whatsapp' ? `https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`
                : ch.type === 'phone' ? `tel:${cj.contactInfo.phone.replace(/\D/g, '')}`
                : `mailto:${cj.contactInfo.email}`;
              return (
                <a key={i} href={href} target={ch.type === 'whatsapp' ? '_blank' : undefined} rel="noopener noreferrer"
                  className={`rounded-2xl p-6 border text-center space-y-3 transition-all hover:shadow-lg ${
                    ch.primary ? 'bg-emerald-600 text-linen-white border-emerald-700' : 'bg-linen-white border-teal/10 hover:border-coffee-red/30'
                  }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    ch.primary ? 'bg-linen-white/20' : 'bg-gold/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${ch.primary ? 'text-linen-white' : 'text-gold'}`} />
                  </div>
                  <h3 className="font-serif font-bold">{ch.label}</h3>
                  <p className={`text-xs ${ch.primary ? 'text-linen-white/80' : 'text-teal/60'}`}>{ch.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase ${
                    ch.primary ? 'bg-linen-white/20 text-linen-white' : 'bg-gold/10 text-gold'
                  }`}>{ch.responseTime}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Tour & Travel Agent CTAs */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sandstone/30 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">{cj.customTourInquiry.headline}</h3>
              <p className="text-sm text-teal/70 mb-5">{cj.customTourInquiry.subheadline}</p>
              <a href="/custom-tour/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-wider transition-all">
                Request Custom Tour <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-sandstone/30 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">{cj.travelAgentPartnership.headline}</h3>
              <p className="text-sm text-teal/70 mb-5">{cj.travelAgentPartnership.subheadline}</p>
              <a href="/travel-agents/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all">
                Become a Partner <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{cj.faqs.headline}</h2>
          <div className="space-y-3">
            {cj.faqs.items.map((faq, idx) => (
              <details key={idx} className="bg-linen-white rounded-xl border border-teal/10">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-serif font-bold text-teal hover:text-coffee-red transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-teal/80 leading-relaxed animate-fade-in">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 sm:py-16 bg-linen-white border-t border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{cj.map.headline}</h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-teal/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.5!2d38.7469!3d9.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c1c1c1c1c1%3A0xc1c1c1c1c1c1c1c1!2sNational%20Tower%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
```

---

## Verification Checklist

After all edits, run:

```powershell
npx tsc --noEmit
```

Expected: 0 errors

```powershell
npm run build
```

Expected: Clean build

### Manual checks:
1. `/book/` loads as full page with 3-step wizard + tour summary sidebar
2. `/book/?tour=<tourId>` pre-selects the correct tour in dropdown
3. `/contact/` loads with form, contact info, quick contact cards, CTAs, FAQ, map
4. Navbar "Book a Tour" → navigates to `/book/`
5. Navbar "Contact" → navigates to `/contact/`
6. TourDetailPage "Book Now" → navigates to `/book/?tour=<tourId>`
7. StickyBookingBar "Book Now" → navigates to `/book/`
8. Mobile: both pages stack vertically, forms thumb-friendly
9. Desktop: booking page has 2-column layout (form + sidebar)
10. Legacy `?book=<id>` param redirects to `/book/?tour=<id>`
