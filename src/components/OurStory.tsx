/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import storyContent from '../content/our-story.json';

import StoryHeroBanner from './story/StoryHeroBanner';
import StoryTabsNav from './story/StoryTabsNav';
import AboutSection from './story/AboutSection';
import FoundersSection from './story/FoundersSection';
import HowItWorksSection from './story/HowItWorksSection';
import SafetySection from './story/SafetySection';
import PressSection from './story/PressSection';
import CareersSection from './story/CareersSection';
import StoryFaqSection from './story/StoryFaqSection';

import cookingClassImg from '../assets/images/addis_cooking_class_1782233734033.jpg';
import heroBgImg from '../assets/images/addis_hero_bg_1782233695273.jpg';
import jebenaPourImg from '../assets/images/addis_jebena_pour_1782233715156.jpg';

interface OurStoryProps {
  isGlobalDark: boolean;
  onBackToHome: () => void;
  onBookClick: () => void;
}

type TabType = 'about' | 'founders' | 'howItWorks' | 'safety' | 'press' | 'careers' | 'faq';

export default function OurStory({ isGlobalDark, onBackToHome, onBookClick }: OurStoryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  const t = storyContent;

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    const element = document.getElementById(`story-section-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div
      className={`transition-colors duration-1000 ${
        isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'
      }`}
    >
      <StoryHeroBanner
        heroBgImg={heroBgImg}
        content={{
          heroTitle: t.heroTitle,
          backBtn: t.backBtn,
          companyInfo: t.companyInfo,
        }}
        onBackToHome={onBackToHome}
      />

      <StoryTabsNav
        activeTab={activeTab}
        tabs={t.tabs}
        isGlobalDark={isGlobalDark}
        onTabClick={handleTabClick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <AboutSection
          content={t.about}
          isGlobalDark={isGlobalDark}
          onBookClick={onBookClick}
          cookingClassImg={cookingClassImg}
          jebenaPourImg={jebenaPourImg}
        />

        <FoundersSection content={t.founders} isGlobalDark={isGlobalDark} />

        <HowItWorksSection content={t.howItWorks} />

        <SafetySection content={t.safety} isGlobalDark={isGlobalDark} />

        <PressSection content={{ ...t.press, logos: ['Forbes', 'CNN', 'Afar', 'Travel+Leisure', 'NatGeo Traveller', 'Women 2.0'] }} />

        <CareersSection
          content={t.careers}
          isGlobalDark={isGlobalDark}
          onBackToHome={onBackToHome}
        />

        <StoryFaqSection
          content={t.faq}
          isGlobalDark={isGlobalDark}
          faqOpen={faqOpen}
          setFaqOpen={setFaqOpen}
          toggleFaq={toggleFaq}
        />
      </div>
    </div>
  );
}