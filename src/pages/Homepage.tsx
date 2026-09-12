/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TourCardGrid from '../components/home/TourCardGrid';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import { WhyChooseUsHero } from '../components/home/WhyChooseUsHero';
import { AddisHighlightsGrid } from '../components/home/AddisHighlightsGrid';
import { PracticalInfoGrid } from '../components/home/PracticalInfoGrid';
import { FinalCTA } from '../components/home/FinalCTA';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';

import { useMemo } from 'react';
import { Tour } from '../types';
import homeData from '../content/home.json';
import toursData from '../content/tours.json';

import {
  MapPin,
  Tag,
  Crown,
  Landmark,
  Church,
  Mountain,
  Calendar,
  Globe,
  DollarSign,
} from 'lucide-react';

export const Homepage: React.FC = () => {
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

  const featuredTours = useMemo(
    () => (toursData.tours as Tour[]).filter((t) => t.tourType !== 'private'),
    [],
  );

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

      {/* 6. TOUR CARD GRID */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal tracking-tight mb-4">
              {homeData.featuredTours.headline || 'Our Most Popular Tours'}
            </h2>
            <p className="text-lg text-teal/60 font-sans">
              {homeData.featuredTours.subheadline}
            </p>
          </div>
        </div>
        <TourCardGrid tours={featuredTours} />
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

      {/* 7. ADDIS ABABA HIGHLIGHTS */}
      <AddisHighlightsGrid
        attractions={attractionsWithIcons}
        headline={homeData.addisHighlights.headline}
        subheadline={homeData.addisHighlights.subheadline}
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

      {/* GOOGLE REVIEWS WIDGET */}
      <section className="py-8 bg-sandstone border-t border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="font-mono text-[10px] text-teal/60 uppercase tracking-widest">
              Trusted by Travelers Worldwide
            </p>
          </div>
          <GoogleReviewsWidget />
        </div>
      </section>

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
