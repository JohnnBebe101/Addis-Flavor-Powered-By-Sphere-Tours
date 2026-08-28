import { useEffect } from 'react';

export function getStructuredData(activeView: 'home' | 'become-host' | 'our-story', siteOrigin: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': 'https://addisababacitytours.com/#agency',
        name: 'Sphere Tour and Travel Ethiopia',
        alternateName: 'Addis Flavor',
        url: 'https://addisababacitytours.com',
        logo: `${siteOrigin}/assets/images/addis_jebena_pour_1782233715156.jpg`,
        image: `${siteOrigin}/assets/images/addis_hero_bg_1782233695273.jpg`,
        description:
          'Licensed and leading tour operator based in Addis Ababa, Ethiopia, specializing in sustainable, immersive, and cultural journeys like Addis Ababa City Tours.',
        telephone: '+251911209882',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220',
          addressLocality: 'Addis Ababa',
          addressRegion: 'Addis Ababa',
          addressCountry: 'ET',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '9.0145',
          longitude: '38.7505',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+251911209882',
          contactType: 'customer service',
          areaServed: 'Worldwide',
          availableLanguage: ['English'],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteOrigin}/#brand`,
        name: 'Addis Ababa City Tours',
        parentOrganization: {
          '@type': 'TravelAgency',
          '@id': 'https://addisababacitytours.com/#agency',
        },
        description:
          'Premium local culinary initiative offering immersive home dining, cooking classes, and traditional coffee ceremonies with local vetted hosts in Addis Ababa.',
        url: `${siteOrigin}/`,
        telephone: '+251911209882',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bole, Piazza, Yeka, Guellele',
          addressLocality: 'Addis Ababa',
          addressCountry: 'ET',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteOrigin}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteOrigin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name:
              activeView === 'become-host'
                ? 'Become a Host'
                : activeView === 'our-story'
                  ? 'Our Story'
                  : 'Experiences',
            item:
              activeView === 'become-host'
                ? `${siteOrigin}/#become-host`
                : activeView === 'our-story'
                  ? `${siteOrigin}/#our-story`
                  : `${siteOrigin}/#experiences`,
          },
        ],
      },
      {
        '@type': 'TouristTrip',
        '@id': `${siteOrigin}/#trip-cooking-class`,
        name: 'Addis Ababa Master Cooking Class',
        description:
          'Learn the secrets of ancient Ethiopian cooking under the guidance of a friendly neighborhood host. Bake teff sourdough Injera and stir spicy wots from scratch.',
        touristType: 'Food and Culture Lovers',
        subTrip: {
          '@type': 'TouristTrip',
          duration: 'PT4H',
        },
        provider: {
          '@type': 'TravelAgency',
          '@id': 'https://addisababacitytours.com/#agency',
        },
        offers: {
          '@type': 'Offer',
          price: '49.00',
          priceCurrency: 'USD',
          eligibleRegion: {
            '@type': 'Place',
            name: 'Addis Ababa, Ethiopia',
          },
          category: 'Culinary Tour',
        },
      },
      {
        '@type': 'TouristTrip',
        '@id': `${siteOrigin}/#trip-home-meal`,
        name: 'Local Home Meal Experience & Coffee Ceremony',
        description:
          'Dine around a traditional Mesob basket, share the multi-dish Beyaynetu feast (or rich meat doro wat), and experience authentic warmth with songs and stories inside a private Addis Ababa family home.',
        touristType: 'Culinary Travelers',
        subTrip: {
          '@type': 'TouristTrip',
          duration: 'PT2.5H',
        },
        provider: {
          '@type': 'TravelAgency',
          '@id': 'https://addisababacitytours.com/#agency',
        },
        offers: {
          '@type': 'Offer',
          price: '35.00',
          priceCurrency: 'USD',
          eligibleRegion: {
            '@type': 'Place',
            name: 'Addis Ababa, Ethiopia',
          },
          category: 'Private Home Dining',
        },
      },
      {
        '@type': 'TouristTrip',
        '@id': `${siteOrigin}/#trip-coffee-only`,
        name: 'The Sacred Coffee Ceremony & Mindfulness Ritual',
        description:
          "An intimate, spiritual immersion into the world's original coffee culture. Learn the slow three-pour brewing method using the clay Jebena.",
        touristType: 'Coffee Enthusiasts & Spiritual Seekers',
        subTrip: {
          '@type': 'TouristTrip',
          duration: 'PT1.5H',
        },
        provider: {
          '@type': 'TravelAgency',
          '@id': 'https://addisababacitytours.com/#agency',
        },
        offers: {
          '@type': 'Offer',
          price: '25.00',
          priceCurrency: 'USD',
          eligibleRegion: {
            '@type': 'Place',
            name: 'Addis Ababa, Ethiopia',
          },
          category: 'Cultural Ritual',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteOrigin}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where do the Addis Ababa City Tours cooking classes and food experiences take place?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All sessions and traditional coffee ceremonies are held inside the private family kitchens and green gardens of vetted local host families in cozy Addis Ababa neighborhoods like Bole, Piazza, Yeka, and Guellele. Secure addresses are sent immediately upon booking confirmation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does pricing and payment work for Addis Ababa City Tours?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Addis Ababa City Tours offers professional private tours starting at $25 to $49 per person. Payment is highly flexible: no immediate credit card charges are made on our website. You pay your host directly on-site during your session using cash or local electronic wallet options like Telebirr.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the durations of the culinary tours?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Addis Ababa Master Cooking Class lasts between 3.5 to 4 hours. The Local Home Meal Experience takes 2 to 2.5 hours, and The Sacred Coffee Ceremony is a 1.5-hour intimate mindfulness ritual.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can traditional Ethiopian meals accommodate vegan, vegetarian, or gluten-free diets?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes! Ethiopian Orthodox Christian fasting rules make more than half of our dishes naturally vegan (the 'Bayenetu' platter). Additionally, we provide 100% pure gluten-free Teff Injera, dairy-free options, and strictly halal-vetted meats upon request.",
            },
          },
          {
            '@type': 'Question',
            name: 'What is the relationship between Addis Ababa City Tours and Sphere Tour and Travel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Addis Ababa City Tours is an exclusive, locally managed culinary experience designed, operated, and backed by Sphere Tour and Travel, a leading fully licensed tour operator based in Addis Ababa, Ethiopia. Sphere Travel ensures optimal transit safety, certified hosts, and sustainable tourism standards.',
            },
          },
        ],
      },
    ],
  };
}

export function useSEO(activeView: 'home' | 'become-host' | 'our-story') {
  useEffect(() => {
    let pageTitle =
      'Addis Ababa City Tours | Authentic Cooking Classes & Home Meals in Addis Ababa';
    let pageDesc =
      'Discover authentic culinary experiences in Addis Ababa, Ethiopia. Book private cooking classes, traditional coffee ceremonies, and home cooked meals with vetted local host families. Powered by Sphere Tour and Travel.';

    if (activeView === 'become-host') {
      pageTitle = 'Become a Host - Share Ethiopian Hospitality | Addis Ababa City Tours';
      pageDesc =
        'Join our network of passionate home cooks and host families in Addis Ababa. Earn a sustainable income while sharing traditional Ethiopian recipes and hospitality with travelers from around the globe.';
    } else if (activeView === 'our-story') {
      pageTitle = 'Our Story - Powered by Sphere Tour & Travel Ethiopia | Addis Ababa City Tours';
      pageDesc =
        "Learn about Addis Ababa City Tours, a premium culinary initiative operated by Sphere Tour and Travel, Addis Ababa's leading sustainable tour agency. Meet our founders and read our community vetting safety guidelines.";
    }

    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    const siteOrigin =
      typeof window !== 'undefined' ? window.location.origin : 'https://addisababacitytours.com';
    const structuredData = getStructuredData(activeView, siteOrigin);

    let script = document.getElementById('json-ld-seo');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('id', 'json-ld-seo');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [activeView]);
}