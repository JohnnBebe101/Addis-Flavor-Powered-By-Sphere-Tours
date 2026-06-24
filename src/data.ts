/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, Translations, ExperiencePackage, HostReview } from './types';
import cookingClassImg from './assets/images/addis_cooking_class_1782233734033.jpg';
import heroBgImg from './assets/images/addis_hero_bg_1782233695273.jpg';
import jebenaPourImg from './assets/images/addis_jebena_pour_1782233715156.jpg';

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    announcement: "Check out our online cooking classes & custom virtual Ethiopian coffee ceremonies!",
    brandName: "Addis Flavor",
    navExperiences: "Experiences",
    navStory: "Our Story",
    navBook: "Book",
    navBecomeHost: "Become a Host",
    navHelp: "Help",
    navContact: "Contact Us",
    navGiveGift: "Give a Gift",
    navLogin: "Login",
    navSignUp: "Sign Up",
    heroTitle: "TRAVEL OFF THE EATEN PATH IN ADDIS ABABA",
    heroSub: "Book private cooking classes and home meals with the best local hosts in Addis Ababa.",
    heroSearchPlaceholder: "What do you want to experience?",
    vettedTitle: "100% of hosts are personally vetted",
    vettedSub: "We find the best home cooks in Addis Ababa so you can immerse yourself in meaningful food experiences and cultural traditions.",
    vettedDesc: "Connect with local culture through food. Visit a mother or grandmother in her kitchen in Addis Ababa, learn to bake spongy Injera, blend spicy Berbere, and experience the traditional hospitality first-hand. Choose from three unique local experiences with our vetted hosts.",
    reviewTitle: "Traveler Reviews from Addis Ababa",
    guaranteeVetted: "100% Vetted Hosts",
    guaranteeTitle: "Satisfaction Guaranteed",
    guaranteePrivate: "100% Private Experiences",
    guaranteeVettedSub: "Every host kitchen is personally inspected for safety and culinary excellence.",
    guaranteeTitleSub: "Love your local experience, or we'll make it right with our host guarantee.",
    guaranteePrivateSub: "Just you, your travel companion, and your warm local host family.",
    notTravelingTitle: "Not in Addis Ababa?",
    notTravelingSub: "Join our warm local hosts virtually with interactive live workshops.",
    viewOnlineClasses: "VIEW ONLINE CLASSES",
    bookNowButton: "BOOK EXPERIENCE",
    dietaryFilterLabel: "Dietary Preferences:",
    dietaryAll: "All Foods",
    dietaryVegan: "Vegan (Fasting / Bayenetu)",
    dietaryGlutenFree: "Gluten-Free (Pure Teff Injera)",
    dietaryHalal: "Halal Options",
    durationLabel: "Duration",
    priceLabel: "Starting price",
    reviewsCountLabel: "vetted reviews",
    stepAbol: "Abol (1st Round)",
    stepTona: "Tona (2nd Round)",
    stepBereka: "Bereka (3rd Round)",
    stepDate: "Select Date",
    stepCustomize: "Customize",
    stepConfirm: "Confirmation",
    jebenaInteractiveTitle: "The Sacred Coffee Ritual: Clay Jebena Journey",
    jebenaInteractiveSub: "Ethiopian coffee ceremonies are a spiritual gesture of welcome. Click or slide through the traditional three brew rounds to understand the beautiful mindfulness timeline.",
    darkRitualToggle: "Simulate dim incense-lit room (Dark Mode)",
    darkRitualActive: "Room dimmed. Smell the burning frankincense...",
  },
  am: {
    announcement: "የመስመር ላይ የምግብ ዝግጅት እና የኢትዮጵያ ባህላዊ የቡና ሥነ-ሥርዓቶችን ይመልከቱ!",
    brandName: "አዲስ ፍሌቨር",
    navExperiences: "ልምዶች",
    navStory: "ታሪካችን",
    navBook: "ቦታ ያስይዙ",
    navBecomeHost: "አስተናጋጅ ይሁኑ",
    navHelp: "እርዳታ",
    navContact: "ያግኙን",
    navGiveGift: "ስጦታ ይስጡ",
    navLogin: "ግባ",
    navSignUp: "ይመዝገቡ",
    heroTitle: "በአዲስ አበባ ያልተለመዱ የምግብ ጉዞዎችን ያግኙ",
    heroSub: "በአዲስ አበባ ውስጥ ካሉ ምርጥ የቤት ውስጥ አብሳይዎች ጋር የግል የምግብ ዝግጅት እና የቤት ውስጥ ምግቦችን ያስይዙ።",
    heroSearchPlaceholder: "ምን ዓይነት ልምድ ማግኘት ይፈልጋሉ?",
    vettedTitle: "100% አስተናጋጆቻችን በአካል የተረጋገጡ ናቸው",
    vettedSub: "በትርጉም ባለው የምግብ ልምዶች እና ባህላዊ ወጎች ውስጥ እራስዎን እንዲያጠምቁ በአዲስ አበባ ውስጥ ምርጥ የቤት ውስጥ አብሳይዎችን እናገኛለን።",
    vettedDesc: "በምግብ አማካኝነት ከአካባቢው ባህል ጋር ይገናኙ። በአዲስ አበባ የሚገኘውን የእናት ወይም የሴት አያት ኩሽና ይጎብኙ፣ ለስላሳ እንጀራ መጋገር ይማሩ፣ በረበረ ያዘጋጁ እና የእንግዳ ተቀባይነትን በአካል ይለማመዱ። ከተረጋገጡ አስተናጋጆቻችን ጋር ከሶስቱ ልዩ ልምዶች ይምረጡ።",
    reviewTitle: "የጎብኚዎች ምስክርነት ከአዲስ አበባ",
    guaranteeVetted: "100% የተረጋገጡ አስተናጋጆች",
    guaranteeTitle: "ሙሉ እርካታ ዋስትና",
    guaranteePrivate: "100% የግል ልምዶች",
    guaranteeVettedSub: "እያንዳንዱ የአስተናጋጅ ኩሽና ለደህንነት እና ለምግብ ጥራት በአካል የተፈተሸ ነው።",
    guaranteeTitleSub: "ባገኙት ልምድ ካልተደሰቱ በአስተናጋጅ ዋስትናችን እናስተካክለዋለን።",
    guaranteePrivateSub: "እርስዎ፣ የጉዞ ጓደኛዎ እና የእርስዎ ሞቅ ያለ አስተናጋጅ ቤተሰብ ብቻ።",
    notTravelingTitle: "አዲስ አበባ ውስጥ አይደሉም?",
    notTravelingSub: "በቀጥታ በሚተላለፉ በይነተገናኝ ወርክሾፖች አማካኝነት ከሞቃታማ አስተናጋጆቻችን ጋር በምናባዊ መንገድ ይገናኙ።",
    viewOnlineClasses: "የመስመር ላይ ትምህርቶችን ይመልከቱ",
    bookNowButton: "አሁን ያስይዙ",
    dietaryFilterLabel: "የምግብ ፍላጎት ምርጫዎች፦",
    dietaryAll: "ሁሉም ምግቦች",
    dietaryVegan: "የጾም ምግብ (ባየነቱ)",
    dietaryGlutenFree: "ከግሉተን ነፃ (ንፁህ የጤፍ እንጀራ)",
    dietaryHalal: "የሃላል አማራጮች",
    durationLabel: "የጊዜ ርዝማኔ",
    priceLabel: "የመነሻ ዋጋ",
    reviewsCountLabel: "የተረጋገጡ ግምገማዎች",
    stepAbol: "አቦል (የመጀመሪያው ዙር)",
    stepTona: "ቶና (ሁለተኛው ዙር)",
    stepBereka: "በረካ (ሦስተኛው ዙር)",
    stepDate: "ቀን ይምረጡ",
    stepCustomize: "ያብጁ",
    stepConfirm: "ማረጋገጫ",
    jebenaInteractiveTitle: "ቅዱሱ የቡና ሥነ-ሥርዓት፦ የሸክላ ጀበና ጉዞ",
    jebenaInteractiveSub: "የኢትዮጵያ የቡና ሥነ-ሥርዓቶች የእንግዳ ተቀባይነት መንፈሳዊ መገለጫ ናቸው። ውብ የሆነውን የቡና ዙር ታሪክ ለመረዳት በባህላዊው ሶስቱ የቡና ዙሮች ላይ ጠቅ ያድርጉ።",
    darkRitualToggle: "ጭስ የበዛበት ክፍል ለመምሰል (የጨለማ ሁኔታ)",
    darkRitualActive: "ክፍሉ ደብዝዟል። የዕጣኑን መዓዛ ያሽቱ...",
  },
  fr: {
    announcement: "Découvrez nos cours de cuisine en ligne & nos cérémonies de café éthiopien virtuelles et personnalisées !",
    brandName: "Addis Flavor",
    navExperiences: "Expériences",
    navStory: "Notre Histoire",
    navBook: "Réserver",
    navBecomeHost: "Devenir Hôte",
    navHelp: "Aide",
    navContact: "Contactez-nous",
    navGiveGift: "Offrir un Cadeau",
    navLogin: "Connexion",
    navSignUp: "S'inscrire",
    heroTitle: "DÉCOUVREZ DES EXPÉRIENCES CULINAIRES HORS DES SENTIERS BATTUS À ADDIS-ABEBA",
    heroSub: "Réservez des cours de cuisine privés et des repas faits maison avec les meilleurs hôtes locaux à Addis-Abeba.",
    heroSearchPlaceholder: "Qu'aimeriez-vous vivre comme expérience ?",
    vettedTitle: "100 % des hôtes sont personnellement vérifiés",
    vettedSub: "We find the best home cooks in Addis Ababa so you can immerse yourself in meaningful food experiences and cultural traditions.",
    vettedDesc: "Connectez-vous à la culture locale par le biais de la cuisine. Rendez visite à une mère ou une grand-mère dans sa cuisine à Addis-Abeba, apprenez à cuire l'Injera moelleuse, préparez le mélange d'épices Berbéré et vivez l'hospitalité traditionnelle en direct. Choisissez parmi trois expériences locales uniques avec nos hôtes certifiés.",
    reviewTitle: "Avis des Voyageurs à Addis-Abeba",
    guaranteeVetted: "Hôtes 100 % Vérifiés",
    guaranteeTitle: "Satisfaction Garantie",
    guaranteePrivate: "Expériences 100 % Privées",
    guaranteeVettedSub: "Chaque cuisine d'hôte est personnellement inspectée pour garantir la sécurité et l'excellence culinaire.",
    guaranteeTitleSub: "Adorez votre expérience locale, ou nous y remédierons grâce à notre garantie hôte.",
    guaranteePrivateSub: "Rien que vous, votre compagnon de voyage et votre chaleureuse famille d'accueil locale.",
    notTravelingTitle: "Pas à Addis-Abeba ?",
    notTravelingSub: "Rejoignez nos chaleureux hôtes locaux virtuellement grâce à des ateliers interactifs en direct.",
    viewOnlineClasses: "VOIR LES COURS EN LIGNE",
    bookNowButton: "RÉSERVER L'EXPÉRIENCE",
    dietaryFilterLabel: "Préférences alimentaires :",
    dietaryAll: "Tous les Aliments",
    dietaryVegan: "Végétalien (Jeûne / Bayenetu)",
    dietaryGlutenFree: "Sans gluten (Pure Teff Injera)",
    dietaryHalal: "Options Halal",
    durationLabel: "Durée",
    priceLabel: "Tarif de départ",
    reviewsCountLabel: "avis vérifiés",
    stepAbol: "Abol (1er Tour)",
    stepTona: "Tona (2e Tour)",
    stepBereka: "Bereka (3e Tour)",
    stepDate: "Choisir la Date",
    stepCustomize: "Personnaliser",
    stepConfirm: "Confirmation",
    jebenaInteractiveTitle: "Le rituel sacré du café : Voyage avec la Jebena en argile",
    jebenaInteractiveSub: "Les cérémonies du café en Éthiopie sont un geste spirituel de bienvenue. Cliquez ou faites glisser les trois cycles de préparation traditionnels pour comprendre ce magnifique moment de pleine conscience.",
    darkRitualToggle: "Simuler une pièce tamisée éclairée à l'encens (Mode Sombre)",
    darkRitualActive: "Pièce tamisée. Sentez l'arôme de l'encens qui brûle...",
  }
};

export const PACKAGES: ExperiencePackage[] = [
  {
    id: "cooking-class",
    nameEn: "Addis Ababa Master Cooking Class",
    nameAm: "የአዲስ አበባ ዋና የምግብ ዝግጅት ትምህርት",
    nameFr: "Cours de cuisine magistral à Addis-Abeba",
    tagEn: "Baking, Spices & Coffee Roasting",
    tagAm: "እንጀራ መጋገር፣ ቅመማ ቅመም እና ቡና መቁላት",
    tagFr: "Cuisson, Épices & Torréfaction du café",
    price: 49,
    durationEn: "3.5 - 4 hours",
    durationAm: "ከ 3.5 - 4 ሰዓታት",
    durationFr: "3.5 - 4 heures",
    emoji: "🍳",
    imageUrl: cookingClassImg,
    descEn: "Learn the secrets of ancient Ethiopian cooking under the guidance of a friendly neighborhood host. Sift teff flour, pour sourdough onto the hot Mitad clay griddle, and balance direct flavors in deep slow-cooked wats.",
    descAm: "በአካባቢው ተወዳጅ በሆኑ አስተናጋጅ መሪነት የጥንቱን የኢትዮጵያ ምግብ አዘገጃጀት ሚስጥሮችን ይማሩ። ጤፍ ያብጥሩ፣ የእንጀራ ሊጥ በምጣድ ላይ ያፍስሱ፣ እና የሚጣፍጥ ቀይ ወጥ ያብስሉ::",
    descFr: "Découvrez les secrets de la cuisine éthiopienne ancestrale sous la direction d'un hôte local chaleureux. Tamisez la farine de teff, versez la pâte au levain sur la plaque d'argile Mitad brûlante et équilibrez les saveurs intenses de wats mijotés.",
    stepsEn: [
      "Traditional Shiro Cooking",
      "The Art of Mitad Baking",
      "Hand-Roasting Raw Coffee Beans",
      "The Three-Round Coffee Tasting"
    ],
    stepsAm: [
      "ባህላዊ ሽሮ ወጥ ማብሰል",
      "እንጀራ በምጣድ ላይ መጋገር",
      "ጥሬ የቡና ፍሬዎችን በእጅ መቁላት",
      "ባለ ሶስት ዙር የቡና ቀመስ ሥነ-ሥርዓት"
    ],
    stepsFr: [
      "Cuisine traditionnelle du Shiro",
      "L'art de la cuisson au Mitad",
      "Torréfaction manuelle des grains",
      "Dégustation du café en trois tours"
    ],
    stepsDescEn: [
      "Learn to whip chickpea powder, garlic, onions, and organic red Berbere pepper into a smooth sizzling traditional Shiro Wat.",
      "Pour the fermented teff batter on the burning hot clay Mitad, watching the classic bubbles (eyes/ayen) form in seconds.",
      "Stir-fry coffee beans over hot coals on an iron pan, feeling the fragrance escape into the kitchen air.",
      "Sit back on fresh green grass, breathe the frankincense, and drink Abol, Tona, and Bereka accompanied by roasted barley."
    ],
    stepsDescAm: [
      "የሽንብራ ዱቄት፣ ነጭ ሽንኩርት፣ ቀይ ሽንኩርት እና ኦርጋኒክ በረበረን አዋህደው የሚንተከተክ ባህላዊ ሽሮ ወጥ ማብሰል ይማሩ።",
      "የቦካውን የጤፍ ሊጥ በጋለው የምድር ምጣድ ላይ በማፍሰስ፣ በጥቂት ሰከንዶች ውስጥ የሚፈጠረውን የእንጀራ አይን በአድናቆት ይመልከቱ።",
      "የቡና ፍሬዎችን በከሰል ምድጃ ላይ በብረት መቁያ በመቁላት፣ እጅግ የሚማርከውን የቡና መዓዛ በኩሽናው ውስጥ ያሽቱ።",
      "በለምለም ሣር ላይ ተቀምጠው የዕጣኑን መዓዛ እየተነፈሱ አቦል፣ ቶና እና በረካ ቡና በቆሎ ቆሎ ታጅበው ይጠጡ።"
    ],
    stepsDescFr: [
      "Apprenez à fouetter la poudre de pois chiches, l'ail, les oignons et le piment rouge biologique Berbéré pour créer un Shiro Wat traditionnel frémissant.",
      "Versez la pâte de teff fermentée sur la plaque d'argile Mitad brûlante pour observer les bulles classiques (les yeux/ayen) se former en quelques secondes.",
      "Faites griller les grains de café sur des braises ardentes dans une poêle en fer, en laissant le parfum envoûtant s'échapper dans la cuisine.",
      "Installez-vous confortablement sur de l'herbe fraîche, respirez l'encens et dégustez l'Abol, le Tona et le Bereka accompagnés d'orge grillé."
    ]
  },
  {
    id: "home-meal",
    nameEn: "Local Home Meal Experience & Coffee Ceremony",
    nameAm: "የቤት ውስጥ የባህል ምግብ እና የቡና ሥነ-ሥርዓት",
    nameFr: "Repas authentique chez l'habitant & Cérémonie du café",
    tagEn: "Family Table, Hospitality & Music",
    tagAm: "የቤተሰብ ማዕድ፣ እንግዳ ተቀባይነት እና ሙዚቃ",
    tagFr: "Table familiale, Hospitalité & Musique",
    price: 35,
    durationEn: "2 - 2.5 hours",
    durationAm: "ከ 2 - 2.5 ሰዓታት",
    durationFr: "2 - 2.5 heures",
    emoji: "🍲",
    imageUrl: heroBgImg,
    descEn: "Step into a beautiful, multi-generational family home in Bole or Piazza. Dine at a traditional Mesob basket, share the multi-dish Beyaynetu feast (or rich meat doro wat), and experience authentic warmth with songs and stories.",
    descAm: "በቦሌ ወይም በፒያሳ ወደሚገኝ ውብ ባለብዙ ትውልድ ቤተሰብ ቤት ይግቡ። በባህላዊ መሶብ ላይ ይመገቡ፣ የጾም ባየነቱ (ወይም በዶሮ ወጥ) ማዕድ ይጋሩ፣ እና በባህላዊ ዘፈኖች ታጅበው እውነተኛውን የሀገር ፍቅር ይለማመዱ።",
    descFr: "Entrez dans une magnifique maison familiale multigénérationnelle à Bole ou Piazza. Dînez autour d'un panier traditionnel Mesob, partagez le festin multi-plats Beyaynetu (ou un ragoût de poulet Doro Wat) et vivez une hospitalité authentique rythmée par des chants et des histoires.",
    stepsEn: [
      "The Welcome Greeting",
      "Washing of the Hands Ritual",
      "The Mesob Feast Shared",
      "Warm Family Storytelling"
    ],
    stepsAm: [
      "የእንኳን ደህና መጡ አቀባበል",
      "የእጅ መታጠብ ሥነ-ሥርዓት",
      "በባህላዊ መሶብ ማዕድ መጋራት",
      "የቤተሰብ ጨዋታ እና ታሪክ ማጋራት"
    ],
    stepsFr: [
      "L'accueil chaleureux",
      "Le rituel du lavage des mains",
      "Le festin partagé du Mesob",
      "Récits familiaux au coin de la table"
    ],
    stepsDescEn: [
      "Your hosts greet you at the gate with traditional Amharic blessings and help you settle on cozy hand-woven rugs.",
      "A family member pours warm water from a beautiful copper pitcher over your hands right at the table.",
      "The lid of the Mesob basket is lifted to reveal fresh Injera topped with stews, lentils, key wat, and local cottage cheese.",
      "Connect deeply as the elders share historical anecdotes about Addis Ababa, while traditional music plays softly."
    ],
    stepsDescAm: [
      "አስተናጋጆችዎ በደጃፍ ላይ በባህላዊ የእንኳን ደህና መጡ ቡራኬ ይቀበሉዎታል እንዲሁም በምቹ ባህላዊ ምንጣፎች ላይ ያስተናግዱዎታል።",
      "የቤተሰብ አባል ከሚያምር የመዳብ ማንቆርቆሪያ ሞቅ ያለ ውሃ በእጅዎ ላይ እዚያው ማዕድ ላይ ያፈስላችኋል።",
      "የመሶቡ ክዳን ሲከፈት በደማቅ ወጦች፣ ምስር፣ ቀይ ወጥ እና የቤት አይብ የተሞላው ትኩስ እንጀራ ይታያል።",
      "ባህላዊ ሙዚቃ በለሆሳስ በሚሰማበት ጊዜ፣ አባቶች ስለ አዲስ አበበ ታሪክ ጨዋታዎችን እና ትዝታዎችን ያጋሩዎታል።"
    ],
    stepsDescFr: [
      "Vos hôtes vous accueillent au portail avec des bénédictions traditionnelles en amharique et vous invitent à vous installer sur des tapis douillets tissés à la main.",
      "Un membre de la famille verse de l'eau tiède depuis une magnifique verseuse en cuivre directement sur vos mains à table.",
      "Le couvercle du Mesob est soulevé pour révéler l'Injera fraîche garnie de ragoûts parfumés, de lentilles, de key wat et de fromage frais local.",
      "Créez des liens profonds tandis que les aînés partagent des anecdotes historiques sur Addis-Abeba au son d'une douce mélodie traditionnelle."
    ]
  },
  {
    id: "coffee-only",
    nameEn: "The Sacred Coffee Ceremony & Mindfulness Ritual",
    nameAm: "የቡና ሥነ-ሥርዓት እና የንቃት ማሰላሰል",
    nameFr: "Cérémonie sacrée du café & Rituel de pleine conscience",
    tagEn: "Mindfulness, Clay Jebena & Frankincense",
    tagAm: "ንቃት፣ የሸክላ ጀበና እና እጣን",
    tagFr: "Pleine conscience, Jebena en argile & Encens",
    price: 25,
    durationEn: "1.5 hours",
    durationAm: "1.5 ሰዓታት",
    durationFr: "1.5 heure",
    emoji: "☕",
    imageUrl: jebenaPourImg,
    descEn: "An intimate, spiritual immersion into the world's original coffee culture. Sit in an incense-lit room, learn the slow three-pour brewing method using the clay Jebena, and enjoy the calming transition of each round.",
    descAm: "ወደ ቀደመው የቡና ባህል ጥልቅ እና መንፈሳዊ ጉዞ። በዕጣን በታወደ ክፍል ውስጥ ይቀመጡ፣ የሸክላ ጀበናን በመጠቀም የቡና መውረጃ ዘዴን ይማሩ እና የእያንዳንዱን ዙር ሰላማዊ ሽግግር ይለማመዱ።",
    descFr: "Une immersion intime et spirituelle dans la culture originelle du café. Installez-vous dans une pièce parfumée à l'encens, apprenez la méthode lente d'infusion en trois versements avec la Jebena en argile et savourez la transition apaisante de chaque tour.",
    stepsEn: [
      "The Herb Scented Canvas",
      "The Clay Jebena Brewing",
      "The High-Pour Ritual",
      "Mindfulness Contemplation"
    ],
    stepsAm: [
      "የለምለም ሣር ምንጣፍ",
      "በሸክላ ጀበና ማፍላት",
      "ከፍ አድርጎ የማፍሰስ ጥበብ",
      "የንቃት እና የማሰላሰል ጊዜ"
    ],
    stepsFr: [
      "Le décor parfumé aux herbes",
      "L'infusion dans la Jebena en argile",
      "Le rituel du versement haut",
      "Contemplation en pleine conscience"
    ],
    stepsDescEn: [
      "Step into a space carpeted with freshly cut green grass (Ketema) and yellow daisy petals to invite blessing.",
      "Watch the water heat in the bulbous bottom of the black clay Jebena pot on hot charcoal till it boils up the long neck.",
      "Your host pours the thick, dark coffee from high above in a steady uninterrupted stream into handle-less Finjal cups.",
      "Sip slowly in quiet meditation, letting each round settle your thoughts as frankincense smoke purifies the air."
    ],
    stepsDescAm: [
      "በረከት እንዲሰፍን ትኩስ ለምለም ሣር (ቀጠማ) እና ቢጫ አደይ አበባዎች በተጎዘጎዙበት ክፍል ውስጥ ይግቡ።",
      "በከሰል እሳት ላይ በተጣደው ጥቁር ሸክላ ጀበና ውስጥ ያለው ውሃ ፈልቶ ወደ ረጅሙ አንገት ሲወጣ ይመልከቱ።",
      "አስተናጋጅዎ ወፍራሙንና ጥሩ መዓዛ ያለውን ቡና ከፍ አድርገው በተረጋጋ እና ቀጣይነት ባለው ፍሰት እጀታ ወደሌላቸው ሲኒዎች ሲያፈሱ ይመልከቱ።",
      "የዕጣኑ ጢስ አየሩን ሲያጠራው፣ አዕምሮዎን የሚያረጋጋውን እያንዳንዱን የቡና ዙር በጸጥታ ማሰላሰል ውስጥ ሆነው በቀስታ ይጎንጩ።"
    ],
    stepsDescFr: [
      "Entrez dans un espace tapissé d'herbe verte fraîchement coupée (Ketema) et de pétales de marguerites jaunes pour inviter la bénédiction.",
      "Regardez l'eau chauffer dans la base ventrue de la Jebena en argile noire sur le charbon de bois jusqu'à ce qu'elle monte le long du col étroit.",
      "Votre hôte verse le café noir et dense depuis la hauteur dans un jet continu et régulier dans de petites tasses sans anse (Finjal).",
      "Dégustez lentement en méditation tranquille, laissant chaque tour apaiser vos pensées alors que la fumée de l'encens purifie l'air."
    ]
  }
];

export const REVIEWS: HostReview[] = [
  {
    id: "rev-1",
    quoteEn: "Mimi is incredible! She is so thoughtful and welcoming. We baked our first pure teff Injera on her traditional clay Mitad and the spicy Shiro was divine. She makes the experience feel like coming home.",
    quoteAm: "ሚሚ አስደናቂ ናት! እሷ በጣም አሳቢ እና እንግዳ ተቀባይ ነች። በመጀመሪያው ባህላዊ ምጣዷ ላይ ንፁህ የጤፍ እንጀራችንን ጋገርን እና ጣፋጩ ሽሮ መለኮታዊ ነበር። እዚህ መምጣት ልክ ወደ ቤት እንደመመለስ እንዲሰማን ታደርጋለች።",
    quoteFr: "Mimi est incroyable ! Elle est tellement attentionnée et accueillante. Nous avons cuit notre première Injera de pur teff sur sa plaque d'argile traditionnelle Mitad et le Shiro épicé était divin. Elle vous donne l'impression de rentrer à la maison.",
    authorEn: "Sarah Jenkins, USA",
    authorAm: "ሳራ ጄንኪንስ፣ አሜሪካ",
    authorFr: "Sarah Jenkins, États-Unis",
    locationEn: "Hosted in Bole, Addis Ababa",
    locationAm: "በቦሌ፣ አዲስ አበባ የተስተናገደ",
    locationFr: "Accueillie à Bole, Addis-Abeba"
  },
  {
    id: "rev-2",
    quoteEn: "Stepping into Seleme's family home in Piazza was the absolute highlight of our trip to Ethiopia. The Mesob feast was filled with laughter, songs, and the richest coffee ceremony we've ever experienced. Unforgettable!",
    quoteAm: "በፒያሳ ወደሚገኘው የሰለሜ ቤተሰብ ቤት መግባት በኢትዮጵያ ጉዟችን ትልቁ ድምቀት ነበር። የመሶብ ግብዣው በሳቅ፣ በዘፈን እና እስካሁን ካየናቸው ሁሉ እጅግ በበለጸገ የቡና ሥነ-ሥርዓት የተሞላ ነበር። የማይረሳ!",
    quoteFr: "Entrer dans la maison familiale de Seleme à Piazza a été le clou absolu de notre voyage en Éthiopie. Le festin Mesob était rempli de rires, de chants et de la cérémonie de café la plus riche que nous ayons jamais vécue. Inoubliable !",
    authorEn: "Hiroshi Sato, Japan",
    authorAm: "ሂሮሺ ሳቶ፣ ጃፓን",
    authorFr: "Hiroshi Sato, Japon",
    locationEn: "Hosted in Piazza, Addis Ababa",
    locationAm: "በፒያሳ፣ አዲስ አበባ የተስተናገደ",
    locationFr: "Accueilli à Piazza, Addis-Abeba"
  },
  {
    id: "rev-3",
    quoteEn: "The Sacred Coffee Ceremony deep dive was incredibly moving. The three rounds—Abol, Tona, Bereka—really feel like steps in mindfulness. The scent of roasted beans, cloves, and frankincense is still with me.",
    quoteAm: "ስለ ቡና ሥነ-ሥርዓት ጥልቅ እውቀት ያገኘንበት ጉዞ አስደናቂ ነበር። ሶስቱ ዙሮች - አቦል፣ ቶና፣ በረካ - በእውነት በንቃት ለማሰላሰል የሚረዱ ደረጃዎች ይመስላሉ። የቆላው ቡና፣ የቅርንፉድ እና የእጣኑ መዓዛ አሁንም ድረስ በአዕምሮዬ ውስጥ አለ።",
    quoteFr: "La plongée dans la cérémonie sacrée du café a été incroyablement émouvante. Les trois tours — Abol, Tona, Bereka — ressemblent vraiment à des étapes de pleine conscience. Le parfum des grains torréfiés, des clous de girofle et de l'encens m'accompagne encore.",
    authorEn: "Claire Laurent, France",
    authorAm: "ክሌር ሎረንት፣ ፈረንሳይ",
    authorFr: "Claire Laurent, France",
    locationEn: "Hosted in Guellele, Addis Ababa",
    locationAm: "በጉለሌ፣ አዲስ አበባ የተስተናገደ",
    locationFr: "Accueillie à Guellele, Addis-Abeba"
  }
];

export const PRESS_LOGOS = [
  { name: "Forbes", quote: "The next generation of culinary tourism." },
  { name: "National Geographic Traveller", quote: "A deep dive into local living." },
  { name: "CNN", quote: "Authentic, immersive, and highly rewarding." },
  { name: "Travel + Leisure", quote: "Connecting travelers to the heart of the home." },
  { name: "Travel Channel", quote: "Food made with ancient soul and local spices." },
  { name: "AFAR", quote: "Travel that respects and honors true culinary traditions." }
];

export const NEIGHBORHOOD_DESTINATIONS = [
  { nameEn: "Bole Cooking Classes", nameAm: "የቦሌ ምግብ ዝግጅት", nameFr: "Cours de cuisine à Bole" },
  { nameEn: "Piazza Coffee Ceremonies", nameAm: "የፒያሳ ቡና ሥነ-ሥርዓት", nameFr: "Cérémonies du café à Piazza" },
  { nameEn: "Mercato Guided Spices Tour", nameAm: "የመርካቶ የቅመማ ቅመም ጉብኝት", nameFr: "Visite guidée des épices à Mercato" },
  { nameEn: "Guellele Vegetarian Feast", nameAm: "የጉለሌ የጾም ባየነቱ ማዕድ", nameFr: "Festin végétarien à Guellele" },
  { nameEn: "Sheraton Area Gourmet Cooking", nameAm: "የሸራተን አካባቢ የላቀ ማዕድ", nameFr: "Cuisine gastronomique près du Sheraton" },
  { nameEn: "Yeka Hills Traditional Dinner", nameAm: "የየካ ኮረብታ ባህላዊ እራት", nameFr: "Dîner traditionnel sur les collines de Yeka" },
  { nameEn: "Kazanchis Honey-Wine & Music", nameAm: "የካዛንቺስ ጠጅ እና ሙዚቃ", nameFr: "Vin de miel & Musique à Kazanchis" },
  { nameEn: "Sarbet Modern-Ethio Fusion", nameAm: "የሳርቤት ዘመናዊ የባህል ውህደት", nameFr: "Fusion éthio-moderne à Sarbet" }
];
