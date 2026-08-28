/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en';

export interface Translations {
  announcement: string;
  brandName: string;
  navExperiences: string;
  navStory: string;
  navBook: string;
  navBecomeHost: string;
  navHelp: string;
  navContact: string;
  navGiveGift: string;
  navLogin: string;
  navSignUp: string;
  heroTitle: string;
  heroSub: string;
  heroSearchPlaceholder: string;
  vettedTitle: string;
  vettedSub: string;
  vettedDesc: string;
  reviewTitle: string;
  guaranteeVetted: string;
  guaranteeTitle: string;
  guaranteePrivate: string;
  guaranteeVettedSub: string;
  guaranteeTitleSub: string;
  guaranteePrivateSub: string;
  notTravelingTitle: string;
  notTravelingSub: string;
  viewOnlineClasses: string;
  bookNowButton: string;
  dietaryFilterLabel: string;
  dietaryAll: string;
  dietaryVegan: string;
  dietaryGlutenFree: string;
  dietaryHalal: string;
  durationLabel: string;
  priceLabel: string;
  reviewsCountLabel: string;
  stepAbol: string;
  stepTona: string;
  stepBereka: string;
  stepDate: string;
  stepCustomize: string;
  stepConfirm: string;
  jebenaInteractiveTitle: string;
  jebenaInteractiveSub: string;
  darkRitualToggle: string;
  darkRitualActive: string;
}

export interface ExperiencePackage {
  id: string;
  name: string;
  tag: string;
  price: number;
  duration: string;
  desc: string;
  emoji: string;
  imageUrl: string;
  steps: string[];
  stepsDesc: string[];
}

export interface HostReview {
  id: string;
  quote: string;
  author: string;
  location: string;
}
