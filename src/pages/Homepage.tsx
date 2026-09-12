import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Crown, Landmark, Church, Mountain, Calendar, Globe, DollarSign } from 'lucide-react';
import { SEO } from '../components/SEO';
import { OrganizationJSONLD, LocalBusinessJSONLD } from '../components/JSONLD';
import { StableHero } from '../components/home/StableHero';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import TourCardGrid from '../components/home/TourCardGrid';
import { AddisHighlightsGrid } from '../components/home/AddisHighlightsGrid';
import { WhyChooseUsHero } from '../components/home/WhyChooseUsHero';
import { ServiceDiscoveryCard } from '../components/home/ServiceDiscoveryCard';
import { PracticalInfoGrid } from '../components/home/PracticalInfoGrid';
import { FinalCTA } from '../components/home/FinalCTA';
import { PlanYourVisitBridge } from '../components/home/PlanYourVisitBridge';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';
import { Tour } from '../types';
import homeData from '../content/home.json';
import toursData from '../content/tours.json';

export function Homepage() {
  const tourCategoriesWithIcons = useMemo(() => homeData.tourCategorySelector.categories.map((cat, idx) => ({
    ...cat,
    icon: idx === 0 ? <MapPin className="w-5 h-5" /> : idx === 1 ? <Mountain className="w-5 h-5" /> : <Crown className="w-5 h-5" />,
  })), []);

  const attractionsWithIcons = useMemo(() => homeData.addisHighlights.attractions.map((attr: { id: number; title: string; description: string; link: string; image: string }, idx: number) => ({
    ...attr,
    icon: idx === 0 ? <Landmark className="w-5 h-5" /> : idx === 1 ? <Tag className="w-5 h-5" /> : idx === 2 ? <Church className="w-5 h-5" /> : <Mountain className="w-5 h-5" />,
  })), []);

  const featuredTours = useMemo(() => (toursData.tours as Tour[]).filter((tour) => tour.tourType !== 'private'), []);

  const practicalInfoColumns = useMemo(() => homeData.practicalInfo.columns.map((col, idx) => ({
    ...col,
    icon: idx === 0 ? <Globe className="w-5 h-5" /> : idx === 1 ? <Calendar className="w-5 h-5" /> : idx === 2 ? <DollarSign className="w-5 h-5" /> : <Mountain className="w-5 h-5" />,
  })), []);

  return (
    <>
      <SEO />
      <OrganizationJSONLD />
      <LocalBusinessJSONLD />

      {/* 1. Utility bar — handled by Layout (NotificationBar) */}
      {/* 2. Global header — handled by Layout (Navbar) */}

      {/* 3. Stable split hero + intent router */}
      <StableHero />

      {/* 4. Must-Sees in Addis Ababa */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.mustSees.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">
              {homeData.mustSees.subheadline}
            </p>
          </div>
          <AddisHighlightsGrid
            attractions={attractionsWithIcons}
            headline=""
            subheadline=""
          />
          <div className="text-center mt-8">
            <Link
              to="/things-to-do/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-coffee-red text-coffee-red rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red hover:text-linen-white transition-all"
            >
              {homeData.mustSees.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Welcome to Addis Ababa */}
      <WhyChooseUsHero
        headline={homeData.welcomeToAddis.headline}
        editorialIntro={homeData.welcomeToAddis.editorialIntro}
        benefits={homeData.welcomeToAddis.benefits}
      />

      {/* 6. Choose Your Adventure (locked) */}
      <section className="py-12 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.tourCategorySelector.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">
              {homeData.tourCategorySelector.subheadline}
            </p>
          </div>
          <TourCategorySelector
            categories={tourCategoriesWithIcons}
            headline=""
            subheadline=""
          />
        </div>
      </section>

      {/* 7. Our Most Popular Tours (locked) */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.featuredTours.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">
              {homeData.featuredTours.subheadline}
            </p>
          </div>
          <TourCardGrid tours={featuredTours} />
          <div className="text-center mt-8">
            <Link
              to="/tours/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-coffee-red text-coffee-red rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red hover:text-linen-white transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Plan Your Visit, Your Way (new service cards) */}
      <section className="py-16 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.serviceCards.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">
              {homeData.serviceCards.subheadline}
            </p>
          </div>
          <ServiceDiscoveryCard services={homeData.serviceCards.services} />
        </div>
      </section>

      {/* 9. First Time in Addis Ababa? Start Here (locked) */}
      <PracticalInfoGrid
        columns={practicalInfoColumns}
        headline={homeData.practicalInfo.headline}
        ctaLink={homeData.practicalInfo.ctaLink}
        ctaText={homeData.practicalInfo.ctaText || 'Read the Travel Guide'}
      />

      {/* 10. Google Reviews widget */}
      <section className="py-12 bg-sandstone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-3">
              {homeData.googleReviews.headline}
            </h2>
            <p className="text-teal/70 max-w-xl mx-auto text-sm">
              {homeData.googleReviews.subheadline}
            </p>
          </div>
          <GoogleReviewsWidget />
        </div>
      </section>

      {/* 11. Plan Your Visit Bridge (form) */}
      <PlanYourVisitBridge />

      {/* 12. Final CTA */}
      <FinalCTA
        headline={homeData.finalCta.headline}
        subheadline={homeData.finalCta.subheadline}
        ctaPrimary={homeData.finalCta.ctaPrimary}
        ctaSecondary={homeData.finalCta.ctaSecondary}
        ctaPrimaryLink={homeData.finalCta.ctaPrimaryLink}
        ctaSecondaryLink={homeData.finalCta.ctaSecondaryLink}
        image={homeData.finalCta.image}
      />

      {/* 13. Global footer — handled by Layout */}
    </>
  );
}
