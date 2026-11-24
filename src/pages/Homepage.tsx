import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
import { SEO } from '../components/SEO';
import { OrganizationJSONLD, LocalBusinessJSONLD } from '../components/JSONLD';
import { StableHero } from '../components/home/StableHero';
import { TourCategorySelector } from '../components/home/TourCategorySelector';
import homeData from '../content/home.json';

/*
 * Everything below the fold is loaded on demand.
 *
 * The initial bundle was 102 KB gzipped, and every byte of it competes with the
 * hero image and the webfonts for bandwidth before the hero can paint. These
 * sections are not in the first viewport, so their code has no business in the
 * critical path: each one is fetched only when the progressive renderer below
 * reveals it, after the hero has painted.
 */
const FeaturedToursGrid = lazy(() =>
  import('../components/home/FeaturedToursGrid').then((m) => ({ default: m.FeaturedToursGrid })),
);
const AddisHighlightsGrid = lazy(() =>
  import('../components/home/AddisHighlightsGrid').then((m) => ({
    default: m.AddisHighlightsGrid,
  })),
);
const WhyChooseUsHero = lazy(() =>
  import('../components/home/WhyChooseUsHero').then((m) => ({ default: m.WhyChooseUsHero })),
);
const ServiceDiscoveryCard = lazy(() =>
  import('../components/home/ServiceDiscoveryCard').then((m) => ({
    default: m.ServiceDiscoveryCard,
  })),
);
const PracticalInfoGrid = lazy(() =>
  import('../components/home/PracticalInfoGrid').then((m) => ({ default: m.PracticalInfoGrid })),
);
const FinalCTA = lazy(() =>
  import('../components/home/FinalCTA').then((m) => ({ default: m.FinalCTA })),
);
const PlanYourVisitBridge = lazy(() =>
  import('../components/home/PlanYourVisitBridge').then((m) => ({
    default: m.PlanYourVisitBridge,
  })),
);
const GoogleReviewsWidget = lazy(() =>
  import('../components/GoogleReviewsWidget').then((m) => ({ default: m.GoogleReviewsWidget })),
);

/**
 * Reveals the below-the-fold sections one at a time, starting after the hero
 * has painted.
 *
 * The homepage renders ~890 elements and ~575 KB of imagery. Rendering all of it
 * in the first commit meant the browser could not paint the hero until the whole
 * page had been laid out (258 ms), and every below-the-fold image was pulled into
 * the initial load window — the initial load is what Lighthouse's LCP simulation
 * waits on, so the whole page's weight landed on the LCP.
 *
 * Each section is mounted in its own task so that no single task crosses the
 * 50 ms blocking threshold. The resulting DOM is identical to the previous
 * markup; only the mount timing differs.
 */
function ProgressiveSections({ sections }: { sections: ReactNode[] }) {
  const [visible, setVisible] = useState(0);
  const revealed = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timer = 0;

    const revealNext = () => {
      if (cancelled) return;
      revealed.current += 1;
      setVisible(revealed.current);
      if (revealed.current < sections.length) {
        timer = window.setTimeout(revealNext, 0);
      }
    };

    // Two frames: the first lets the hero paint, the second starts the reveals.
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(revealNext);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, [sections.length]);

  return <>{sections.slice(0, visible)}</>;
}

export function Homepage() {
  const tourCategoriesWithIcons = useMemo(
    () =>
      homeData.tourCategorySelector.categories.map((cat, idx) => ({
        ...cat,
        icon:
          idx === 0 ? (
            <MapPin className="w-5 h-5" />
          ) : idx === 1 ? (
            <Mountain className="w-5 h-5" />
          ) : (
            <Crown className="w-5 h-5" />
          ),
      })),
    [],
  );

  const attractionsWithIcons = useMemo(
    () =>
      homeData.addisHighlights.attractions.map(
        (
          attr: { id: number; title: string; description: string; link: string; image: string },
          idx: number,
        ) => ({
          ...attr,
          icon:
            idx === 0 ? (
              <Landmark className="w-5 h-5" />
            ) : idx === 1 ? (
              <Tag className="w-5 h-5" />
            ) : idx === 2 ? (
              <Church className="w-5 h-5" />
            ) : (
              <Mountain className="w-5 h-5" />
            ),
        }),
      ),
    [],
  );

  const practicalInfoColumns = useMemo(
    () =>
      homeData.practicalInfo.columns.map((col, idx) => ({
        ...col,
        icon:
          idx === 0 ? (
            <Globe className="w-5 h-5" />
          ) : idx === 1 ? (
            <Calendar className="w-5 h-5" />
          ) : idx === 2 ? (
            <DollarSign className="w-5 h-5" />
          ) : (
            <Mountain className="w-5 h-5" />
          ),
      })),
    [],
  );

  /*
   * The section list is memoised.
   *
   * Rebuilding it on every render handed `ProgressiveSections` a brand-new
   * array each time it revealed a section, which made every already-revealed
   * section re-render from scratch — quadratic React work that pushed TBT from
   * ~200 ms to ~600 ms. The three dependencies below are themselves memoised,
   * so this list is built exactly once.
   */
  const belowFoldSections = useMemo<ReactNode[]>(
    () => [
      // 4. Must-Sees in Addis Ababa
      <section key="must-sees" className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.mustSees.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">{homeData.mustSees.subheadline}</p>
          </div>
          <Suspense fallback={null}>
            <AddisHighlightsGrid attractions={attractionsWithIcons} headline="" subheadline="" />
          </Suspense>
          <div className="text-center mt-8">
            <Link
              to="/things-to-do/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-coffee-red text-coffee-red rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red hover:text-linen-white transition-all"
            >
              {homeData.mustSees.cta}
            </Link>
          </div>
        </div>
      </section>,

      // 5. Welcome to Addis Ababa
      <Suspense fallback={null} key="welcome">
        <WhyChooseUsHero
          headline={homeData.welcomeToAddis.headline}
          editorialIntro={homeData.welcomeToAddis.editorialIntro}
          benefits={homeData.welcomeToAddis.benefits}
        />
      </Suspense>,

      // 6. Choose Your Adventure (locked)
      <section key="adventure" className="py-12 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.tourCategorySelector.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">
              {homeData.tourCategorySelector.subheadline}
            </p>
          </div>
          <TourCategorySelector categories={tourCategoriesWithIcons} headline="" subheadline="" />
        </div>
      </section>,

      // 7. Our Most Popular Tours (locked)
      <section key="tours" className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.featuredTours.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">{homeData.featuredTours.subheadline}</p>
          </div>
          <Suspense fallback={null}>
            <FeaturedToursGrid />
          </Suspense>
          <div className="text-center mt-8">
            <Link
              to="/tours/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-coffee-red text-coffee-red rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red hover:text-linen-white transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>,

      // 8. Plan Your Visit, Your Way (new service cards)
      <section key="services" className="py-16 bg-sandstone/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-3">
              {homeData.serviceCards.headline}
            </h2>
            <p className="text-teal/70 max-w-2xl mx-auto">{homeData.serviceCards.subheadline}</p>
          </div>
          <Suspense fallback={null}>
            <ServiceDiscoveryCard services={homeData.serviceCards.services} />
          </Suspense>
        </div>
      </section>,

      // 9. First Time in Addis Ababa? Start Here (locked)
      <Suspense fallback={null} key="practical">
        <PracticalInfoGrid
          columns={practicalInfoColumns}
          headline={homeData.practicalInfo.headline}
          ctaLink={homeData.practicalInfo.ctaLink}
          ctaText={homeData.practicalInfo.ctaText || 'Read the Travel Guide'}
        />
      </Suspense>,

      // 10. Google Reviews widget
      <section key="reviews" className="py-12 bg-sandstone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-teal mb-3">
              {homeData.googleReviews.headline}
            </h2>
            <p className="text-teal/70 max-w-xl mx-auto text-sm">
              {homeData.googleReviews.subheadline}
            </p>
          </div>
          <Suspense fallback={null}>
            <GoogleReviewsWidget />
          </Suspense>
        </div>
      </section>,

      // 11. Plan Your Visit Bridge (form)
      <Suspense fallback={null} key="plan-your-visit">
        <PlanYourVisitBridge />
      </Suspense>,

      // 12. Final CTA
      <Suspense fallback={null} key="final-cta">
        <FinalCTA
          headline={homeData.finalCta.headline}
          subheadline={homeData.finalCta.subheadline}
          ctaPrimary={homeData.finalCta.ctaPrimary}
          ctaSecondary={homeData.finalCta.ctaSecondary}
          ctaPrimaryLink={homeData.finalCta.ctaPrimaryLink}
          ctaSecondaryLink={homeData.finalCta.ctaSecondaryLink}
          image={homeData.finalCta.image}
        />
      </Suspense>,
    ],
    [attractionsWithIcons, tourCategoriesWithIcons, practicalInfoColumns],
  );

  return (
    <>
      {/*
        The head tags are applied by Helmet in the browser only.
        During the build-time prerender Helmet would emit them inline in the
        body, where they are invalid and where the browser — which expects
        Helmet to own document.head — would have nothing to hydrate. The
        prerendered document already carries the homepage's title and meta tags
        in its <head>.
      */}
      {!import.meta.env.SSR && <SEO />}
      <OrganizationJSONLD />
      <LocalBusinessJSONLD />

      {/* 1. Utility bar — handled by Layout (NotificationBar) */}
      {/* 2. Global header — handled by Layout (Navbar) */}

      {/* 3. Stable split hero + intent router — renders immediately; holds the LCP element */}
      <StableHero />

      {/* 4-12. The rest of the page is mounted progressively, after the hero paints */}
      <ProgressiveSections sections={belowFoldSections} />

      {/* 13. Global footer — handled by Layout */}
    </>
  );
}
