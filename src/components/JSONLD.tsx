import { Helmet } from 'react-helmet-async';
import { BRAND } from '../config/brand';

interface OrganizationLD {
  type: 'Organization';
  name: string;
  url: string;
  logo?: string;
  contactPoint?: { telephone: string; contactType: string };
  sameAs?: string[];
}

interface LocalBusinessLD {
  type: 'LocalBusiness';
  name: string;
  url: string;
  description: string;
  address: string;
  telephone: string;
}

interface TouristTripLD {
  type: 'TouristTrip';
  name: string;
  description: string;
  url: string;
  touristType: string[];
}

interface BreadcrumbLD {
  type: 'BreadcrumbList';
  itemListElement: Array<{ position: number; name: string; item: string }>;
}

interface FAQPageLD {
  type: 'FAQPage';
  mainEntity: Array<{
    name: string;
    acceptedAnswer: { acceptedAnswer: string };
  }>;
}

type LDData = OrganizationLD | LocalBusinessLD | TouristTripLD | BreadcrumbLD | FAQPageLD;

interface JSONLDProps {
  data: LDData;
}

export function JSONLD({ data }: JSONLDProps) {
  const script = {
    '@context': 'https://schema.org',
    '@type': data.type,
    ...('name' in data ? { name: data.name } : {}),
    ...('url' in data ? { url: data.url } : {}),
    ...('description' in data ? { description: data.description } : {}),
    ...('logo' in data ? { logo: data.logo } : {}),
    ...('address' in data ? { address: { '@type': 'PostalAddress', streetAddress: data.address, addressLocality: 'Addis Ababa', addressCountry: 'ET' } } : {}),
    ...('telephone' in data ? { telephone: data.telephone } : {}),
    ...('contactPoint' in data ? { contactPoint: data.contactPoint } : {}),
    ...('sameAs' in data ? { sameAs: data.sameAs } : {}),
    ...('touristType' in data ? { touristType: data.touristType } : {}),
    ...('itemListElement' in data ? { itemListElement: data.itemListElement } : {}),
    ...('mainEntity' in data ? { mainEntity: data.mainEntity } : {}),
  };

  return (
    <Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(script) }} />
    </Helmet>
  );
}

export function OrganizationJSONLD() {
  return (
    <JSONLD
      data={{
        type: 'Organization',
        name: BRAND.name,
        url: BRAND.origin,
        logo: `${BRAND.origin}/favicon.svg`,
        contactPoint: { telephone: BRAND.phone, contactType: 'customer service' },
        sameAs: [],
      }}
    />
  );
}

export function LocalBusinessJSONLD() {
  return (
    <JSONLD
      data={{
        type: 'LocalBusiness',
        name: BRAND.name,
        url: BRAND.origin,
        description: 'Local tour operator offering city tours, day trips, local guides, car hire, and travel support in Addis Ababa, Ethiopia.',
        address: BRAND.address,
        telephone: BRAND.phone,
      }}
    />
  );
}

export function TouristTripJSONLD({ name, description, path }: { name: string; description: string; path: string }) {
  return (
    <JSONLD
      data={{
        type: 'TouristTrip',
        name,
        description,
        url: `${BRAND.origin}${path}`,
        touristType: ['Leisure traveler', 'Cultural tourist'],
      }}
    />
  );
}

export function BreadcrumbJSONLD({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <JSONLD
      data={{
        type: 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          position: i + 1,
          name: item.name,
          item: `${BRAND.origin}${item.path}`,
        })),
      }}
    />
  );
}

export function FAQJSONLD({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <JSONLD
      data={{
        type: 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          name: faq.question,
          acceptedAnswer: { acceptedAnswer: faq.answer },
        })),
      }}
    />
  );
}
