/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Translations, ExperiencePackage, HostReview } from './types';
import { BRAND } from './config/brand';
import cookingClassImg from './assets/images/addis_cooking_class_1782233734033.jpg';
import heroBgImg from './assets/images/addis_hero_bg_1782233695273.jpg';
import jebenaPourImg from './assets/images/addis_jebena_pour_1782233715156.jpg';

export const TRANSLATIONS: Translations = {
  announcement:
    'Check out our online cooking classes & custom virtual Ethiopian coffee ceremonies!',
  brandName: BRAND.name,
  navExperiences: 'Experiences',
  navStory: 'Our Story',
  navBook: 'Book',
  navBecomeHost: 'Become a Host',
  navHelp: 'Help',
  navContact: 'Contact Us',
  navGiveGift: 'Give a Gift',
  navLogin: 'Login',
  navSignUp: 'Sign Up',
  heroTitle: 'TRAVEL OFF THE EATEN PATH IN ADDIS ABABA',
  heroSub: 'Book private cooking classes and home meals with the best local hosts in Addis Ababa.',
  heroSearchPlaceholder: 'What do you want to experience?',
  vettedTitle: '100% of hosts are personally vetted',
  vettedSub:
    'We find the best home cooks in Addis Ababa so you can immerse yourself in meaningful food experiences and cultural traditions.',
  vettedDesc:
    'Connect with local culture through food. Visit a mother or grandmother in her kitchen in Addis Ababa, learn to bake spongy Injera, blend spicy Berbere, and experience the traditional hospitality first-hand. Choose from three unique local experiences with our vetted hosts.',
  reviewTitle: 'Traveler Reviews from Addis Ababa',
  guaranteeVetted: '100% Vetted Hosts',
  guaranteeTitle: 'Satisfaction Guaranteed',
  guaranteePrivate: '100% Private Experiences',
  guaranteeVettedSub:
    'Every host kitchen is personally inspected for safety and culinary excellence.',
  guaranteeTitleSub: "Love your local experience, or we'll make it right with our host guarantee.",
  guaranteePrivateSub: 'Just you, your travel companion, and your warm local host family.',
  notTravelingTitle: 'Not in Addis Ababa?',
  notTravelingSub: 'Join our warm local hosts virtually with interactive live workshops.',
  viewOnlineClasses: 'VIEW ONLINE CLASSES',
  bookNowButton: 'BOOK EXPERIENCE',
  dietaryFilterLabel: 'Dietary Preferences:',
  dietaryAll: 'All Foods',
  dietaryVegan: 'Vegan (Fasting / Bayenetu)',
  dietaryGlutenFree: 'Gluten-Free (Pure Teff Injera)',
  dietaryHalal: 'Halal Options',
  durationLabel: 'Duration',
  priceLabel: 'Starting price',
  reviewsCountLabel: 'vetted reviews',
  stepAbol: 'Abol (1st Round)',
  stepTona: 'Tona (2nd Round)',
  stepBereka: 'Bereka (3rd Round)',
  stepDate: 'Select Date',
  stepCustomize: 'Customize',
  stepConfirm: 'Confirmation',
  jebenaInteractiveTitle: 'The Sacred Coffee Ritual: Clay Jebena Journey',
  jebenaInteractiveSub:
    'Ethiopian coffee ceremonies are a spiritual gesture of welcome. Click or slide through the traditional three brew rounds to understand the beautiful mindfulness timeline.',
  darkRitualToggle: 'Simulate dim incense-lit room (Dark Mode)',
  darkRitualActive: 'Room dimmed. Smell the burning frankincense...',
};

export const PACKAGES: ExperiencePackage[] = [
  // TODO: Replace with city tour packages when content is ready
  {
    id: 'cooking-class',
    name: 'Addis Ababa Master Cooking Class',
    tag: 'Baking, Spices & Coffee Roasting',
    price: 49,
    duration: '3.5 - 4 hours',
    emoji: '🍳',
    imageUrl: cookingClassImg,
    desc: 'Learn the secrets of ancient Ethiopian cooking under the guidance of a friendly neighborhood host. Sift teff flour, pour sourdough onto the hot Mitad clay griddle, and balance direct flavors in deep slow-cooked wats.',
    steps: [
      'Traditional Shiro Cooking',
      'The Art of Mitad Baking',
      'Hand-Roasting Raw Coffee Beans',
      'The Three-Round Coffee Tasting',
    ],
    stepsDesc: [
      'Learn to whip chickpea powder, garlic, onions, and organic red Berbere pepper into a smooth sizzling traditional Shiro Wat.',
      'Pour the fermented teff batter on the burning hot clay Mitad, watching the classic bubbles (eyes/ayen) form in seconds.',
      'Stir-fry coffee beans over hot coals on an iron pan, feeling the fragrance escape into the kitchen air.',
      'Sit back on fresh green grass, breathe the frankincense, and drink Abol, Tona, and Bereka accompanied by roasted barley.',
    ],
  },
  {
    id: 'home-meal',
    name: 'Local Home Meal Experience & Coffee Ceremony',
    tag: 'Family Table, Hospitality & Music',
    price: 35,
    duration: '2 - 2.5 hours',
    emoji: '🍲',
    imageUrl: heroBgImg,
    desc: 'Step into a beautiful, multi-generational family home in Bole or Piazza. Dine at a traditional Mesob basket, share the multi-dish Beyaynetu feast (or rich meat doro wat), and experience authentic warmth with songs and stories.',
    steps: [
      'The Welcome Greeting',
      'Washing of the Hands Ritual',
      'The Mesob Feast Shared',
      'Warm Family Storytelling',
    ],
    stepsDesc: [
      'Your hosts greet you at the gate with traditional Amharic blessings and help you settle on cozy hand-woven rugs.',
      'A family member pours warm water from a beautiful copper pitcher over your hands right at the table.',
      'The lid of the Mesob basket is lifted to reveal fresh Injera topped with stews, lentils, key wat, and local cottage cheese.',
      'Connect deeply as the elders share historical anecdotes about Addis Ababa, while traditional music plays softly.',
    ],
  },
  {
    id: 'coffee-only',
    name: 'The Sacred Coffee Ceremony & Mindfulness Ritual',
    tag: 'Mindfulness, Clay Jebena & Frankincense',
    price: 25,
    duration: '1.5 hours',
    emoji: '☕',
    imageUrl: jebenaPourImg,
    desc: "An intimate, spiritual immersion into the world's original coffee culture. Sit in an incense-lit room, learn the slow three-pour brewing method using the clay Jebena, and enjoy the calming transition of each round.",
    steps: [
      'The Herb Scented Canvas',
      'The Clay Jebena Brewing',
      'The High-Pour Ritual',
      'Mindfulness Contemplation',
    ],
    stepsDesc: [
      'Step into a space carpeted with freshly cut green grass (Ketema) and yellow daisy petals to invite blessing.',
      'Watch the water heat in the bulbous bottom of the black clay Jebena pot on hot charcoal till it boils up the long neck.',
      'Your host pours the thick, dark coffee from high above in a steady uninterrupted stream into handle-less Finjal cups.',
      'Sip slowly in quiet meditation, letting each round settle your thoughts as frankincense smoke purifies the air.',
    ],
  },
];

export const REVIEWS: HostReview[] = [
  // TODO: Update with city tour reviews
  {
    id: 'rev-1',
    quote:
      'Mimi is incredible! She is so thoughtful and welcoming. We baked our first pure teff Injera on her traditional clay Mitad and the spicy Shiro was divine. She makes the experience feel like coming home.',
    author: 'Sarah Jenkins, USA',
    location: 'Hosted in Bole, Addis Ababa',
  },
  {
    id: 'rev-2',
    quote:
      "Stepping into Seleme's family home in Piazza was the absolute highlight of our trip to Ethiopia. The Mesob feast was filled with laughter, songs, and the richest coffee ceremony we've ever experienced. Unforgettable!",
    author: 'Hiroshi Sato, Japan',
    location: 'Hosted in Piazza, Addis Ababa',
  },
  {
    id: 'rev-3',
    quote:
      'The Sacred Coffee Ceremony deep dive was incredibly moving. The three rounds—Abol, Tona, Bereka—really feel like steps in mindfulness. The scent of roasted beans, cloves, and frankincense is still with me.',
    author: 'Claire Laurent, France',
    location: 'Hosted in Guellele, Addis Ababa',
  },
];

export const PRESS_LOGOS = [
  { name: 'Forbes', quote: 'The next generation of culinary tourism.' },
  { name: 'National Geographic Traveller', quote: 'A deep dive into local living.' },
  { name: 'CNN', quote: 'Authentic, immersive, and highly rewarding.' },
  { name: 'Travel + Leisure', quote: 'Connecting travelers to the heart of the home.' },
  { name: 'Travel Channel', quote: 'Food made with ancient soul and local spices.' },
  { name: 'AFAR', quote: 'Travel that respects and honors true culinary traditions.' },
];

export const NEIGHBORHOOD_DESTINATIONS = [
  // TODO: Update with actual tour destinations
  { name: 'Bole Cooking Classes' },
  { name: 'Piazza Coffee Ceremonies' },
  { name: 'Mercato Guided Spices Tour' },
  { name: 'Guellele Vegetarian Feast' },
  { name: 'Sheraton Area Gourmet Cooking' },
  { name: 'Yeka Hills Traditional Dinner' },
  { name: 'Kazanchis Honey-Wine & Music' },
  { name: 'Sarbet Modern-Ethio Fusion' },
];
