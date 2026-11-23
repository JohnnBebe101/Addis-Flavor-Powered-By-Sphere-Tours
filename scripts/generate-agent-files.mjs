/**
 * Agent surface generator: `public/llms.txt` and the ARD manifest.
 *
 * Lighthouse's Agentic Browsing category fetches `/llms.txt` and resolves an ARD
 * manifest from `/.well-known/ard.json` (`/.well-known/ai-catalog.json` and
 * `/ai-catalog.json` are the predecessor locations older consumers still probe).
 * Netlify's `/*` catch-all answers any path it does not recognise with
 * `app.html`, so without these files both audits were handed HTML and failed:
 * the llms.txt regexes found no H1 and no links, and the manifest failed
 * `JSON.parse` on `<!doctype`.
 *
 * Everything is derived from sources of truth that already exist:
 *
 *   src/config/brand.ts     name, domain, contact details, brand hierarchy
 *   public/sitemap.xml      the canonical URL set (drift guard, both directions)
 *   src/content/tours.json  tour detail pages (derived, so they cannot drift)
 *
 * The prose is curated in the tables below because it has to stay inside the
 * claims legal approved; `FORBIDDEN_CLAIMS` fails the build if an unapproved
 * claim creeps back in.
 *
 * Usage:
 *   node scripts/generate-agent-files.mjs          # write the four files
 *   node scripts/generate-agent-files.mjs --check  # exit 1 if they are stale
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

/** Claims legal has not approved. No generated file may contain them. */
const FORBIDDEN_CLAIMS = [
  /500\+\s*five[- ]star/i,
  /travelers?'? choice/i,
  /best price guarantee/i,
];

/** RFC 8141-shaped ARD identifier: urn:air:<publisher>:<namespace>:<name>. */
const URN_PATTERN = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/;

/**
 * The sitemap is the canonical URL set: every entry must have agent copy here,
 * and nothing here may point at a URL the sitemap does not list. Tour detail
 * pages are the one exception — they are derived from tours.json and linked
 * from `/tours/`, which is what the sitemap lists.
 */
const PAGES = [
  {
    path: '/',
    ns: 'home',
    id: 'home',
    displayName: 'Addis Ababa by Locals',
    summary:
      'Homepage of Addis Ababa by Locals, a locally owned tour operator in Addis Ababa powered by Sphere Tour & Travel. Start a trip enquiry with your dates and group size, or browse the tour catalogue.',
    note: 'Locally owned Addis Ababa tour operator — start a trip enquiry with your dates and group size, or browse the tours.',
    tags: ['home', 'addis ababa', 'ethiopia', 'tours', 'trip enquiry'],
    capabilities: ['trip-enquiry', 'tour-discovery', 'contact'],
    queries: [
      'What tours can I book in Addis Ababa?',
      'How do I plan a trip to Ethiopia with local guides?',
      'Can I get an itinerary for my dates and group size?',
    ],
  },
  {
    path: '/tours/',
    ns: 'catalog',
    id: 'tours',
    displayName: 'All Tours',
    summary:
      'Full tour catalogue: city tours, day trips and private itineraries, each with duration, group size, inclusions, cancellation terms and price.',
    note: 'Every city tour, day trip and private itinerary with duration, group size, inclusions and price.',
    tags: ['tours', 'catalog', 'city tours', 'day trips', 'private tours'],
    capabilities: ['tour-search', 'tour-comparison', 'booking'],
    queries: [
      'What tours do you offer in Addis Ababa?',
      'Which day trips run from Addis Ababa?',
      'What is the difference between your city tours?',
    ],
  },
  {
    path: '/book/',
    ns: 'booking',
    id: 'book',
    displayName: 'Book a Tour',
    summary:
      'Booking flow: choose a tour, date and number of guests, enter contact and pickup details, and confirm the reservation. Free cancellation up to 24 hours before the tour start time.',
    note: 'Pick your tour, date and number of guests, add pickup details and confirm — free cancellation up to 24 hours before the tour start time.',
    tags: ['booking', 'reserve', 'date', 'guests', 'pickup'],
    capabilities: ['tour-booking', 'date-selection', 'guest-details'],
    queries: [
      'How do I book a tour with you?',
      'Can I reserve a tour for a specific date?',
      'What details do you need to complete a booking?',
    ],
  },
  {
    path: '/custom-tour/',
    ns: 'booking',
    id: 'custom-tour',
    displayName: 'Custom Tour',
    summary:
      'Request a tailor-made itinerary: share your dates, interests, group size and budget, and we design the route with you.',
    note: 'Request a tailor-made itinerary built around your dates, interests, group size and budget.',
    tags: ['custom tour', 'itinerary', 'tailor-made', 'private'],
    capabilities: ['custom-itinerary-request', 'trip-planning'],
    queries: [
      'Can you design a custom itinerary for me?',
      'Do you create private tours for families?',
      'How do I request a tailor-made tour?',
    ],
  },
  {
    path: '/guides/',
    ns: 'service',
    id: 'guides',
    displayName: 'Local Guides',
    summary:
      'Guide request flow: tell us your interests, dates, group size and language needs, and we match you with a local guide. Available languages are listed on the page.',
    note: 'Tell us your interests, dates, group size and language, and we match you with the right guide.',
    tags: ['guides', 'local guides', 'languages', 'guide request'],
    capabilities: ['guide-request', 'language-matching', 'trip-planning'],
    queries: [
      'Can I request a local guide in Addis Ababa?',
      'Which languages do your guides speak?',
      'How does guide matching work?',
    ],
  },
  {
    path: '/contact/',
    ns: 'contact',
    id: 'contact',
    displayName: 'Contact',
    summary:
      'Phone, WhatsApp, email, office hours and the contact form. We respond within 24 hours.',
    note: 'WhatsApp, phone, email and office hours — we respond within 24 hours.',
    tags: ['contact', 'whatsapp', 'email', 'support', 'office hours'],
    capabilities: ['contact', 'support-request', 'custom-itinerary-enquiry'],
    queries: [
      'How can I contact Addis Ababa by Locals?',
      'Do you have a WhatsApp number?',
      'What are your office hours?',
    ],
  },
  {
    path: '/things-to-do/',
    ns: 'explore',
    id: 'things-to-do',
    displayName: 'Things to Do',
    summary:
      'Curated experiences in Addis Ababa — half-day highlights, cultural activities and day trips — with durations and links to the matching tours.',
    note: 'Experiences in Addis Ababa with durations and links to the matching tours.',
    tags: ['things to do', 'attractions', 'experiences', 'addis ababa'],
    capabilities: ['experience-discovery', 'itinerary-planning'],
    queries: [
      'What are the best things to do in Addis Ababa?',
      'What can I do in Addis Ababa in half a day?',
      'Which Addis Ababa experiences suit a short stay?',
    ],
  },
  {
    path: '/where-to-stay/',
    ns: 'explore',
    id: 'where-to-stay',
    displayName: 'Where to Stay',
    summary:
      'Neighbourhood guide to staying in Addis Ababa — Bole, Kazanchis, Piassa, Meskel Square and more — with what each area suits, plus personalised recommendations on request.',
    note: 'Neighbourhood guidance for Bole, Kazanchis, Piassa, Meskel Square and more.',
    tags: ['accommodation', 'neighbourhoods', 'bole', 'piassa', 'kazanchis'],
    capabilities: ['accommodation-guidance', 'trip-planning'],
    queries: [
      'Which neighbourhood should I stay in when visiting Addis Ababa?',
      'Where do travellers stay near Bole International Airport?',
      'Can you recommend an area to stay in Addis Ababa?',
    ],
  },
  {
    path: '/airport-transfers/',
    ns: 'service',
    id: 'airport-transfers',
    displayName: 'Airport Transfers',
    summary:
      'Bole International Airport transfers to hotels and city destinations, including early departures and layover connections.',
    note: 'Bole International Airport pickups and drop-offs to hotels across the city.',
    tags: ['airport transfer', 'bole airport', 'layover', 'transfer'],
    capabilities: ['airport-transfer-enquiry', 'transfer-booking'],
    queries: [
      'Can you arrange a transfer from Bole International Airport?',
      'Do you offer airport transfers at night?',
      'How do I book a transfer to my hotel?',
    ],
  },
  {
    path: '/car-hire/',
    ns: 'service',
    id: 'car-hire',
    displayName: 'Car Hire',
    summary:
      'Car hire with driver for city days and longer trips, with professional drivers and flexible pickup.',
    note: 'Car hire with a professional driver for city days and longer trips.',
    tags: ['car hire', 'driver', 'transport', 'addis ababa'],
    capabilities: ['car-hire-enquiry', 'transport-booking'],
    queries: [
      'Can I hire a car with a driver in Addis Ababa?',
      'How much does car hire cost per day?',
      'Do you offer vehicles for a multi-day trip?',
    ],
  },
  {
    path: '/travel-guide/',
    ns: 'guide',
    id: 'travel-guide',
    displayName: 'Ethiopia Travel Guide',
    summary:
      'Practical planning articles: best time to visit Ethiopia, what to wear at religious sites, coffee ceremony etiquette, day trips from Addis Ababa and airport layover planning.',
    note: 'Best time to visit, what to wear, coffee ceremony etiquette, day trips and layover planning.',
    tags: ['travel guide', 'ethiopia', 'planning', 'etiquette', 'weather'],
    capabilities: ['trip-planning', 'practical-information'],
    queries: [
      'When is the best time to visit Ethiopia?',
      'What should I wear when visiting churches in Ethiopia?',
      'How does the Ethiopian coffee ceremony work?',
    ],
  },
  {
    path: '/why-choose-us/',
    ns: 'page',
    id: 'why-choose-us',
    displayName: 'Why Choose Us',
    summary:
      'How we work: local guides, direct booking, licensed operations and free cancellation up to 24 hours before the tour start time.',
    note: 'How we work, our licensing and our cancellation policy.',
    tags: ['why choose us', 'direct booking', 'cancellation', 'licensed'],
    capabilities: ['company-information', 'booking-policies'],
    queries: [
      'Why should I book directly with Addis Ababa by Locals?',
      'What is your cancellation policy?',
      'Are your tours licensed?',
    ],
  },
  {
    path: '/about/',
    ns: 'page',
    id: 'about',
    displayName: 'About Us',
    summary:
      'Locally owned Addis Ababa tour company founded by local guides, licensed by Ministry of Tourism of Ethiopia — our story, our team and how we work.',
    note: 'Our story, our team and how we run our tours.',
    tags: ['about', 'company', 'local guides', 'licensed'],
    capabilities: ['company-information', 'trust-and-licensing'],
    queries: [
      'Who runs Addis Ababa by Locals?',
      'Are you licensed by the Ministry of Tourism of Ethiopia?',
      'How long have you been operating in Addis Ababa?',
    ],
  },
  {
    path: '/reviews/',
    ns: 'page',
    id: 'reviews',
    displayName: 'Reviews',
    summary: 'Traveller feedback on our tours, published as written reviews you can read before booking.',
    note: 'Traveller feedback on our tours, published as written reviews.',
    tags: ['reviews', 'feedback', 'travellers'],
    capabilities: ['traveller-feedback', 'company-information'],
    queries: [
      'What do travellers say about your tours?',
      'Where can I read reviews of your tours?',
      'How do customers describe the guides?',
    ],
  },
  {
    path: '/terms/',
    ns: 'legal',
    id: 'terms',
    displayName: 'Terms of Service',
    summary: 'Terms of service governing use of this website and its booking services.',
    note: 'Terms governing use of this website and its booking services.',
    tags: ['terms', 'legal', 'service terms'],
    capabilities: ['legal-information'],
    queries: ['What are the terms of service?', 'What terms apply to bookings made on this site?'],
  },
  {
    path: '/privacy/',
    ns: 'legal',
    id: 'privacy',
    displayName: 'Privacy Policy',
    summary: 'How we collect, use and protect the personal details you send through our enquiry and booking forms.',
    note: 'How we collect, use and protect the details you send through our forms.',
    tags: ['privacy', 'legal', 'personal data'],
    capabilities: ['legal-information'],
    queries: ['What does the privacy policy cover?', 'How do you handle my personal data?'],
  },
  {
    path: '/cancellation-policy/',
    ns: 'legal',
    id: 'cancellation-policy',
    displayName: 'Cancellation Policy',
    summary:
      'Cancellation and refund rules, including free cancellation up to 24 hours before the tour start time.',
    note: 'Refund windows, including free cancellation up to 24 hours before the tour start time.',
    tags: ['cancellation', 'refunds', 'legal'],
    capabilities: ['legal-information', 'booking-policies'],
    queries: ['What is your cancellation policy?', 'Can I cancel a tour for a full refund?'],
  },
  {
    path: '/cookies/',
    ns: 'legal',
    id: 'cookies',
    displayName: 'Cookie Policy',
    summary: 'Which cookies this website uses and how to control them.',
    note: 'Which cookies this site uses and how to control them.',
    tags: ['cookies', 'legal'],
    capabilities: ['legal-information'],
    queries: ['What cookies does this website use?', 'How can I control cookies on this site?'],
  },
];

/**
 * llms.txt section order. `derived: true` expands to every tour detail page in
 * tours.json order; `lines` are emitted verbatim and used where a section needs
 * contact details rather than links.
 */
const LLMS_SECTIONS = [
  { title: 'Start here', paths: ['/'] },
  {
    title: 'Book',
    paths: ['/tours/', '/book/', '/custom-tour/', '/guides/', '/contact/'],
  },
  { title: 'Tours', derived: true },
  {
    title: 'Explore',
    paths: ['/things-to-do/', '/where-to-stay/', '/airport-transfers/', '/car-hire/'],
  },
  {
    title: 'Plan and learn',
    paths: ['/travel-guide/', '/why-choose-us/', '/about/', '/reviews/'],
  },
  {
    title: 'Contact',
    lines: (brand) => [
      `- [Contact page](${brand.origin}/contact/): WhatsApp, phone and email — we respond within 24 hours.`,
      `- Phone (WhatsApp): ${brand.phoneDisplay} (international: ${brand.phone})`,
      `- Email: ${brand.email}`,
      `- Office: ${brand.address}`,
    ],
  },
  {
    title: 'Legal',
    paths: ['/terms/', '/privacy/', '/cancellation-policy/', '/cookies/'],
  },
];

/**
 * Queries an agent would actually type, per tour slug. Curated rather than
 * templated so a new tour has to be given copy: a missing slug fails the build.
 */
const TOUR_QUERIES = {
  'half-day-addis-ababa-city-tour': [
    'Is the half-day city tour enough for an airport layover?',
    'What is included in the half-day Addis Ababa tour?',
    'How long does the half-day city tour take?',
  ],
  'full-day-addis-ababa-city-tour': [
    'What is included in the full-day Addis Ababa tour?',
    'How long does the full-day city tour take?',
    'Does the full-day tour include a coffee ceremony?',
  ],
  'addis-ababa-highlights-tour': [
    'What does the Addis Ababa Highlights Tour cover?',
    'How long is the Addis Ababa Highlights Tour?',
    'Is the highlights tour suitable for a first visit?',
  ],
  'debre-libanos-portuguese-bridge': [
    'Can I see gelada baboons on the Debre Libanos day trip?',
    'How long is the Debre Libanos and Portuguese Bridge day trip?',
    'What is included in the Debre Libanos day trip?',
  ],
  'tiya-adadi-mariam-melka-kunture': [
    'What will we see on the Tiya and Adadi Mariam day trip?',
    'How long is the Tiya UNESCO day trip?',
    'Is the Tiya day trip suitable for history enthusiasts?',
  ],
  'menagesha-forest-day-trip': [
    'What is included in the Menagesha Forest day trip?',
    'How long does the Menagesha Forest day trip take?',
    'Are there waterfalls on the Menagesha Forest day trip?',
  ],
  'bishoftu-crater-lakes': [
    'Can we swim at the Bishoftu crater lakes?',
    'How long is the Bishoftu crater lakes day trip?',
    'What is included in the Bishoftu day trip?',
  ],
  'airport-layover-tour': [
    'Can I take a tour during an airport layover in Addis Ababa?',
    'How long is the airport layover tour?',
    'Will I get back to the airport in time for my flight?',
  ],
  'private-group-tours': [
    'Can you arrange a private tour for my group?',
    'How long can a private group tour be?',
    'What is included in a private group tour?',
  ],
};

function fail(message) {
  throw new Error(`[agent-files] ${message}`);
}

/** Reads a quoted string field out of `src/config/brand.ts`. */
function readBrand() {
  const path = join(ROOT, 'src/config/brand.ts');
  if (!existsSync(path)) fail(`missing ${path}`);
  const source = readFileSync(path, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');

  const field = (name) => {
    const match = source.match(new RegExp(`\\b${name}:\\s*'([^']+)'`));
    if (!match) fail(`src/config/brand.ts is missing \`${name}\``);
    return match[1];
  };

  const brand = {
    name: field('name'),
    domain: field('domain'),
    email: field('email'),
    phone: field('phone'),
    phoneDisplay: field('phoneDisplay'),
    parentCompanyDisplay: field('parentCompanyDisplay'),
    address: field('address'),
    origin: field('origin'),
  };

  if (brand.origin !== `https://${brand.domain}`) {
    fail(`brand.origin (${brand.origin}) does not match brand.domain (${brand.domain})`);
  }
  return brand;
}

/** The canonical URL set, as pathnames. */
function readSitemapPaths(brand) {
  const path = join(ROOT, 'public/sitemap.xml');
  if (!existsSync(path)) fail(`missing ${path}`);
  const xml = readFileSync(path, 'utf8');
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    let url;
    try {
      url = new URL(match[1]);
    } catch {
      fail(`public/sitemap.xml has an unparseable <loc>: ${match[1]}`);
    }
    if (url.origin !== brand.origin) {
      fail(`public/sitemap.xml lists ${url.origin}, expected ${brand.origin}`);
    }
    return url.pathname;
  });
  if (!paths.length) fail('public/sitemap.xml lists no URLs');
  return paths;
}

/** Tour detail pages, derived so they cannot drift from the content file. */
function readTours(brand) {
  const path = join(ROOT, 'src/content/tours.json');
  if (!existsSync(path)) fail(`missing ${path}`);
  const tours = JSON.parse(readFileSync(path, 'utf8')).tours;
  if (!Array.isArray(tours) || !tours.length) fail('src/content/tours.json has no tours');

  return tours.map((tour) => {
    for (const key of ['slug', 'name', 'subtitle', 'shortDescription', 'duration', 'tourType']) {
      if (typeof tour[key] !== 'string' || !tour[key].trim()) {
        fail(`tour "${tour.slug ?? '<no slug>'}" is missing \`${key}\``);
      }
    }
    const queries = TOUR_QUERIES[tour.slug];
    if (!queries) {
      fail(
        `tour "${tour.slug}" has no curated queries — add it to TOUR_QUERIES in ` +
          'scripts/generate-agent-files.mjs',
      );
    }
    return {
      slug: tour.slug,
      name: tour.name,
      subtitle: tour.subtitle,
      duration: tour.duration,
      tourType: tour.tourType,
      url: `${brand.origin}/tours/${tour.slug}/`,
      description: `${tour.shortDescription} Duration: ${tour.duration}.`,
      queries,
    };
  });
}

function pageEntry(page, brand) {
  return {
    identifier: `urn:air:${brand.domain}:${page.ns}:${page.id}`,
    displayName: page.displayName,
    type: 'text/html',
    url: `${brand.origin}${page.path}`,
    description: page.summary,
    tags: page.tags,
    capabilities: page.capabilities,
    representativeQueries: page.queries,
  };
}

function tourEntry(tour, brand) {
  return {
    identifier: `urn:air:${brand.domain}:tour:${tour.slug}`,
    displayName: tour.name,
    type: 'text/html',
    url: tour.url,
    description: tour.description,
    tags: ['tour', tour.tourType, 'addis ababa'],
    capabilities: ['tour-details', 'availability', 'booking'],
    representativeQueries: tour.queries,
  };
}

function buildManifest(entries, brand) {
  return `${JSON.stringify(
    {
      specVersion: '1.0',
      host: {
        displayName: brand.name,
        documentationUrl: `${brand.origin}/about/`,
      },
      entries,
    },
    null,
    2,
  )}\n`;
}

function buildLlmsTxt(brand, pageByPath, tours) {
  const lines = [
    `# ${brand.name}`,
    '',
    `> ${brand.name} is a locally owned tour operator in Addis Ababa, Ethiopia. ` +
      'We run private and small-group city tours, day trips and custom itineraries ' +
      'with local guides who live here.',
    '',
    `Powered by ${brand.parentCompanyDisplay}. Licensed by Ministry of Tourism of Ethiopia. ` +
      'Save 15% when you book direct, with free cancellation up to 24 hours before the ' +
      'tour start time.',
  ];

  for (const section of LLMS_SECTIONS) {
    lines.push('', `## ${section.title}`, '');

    if (section.derived) {
      for (const tour of tours) {
        lines.push(
          `- [${tour.name}](${tour.url}) — ${tour.duration}: ${tour.subtitle}.`,
        );
      }
      continue;
    }
    if (section.lines) {
      lines.push(...section.lines(brand));
      continue;
    }
    for (const path of section.paths) {
      const page = pageByPath.get(path);
      if (!page) fail(`llms section "${section.title}" links to an unknown page: ${path}`);
      lines.push(`- [${page.displayName}](${brand.origin}${path}): ${page.note}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

/** Set of pathnames linked from the generated llms.txt. */
function llmsLinkPaths(text, brand) {
  const paths = new Set();
  for (const [, target] of text.matchAll(/\]\(([^)]+)\)/g)) {
    let url;
    try {
      url = new URL(target, brand.origin);
    } catch {
      fail(`llms.txt links to an unparseable URL: ${target}`);
    }
    if (url.origin !== brand.origin) {
      fail(`llms.txt links off-site: ${target}`);
    }
    paths.add(url.pathname);
  }
  return paths;
}

function assertNoForbiddenClaims(label, text) {
  for (const pattern of FORBIDDEN_CLAIMS) {
    const match = text.match(pattern);
    if (match) fail(`${label} contains an unapproved claim: "${match[0]}"`);
  }
}

function main() {
  const brand = readBrand();
  const sitemapPaths = readSitemapPaths(brand);
  const tours = readTours(brand);
  const pageByPath = new Map(PAGES.map((page) => [page.path, page]));

  // Sitemap ↔ curated copy, both directions.
  const withoutCopy = sitemapPaths.filter((path) => !pageByPath.has(path));
  if (withoutCopy.length) {
    fail(
      `public/sitemap.xml lists URLs with no agent copy: ${withoutCopy.join(', ')} — ` +
        'add them to PAGES in scripts/generate-agent-files.mjs',
    );
  }
  const notInSitemap = PAGES.map((page) => page.path).filter(
    (path) => !sitemapPaths.includes(path),
  );
  if (notInSitemap.length) {
    fail(
      `PAGES lists paths that public/sitemap.xml does not: ${notInSitemap.join(', ')} — ` +
        'either add them to the sitemap or drop them here',
    );
  }

  // Every page must appear in llms.txt exactly once, and no section may link
  // somewhere the sitemap does not list (tours are the documented exception).
  const tourPaths = new Set(tours.map((tour) => new URL(tour.url).pathname));
  const listed = [];
  for (const section of LLMS_SECTIONS) {
    if (section.derived || section.lines) continue;
    for (const path of section.paths) {
      if (!pageByPath.has(path)) {
        fail(`llms section "${section.title}" links to an unknown page: ${path}`);
      }
      listed.push(path);
    }
  }
  const duplicated = listed.filter((path, index) => listed.indexOf(path) !== index);
  if (duplicated.length) {
    fail(`llms.txt lists these pages more than once: ${[...new Set(duplicated)].join(', ')}`);
  }
  const unlisted = PAGES.map((page) => page.path).filter((path) => !listed.includes(path));
  if (unlisted.length) {
    fail(
      `these pages are missing from llms.txt: ${unlisted.join(', ')} — add them to ` +
        'LLMS_SECTIONS in scripts/generate-agent-files.mjs',
    );
  }

  const entries = [...PAGES.map((page) => pageEntry(page, brand)), ...tours.map((tour) => tourEntry(tour, brand))];

  const identifiers = new Set();
  for (const entry of entries) {
    if (!URN_PATTERN.test(entry.identifier)) fail(`bad ARD identifier: ${entry.identifier}`);
    if (identifiers.has(entry.identifier)) fail(`duplicate ARD identifier: ${entry.identifier}`);
    if (entry.representativeQueries.length < 2 || entry.representativeQueries.length > 5) {
      fail(
        `${entry.displayName} has ${entry.representativeQueries.length} representativeQueries ` +
          '(the ARD schema allows 2-5)',
      );
    }
  }

  const manifest = buildManifest(entries, brand);
  const llmsTxt = buildLlmsTxt(brand, pageByPath, tours);

  assertNoForbiddenClaims('the ARD manifest', manifest);
  assertNoForbiddenClaims('llms.txt', llmsTxt);

  // The llms.txt link inventory must cover the sitemap exactly.
  const linked = llmsLinkPaths(llmsTxt, brand);
  const uncovered = sitemapPaths.filter((path) => !linked.has(path));
  if (uncovered.length) {
    fail(`llms.txt does not link to: ${uncovered.join(', ')}`);
  }
  const bogus = [...linked].filter((path) => !sitemapPaths.includes(path) && !tourPaths.has(path));
  if (bogus.length) {
    fail(`llms.txt links to pages that are not in the route table: ${bogus.join(', ')}`);
  }

  const manifestPaths = new Set(entries.map((entry) => new URL(entry.url).pathname));
  const missingEntries = [...sitemapPaths, ...tourPaths].filter((path) => !manifestPaths.has(path));
  if (missingEntries.length) {
    fail(`the ARD manifest has no entry for: ${missingEntries.join(', ')}`);
  }

  const outputs = [
    ['public/llms.txt', llmsTxt],
    ['public/.well-known/ard.json', manifest],
    ['public/.well-known/ai-catalog.json', manifest],
    ['public/ai-catalog.json', manifest],
  ];

  if (CHECK) {
    const stale = outputs
      .filter(([relative, content]) => {
        const target = join(ROOT, relative);
        return !existsSync(target) || readFileSync(target, 'utf8') !== content;
      })
      .map(([relative]) => relative);
    if (stale.length) {
      fail(
        `generated files are out of date: ${stale.join(', ')} — run ` +
          '`npm run agent-files` and commit the result',
      );
    }
    console.log(`[agent-files] ${outputs.length} generated files are up to date`);
    return null;
  }

  for (const [relative, content] of outputs) {
    const target = join(ROOT, relative);
    if (existsSync(target) && readFileSync(target, 'utf8') === content) continue;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    console.log(`[agent-files] wrote ${relative}`);
  }

  return { entries: entries.length, tours: tours.length };
}

try {
  const summary = main();
  if (summary) {
    console.log(
      `[agent-files] ${summary.entries} ARD entries (${summary.tours} tour pages), ` +
        'llms.txt and 3 manifest copies',
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
