import { Helmet } from 'react-helmet-async';
import { BRAND } from '../config/brand';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

const SITE_TITLE = BRAND.name;
const DEFAULT_DESCRIPTION = 'Explore Addis Ababa with local experts. City tours, day trips, local guides, car hire, and travel support — powered by Sphere Tour & Travel.';
const DEFAULT_IMAGE = `${BRAND.origin}/images/hero/addis-ababa-city-hero.jpg`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : `${SITE_TITLE} | City Tours, Day Trips & Local Travel Support`;
  const canonicalUrl = canonical ? `${BRAND.origin}${canonical}` : BRAND.origin;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_TITLE} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
