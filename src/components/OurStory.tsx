/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageSquare, 
  Check, 
  Heart,
  Globe,
  Plus,
  Minus
} from 'lucide-react';
import { Language } from '../types';

import cookingClassImg from '../assets/images/addis_cooking_class_1782233734033.jpg';
import heroBgImg from '../assets/images/addis_hero_bg_1782233695273.jpg';
import hostDiningImg from '../assets/images/addis_host_dining_1782240144545.jpg';
import jebenaPourImg from '../assets/images/addis_jebena_pour_1782233715156.jpg';

interface OurStoryProps {
  currentLang: Language;
  isGlobalDark: boolean;
  onBackToHome: () => void;
  onBookClick: () => void;
}

type TabType = 'about' | 'founders' | 'how-it-works' | 'safety' | 'press' | 'careers' | 'faq';

export default function OurStory({ currentLang, isGlobalDark, onBackToHome, onBookClick }: OurStoryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  // Translations specifically curated for Our Story matching Sphere Tour & Travel
  const content = {
    en: {
      heroTitle: "Travel off the beaten path",
      companyInfo: "COMPANY INFO",
      backBtn: "Back to Home",
      tabs: {
        about: "About",
        founders: "Founders",
        howItWorks: "How it works",
        safety: "Safety",
        press: "Press",
        careers: "Careers",
        faq: "FAQ"
      },
      about: {
        title: "What is Addis Flavor",
        desc1: "Addis Flavor is like having a friend's mom cook you a home cooked meal in every visit. We connect travelers with local, vetted hosts to share the joy of a homemade meal in their home and learn about their cultural and culinary traditions passed down through generations.",
        desc2: "This experience is powered by Sphere Tour and Travel, a leading licensed tour operator based in Addis Ababa, Ethiopia. Sphere Travel is dedicated to crafting sustainable, immersive, and culturally respectful journeys. Together, we open the doors of Ethiopian homes, offering a savory bridge to our rich heritage.",
        whatWeOfferTitle: "What we offer",
        whatWeOfferSubtitle: "To help you experience local cuisine while traveling, Addis Flavor offers in-home meals with our hosts. In addition, we also offer in-home cooking experiences as well as market visits as an add-on to many of the meal experiences. All of our hosts have been vetted to ensure a safe and delightful culinary experience.",
        offer1Title: "In-home Meals",
        offer1Sub: "Approx 1½-2 hrs",
        offer1Desc: "Savor a lovingly prepared feast inside a local host family's dining room, learning cultural dining etiquettes like Gursha.",
        offer2Title: "Cooking Experiences",
        offer2Sub: "Approx 3-4 hrs",
        offer2Desc: "Get hands-on in the kitchen! Learn to bake spongy sourdough Injera and stir complex spicy wot stews from scratch.",
        offer3Title: "Market Visits",
        offer3Sub: "Approx 5+ hrs",
        offer3Desc: "Accompany your host to colorful local spice and grain markets, selecting fresh ingredients and authentic Berbere blends.",
        bannerQuote: "Experience the joy of a homemade meal (and eat it the way the locals do) over conversation about food and culture.",
        bannerAuthor: "Authentic traditional Ethiopian dining with host families in Addis Ababa, Ethiopia.",
        startedTitle: "How we started",
        startedDesc: "Addis Flavor was founded in partnership with Sphere Tour and Travel to bring travelers closer to the real heartbeat of Ethiopia—its people, their stories, and their homes. Sphere Travel is renowned for sustainable tour design. Recognizing that culinary exchange is the ultimate form of cultural connection, we designed Addis Flavor to foster meaningful relationships and support local families by creating sustainable income opportunities for passionate home cooks.",
        startedBtn: "Visit Sphere Tour & Travel"
      },
      founders: {
        title: "Our Visionary Founders",
        subtitle: "A partnership between passionate food enthusiasts and Sphere Tour & Travel's expert local guides.",
        f1Title: "Co-Founder & Lead Host Director",
        f1Desc: "With over 15 years of experience showcasing Ethiopia's cultural richness, her vision is to preserve traditional family recipes and share the legendary warmth of Ethiopian hospitality with the world.",
        f2Title: "General Manager of Sphere Tour and Travel",
        f2Desc: "A sustainable tourism pioneer, he co-founded Addis Flavor to empower local families, bringing authentic and respectful tourism straight to the dining rooms of Addis Ababa."
      },
      howItWorks: {
        title: "How it works",
        step1Title: "1. Select your Experience",
        step1Desc: "Browse our curated, vetted experiences ranging from a simple traditional home-cooked meal to a deep culinary masterclass with market exploration.",
        step2Title: "2. Personalize & Book",
        step2Desc: "Choose your preferred date, share any dietary requirements (vegan, gluten-free, halal), and submit your request through our secure platform.",
        step3Title: "3. Share the Joy",
        step3Desc: "Receive the host address and custom details. Sit at their family table, exchange stories, laugh, cook, and dine like a local."
      },
      safety: {
        title: "Your Safety & Our Vetting Standards",
        subtitle: "We prioritize safety, comfort, and top-tier hygiene to ensure your peace of mind.",
        point1Title: "100% Personally Vetted",
        point1Desc: "We visit every host family multiple times, checking hygiene, ingredient sourcing, cleanliness, and the friendliness of the atmosphere.",
        point2Title: "Health & Care",
        point2Desc: "Our hosts are fully trained in safe food preparation standards, maintaining clean water, and managing global dietary needs like severe allergies.",
        point3Title: "Safe Transits & Access",
        point3Desc: "Located in secure, highly accessible neighborhoods in Addis Ababa, with optional Sphere Travel transport arrangements available."
      },
      press: {
        title: "In the Press",
        quote: "The next generation of culinary tourism. An unforgettable window into the beautiful culinary rituals of Addis Ababa.",
        featuredIn: "Featured & trusted by leading global travel publications"
      },
      careers: {
        title: "Join Our Hospitality Community",
        subtitle: "We are always looking for passionate hosts, local food experts, and cultural guides.",
        c1Title: "Become a Host Family",
        c1Desc: "Earn a sustainable income doing what you love—cooking and hosting! We provide training, safety support, and connect you with global food lovers.",
        c2Title: "Local Culinary Ambassador",
        c2Desc: "Help us discover amazing home cooks across Addis Ababa, translate, and lead tourists through colorful local markets.",
        applyBtn: "Get in Touch"
      },
      faq: {
        title: "Frequently Asked Questions",
        q0: "What is the relationship with Sphere Tour and Travel?",
        a0: "Addis Flavor is an exclusive culinary initiative powered and operated by Sphere Tour and Travel. As a fully licensed travel agency in Ethiopia, Sphere handles booking security, safe transportation, professional guides, and ensures our operations adhere to strict sustainable tourism guidelines.",
        q1: "Can my dietary requirements be accommodated?",
        a1: "Absolutely! Ethiopian cuisine is highly friendly to vegans (due to Orthodox Christian fasting traditions or 'Bayenetu') and gluten-free diets (using 100% pure Teff Injera). We collect your dietary preferences during booking and coordinate with your host family.",
        q2: "Is it a private experience?",
        a2: "Yes, 100% of our experiences are completely private. It will be just you, your travel companions, and the host family. This allows for authentic, intimate conversations and high-quality interaction.",
        q3: "How do I reach the host's house?",
        a3: "Upon confirmation, we provide precise directions, host contact details, and landmarks. Additionally, as part of Sphere Tour and Travel, we can optionally arrange private round-trip hotel transfers with professional drivers."
      }
    },
    am: {
      heroTitle: "ከተለመደው የጉዞ መስመር ወጣ ይበሉ",
      companyInfo: "ስለ ድርጅቱ መረጃ",
      backBtn: "ወደ መነሻ ገጽ",
      tabs: {
        about: "ስለ እኛ",
        founders: "መስራቾች",
        howItWorks: "እንዴት እንደሚሰራ",
        safety: "ደህንነት",
        press: "ጋዜጣዊ መግለጫ",
        careers: "ስራዎች",
        faq: "ተደጋጋሚ ጥያቄዎች"
      },
      about: {
        title: "አዲስ ፍሌቨር ምንድን ነው?",
        desc1: "አዲስ ፍሌቨር በእያንዳንዱ ጉብኝት የጓደኛዎ እናት የቤት ውስጥ ምግብ ያበሰለችልዎ ያህል ነው። ትርጉም ባለው የምግብ ልምዶች እና ከትውልድ ወደ ትውልድ በሚተላለፉ ባህላዊ እና የምግብ አሰራር ወጎች ለመካፈል ተጓዦችን በአካባቢው ካሉ በተረጋገጡ አስተናጋጆች ጋር እናገናኛለን።",
        desc2: "ይህ ልምድ በአዲስ አበባ ኢትዮጵያ በሚገኘው መሪ የጉዞ ወኪል በሆነው በስፌር ቱር ኤንድ ትራቭል (Sphere Tour and Travel) የሚመራ ነው። ስፌር ትራቭል ዘላቂ፣ መሳጭ እና ባህልን የሚያከብሩ ጉዞዎችን ለማዘጋጀት የቆመ ነው። በጋራ በመሆን የኢትዮጵያውያንን የቤት ውስጥ በሮች በመክፈት ወደ ላቀው ቅርሳችን ጣፋጭ ድልድይ እንዘረጋለን።",
        whatWeOfferTitle: "የምናቀርበው",
        whatWeOfferSubtitle: "በሚጓዙበት ጊዜ የአካባቢውን ምግብ እንዲለማመዱ ለመርዳት አዲስ ፍሌቨር ከአስተናጋጆቻችን ጋር የቤት ውስጥ ምግቦችን ያቀርባል። በተጨማሪም፣ ለብዙዎቹ የምግብ ልምዶች ተጨማሪ የቤት ውስጥ ምግብ ዝግጅት ልምዶችን እና የገበያ ጉብኝቶችን እናቀርባለን። አስተማማኝ እና አስደሳች የምግብ ልምድን ለማረጋገጥ ሁሉም አስተናጋጆቻችን ተረጋግጠዋል።",
        offer1Title: "የቤት ውስጥ ምግቦች",
        offer1Sub: "ከ1½ - 2 ሰዓታት ያህል",
        offer1Desc: "ባህላዊ የምግብ አወሳሰድ ሥርዓቶችን (እንደ ጉርሻ ያሉ) እየተማሩ በአካባቢው አስተናጋጅ ቤተሰብ መመገቢያ ክፍል ውስጥ በፍቅር የተዘጋጀ ድግስ ይደሰቱ።",
        offer2Title: "የምግብ ዝግጅት ልምዶች",
        offer2Sub: "ከ3 - 4 ሰዓታት ያህል",
        offer2Desc: "በኩሽና ውስጥ በቀጥታ ይሳተፉ! ለስላሳ የጤፍ እንጀራ መጋገር እና ውስብስብ የሆኑ የሀገር ባህል ወጦችን ከመነሻው ማዘጋጀት ይማሩ።",
        offer3Title: "የገበያ ጉብኝቶች",
        offer3Sub: "ከ5 ሰዓታት በላይ",
        offer3Desc: "ትኩስ ግብዓቶችን እና እውነተኛ የበርበሬ ውህዶችን ለመምረጥ አስተናጋጅዎን ወደ አካባቢው በቀለማት ያሸበረቁ የቅመማ ቅመም እና የእህል ገበያዎች ይከተሉ።",
        bannerQuote: "ስለ ምግብ እና ባህል በሚደረግ ውይይት የቤት ውስጥ ምግብን ደስታ ይለማመዱ (እና ልክ እንደ አካባቢው ነዋሪዎች ይመገቡ)።",
        bannerAuthor: "በአዲስ አበባ፣ ኢትዮጵያ ውስጥ ከአስተናጋጅ ቤተሰቦች ጋር የተደረገ እውነተኛ ባህላዊ የኢትዮጵያ የምግብ ልምድ።",
        startedTitle: "እንዴት ጀመርን?",
        startedDesc: "አዲስ ፍሌቨር የተመሰረተው ተጓዦችን ወደ እውነተኛው የኢትዮጵያ የልብ ትርታ—ሰዎቿ፣ ታሪኮቿ እና ቤቶቿ ይበልጥ ለማቅረብ ከስፌር ቱር ኤንድ ትራቭል ጋር በመተባበር ነው። ስፌር ትራቭል በዘላቂ የጉብኝት ዲዛይን የታወቀ ነው። የምግብ ልውውጥ ባህላዊ ትስስር የመጨረሻው መገለጫ መሆኑን በመገንዘብ፣ ትርጉም ያላቸው ግንኙነቶችን ለማጎልበት እና ለአፍቃሪ የቤት ውስጥ ምግብ አብሳይዎች ዘላቂ የገቢ እድሎችን በመፍጠር የአካባቢውን ቤተሰቦች ለመደገፍ አዲስ ፍሌቨርን ነድፈናል።",
        startedBtn: "ስፌር ቱር ኤንድ ትራቭልን ይጎብኙ"
      },
      founders: {
        title: "ባለራዕይ መስራቾቻችን",
        subtitle: "በምግብ አፍቃሪዎች እና በስፌር ትራቭል ባለሙያ አስጎብኚዎች መካከል የተደረገ ውብ ትብብር።",
        f1Title: "ተባባሪ መስራች እና ዋና አስተናጋጅ ዳይሬክተር",
        f1Desc: "የኢትዮጵያን ባህላዊ ብልጽግና በማሳየት ከ15 ዓመታት በላይ ልምድ ያላት ስትሆን፣ ራዕይዋ ባህላዊ የቤተሰብ የምግብ አዘገጃጀት መመሪያዎችን ጠብቆ ማቆየት እና የታዋቂውን የኢትዮጵያውያንን እንግዶች የመቀበል ባህል ለአለም ማካፈል ነው።",
        f2Title: "የስፌር ቱር ኤንድ ትራቭል ዋና ስራ አስኪያጅ",
        f2Desc: "የዘላቂ ቱሪዝም ፈር ቀዳጅ ሲሆን፣ የአካባቢውን ቤተሰቦች ለማብቃት አዲስ ፍሌቨርን በጋራ መስርቷል፤ እውነተኛ እና የተከበረ ቱሪዝምን በቀጥታ ወደ አዲስ አበባ የመመገቢያ ክፍሎች ያመጣል።"
      },
      howItWorks: {
        title: "እንዴት እንደሚሰራ",
        step1Title: "1. ልምድዎን ይምረጡ",
        step1Desc: "ከተራ ባህላዊ የቤት ውስጥ ምግብ ጀምሮ እስከ ጥልቅ የምግብ ዝግጅት ማስተርክላስ እና የገበያ ፍለጋ ድረስ ያሉትን የተረጋገጡ ልምዶቻችንን ያስሱ።",
        step2Title: "2. ያብጁ እና ያስይዙ",
        step2Desc: "የሚመርጡትን ቀን ይምረጡ፣ ማንኛውንም የምግብ ፍላጎት ምርጫ (ጾም፣ ከግሉተን ነፃ፣ ሃላል) ያካፍሉ እና ጥያቄዎን በደህንነቱ የተጠበቀ መድረካችን በኩል ያቅርቡ።",
        step3Title: "3. ደስታውን ያካፍሉ",
        step3Desc: "የአስተናጋጁን አድራሻ እና ዝርዝር መረጃዎች ይቀበሉ። በቤተሰባቸው ጠረጴዛ ላይ ይቀመጡ፣ ታሪኮችን ይለዋወጡ፣ ይሳቁ፣ ያብስሉ እና እንደ አካባቢው ነዋሪ ይመገቡ።"
      },
      safety: {
        title: "የእርስዎ ደህንነት እና የእኛ ማረጋገጫ ደረጃዎች",
        subtitle: "ለእርስዎ የአእምሮ ሰላም ሲባል ለደህንነት፣ ለምቾት እና ለከፍተኛ የንፅህና አጠባበቅ ቅድሚያ እንሰጣለን።",
        point1Title: "100% በአካል የተረጋገጠ",
        point1Desc: "እያንዳንዱን የአስተናጋጅ ቤተሰብ ደጋግመን እንጎበኛለን፣ ንፅህናን፣ የምግብ ግብዓቶችን ምንጭ እና የቤተሰቡን ሞቅ ያለ አቀባበል እንፈትሻለን።",
        point2Title: "ጤና እና እንክብካቤ",
        point2Desc: "አስተናጋጆቻችን በአስተማማኝ የምግብ ዝግጅት ደረጃዎች፣ በንጹህ ውሃ አጠቃቀም እና እንደ ከባድ አለርጂዎች ያሉ የምግብ ፍላጎቶችን በአግባቡ በማስተናገድ ረገድ ሙሉ ስልጠና አግኝተዋል።",
        point3Title: "አስተማማኝ መጓጓዣ",
        point3Desc: "በአዲስ አበባ ውስጥ ደህንነታቸው በተጠበቁ እና በቀላሉ ሊደረሱ በሚችሉ ሰፈሮች ውስጥ የሚገኙ ሲሆን፣ እንደ ምርጫዎ በስፌር ትራቭል በኩል የመጓጓዣ ዝግጅት ማድረግ ይቻላል።"
      },
      press: {
        title: "በጋዜጦች ላይ",
        quote: "የሚቀጥለው ትውልድ የምግብ ቱሪዝም። በአዲስ አበባ አስደናቂ የምግብ ሥነ-ሥርዓቶች ላይ የማይረሳ መስኮት።",
        featuredIn: "በዋና ዋና አለም አቀፍ የጉዞ ህትመቶች ተለይቶ የቀረበ እና የታመነ"
      },
      careers: {
        title: "እንግዳ ተቀባይ ማህበረሰባችንን ይቀላቀሉ",
        subtitle: "ሁል ጊዜ ፍቅር ያላቸውን አስተናጋጆችን፣ የሀገር ውስጥ የምግብ ባለሙያዎችን እና ባህላዊ አስጎብኚዎችን እንፈልጋለን።",
        c1Title: "አስተናጋጅ ቤተሰብ ይሁኑ",
        c1Desc: "በሚወዱት ነገር—ምግብ በማብሰል እና እንግዶችን በማስተናገድ ዘላቂ ገቢ ያግኙ! ስልጠና፣ የደህንነት ድጋፍ እና ከአለም አቀፍ ምግብ አፍቃሪዎች ጋር እናገናኝዎታለን።",
        c2Title: "የሀገር ውስጥ የምግብ አምባሳደር",
        c2Desc: "በአዲስ አበባ ውስጥ ያሉ አስደናቂ የቤት ውስጥ አብሳይዎችን እንድናገኝ፣ እንዲተረጉሙ እና ቱሪስቶችን በቀለማት ባሸበረቁ ገበያዎች እንዲመሩ ያግዙን።",
        applyBtn: "ይገናኙን"
      },
      faq: {
        title: "ተደጋጋሚ ጥያቄዎች",
        q0: "ከስፌር ቱር ኤንድ ትራቭል ጋር ያለው ግንኙነት ምንድን ነው?",
        a0: "አዲስ ፍሌቨር በስፌር ቱር ኤንድ ትራቭል የሚመራ እና የሚተገበር ልዩ የምግብ ቱሪዝም ተነሳሽነት ነው። በኢትዮጵያ ሙሉ በሙሉ ፈቃድ ያለው የጉዞ ወኪል እንደመሆኑ መጠን፣ ስፌር የቦታ ማስያዣ ደህንነትን፣ አስተማማኝ መጓጓዣን፣ ፕሮፌሽናል አስጎብኚዎችን ያቀርባል እንዲሁም ስራዎቻችን ዘላቂ የቱሪዝም መመሪያዎችን በጥብቅ የተከተሉ መሆናቸውን ያረጋግጣል።",
        q1: "የምግብ አለርጂ ወይም ምርጫዎች ይስተናገዳሉ?",
        a1: "በእርግጠኝነት! የኢትዮጵያ ምግብ ለቬጋን (በኦርቶዶክስ ክርስቲያን የጾም ወጎች ወይም 'ባየነቱ') እና ከግሉተን ነፃ ለሆኑ ምግቦች (100% ንጹህ የጤፍ እንጀራ በመጠቀም) በጣም ምቹ ነው። በቦታ ማስያዣ ጊዜ የምግብ ምርጫዎችዎን እንሰበስባለን እና ከአስተናጋጅ ቤተሰብዎ ጋር እናስተባብራለን።",
        q2: "ልምዱ ለብቻዬ/ለቡድኔ ብቻ የተዘጋጀ ነው?",
        a2: "አዎ፣ 100% ልምዶቻችን ሙሉ በሙሉ የግል ናቸው። እርስዎ፣ የጉዞ ጓደኞችዎ እና አስተናጋጁ ቤተሰብ ብቻ ትሆናላችሁ። ይህ እውነተኛ፣ ቅርብ የሆኑ ውይይቶችን እና ከፍተኛ ጥራት ያለው ግንኙነትን ይፈቅዳል።",
        q3: "ወደ አስተናጋጁ ቤት እንዴት መድረስ እችላለሁ?",
        a3: "ቦታ ማስያዝዎ ሲረጋገጥ ትክክለኛ አቅጣጫዎችን፣ የአስተናጋጅ አድራሻዎችን እና ታዋቂ ምልክቶችን እናቀርባለን። በተጨማሪም፣ የስፌር ቱር ኤንድ ትራቭል አካል በመሆናችን፣ ከፈለጉ ከሆቴልዎ የግል መጓጓዣ በባለሙያ አሽከርካሪዎች ማዘጋጀት እንችላለን።"
      }
    },
    fr: {
      heroTitle: "Sortez des sentiers battus",
      companyInfo: "INFOS DE L'ENTREPRISE",
      backBtn: "Retour à l'accueil",
      tabs: {
        about: "À propos",
        founders: "Fondateurs",
        howItWorks: "Fonctionnement",
        safety: "Sécurité",
        press: "Presse",
        careers: "Carrières",
        faq: "FAQ"
      },
      about: {
        title: "Qu'est-ce que Addis Flavor",
        desc1: "Addis Flavor, c'est comme déguster un repas préparé par la maman d'un ami à chaque visite. Nous connectons les voyageurs avec des hôtes locaux certifiés pour partager la joie d'un repas fait maison et découvrir les traditions culturelles et culinaires transmises de génération en génération.",
        desc2: "Cette expérience est propulsée par Sphere Tour and Travel, un voyagiste agréé de premier plan basé à Addis-Abeba, en Éthiopie. Sphere Travel se consacre à la création de voyages durables, immersifs et respectueux des cultures. Ensemble, nous ouvrons les portes des maisons éthiopiennes, offrant un pont savoureux vers notre riche patrimoine.",
        whatWeOfferTitle: "Ce que nous offrons",
        whatWeOfferSubtitle: "Pour vous aider à découvrir la cuisine locale lors de vos voyages, Addis Flavor propose des repas chez l'habitant avec nos hôtes. De plus, nous proposons également des expériences de cuisine ainsi que des visites de marchés comme extension. Tous nos hôtes sont certifiés pour garantir une expérience sûre et délicieuse.",
        offer1Title: "Repas chez l'habitant",
        offer1Sub: "Env. 1½-2 h",
        offer1Desc: "Savourez un festin préparé avec amour dans la salle à manger d'une famille d'accueil locale, en apprenant les coutumes comme le Gursha.",
        offer2Title: "Ateliers de Cuisine",
        offer2Sub: "Env. 3-4 h",
        offer2Desc: "Mettez la main à la pâte ! Apprenez à cuire l'Injera au teff moelleuse et à mijoter des ragoûts (wot) épicés traditionnels.",
        offer3Title: "Visites de Marchés",
        offer3Sub: "Env. 5+ h",
        offer3Desc: "Accompagnez votre hôte dans les marchés colorés pour choisir des ingrédients frais et des mélanges d'épices Berbéré authentiques.",
        bannerQuote: "Découvrez la joie d'un repas fait maison (et mangez comme les locaux) au cours de discussions chaleureuses sur la nourriture et la culture.",
        bannerAuthor: "Dîner éthiopien traditionnel et authentique avec des familles d'accueil à Addis-Abeba, Éthiopie.",
        startedTitle: "Comment nous avons commencé",
        startedDesc: "Addis Flavor a été fondé en partenariat avec Sphere Tour and Travel pour rapprocher les voyageurs du véritable cœur de l'Éthiopie — ses habitants, leurs histoires et leurs maisons. Reconnaissant que l'échange culinaire est la forme ultime de connexion culturelle, nous avons conçu Addis Flavor pour encourager des relations enrichissantes et soutenir les familles locales en créant des revenus durables pour des cuisiniers passionnés.",
        startedBtn: "Visiter Sphere Tour & Travel"
      },
      founders: {
        title: "Nos Fondateurs Visionnaires",
        subtitle: "Un partenariat entre passionnés de gastronomie et les guides locaux experts de Sphere Tour & Travel.",
        f1Title: "Co-fondatrice & Directrice des Hôtes",
        f1Desc: "Forte de plus de 15 ans d'expérience dans la promotion de la richesse culturelle de l'Éthiopie, sa vision est de préserver les recettes familiales traditionnelles et de partager la légendaire hospitalité éthiopienne.",
        f2Title: "Directeur Général de Sphere Tour and Travel",
        f2Desc: "Pionnier du tourisme durable, il a cofondé Addis Flavor pour autonomiser les familles locales, apportant un tourisme authentique directement dans les foyers d'Addis-Abeba."
      },
      howItWorks: {
        title: "Comment ça marche",
        step1Title: "1. Sélectionnez votre expérience",
        step1Desc: "Découvrez nos expériences certifiées, allant d'un repas traditionnel fait maison à un atelier de cuisine complet avec visite de marché.",
        step2Title: "2. Personnalisez & Réservez",
        step2Desc: "Choisissez votre date, partagez vos restrictions alimentaires (végétalien, sans gluten, halal) et réservez via notre plateforme sécurisée.",
        step3Title: "3. Partagez la Joie",
        step3Desc: "Recevez l'adresse et les détails de l'hôte. Installez-vous à leur table, échangez des histoires, riez, cuisinez et dînez comme un local."
      },
      safety: {
        title: "Votre Sécurité & Nos Normes de Certification",
        subtitle: "Nous accordons la priorité absolue à la sécurité, au confort et à l'hygiène pour votre tranquillité d'esprit.",
        point1Title: "100 % Personnellement Vérifié",
        point1Desc: "Nous visitons chaque famille plusieurs fois, vérifiant l'hygiène, la provenance des ingrédients, la propreté et la convivialité de l'accueil.",
        point2Title: "Santé & Soins",
        point2Desc: "Nos hôtes sont formés aux normes de préparation des aliments, à l'utilisation d'eau propre et à la gestion des allergies alimentaires graves.",
        point3Title: "Transports Sûrs",
        point3Desc: "Situé dans des quartiers sûrs et très accessibles d'Addis-Abeba, avec des possibilités de transfert privé via Sphere Travel."
      },
      press: {
        title: "Dans la Presse",
        quote: "La nouvelle génération du tourisme culinaire. Un aperçu inoubliable des rituels traditionnels d'Addis-Abeba.",
        featuredIn: "Recommandé et approuvé par les plus grands magazines de voyage au monde"
      },
      careers: {
        title: "Rejoignez notre communauté",
        subtitle: "Nous recherchons toujours des hôtes passionnés, des experts culinaires et des guides locaux.",
        c1Title: "Devenir Famille d'Accueil",
        c1Desc: "Gagnez un revenu durable en faisant ce que vous aimez — cuisiner et accueillir ! Nous fournissons formation et soutien.",
        c2Title: "Ambassadeur Culinaire Local",
        c2Desc: "Aidez-nous à découvrir des cuisiniers d'exception à Addis-Abeba, à traduire et à guider les touristes sur les marchés locaux.",
        applyBtn: "Contactez-nous"
      },
      faq: {
        title: "Foire Aux Questions",
        q0: "Quelle est la relation avec Sphere Tour and Travel?",
        a0: "Addis Flavor est une initiative culinaire exclusive opérée par Sphere Tour and Travel. En tant qu'agence de voyage agréée en Éthiopie, Sphere gère la sécurité des réservations, les transports, les guides et veille à ce que nos activités respectent les chartes du tourisme durable.",
        q1: "Mes restrictions alimentaires peuvent-elles être respectées ?",
        a1: "Absolument ! La cuisine éthiopienne est idéale pour les végétaliens (grâce aux jeûnes orthodoxes chrétiens ou 'Bayenetu') et sans gluten (utilisation d'Injera 100% Teff pur). Nous coordonnons cela avec votre hôte.",
        q2: "S'agit-il d'une expérience privée ?",
        a2: "Oui, toutes nos expériences sont 100% privées. Il n'y aura que vous, vos compagnons de voyage et la famille d'accueil, favorisant des moments d'échange authentiques.",
        q3: "Comment rejoindre la maison de l'hôte ?",
        a3: "Après confirmation, nous vous fournissons des indications précises et les coordonnées de l'hôte. De plus, via Sphere Travel, nous pouvons organiser des transferts privés avec chauffeur depuis votre hôtel."
      }
    }
  };

  const t = content[currentLang];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    const element = document.getElementById(`story-section-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className={`transition-colors duration-1000 ${
      isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'
    }`}>
      
      {/* 1. HERO HEROIC BANNER */}
      <header
        id="story-hero-banner"
        className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url(${heroBgImg})`
        }}
      >
        {/* Back button absolute overlay */}
        <div className="absolute top-28 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBackToHome}
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-linen-white/80 hover:text-gold transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>{t.backBtn}</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-linen-white tracking-tight drop-shadow-md uppercase">
            {t.heroTitle}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full animate-pulse" />
        </div>
      </header>

      {/* 2. ORANGE BANNER */}
      <section className="bg-gold text-teal py-3.5 px-4 font-mono text-center tracking-widest text-xs font-extrabold uppercase shadow-inner relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-coffee-red animate-ping" />
          <span>{t.companyInfo}</span>
        </div>
      </section>

      {/* 3. TABS LOCAL SUB-NAVIGATION MENU */}
      <nav className={`sticky top-20 z-30 border-b shadow-sm transition-all duration-300 ${
        isGlobalDark ? 'bg-black/80 backdrop-blur-md border-linen-white/10' : 'bg-sandstone/95 backdrop-blur-md border-teal/10'
      }`}>
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
          <div className="flex justify-start sm:justify-center space-x-1 sm:space-x-4 py-3 min-w-max">
            {(Object.keys(t.tabs) as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-gold text-teal font-extrabold shadow'
                      : isGlobalDark
                        ? 'text-linen-white/70 hover:text-gold hover:bg-white/5'
                        : 'text-teal hover:text-coffee-red hover:bg-teal/5'
                  }`}
                >
                  {t.tabs[tab]}
                  {isActive && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gold hidden sm:block" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* TABS CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* ABOUT TAB SECTION */}
        <section id="story-section-about" className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <Compass className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.about}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight font-extrabold uppercase">
              {t.about.title}
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
            <p className="text-lg leading-relaxed font-serif opacity-90 italic">
              "{t.about.desc1}"
            </p>
            <p className="text-sm leading-relaxed opacity-75 font-sans">
              {t.about.desc2}
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-gold to-coffee-red rounded-3xl blur opacity-30 animate-pulse" />
            <img 
              src={cookingClassImg} 
              alt="Ethiopian culinary hosting" 
              className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* WHAT WE OFFER ROW */}
        <section className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.about.whatWeOfferTitle}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed font-sans">
              {t.about.whatWeOfferSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offer 1 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Heart className="w-6 h-6 fill-gold/20" />
                </div>
                <h4 className="text-lg font-serif font-bold uppercase">{t.about.offer1Title}</h4>
                <p className="text-xs font-mono text-gold font-bold">{t.about.offer1Sub}</p>
                <p className="text-sm opacity-75 leading-relaxed font-sans">{t.about.offer1Desc}</p>
              </div>
              <button 
                onClick={onBookClick}
                className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
              >
                <span>{currentLang === 'en' ? 'Book Meal' : currentLang === 'fr' ? 'Réserver Repas' : 'ምግብ ያስይዙ'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Offer 2 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold uppercase">{t.about.offer2Title}</h4>
                <p className="text-xs font-mono text-gold font-bold">{t.about.offer2Sub}</p>
                <p className="text-sm opacity-75 leading-relaxed font-sans">{t.about.offer2Desc}</p>
              </div>
              <button 
                onClick={onBookClick}
                className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
              >
                <span>{currentLang === 'en' ? 'Book Class' : currentLang === 'fr' ? 'Réserver Atelier' : 'ክፍል ያስይዙ'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Offer 3 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold uppercase">{t.about.offer3Title}</h4>
                <p className="text-xs font-mono text-gold font-bold">{t.about.offer3Sub}</p>
                <p className="text-sm opacity-75 leading-relaxed font-sans">{t.about.offer3Desc}</p>
              </div>
              <button 
                onClick={onBookClick}
                className="mt-6 inline-flex items-center space-x-1 text-xs font-mono uppercase text-gold hover:text-coffee-red transition-colors font-bold self-start"
              >
                <span>{currentLang === 'en' ? 'Book Journey' : currentLang === 'fr' ? 'Réserver Voyage' : 'ጉዞ ያስይዙ'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* FOOD BANNER SECTION */}
        <section 
          className="relative h-[320px] rounded-3xl flex items-center justify-start bg-cover bg-center overflow-hidden border border-gold/20 shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.3)), url(${jebenaPourImg})`
          }}
        >
          <div className="relative z-10 max-w-xl ml-6 sm:ml-12 mr-6 text-linen-white space-y-4">
            <p className="text-lg sm:text-2xl font-serif italic leading-relaxed text-linen-white">
              "{t.about.bannerQuote}"
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider font-bold">
              <MapPin className="w-4 h-4 text-coffee-red" />
              <span>{t.about.bannerAuthor}</span>
            </div>
          </div>
        </section>

        {/* HOW WE STARTED ROW (SPHERE INTEGRATION) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="absolute -inset-2 bg-gradient-to-tr from-gold to-coffee-red rounded-3xl blur opacity-25 animate-pulse" />
            <img 
              src={hostDiningImg} 
              alt="Ethiopian family hosts" 
              className="relative rounded-3xl object-cover w-full h-[350px] sm:h-[450px] shadow-2xl border-4 border-gold/25"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <BookOpen className="w-4 h-4 text-coffee-red" />
              <span>{t.about.startedTitle}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif tracking-tight font-extrabold uppercase">
              {t.about.startedTitle}
            </h3>
            <div className="w-16 h-1 bg-gold rounded-full" />
            <p className="text-sm leading-relaxed opacity-85 font-sans">
              {t.about.startedDesc}
            </p>
            <div className="pt-2">
              <a 
                href="https://sphere-voyage-ethiopie.com/en/sphere-travel-ethiopia.html"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-gold hover:bg-coffee-red text-teal hover:text-linen-white font-mono text-xs font-extrabold uppercase rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.about.startedBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FOUNDERS TAB SECTION */}
        <section id="story-section-founders" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <Users className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.founders}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.founders.title}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed font-sans">
              {t.founders.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-3xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } flex flex-col space-y-4`}>
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-serif font-bold">
                {currentLang === 'am' ? 'ሃ' : 'H'}
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold uppercase">
                  {currentLang === 'am' ? 'ሃረግ' : 'Hareg'}
                </h4>
                <p className="text-xs font-mono text-gold font-bold uppercase tracking-wider">{t.founders.f1Title}</p>
              </div>
              <p className="text-sm opacity-75 leading-relaxed font-sans">
                {t.founders.f1Desc}
              </p>
            </div>

            <div className={`p-8 rounded-3xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } flex flex-col space-y-4`}>
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-serif font-bold">
                S
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold uppercase">
                  {currentLang === 'am' ? 'ሰይፈገብርኤል ሽፈራው' : 'Seifegebiel Shifferaw'}
                </h4>
                <p className="text-xs font-mono text-gold font-bold uppercase tracking-wider">{t.founders.f2Title}</p>
              </div>
              <p className="text-sm opacity-75 leading-relaxed font-sans">
                {t.founders.f2Desc}
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS TAB SECTION */}
        <section id="story-section-how-it-works" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <Compass className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.howItWorks}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.howItWorks.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                1
              </div>
              <h4 className="text-lg font-serif font-bold uppercase">{t.howItWorks.step1Title}</h4>
              <p className="text-sm opacity-75 leading-relaxed font-sans">{t.howItWorks.step1Desc}</p>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                2
              </div>
              <h4 className="text-lg font-serif font-bold uppercase">{t.howItWorks.step2Title}</h4>
              <p className="text-sm opacity-75 leading-relaxed font-sans">{t.howItWorks.step2Desc}</p>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
                3
              </div>
              <h4 className="text-lg font-serif font-bold uppercase">{t.howItWorks.step3Title}</h4>
              <p className="text-sm opacity-75 leading-relaxed font-sans">{t.howItWorks.step3Desc}</p>
            </div>
          </div>
        </section>

        {/* SAFETY TAB SECTION */}
        <section id="story-section-safety" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <ShieldCheck className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.safety}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.safety.title}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed font-sans">
              {t.safety.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold uppercase">{t.safety.point1Title}</h4>
              <p className="text-xs opacity-75 leading-relaxed font-sans">{t.safety.point1Desc}</p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold uppercase">{t.safety.point2Title}</h4>
              <p className="text-xs opacity-75 leading-relaxed font-sans">{t.safety.point2Desc}</p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold uppercase">{t.safety.point3Title}</h4>
              <p className="text-xs opacity-75 leading-relaxed font-sans">{t.safety.point3Desc}</p>
            </div>
          </div>
        </section>

        {/* PRESS TAB SECTION */}
        <section id="story-section-press" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <Award className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.press}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.press.title}
            </h3>
          </div>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl border bg-teal text-linen-white border-gold/30 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <span className="font-serif text-5xl text-gold/30 block">“</span>
            <p className="text-xl sm:text-2xl font-serif leading-relaxed text-linen-white/95 italic max-w-2xl mx-auto -mt-6">
              {t.press.quote}
            </p>
            <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
            <span className="block font-mono text-xs uppercase tracking-widest text-gold font-bold">
              — Forbes Magazine
            </span>
          </div>

          <div className="pt-6">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-gold font-bold mb-8">
              {t.press.featuredIn}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
              <div className="font-serif text-xl font-bold tracking-tight">Forbes</div>
              <div className="font-sans text-sm font-extrabold tracking-widest uppercase">CNN</div>
              <div className="font-serif text-lg italic">Afar</div>
              <div className="font-mono text-xs uppercase tracking-wide">Travel+Leisure</div>
              <div className="font-sans text-xs font-bold uppercase tracking-widest">NatGeo Traveller</div>
              <div className="font-serif text-sm font-semibold">Women 2.0</div>
            </div>
          </div>
        </section>

        {/* CAREERS TAB SECTION */}
        <section id="story-section-careers" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <Briefcase className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.careers}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.careers.title}
            </h3>
            <p className="text-sm opacity-75 leading-relaxed font-sans">
              {t.careers.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-3xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } flex flex-col justify-between`}>
              <div className="space-y-4">
                <h4 className="text-lg font-serif font-bold uppercase">{t.careers.c1Title}</h4>
                <p className="text-sm opacity-75 leading-relaxed font-sans">{t.careers.c1Desc}</p>
              </div>
              <div className="pt-6">
                <button
                  onClick={onBackToHome}
                  className="px-6 py-2.5 bg-gold hover:bg-coffee-red text-teal hover:text-linen-white font-mono text-xs font-extrabold uppercase rounded-full shadow transition-all duration-300"
                >
                  {currentLang === 'en' ? 'Register Now' : currentLang === 'fr' ? "S'inscrire" : 'አሁኑኑ ይመዝገቡ'}
                </button>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border ${
              isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
            } flex flex-col justify-between`}>
              <div className="space-y-4">
                <h4 className="text-lg font-serif font-bold uppercase">{t.careers.c2Title}</h4>
                <p className="text-sm opacity-75 leading-relaxed font-sans">{t.careers.c2Desc}</p>
              </div>
              <div className="pt-6">
                <a
                  href="mailto:info@sphere-voyage-ethiopie.com"
                  className="inline-block px-6 py-2.5 border border-gold hover:bg-gold text-gold hover:text-teal font-mono text-xs font-extrabold uppercase rounded-full transition-all duration-300 text-center"
                >
                  {t.careers.applyBtn}
                </a>
              </div>
            </div>
          </div>

          {/* HEAD OFFICE OFFICIAL ADDRESS & CONTACTS */}
          <div className={`p-8 rounded-3xl border ${
            isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
          } max-w-4xl mx-auto space-y-6`}>
            <div className="flex items-center space-x-3 text-gold">
              <MapPin className="w-5 h-5 text-coffee-red" />
              <h4 className="text-base sm:text-lg font-serif font-bold uppercase">
                {currentLang === 'en' ? 'Sphere Tour & Travel Head Office' : currentLang === 'fr' ? 'Siège Social Sphere Tour & Travel' : 'ስፌር ቱር ኤንድ ትራቭል ዋና መስሪያ ቤት'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-sans">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                  {currentLang === 'en' ? 'OFFICE ADDRESS' : currentLang === 'fr' ? 'ADRESSE DU BUREAU' : 'የቢሮ አድራሻ'}
                </span>
                <p className="opacity-80 text-xs sm:text-sm">
                  Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220, Addis Ababa
                </p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                  {currentLang === 'en' ? 'DIRECT PHONE' : currentLang === 'fr' ? 'LIGNE DIRECTE' : 'ቀጥታ ስልክ'}
                </span>
                <p className="opacity-80 font-mono text-xs sm:text-sm">
                  091 120 9882
                </p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                  {currentLang === 'en' ? 'EMAIL SUPPORT' : currentLang === 'fr' ? 'ASSISTANCE E-MAIL' : 'የኢሜል ድጋፍ'}
                </span>
                <a href="mailto:info@sphere-voyage-ethiopie.com" className="block opacity-80 hover:text-gold transition-colors break-all text-xs sm:text-sm font-mono">
                  info@sphere-voyage-ethiopie.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ TAB SECTION */}
        <section id="story-section-faq" className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
              <HelpCircle className="w-4 h-4 text-coffee-red" />
              <span>{t.tabs.faq}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
              {t.faq.title}
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: t.faq.q0, a: t.faq.a0 },
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 }
            ].map((item, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all duration-300 ${
                    isGlobalDark 
                      ? 'bg-white/5 border-linen-white/10 hover:border-gold/55' 
                      : 'bg-sandstone/15 border-teal/5 hover:border-gold/55'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 focus:outline-none text-left"
                  >
                    <span className="font-serif font-bold text-base pr-4">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-gold flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-gold flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm opacity-80 leading-relaxed font-sans border-t border-current/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

    </div>
  );
}
