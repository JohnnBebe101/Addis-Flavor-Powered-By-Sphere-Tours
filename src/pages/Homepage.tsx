/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TourCardGrid from '../components/home/TourCardGrid';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import { WhyChooseUsHero } from '../components/home/WhyChooseUsHero';
import { WhyChooseUsPreview } from '../components/home/WhyChooseUsPreview';
import { AddisHighlightsGrid } from '../components/home/AddisHighlightsGrid';
import { DayTripDestinationsCarousel } from '../components/home/DayTripDestinationsCarousel';
import { PracticalInfoGrid } from '../components/home/PracticalInfoGrid';
import { FinalCTA } from '../components/home/FinalCTA';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

import { useState, useMemo } from 'react';
import { Tour } from '../types';
import homeData from '../content/home.json';
import toursData from '../content/tours.json';
import reviewsData from '../content/reviews.json';

import {
  MapPin,
  Tag,
  Crown,
  Landmark,
  Church,
  TreePine,
  Mountain,
  Waves,
  Calendar,
  Globe,
  DollarSign,
} from 'lucide-react';

export const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTours =
    activeTab === 'all'
      ? (toursData.tours as Tour[])
      : (toursData.tours as Tour[]).filter((t) => t.tourType === activeTab);

  // Pre-compute data with icons
  const tourCategoriesWithIcons = useMemo(() => homeData.tourCategorySelector.categories.map((cat, idx) => ({
    ...cat,
    icon:
      idx === 0 ? (
        <MapPin className="w-7 h-7" />
      ) : idx === 1 ? (
        <Mountain className="w-7 h-7" />
      ) : (
        <Crown className="w-7 h-7" />
      ),
  })), []);

  const dayTripDestinationsWithIcons = useMemo(() => homeData.dayTripDestinations.destinations.map(
    (dest, idx) => ({
      ...dest,
      icon:
        idx === 0 ? (
          <Landmark className="w-7 h-7" />
        ) : idx === 1 ? (
          <Church className="w-7 h-7" />
        ) : idx === 2 ? (
          <TreePine className="w-7 h-7" />
        ) : (
          <Waves className="w-7 h-7" />
        ),
      priceFrom:
        idx === 0 ? 'From $85' : idx === 1 ? 'From $95' : idx === 2 ? 'From $80' : 'From $75',
    }),
  ), []);

  const attractionsWithIcons = useMemo(() => homeData.addisHighlights.attractions.map((attr, idx) => ({
    ...attr,
    icon:
      idx === 0 ? (
        <Landmark className="w-7 h-7" />
      ) : idx === 1 ? (
        <Tag className="w-7 h-7" />
      ) : idx === 2 ? (
        <Church className="w-7 h-7" />
      ) : (
        <Mountain className="w-7 h-7" />
      ),
  })), []);

  const practicalInfoColumns = useMemo(() => homeData.practicalInfo.columns.map((col, idx) => ({
    ...col,
    icon:
      idx === 0 ? (
        <Globe className="w-7 h-7" />
      ) : idx === 1 ? (
        <Calendar className="w-7 h-7" />
      ) : idx === 2 ? (
        <DollarSign className="w-7 h-7" />
      ) : (
        <Mountain className="w-7 h-7" />
      ),
  })), []);

  return (
    <>
      {/* 3. WHY CHOOSE US — HERO SECTION */}
      <WhyChooseUsHero
        headline={homeData.whyChooseUsHero.headline}
        benefits={homeData.whyChooseUsHero.benefits}
      />

      {/* 4. TOUR CATEGORY SELECTOR */}
      <TourCategorySelector
        categories={tourCategoriesWithIcons}
        headline={homeData.tourCategorySelector.headline}
        subheadline={homeData.tourCategorySelector.subheadline}
      />

      {/* 6. TOUR CARD GRID — CATEGORY TABS */}
      <section className="py-12 md:py-16 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-teal tracking-tight">
              {homeData.featuredTours.headline || 'Our Most Popular Tours'}
            </h2>
            <p className="text-xs text-teal/60 mt-2 font-sans">
              {homeData.featuredTours.subheadline}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { key: 'all', label: 'All Tours' },
              { key: 'city-tour', label: 'City Tours' },
              { key: 'day-trip', label: 'Day Trips' },
              { key: 'private', label: 'Private & Custom' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-coffee-red text-linen-white shadow-md'
                    : 'border border-teal/20 text-teal hover:bg-teal/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <TourCardGrid tours={filteredTours} />

        {/* View All Tours CTA */}
        <div className="text-center mt-10">
          <a
            href="/tours/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
          >
            <span>View All Tours</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

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

      {/* FINAL CTA */}
      <FinalCTA
        headline={homeData.finalCta.headline}
        subheadline={homeData.finalCta.subheadline}
        ctaPrimary={homeData.finalCta.ctaPrimary}
        ctaSecondary={homeData.finalCta.ctaSecondary}
        ctaPrimaryLink={homeData.finalCta.ctaPrimaryLink}
        ctaSecondaryLink={homeData.finalCta.ctaSecondaryLink}
        backgroundImage="/images/hero/final-cta-bg.jpg"
        image={homeData.finalCta.image}
        badge={homeData.finalCta.badge}
      />

      {/* TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel testimonials={reviewsData.reviews} onBookClick={() => {}} />

      {/* PRACTICAL INFORMATION */}
      <PracticalInfoGrid
        columns={practicalInfoColumns}
        headline={homeData.practicalInfo.headline}
        ctaLink={homeData.practicalInfo.ctaLink}
        ctaText="Read More in Our Travel Guide"
      />
    </>
  );
};

export default Homepage;
