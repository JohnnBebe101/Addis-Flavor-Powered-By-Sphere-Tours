/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en';

export interface Translations {
  brandName: string;
  navTours: string;
  navDestinations: string;
  navWhyChooseUs: string;
  navTravelGuide: string;
  navContact: string;
  navBook: string;
  heroSearchPlaceholder: string;
  bookNowButton: string;
}

export interface TourItineraryItem {
  time: string;
  activity: string;
  duration: string;
}

export interface TourPricingTier {
  adult: number;
  child: number;
  infant: number;
}

export interface TourPricing {
  currency: string;
  private: Record<string, TourPricingTier>;
  smallGroup: TourPricingTier;
}

export interface TourFAQ {
  question: string;
  answer: string;
}

export interface TourSEO {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  h2s: string[];
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  tourType: string;
  duration: string;
  durationMinutes: number;
  groupSize: string;
  maxGroupSize: number;
  rating: number;
  reviewCount: number;
  availability: string;
  difficulty: string;
  minAge: number;
  itinerary: TourItineraryItem[];
  highlights: string[];
  included: string[];
  excluded: string[];
  pricing: TourPricing;
  pickupPolicy: string;
  meetingPoint: string;
  whatToBring: string[];
  fitnessLevel: string;
  cancellationPolicy: string;
  faqs: TourFAQ[];
  images: string[];
  relatedTours: string[];
  seo: TourSEO;
  lastVerified: string;
}

export interface ToursData {
  tours: Tour[];
  metadata: {
    totalTours: number;
    tourTypes: string[];
    currency: string;
    lastUpdated: string;
    version: string;
  };
}

export interface DestinationAttraction {
  name: string;
  description: string;
  visitDuration: string;
  entranceFee: string;
}

export interface DestinationBestTime {
  season: string;
  temperature: string;
  rainfall: string;
  crowds: string;
  bestFor: string;
}

export interface DestinationGettingThere {
  airport?: string;
  transport?: string;
  fromAirport?: string;
  fromAddisAbaba?: string;
  roadConditions?: string;
}

export interface DestinationWhereToStay {
  neighborhoods?: string[];
  hotelTypes?: string;
  note?: string;
  alternatives?: string;
  options?: string;
}

export interface DestinationSEO {
  pageTitle: string;
  metaDescription: string;
  h1: string;
  h2s: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  topAttractions: DestinationAttraction[];
  bestTimeToVisit: DestinationBestTime;
  gettingThere: DestinationGettingThere;
  whereToStay: DestinationWhereToStay;
  safetyTips: string[];
  culturalEtiquette: string[];
  relatedTours: string[];
  seo: DestinationSEO;
  lastVerified: string;
}

export interface DestinationsData {
  destinations: Destination[];
  metadata: {
    totalDestinations: number;
    lastUpdated: string;
    version: string;
  };
}

export interface HomeHeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustSignal: string;
  image: string;
}

export interface HomeTrustStrip {
  column1: string;
  column2: string;
  column3: string;
}

export interface HomeTourCategory {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
  link: string;
}

export interface HomeTourCategorySelector {
  headline: string;
  subheadline: string;
  categories: HomeTourCategory[];
}

export interface HomeFeaturedTours {
  headline: string;
  subheadline: string;
}

export interface HomeWhyChooseUsBenefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface HomeWhyChooseUs {
  headline: string;
  benefits: HomeWhyChooseUsBenefit[];
}

export interface HomeAddisHighlight {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface HomeAddisHighlights {
  headline: string;
  subheadline: string;
  attractions: HomeAddisHighlight[];
}

export interface HomeDayTripDestination {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface HomeDayTripDestinations {
  headline: string;
  subheadline: string;
  destinations: HomeDayTripDestination[];
}

export interface HomeBookingStep {
  id: number;
  title: string;
  description: string;
}

export interface HomeHowBookingWorks {
  headline: string;
  steps: HomeBookingStep[];
}

export interface HomeReviewsSection {
  headline: string;
  tripadvisorUrl: string;
  ctaText: string;
}

export interface HomePracticalInfoColumn {
  id: number;
  title: string;
  description: string;
}

export interface HomePracticalInfo {
  headline: string;
  columns: HomePracticalInfoColumn[];
  ctaLink: string;
}

export interface HomeFinalCTA {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface HomeData {
  hero: { slides: HomeHeroSlide[] };
  trustStrip: HomeTrustStrip;
  tourCategorySelector: HomeTourCategorySelector;
  featuredTours: HomeFeaturedTours;
  whyChooseUs: HomeWhyChooseUs;
  addisHighlights: HomeAddisHighlights;
  dayTripDestinations: HomeDayTripDestinations;
  howBookingWorks: HomeHowBookingWorks;
  reviewsSection: HomeReviewsSection;
  practicalInfo: HomePracticalInfo;
  finalCta: HomeFinalCTA;
  metadata: { lastUpdated: string; version: string };
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface FAQsData {
  faqs: {
    general: FAQItem[];
    booking: FAQItem[];
    tours: FAQItem[];
    practical: FAQItem[];
  };
  metadata: {
    totalFaqs: number;
    categories: string[];
    lastUpdated: string;
    version: string;
  };
}

export type Review = Testimonial;

export interface TripAdvisorWidget {
  rating: number;
  totalReviews: number;
  url: string;
  embedCode: string;
}

export interface ReviewsData {
  reviews: Review[];
  tripadvisorWidget: TripAdvisorWidget;
  metadata: {
    totalReviews: number;
    averageRating: number;
    lastUpdated: string;
    version: string;
  };
}

export interface AboutTeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AboutWhyDifferentPoint {
  title: string;
  description: string;
}

export interface AboutData {
  hero: {
    headline: string;
    subheadline: string;
    image: string;
  };
  ourStory: {
    headline: string;
    content: string;
  };
  ourTeam: {
    headline: string;
    members: AboutTeamMember[];
  };
  mission: {
    headline: string;
    points: string[];
  };
  licenses: {
    headline: string;
    items: string[];
  };
  whyDifferent: {
    headline: string;
    points: AboutWhyDifferentPoint[];
  };
  metadata: { lastUpdated: string; version: string };
}

export interface TravelGuideArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  image: string;
}

export interface TravelGuideCategory {
  id: string;
  name: string;
  count: number;
}

export interface TravelGuideData {
  hero: {
    headline: string;
    subheadline: string;
  };
  articles: TravelGuideArticle[];
  categories: TravelGuideCategory[];
  metadata: {
    totalArticles: number;
    lastUpdated: string;
    version: string;
  };
}

export interface BookingPolicy {
  cancellation: {
    headline: string;
    content: string;
    points: string[];
  };
  booking: {
    headline: string;
    content: string;
    points: string[];
  };
  pricing: {
    headline: string;
    content: string;
    points: string[];
  };
}

export interface BookingFlowStep {
  title: string;
  fields: BookingFormField[];
}

export interface BookingFormField {
  name: string;
  label: string;
  type: 'select' | 'date' | 'number' | 'text' | 'email' | 'tel' | 'textarea' | 'readonly';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  value?: string;
}

export interface BookingFlow {
  step1: BookingFlowStep;
  step2: BookingFlowStep;
  step3: BookingFlowStep;
}

export interface BookingData {
  policies: BookingPolicy;
  bookingFlow: BookingFlow;
  metadata: { lastUpdated: string; version: string };
}

export interface ContactHero {
  headline: string;
  subheadline: string;
  image: string;
}

export interface ContactInfo {
  headline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  required: boolean;
  placeholder: string;
  options?: string[];
}

export interface ContactForm {
  headline: string;
  fields: ContactFormField[];
  submitText: string;
  successMessage: string;
}

export interface CustomTourInquiryField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required: boolean;
  placeholder: string;
  options?: string[];
}

export interface CustomTourInquiry {
  headline: string;
  subheadline: string;
  fields: CustomTourInquiryField[];
  submitText: string;
  successMessage: string;
}

export interface TravelAgentPartnershipField {
  name: string;
  label: string;
  type: 'text' | 'url' | 'select' | 'textarea';
  required: boolean;
  placeholder: string;
  options?: string[];
}

export interface TravelAgentPartnership {
  headline: string;
  subheadline: string;
  fields: TravelAgentPartnershipField[];
  submitText: string;
  successMessage: string;
}

export interface ContactFAQ {
  question: string;
  answer: string;
}

export interface ContactMap {
  headline: string;
  address: string;
  coordinates: { lat: number; lng: number };
  embedCode: string;
}

export interface ContactData {
  hero: ContactHero;
  contactInfo: ContactInfo;
  contactForm: ContactForm;
  customTourInquiry: CustomTourInquiry;
  travelAgentPartnership: TravelAgentPartnership;
  faqs: { headline: string; items: ContactFAQ[] };
  map: ContactMap;
  metadata: { lastUpdated: string; version: string };
}

export interface NavigationHeader {
  logo: {
    text: string;
    link: string;
    alt: string;
  };
  mainMenu: NavigationMenuItem[];
  ctaButton: {
    text: string;
    link: string;
    color: string;
  };
}

export interface NavigationMenuItem {
  label: string;
  link: string;
  type: 'dropdown' | 'link';
  columns?: NavigationDropdownColumn[];
}

export interface NavigationDropdownColumn {
  title: string;
  items: NavigationDropdownItem[];
}

export interface NavigationDropdownItem {
  label: string;
  link: string;
  price?: string;
  duration?: string;
  description?: string;
}

export interface NavigationMobileMenu {
  items: NavigationMobileItem[];
}

export interface NavigationMobileItem {
  label: string;
  link: string;
  type: 'accordion' | 'link' | 'cta';
  color?: string;
}

export interface NavigationFooterColumn {
  title: string;
  links: NavigationFooterLink[];
}

export interface NavigationFooterLink {
  label: string;
  link: string;
  external?: boolean;
}

export interface NavigationFooter {
  columns: NavigationFooterColumn[];
  bottomRow: {
    copyright: string;
    poweredBy: string;
  };
}

export interface NavigationData {
  header: NavigationHeader;
  mobileMenu: NavigationMobileMenu;
  footer: NavigationFooter;
  metadata: { lastUpdated: string; version: string };
}

export interface SEOPageMetadata {
  path: string;
  title: string;
  description: string;
  h1: string;
  h2s: string[];
}

export interface SEOData {
  pages: Record<string, SEOPageMetadata>;
  metadata: { totalPages: number; lastUpdated: string; version: string };
}

export interface UIButtons {
  primary: string;
  secondary: string;
  tertiary: string;
  cta: string;
  whatsapp: string;
  contact: string;
  viewItineraries: string;
  browseTours: string;
  exploreDayTrips: string;
  buildYourTour: string;
  checkAvailability: string;
  reserveYourSpot: string;
  readMore: string;
  seeDetails: string;
  readFullItinerary: string;
  compareTours: string;
  planMyDay: string;
  viewAllReviews: string;
  viewAllFaqs: string;
}

export interface UIFormLabels {
  booking: {
    tour: string;
    tourPlaceholder: string;
    date: string;
    datePlaceholder: string;
    guests: string;
    guestsPlaceholder: string;
    pickupLocation: string;
    pickupLocationPlaceholder: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    specialRequirements: string;
    specialRequirementsPlaceholder: string;
  };
  contact: {
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topic: string;
    topicPlaceholder: string;
    message: string;
    messagePlaceholder: string;
  };
}

export interface UIErrorMessages {
  booking: string[];
  contact: string[];
  general: string[];
}

export interface UISuccessMessages {
  booking: string;
  contact: string;
  newsletter: string;
}

export interface UILoadingMessages {
  loadingMessages: string[];
}

export interface UIProgressBarLabels {
  progressBarLabels: string[];
}

export interface UITooltips {
  booking: {
    tourDate: string;
    numberOfGuests: string;
    pickupLocation: string;
  };
  pricing: {
    childPrice: string;
    privateTour: string;
  };
}

export interface UIConstantsData {
  buttons: UIButtons;
  formLabels: UIFormLabels;
  errorMessages: UIErrorMessages;
  successMessages: UISuccessMessages;
  loadingMessages: UILoadingMessages;
  progressBarLabels: UIProgressBarLabels;
  tooltips: UITooltips;
  metadata: { lastUpdated: string; version: string };
}

export interface Testimonial {
  id: string;
  tourId: string;
  tourName: string;
  rating: number;
  title: string;
  text: string;
  author: string;
  location: string;
  date: string;
  verified: boolean;
  helpful: number;
}