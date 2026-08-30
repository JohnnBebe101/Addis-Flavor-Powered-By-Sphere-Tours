/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TourCardGrid from '../components/home/TourCardGrid';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import { WhyChooseUsPreview } from '../components/home/WhyChooseUsPreview';
import { AddisHighlightsGrid } from '../components/home/AddisHighlightsGrid';
import { DayTripDestinationsCarousel } from '../components/home/DayTripDestinationsCarousel';
import { HowBookingWorks } from '../components/home/HowBookingWorks';
import { PracticalInfoGrid } from '../components/home/PracticalInfoGrid';
import { FinalCTA } from '../components/home/FinalCTA';
import { TrustBookingStrip } from '../components/home/TrustBookingStrip';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

import { Tour } from '../types';
import homeData from '../content/home.json';
import toursData from '../content/tours.json';
import reviewsData from '../content/reviews.json';

import { MapPin, Tag, Crown, Landmark, Church, TreePine, Mountain, Waves, Calendar, Users, ChevronRight, Globe, DollarSign } from 'lucide-react';

export const Homepage: React.FC = () => {
  // Pre-compute data with icons
  const tourCategoriesWithIcons = homeData.tourCategorySelector.categories.map((cat, idx) => ({
    ...cat,
    icon: idx === 0 ? <MapPin className="w-7 h-7" /> : idx === 1 ? <Mountain className="w-7 h-7" /> : <Crown className="w-7 h-7" />,
  }));

  const dayTripDestinationsWithIcons = homeData.dayTripDestinations.destinations.map((dest, idx) => ({
    ...dest,
    icon: idx === 0 ? <Landmark className="w-7 h-7" /> : idx === 1 ? <Church className="w-7 h-7" /> : idx === 2 ? <TreePine className="w-7 h-7" /> : <Waves className="w-7 h-7" />,
    priceFrom: idx === 0 ? 'From $85' : idx === 1 ? 'From $95' : idx === 2 ? 'From $80' : 'From $75',
  }));

  const attractionsWithIcons = homeData.addisHighlights.attractions.map((attr, idx) => ({
    ...attr,
    icon: idx === 0 ? <Landmark className="w-7 h-7" /> : idx === 1 ? <Tag className="w-7 h-7" /> : idx === 2 ? <Church className="w-7 h-7" /> : <Mountain className="w-7 h-7" />,
  }));

  const howBookingWorksSteps = homeData.howBookingWorks.steps.map((step, idx) => ({
    ...step,
    icon: idx === 0 ? <Calendar className="w-7 h-7" /> : idx === 1 ? <Users className="w-7 h-7" /> : <ChevronRight className="w-7 h-7" />,
  }));

  const practicalInfoColumns = homeData.practicalInfo.columns.map((col, idx) => ({
    ...col,
    icon: idx === 0 ? <Globe className="w-7 h-7" /> : idx === 1 ? <Calendar className="w-7 h-7" /> : idx === 2 ? <DollarSign className="w-7 h-7" /> : <Mountain className="w-7 h-7" />,
  }));

  return (
    <>
      {/* 4. TRUST & BOOKING STRIP */}
      <TrustBookingStrip
        tripAdvisorRating={4.9}
        tripAdvisorReviewCount={500}
        whatsappNumber={'+251-911-209-882'}
      />

      {/* 5. TOUR CATEGORY SELECTOR */}
      <TourCategorySelector
        categories={tourCategoriesWithIcons}
        headline={homeData.tourCategorySelector.headline}
        subheadline={homeData.tourCategorySelector.subheadline}
      />

      {/* 6. TOUR CARD GRID */}
      <TourCardGrid
        translations={homeData.featuredTours}
        tours={toursData.tours as Tour[]}
        expandedTourId={null}
        setExpandedTourId={() => {}} // TODO: wire expansion state
        handleSelectSearchPackage={() => {}} // TODO: wire to Layout search
      />

      {/* 7. WHY CHOOSE US PREVIEW */}
      <WhyChooseUsPreview
        translations={{
          whyChooseUsHeadline: homeData.whyChooseUs.headline,
          localExpertsTitle: homeData.whyChooseUs.benefits[0]?.title ?? 'Local Experts',
          localExpertsDesc: homeData.whyChooseUs.benefits[0]?.description ?? '',
          bestPriceTitle: homeData.whyChooseUs.benefits[1]?.title ?? 'Best Price Guarantee',
          bestPriceDesc: homeData.whyChooseUs.benefits[1]?.description ?? '',
          flexibleSafeTitle: homeData.whyChooseUs.benefits[2]?.title ?? 'Flexible & Safe',
          flexibleSafeDesc: homeData.whyChooseUs.benefits[2]?.description ?? '',
        }}
      />

      {/* 8. ADDIS ABABA HIGHLIGHTS */}
      <AddisHighlightsGrid
        attractions={attractionsWithIcons}
        headline={homeData.addisHighlights.headline}
        subheadline={homeData.addisHighlights.subheadline}
      />

      {/* 9. DAY TRIP DESTINATIONS CAROUSEL */}
      <DayTripDestinationsCarousel
        destinations={dayTripDestinationsWithIcons}
        headline={homeData.dayTripDestinations.headline}
        subheadline={homeData.dayTripDestinations.subheadline}
      />

      {/* 10. HOW BOOKING WORKS */}
      <HowBookingWorks
        steps={howBookingWorksSteps}
        headline={homeData.howBookingWorks.headline}
      />

      {/* 11. TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel
        testimonials={reviewsData.reviews}
        onBookClick={() => {}}
      />

      {/* 11. PRACTICAL INFORMATION */}
      <PracticalInfoGrid
        columns={practicalInfoColumns}
        headline={homeData.practicalInfo.headline}
        ctaLink={homeData.practicalInfo.ctaLink}
        ctaText="Read More in Our Travel Guide"
      />

      {/* 14. FINAL CTA */}
      <FinalCTA
        headline={homeData.finalCta.headline}
        subheadline={homeData.finalCta.subheadline}
        ctaPrimary={homeData.finalCta.ctaPrimary}
        ctaSecondary={homeData.finalCta.ctaSecondary}
        ctaPrimaryLink="/tours/"
        ctaSecondaryLink="/contact/"
        backgroundImage="/images/hero/final-cta-bg.jpg"
      />
    </>
  );
};

export default Homepage;