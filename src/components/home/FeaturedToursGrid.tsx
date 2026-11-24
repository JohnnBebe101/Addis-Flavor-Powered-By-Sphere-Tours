import TourCardGrid from './TourCardGrid';
import { Tour } from '../../types';
import toursData from '../../content/tours.json';

/**
 * The "Our Most Popular Tours" grid.
 *
 * It lives in its own module so that tours.json — 57 KB of raw content — is only
 * fetched when the section is revealed, instead of sitting in the initial bundle
 * where it competes with the hero image and the webfonts for bandwidth.
 *
 * The rendered markup is unchanged; only where the data is imported from moved.
 */
export function FeaturedToursGrid() {
  const featuredTours = (toursData.tours as Tour[]).filter((tour) => tour.tourType !== 'private');

  return <TourCardGrid tours={featuredTours} />;
}
