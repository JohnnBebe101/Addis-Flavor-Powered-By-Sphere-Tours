/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'am' | 'fr';

export interface Translations {
  announcement: string;
  brandName: string;
  navExperiences: string;
  navStory: string;
  navBook: string;
  navBecomeHost: string;
  navHelp: string;
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
  nameEn: string;
  nameAm: string;
  nameFr: string;
  tagEn: string;
  tagAm: string;
  tagFr: string;
  price: number;
  durationEn: string;
  durationAm: string;
  durationFr: string;
  descEn: string;
  descAm: string;
  descFr: string;
  emoji: string;
  imageUrl: string;
  stepsEn: string[];
  stepsAm: string[];
  stepsFr: string[];
  stepsDescEn: string[];
  stepsDescAm: string[];
  stepsDescFr: string[];
}

export interface HostReview {
  id: string;
  quoteEn: string;
  quoteAm: string;
  quoteFr: string;
  authorEn: string;
  authorAm: string;
  authorFr: string;
  locationEn: string;
  locationAm: string;
  locationFr: string;
}
