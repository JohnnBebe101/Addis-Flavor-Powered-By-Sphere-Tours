import { useNavigate } from 'react-router-dom';
import aboutData from '../content/about.json';

import AboutHeroBanner from '../components/about/AboutHeroBanner';
import AboutTabsNav from '../components/about/AboutTabsNav';
import AboutSection from '../components/about/AboutSection';
import TeamSection from '../components/about/TeamSection';
import HowItWorksSection from '../components/about/HowItWorksSection';
import SafetySection from '../components/about/SafetySection';
import PressSection from '../components/about/PressSection';
import AboutFAQ from '../components/about/AboutFAQ';

const TABS: Record<string, string> = {
  about: 'About',
  team: 'Team',
  howItWorks: 'How It Works',
  safety: 'Safety',
  press: 'Press',
  careers: 'Careers',
  faq: 'FAQ',
};

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { hero, ourStory, ourTeam, mission, licenses, whyDifferent } = aboutData;

  return (
    <div className="min-h-screen bg-linen-white">
      <AboutHeroBanner
        heroBgImg={hero.image}
        content={{
          heroTitle: hero.headline,
          backBtn: '← Back to Home',
          companyInfo: hero.subheadline,
        }}
        onBackToHome={() => navigate('/')}
      />

      <AboutTabsNav
        activeTab="about"
        tabs={TABS as Record<string, string>}
        isGlobalDark={false}
        onTabClick={() => {}} // TODO: wire tab state management
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <AboutSection
          content={{
            title: ourStory.headline,
            desc1: ourStory.content,
            desc2: hero.subheadline,
            whatWeOfferTitle: 'What Makes Us Different',
            whatWeOfferSubtitle: whyDifferent.headline,
            offer1Title: whyDifferent.points[0]?.title ?? 'Local Ownership',
            offer1Sub: '',
            offer1Desc: whyDifferent.points[0]?.description ?? '',
            offer2Title: whyDifferent.points[1]?.title ?? 'Fair Pricing',
            offer2Sub: '',
            offer2Desc: whyDifferent.points[1]?.description ?? '',
            offer3Title: whyDifferent.points[2]?.title ?? 'Expert Guides',
            offer3Sub: '',
            offer3Desc: whyDifferent.points[2]?.description ?? '',
            bannerQuote: ourStory.content,
            bannerAuthor: 'Addis Ababa City Tours',
            startedTitle: 'Started in 2018',
            startedDesc: ourStory.content,
            startedBtn: 'Book a Tour',
          }}
          isGlobalDark={false}
          onBookClick={() => {}} // TODO: wire to Layout booking modal
          cookingClassImg="/images/about/cooking.jpg"
          jebenaPourImg="/images/about/jebena.jpg"
        />

        <TeamSection
          content={{
            title: ourTeam.headline,
            subtitle: 'The local guides and operators behind every experience.',
            members: ourTeam.members.map((m) => ({
              initial: m.name
                .split(' ')
                .map((n) => n[0])
                .join(''),
              name: m.name,
              title: m.role,
              description: m.bio,
            })),
          }}
          isGlobalDark={false}
        />

        <HowItWorksSection
          content={{
            title: mission.headline,
            step1Title: mission.points[0] ?? 'Select Your Experience',
            step1Desc:
              mission.points[0] ??
              'Browse our tours and choose the one that fits your schedule.',
            step2Title: mission.points[1] ?? 'Book & Confirm',
            step2Desc:
              mission.points[1] ??
              'Choose your date and group size. We handle the rest.',
            step3Title: mission.points[2] ?? 'Experience Ethiopia',
            step3Desc:
              mission.points[2] ??
              'Meet your guide and experience authentic Ethiopia.',
          }}
        />

        <SafetySection
          content={{
            title: licenses.headline,
            subtitle:
              'We prioritize safety, comfort, and top-tier hygiene to ensure your peace of mind.',
            point1Title: licenses.items[0] ?? 'Licensed & Insured',
            point1Desc:
              licenses.items[0] ??
              'Licensed by Ministry of Tourism, fully insured vehicles and guides.',
            point2Title: licenses.items[1] ?? 'Trained Guides',
            point2Desc:
              licenses.items[1] ??
              'All guides trained in safety, first aid, and cultural sensitivity.',
            point3Title: licenses.items[2] ?? 'Sustainable Tourism',
            point3Desc:
              licenses.items[2] ??
              'We support local communities and preserve cultural heritage.',
          }}
          isGlobalDark={false}
        />

        <PressSection
          content={{
            title: whyDifferent.headline,
            quote:
              whyDifferent.points[0]?.description ??
              'We live here, guide here, and know Addis Ababa better than any OTA.',
            featuredIn: 'Trusted by travelers worldwide',
            logos: ['Forbes', 'CNN', 'Afar', 'Travel+Leisure', 'NatGeo Traveller', 'Women 2.0'],
          }}
        />

        <AboutFAQ
          content={{
            title: 'Frequently Asked Questions',
            q0: 'What is the relationship with Sphere Tour and Travel?',
            a0:
              ourStory.content ??
              'Addis Ababa City Tours is an exclusive initiative powered and operated by Sphere Tour and Travel.',
            q1: 'Can my dietary requirements be accommodated?',
            a1: 'Absolutely! Ethiopian cuisine is highly friendly to vegans (due to Orthodox Christian fasting traditions or Bayenetu) and gluten-free diets (using 100% pure Teff Injera).',
            q2: 'Is it a private experience?',
            a2: 'Yes, 100% of our experiences are completely private. It will be just you, your travel companions, and the guide.',
            q3: 'How do I reach the tour meeting point?',
            a3: 'Complimentary pickup from all hotels in central Addis Ababa (Bole, Piassa, Meskel Square areas). Airport pickup available for additional fee.',
          }}
          isGlobalDark={false}
        />
      </div>
    </div>
  );
};

export default AboutPage;
