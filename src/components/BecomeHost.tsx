/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, MessageSquare, Check, X, ArrowRight, ChevronDown, ChevronUp, Star, Award, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface BecomeHostProps {
  currentLang: Language;
  isGlobalDark: boolean;
  onBackToHome: () => void;
}

const LOCAL_TRANSLATIONS = {
  en: {
    heroTitle: "Join our host community",
    introText: "Hosts are at the heart of the Addis Flavor community, and we would love to talk with you if you think you might be a good fit to join our growing community.",
    idealHostTitle: "An ideal host",
    idealHostDesc: "We love connecting with passionate cooks who care about the food they create and delight in sharing it with others. Are you a talented home cook? Are you passionate about the cultural traditions that make your cuisine unique? We would love to meet you and give you the opportunity to make money doing what you love and share it with travelers.",
    appProcessTitle: "Application Process",
    steps: [
      "Submit online application form",
      "Phone/Skype interview",
      "In-person visit and tasting",
      "Enter your payment details and get ready to host!"
    ],
    applyBtn: "APPLY TODAY",
    askSuperHost: "ASK OUR SUPER HOST A QUESTION",
    askSuperHostSub: "Click here to email one of our hosts and ask them a question",
    trustTitle: "Trust & safety",
    trustDesc: "We want you to feel 100% comfortable when hosting. This is why we have made sure that every Addis Flavor booking is covered by our host guarantee that covers you should any problems arise. Additionally, we communicate as much information about our guests as possible and allow you to communicate with them directly so that you never have to accept a booking without feeling absolutely comfortable about it.",
    faqBtn: "READ OUR HOST FAQS",
    feedbackTitle: "Host Feedback",
    feedbackQuote: "It was a pleasure to host people from all over the world. We had a wonderful interaction and sharing of experiences with our guests. It was gratifying to know that they enjoyed the meal so much. We didn't want our guests to leave and neither did they. We look forward to hosting for Addis Flavor again.",
    feedbackAuthor: "Tigist & Family, Bole Neighborhood, Addis Ababa",
    bottomText: "We can't wait to hear from you.",
    backBtn: "Back to Experiences",
    
    // Application Form Translations
    formTitle: "Host Application Form",
    formSub: "Share your culinary talent with global travelers in Addis Ababa",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    neighborhood: "Neighborhood in Addis",
    experienceYears: "Cooking Experience (Years)",
    specialties: "Your Signature Dishes & Specialties",
    aboutYou: "Tell us a bit about yourself and your home",
    stepLabel: "Step {current} of {total}",
    submitBtn: "Submit Application",
    successTitle: "Application Submitted Successfully!",
    successDesc: "Thank you for applying to become an Addis Flavor host! Our community team will review your application and reach out within 2-3 business days for a short phone chat.",
    closeBtn: "Close Window",

    // Ask Host Translations
    askTitle: "Ask Mimi, our Super Host",
    askSub: "Mimi has hosted over 150 sessions in her cozy home in Piazza.",
    askPlaceholder: "Ask anything about preparing Injera, managing group sizes, or hosting vibe...",
    sendMsg: "Send Message",
    replyTitle: "Mimi's Instant Wisdom:",
    replyText: "Selam! I am so happy you are considering hosting. For me, the secret is making guests feel like family from the first minute. Don't worry about speaking perfect English; the food and your warmth speak all languages! Let me know if you have more questions.",

    // FAQs Translations
    faqs: [
      {
        q: "How much money can I earn as an Addis Flavor host?",
        a: "Hosts set their own availability and we recommend competitive starting rates of $25 to $45 per guest depending on the experience (Cooking Class vs. Traditional Meal). You keep 85% of the booking price, and we handle all marketing, secure credit card transactions, translation support, and customer support."
      },
      {
        q: "What are the requirements to become a host?",
        a: "You need a clean, welcoming home kitchen and dining area in Addis Ababa, a deep passion for traditional Ethiopian food, and a warm, friendly attitude. You do not need to be a professional chef—we love authentic home-style cooking!"
      },
      {
        q: "How does the host guarantee protect me?",
        a: "Addis Flavor provides complete insurance coverage up to $10,000 for property damage and accidental liabilities during any authorized booking session, so you can host with total peace of mind."
      },
      {
        q: "Can I choose which guests to host?",
        a: "Absolutely! You have 100% control. You will receive detailed traveler profiles, party sizes, dietary requirements, and can chat directly with them before confirming any booking request."
      }
    ]
  },
  am: {
    heroTitle: "የአስተናጋጆች ማህበረሰባችንን ይቀላቀሉ",
    introText: "አስተናጋጆች የ'አዲስ ፍሌቨር' ማህበረሰብ እምብርት ናቸው፤ እያደገ ያለውን ማህበረሰባችንን ለመቀላቀል ብቁ ነኝ ብለው ካሰቡ ከእርስዎ ጋር ለመነጋገር እንወዳለን።",
    idealHostTitle: "ምርጥ አስተናጋጅ",
    idealHostDesc: "ስለሚሰሩት ምግብ ከልብ በሚጨነቁ እና ለሌሎች በማካፈል ደስታ በሚሰማቸው ጥልቅ ፍቅር ያላቸው የምግብ አዘጋጆች ጋር መገናኘት እንወዳለን። ጎበዝ የቤት ውስጥ ምግብ አዘጋጅ ነዎት? ምግብዎን ልዩ የሚያደርጉትን የባህል ወጎች ይወዳሉ? እርስዎን ለማግኘት እና የሚወዱትን እየሰሩ ገቢ የሚያገኙበትን እና ለተጓዦች የሚያጋሩበትን ዕድል ለመስጠት እንወዳለን።",
    appProcessTitle: "የማመልከቻ ሂደት",
    steps: [
      "የመስመር ላይ ማመልከቻ ቅጽ ያስገቡ",
      "በስልክ ወይም በቪዲዮ ቃለ-መጠይቅ",
      "በአካል መጎብኘት እና የቅምሻ ጊዜ",
      "የክፍያ ዝርዝሮችዎን ያስገቡ እና ለማስተናገድ ይዘጋጁ!"
    ],
    applyBtn: "ዛሬውኑ ያመልክቱ",
    askSuperHost: "ለዋና አስተናጋጃችን ጥያቄ ይጠይቁ",
    askSuperHostSub: "እዚህ ጠቅ በማድረግ ለአስተናጋጆቻችን ጥያቄ ይጠይቁ",
    trustTitle: "እምነት እና ደህንነት",
    trustDesc: "በሚያስተናግዱበት ጊዜ ሙሉ በሙሉ ምቾት እንዲሰማዎት እንፈልጋለን። ለዚህ ነው ማናቸውም ችግሮች ቢከሰቱ እርስዎን ለመጠበቅ እያንዳንዱ የ'አዲስ ፍሌቨር' ቦታ ማስያዝ በአስተናጋጅ ዋስትናችን የተሸፈነ መሆኑን ያረጋገጥነው። በተጨማሪም፣ ስለ እንግዶቻችን በተቻለ መጠን ብዙ መረጃዎችን እናስተላልፋለን እና ሙሉ በሙሉ ምቾት ሳይሰማዎት ቦታ ማስያዝን እንዳይቀበሉ በቀጥታ ከእነሱ ጋር እንዲገናኙ እናደርጋለን።",
    faqBtn: "የአስተናጋጅ ተደጋጋሚ ጥያቄዎችን ያንብቡ",
    feedbackTitle: "የአስተናጋጆች አስተያየት",
    feedbackQuote: "ከመላው ዓለም የመጡ ሰዎችን ማስተናገድ ታላቅ ደስታ ነበር። ከእንግዶቻችን ጋር አስደናቂ የሆነ ግንኙነት እና የልምድ ልውውጥ ነበረን። ምግቡን በጣም መውደዳቸውን ማወቅ ትልቅ እርካታን ሰጥቶናል። እንግዶቻችን እንዲሄዱ አልፈለግንም፣ እነሱም መሄድ አልፈለጉም። እንደገና በ'አዲስ ፍሌቨር' ለማስተናገድ በጉጉት እንጠብቃለን።",
    feedbackAuthor: "ትዕግስት እና ቤተሰብ፣ ቦሌ ክፍለ ከተማ፣ አዲስ አበባ",
    bottomText: "ከእርስዎ ለመስማት በጉጉት እንጠብቃለን።",
    backBtn: "ወደ ልምዶች ይመለሱ",

    // Application Form Translations
    formTitle: "የአስተናጋጅ ማመልከቻ ቅጽ",
    formSub: "የምግብ ማብሰል ችሎታዎን በአዲስ አበባ ለአለም ተጓዦች ያጋሩ",
    fullName: "ሙሉ ስም",
    emailAddress: "የኢሜል አድራሻ",
    phoneNumber: "ስልክ ቁጥር",
    neighborhood: "አድራሻ (አዲስ አበባ ውስጥ ያሉ ሰፈሮች)",
    experienceYears: "የምግብ ዝግጅት ልምድ (በዓመት)",
    specialties: "ልዩ የሙያ ምግቦችዎ",
    aboutYou: "ስለራስዎ እና ስለቤትዎ ጥቂት ይንገሩን",
    stepLabel: "ደረጃ {current} ከ {total}",
    submitBtn: "ማመልከቻውን ያስገቡ",
    successTitle: "ማመልከቻዎ በተሳካ ሁኔታ ገብቷል!",
    successDesc: "ለአዲስ ፍሌቨር አስተናጋጅ ለመሆን ስላመለከቱ እናመሰግናለን! የማህበረሰብ ቡድናችን ማመልከቻዎን ይገመግማል እና በ2-3 የስራ ቀናት ውስጥ ለአጭር የስልክ ቆይታ ያነጋግርዎታል።",
    closeBtn: "ዝጋ",

    // Ask Host Translations
    askTitle: "ዋናዋን አስተናጋጅ ሚሚን ይጠይቁ",
    askSub: "ሚሚ በፒያሳ በሚገኘው ምቹ ቤቷ ከ150 በላይ እንግዶችን አስተናግዳለች።",
    askPlaceholder: "ስለ እንጀራ አጋጋር፣ የቡድን መጠንን ስለማስተዳደር ወይም ስለ ማስተናገድ ሁኔታ ማንኛውንም ይጠይቁ...",
    sendMsg: "መልዕክት ላክ",
    replyTitle: "የሚሚ ፈጣን ምክር:",
    replyText: "ሰላም! ማስተናገድን በማሰብዎ በጣም ደስ ብሎኛል። ለእኔ ዋናው ምስጢር እንግዶችን ከመጀመሪያው ደቂቃ ጀምሮ እንደ ቤተሰብ እንዲሰማቸው ማድረግ ነው። እንግሊዘኛን ፍጹም አድርገው አለመናገር አያሳስብዎት፤ ምግብዎ እና ሞቅ ያለ መስተንግዶዎ ሁሉንም ቋንቋዎች ይናገራሉ! ተጨማሪ ጥያቄዎች ካሉዎት ያሳውቁኝ።",

    // FAQs Translations
    faqs: [
      {
        q: "በአዲስ ፍሌቨር አስተናጋጅ በመሆን ምን ያህል ማግኘት እችላለሁ?",
        a: "አስተናጋጆች የራሳቸውን የመገኘት ጊዜ ያዘጋጃሉ እና እንደየልምዱ ዓይነት (የማብሰል ትምህርት ወይም ባህላዊ ምግብ) ለእያንዳንዱ እንግዳ ከ$25 እስከ $45 ተወዳዳሪ ዋጋ እንዲያወጡ እንመክራለን። እርስዎ የቦታ ማስያዣ ዋጋውን 85% ያገኛሉ፤ እኛ ደግሞ ሁሉንም ግብይት፣ አስተማማኝ የክፍያ ስርአት እና የደንበኛ ድጋፍን እንይዛለን።"
      },
      {
        q: "አስተናጋጅ ለመሆን ምን መስፈርቶች ያስፈልጋሉ?",
        a: "አዲስ አበባ ውስጥ ንጹህና ማራኪ የቤት ውስጥ ማብሰያ እና መመገቢያ ቦታ፣ ለባህላዊ የኢትዮጵያ ምግቦች ጥልቅ ፍቅር እና ሞቅ ያለ ሰላምታ ያስፈልግዎታል። ባለሙያ ሼፍ መሆን አያስፈልግዎትም—እኛ የምንወደው እውነተኛ የቤት ውስጥ ምግብ ዝግጅትን ነው!"
      },
      {
        q: "የአስተናጋጅ ዋስትናው እኔን እንዴት ይጠብቀኛል?",
        a: "አዲስ ፍሌቨር በማንኛውም ህጋዊ ቦታ ማስያዝ ወቅት ለሚከሰቱ የንብረት ጉዳቶች እና ድንገተኛ አደጋዎች እስከ $10,000 የሚደርስ ሙሉ የኢንሹራንስ ዋስትና ይሰጣል፣ ስለዚህ ሙሉ በሙሉ በሰላም ማስተናገድ ይችላሉ።"
      },
      {
        q: "የትኞቹን እንግዶች እንደማስተናግድ መምረጥ እችላለሁ?",
        a: "በፍጹም! 100% ቁጥጥር የእርስዎ ነው። ዝርዝር የተጓዥ መገለጫዎችን፣ የሰዎች ብዛት፣ የምግብ ፍላጎት ምርጫዎችን ያገኛሉ እና ማንኛውንም ቦታ ማስያዝ ከማረጋገጥዎ በፊት በቀጥታ ከእነሱ ጋር መወያየት ይችላሉ።"
      }
    ]
  },
  fr: {
    heroTitle: "Rejoignez notre communauté d'hôtes",
    introText: "Les hôtes sont au cœur de la communauté d'Addis Flavor, et nous serions ravis de discuter avec vous si vous pensez être un bon candidat pour rejoindre notre communauté en pleine croissance.",
    idealHostTitle: "Un hôte idéal",
    idealHostDesc: "Nous adorons entrer en contact avec des cuisiniers passionnés qui ont à cœur la nourriture qu'ils créent et qui aiment la partager. Êtes-vous un cuisinier amateur talentueux ? Êtes-vous passionné par les traditions culturelles qui rendent votre cuisine unique ? Nous serions ravis de vous rencontrer et de vous donner l'opportunité de gagner de l'argent en faisant ce que vous aimez tout en le partageant avec les voyageurs.",
    appProcessTitle: "Processus de candidature",
    steps: [
      "Soumettre le formulaire de candidature en ligne",
      "Entretien téléphonique ou Skype",
      "Visite en personne et dégustation",
      "Saisissez vos coordonnées de paiement et préparez-vous à accueillir !"
    ],
    applyBtn: "POSTULER AUJOURD'HUI",
    askSuperHost: "POSER UNE QUESTION À NOTRE SUPER HÔTE",
    askSuperHostSub: "Cliquez ici pour poser une question à l'un de nos super hôtes",
    trustTitle: "Confiance & sécurité",
    trustDesc: "Nous voulons que vous vous sentiez à 100 % à l'aise lorsque vous accueillez des voyageurs. C'est pourquoi nous veillons à ce que chaque réservation Addis Flavor soit couverte par notre garantie d'hôte en cas de problème. De plus, nous communiquons autant d'informations que possible sur nos clients et vous permettons de communiquer directement avec eux afin que vous n'ayez jamais à accepter une réservation sans vous sentir absolument à l'aise.",
    faqBtn: "LIRE NOTRE FAQ DE L'HÔTE",
    feedbackTitle: "Avis des hôtes",
    feedbackQuote: "Ce fut un plaisir d'accueillir des gens du monde entier. Nous avons eu de formidables interactions et partages d'expériences avec nos invités. C'était gratifiant de savoir qu'ils ont autant apprécié le repas. Nous ne voulions pas que nos invités partent, et eux non plus. Nous avons hâte d'accueillir à nouveau pour Addis Flavor.",
    feedbackAuthor: "Tigist & Famille, Quartier Bole, Addis-Abeba",
    bottomText: "Nous avons hâte de vous entendre.",
    backBtn: "Retour aux Expériences",

    // Application Form Translations
    formTitle: "Formulaire d'inscription d'hôte",
    formSub: "Partagez vos talents culinaires avec des voyageurs du monde entier à Addis-Abeba",
    fullName: "Nom complet",
    emailAddress: "Adresse e-mail",
    phoneNumber: "Numéro de téléphone",
    neighborhood: "Quartier à Addis-Abeba",
    experienceYears: "Expérience en cuisine (Années)",
    specialties: "Vos plats signature & spécialités",
    aboutYou: "Parlez-nous un peu de vous et de votre foyer",
    stepLabel: "Étape {current} sur {total}",
    submitBtn: "Soumettre la candidature",
    successTitle: "Candidature soumise avec succès !",
    successDesc: "Merci d'avoir postulé pour devenir hôte d'Addis Flavor ! Notre équipe examinera votre candidature et vous contactera sous 2 à 3 jours ouvrables pour un court entretien téléphonique.",
    closeBtn: "Fermer",

    // Ask Host Translations
    askTitle: "Demander à Mimi, notre Super Hôte",
    askSub: "Mimi a accueilli plus de 150 sessions dans sa maison chaleureuse à Piazza.",
    askPlaceholder: "Posez vos questions sur la cuisson de l'Injera, la taille des groupes ou l'ambiance...",
    sendMsg: "Envoyer le message",
    replyTitle: "Le conseil instantané de Mimi :",
    replyText: "Selam ! Je suis ravie que vous envisagiez d'accueillir des voyageurs. Pour moi, le secret réside dans le fait de faire en sorte que les invités se sentent comme chez eux dès la première minute. Ne vous souciez pas de parler un anglais parfait ; la nourriture et votre hospitalité parlent toutes les langues ! Écrivez-moi si vous avez d'autres questions.",

    // FAQs Translations
    faqs: [
      {
        q: "Combien d'argent puis-je gagner en tant qu'hôte d'Addis Flavor ?",
        a: "Les hôtes définissent leurs propres disponibilités et nous recommandons des tarifs de départ compétitifs de 25 $ à 45 $ par invité selon l'expérience (cours de cuisine ou repas traditionnel). Vous conservez 85 % du prix de la réservation, et nous gérons le marketing, les transactions sécurisées par carte de crédit, le support linguistique et l'assistance client."
      },
      {
        q: "Quelles sont les conditions requises pour devenir hôte ?",
        a: "Vous devez disposer d'une cuisine et d'une salle à manger propres et accueillantes à Addis-Abeba, d'une véritable passion pour la cuisine traditionnelle éthiopienne et d'une attitude amicale et chaleureuse. Nul besoin d'être un chef professionnel—nous aimons la cuisine familiale authentique !"
      },
      {
        q: "Comment la garantie d'hôte me protège-t-elle ?",
        a: "Addis Flavor offre une couverture d'assurance complète allant jusqu'à 10 000 $ pour les dommages matériels et les responsabilités accidentelles au cours de chaque session de réservation autorisée, vous permettant d'accueillir en toute tranquillité d'esprit."
      },
      {
        q: "Puis-je choisir mes invités ?",
        a: "Absolument ! Vous avez un contrôle total. Vous recevrez des profils détaillés des voyageurs, la taille du groupe, les préférences alimentaires, et vous pourrez échanger avec eux directement avant de confirmer toute demande."
      }
    ]
  }
};

export default function BecomeHost({ currentLang, isGlobalDark, onBackToHome }: BecomeHostProps) {
  const t = LOCAL_TRANSLATIONS[currentLang];
  
  // State for Accordion/FAQs
  const [showFaqs, setShowFaqs] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // State for Application Modal
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    experience: '',
    specialties: '',
    about: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // State for Ask Host Modal
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [isQuestionSent, setIsQuestionSent] = useState(false);
  const [showReply, setShowReply] = useState(false);

  // Toggle FAQ item
  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  // Reset Application form
  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    // Let a tiny delay pass before reset
    setTimeout(() => {
      setFormStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        neighborhood: '',
        experience: '',
        specialties: '',
        about: ''
      });
      setIsFormSubmitted(false);
    }, 300);
  };

  // Reset Ask Host Form
  const closeAskModal = () => {
    setIsAskModalOpen(false);
    setTimeout(() => {
      setUserQuestion('');
      setIsQuestionSent(false);
      setShowReply(false);
    }, 300);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setIsQuestionSent(true);
      setTimeout(() => {
        setShowReply(true);
      }, 1200);
    }
  };

  return (
    <div className={`transition-colors duration-1000 ${
      isGlobalDark ? 'bg-dark-bg text-linen-white' : 'bg-linen-white text-teal'
    }`}>
      {/* 1. HERO BANNER */}
      <div
        id="become-host-hero"
        className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(27, 58, 75, 0.45), rgba(15, 23, 42, 0.85)), url('/src/assets/images/addis_host_community_1782240127083.jpg')`
        }}
      >
        {/* Back button link absolute overlay */}
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

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-linen-white tracking-tight drop-shadow-md uppercase">
            {t.heroTitle}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* 2. CENTERED INTRO */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg sm:text-xl font-serif leading-relaxed italic opacity-90 max-w-2xl mx-auto">
          "{t.introText}"
        </p>
      </div>

      {/* 3. TWO-COLUMN IDEAL HOST & APP PROCESS */}
      <div className={`border-t ${isGlobalDark ? 'border-linen-white/10 bg-black/10' : 'border-teal/5 bg-sandstone/15'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Ideal Host and Application Process */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif tracking-tight text-coffee-red">
                  {t.idealHostTitle}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed opacity-85">
                  {t.idealHostDesc}
                </p>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-serif tracking-tight">
                  {t.appProcessTitle}
                </h3>
                
                {/* 1-4 Steps */}
                <div className="space-y-4">
                  {t.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gold text-teal font-sans font-bold flex items-center justify-center flex-shrink-0 shadow">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium opacity-90">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    id="host-apply-button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="px-8 py-3.5 bg-gold text-teal font-sans font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:bg-gold/95 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
                  >
                    {t.applyBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Ask Super Host Visual Widget */}
            <div
              className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px] flex items-end p-6 sm:p-10 group"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.8)), url('/src/assets/images/addis_host_dining_1782240144545.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="relative z-10 w-full bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-linen-white/10 text-center space-y-4 shadow-lg">
                <h4 className="text-xl sm:text-2xl font-serif text-linen-white font-bold uppercase tracking-wider">
                  {t.askSuperHost}
                </h4>
                <p className="text-xs sm:text-sm text-gold/90 font-medium">
                  {t.askSuperHostSub}
                </p>
                <div className="pt-2">
                  <button
                    id="host-ask-button"
                    onClick={() => setIsAskModalOpen(true)}
                    className="px-6 py-2.5 bg-linen-white text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-teal transition-all duration-300"
                  >
                    {currentLang === 'en' ? 'Click Here to Ask' : currentLang === 'fr' ? 'Cliquez ici pour poser' : 'እዚህ ጠቅ ያድርጉ'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. TRUST & SAFETY & FEEDBACK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          
          {/* Trust & Safety block */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-coffee-red">
                <Lock className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-2xl font-serif font-bold tracking-tight">
                  {t.trustTitle}
                </h3>
              </div>
              <p className="text-sm leading-relaxed opacity-80">
                {t.trustDesc}
              </p>
            </div>
            
            <div className="pt-4">
              <button
                id="toggle-faqs-btn"
                onClick={() => setShowFaqs(!showFaqs)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                  isGlobalDark
                    ? 'bg-linen-white/10 hover:bg-linen-white/20 text-linen-white'
                    : 'bg-teal/5 hover:bg-teal/10 text-teal'
                }`}
              >
                <span>{t.faqBtn}</span>
                {showFaqs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Host Feedback block */}
          <div className="space-y-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-current/5 bg-sandstone/10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gold">
                <MessageSquare className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-2xl font-serif font-bold tracking-tight">
                  {t.feedbackTitle}
                </h3>
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic leading-relaxed opacity-95">
                "{t.feedbackQuote}"
              </blockquote>
            </div>
            <div className="pt-4 border-t border-current/10">
              <cite className="not-italic text-xs font-mono uppercase tracking-wider block text-coffee-red font-bold">
                {t.feedbackAuthor}
              </cite>
              <div className="flex items-center space-x-1 text-gold mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Accordion FAQs section */}
        {showFaqs && (
          <div className="mt-12 max-w-4xl p-6 sm:p-8 rounded-3xl bg-sandstone/20 border border-current/5 animate-fadeIn">
            <h4 className="text-xl font-serif font-bold mb-6 text-center text-coffee-red">
              {currentLang === 'en' ? 'Frequently Asked Host Questions' : currentLang === 'fr' ? 'Questions fréquentes des hôtes' : 'ተደጋግመው የሚጠየቁ ጥያቄዎች'}
            </h4>
            <div className="space-y-4">
              {t.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`border-b pb-4 last:border-0 last:pb-0 transition-colors ${
                    isGlobalDark ? 'border-linen-white/10' : 'border-teal/5'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left font-serif font-bold text-base py-2 hover:text-coffee-red transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaqIdx === idx ? <ChevronUp className="w-4.5 h-4.5 text-gold" /> : <ChevronDown className="w-4.5 h-4.5 text-gold" />}
                  </button>
                  {openFaqIdx === idx && (
                    <p className="text-sm leading-relaxed opacity-85 mt-2 pl-2 border-l-2 border-gold py-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. MULTI-IMAGE CULINARY STRIP */}
      <div className="relative py-20 bg-cover bg-center overflow-hidden flex items-center justify-center min-h-[250px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/src/assets/images/addis_hero_bg_1782233695273.jpg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
          <img src="/src/assets/images/addis_cooking_class_1782233734033.jpg" className="w-40 h-40 object-cover rounded-full" referrerPolicy="no-referrer" />
          <img src="/src/assets/images/addis_jebena_pour_1782233715156.jpg" className="w-40 h-40 object-cover rounded-full hidden sm:block" referrerPolicy="no-referrer" />
          <img src="/src/assets/images/addis_host_dining_1782240144545.jpg" className="w-40 h-40 object-cover rounded-full" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 text-center max-w-xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-linen-white tracking-tight leading-tight">
            {t.bottomText}
          </h2>
          <div className="mt-6">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-8 py-3 bg-coffee-red text-linen-white font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-lg hover:bg-coffee-red/90 hover:scale-105 transition-all duration-300"
            >
              {t.applyBtn}
            </button>
          </div>
        </div>
      </div>


      {/* --- INTERACTIVE MODAL: APPLICATION FORM --- */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm">
          <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border ${
            isGlobalDark ? 'bg-dark-bg text-linen-white border-linen-white/15' : 'bg-linen-white text-teal border-teal/10'
          }`}>
            {/* Close Button */}
            <button
              onClick={closeApplyModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Contents */}
            <div className="p-6 sm:p-8">
              {!isFormSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-coffee-red">
                      {t.formTitle}
                    </h3>
                    <p className="text-xs opacity-75 mt-1 font-sans">
                      {t.formSub}
                    </p>
                  </div>

                  {/* Step progress label */}
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gold">
                    <span>{t.stepLabel.replace('{current}', String(formStep)).replace('{total}', '2')}</span>
                    <div className="flex space-x-1.5">
                      <div className={`w-6 h-1.5 rounded-full ${formStep >= 1 ? 'bg-coffee-red' : 'bg-current/10'}`} />
                      <div className={`w-6 h-1.5 rounded-full ${formStep >= 2 ? 'bg-coffee-red' : 'bg-current/10'}`} />
                    </div>
                  </div>

                  {/* STEP 1: Personal info */}
                  {formStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.fullName} *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                          }`}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.emailAddress} *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                              isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.phoneNumber} *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                              isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.neighborhood} *</label>
                        <select
                          required
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                          }`}
                        >
                          <option value="">{currentLang === 'en' ? 'Select Neighborhood' : 'ሰፈር ይምረጡ'}</option>
                          <option value="Bole">Bole (ቦሌ)</option>
                          <option value="Piazza">Piazza (ፒያሳ)</option>
                          <option value="Yeka">Yeka (የካ)</option>
                          <option value="Guellele">Guellele (ጉለሌ)</option>
                          <option value="Kirkos">Kirkos (ቂርቆስ)</option>
                          <option value="Nifas Silk">Nifas Silk (ንፋስ ስልክ)</option>
                        </select>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (formData.name && formData.email && formData.phone && formData.neighborhood) {
                              setFormStep(2);
                            } else {
                              alert(currentLang === 'en' ? 'Please fill all fields!' : 'እባክዎ ሁሉንም ክፍሎች ይሙሉ!');
                            }
                          }}
                          className="w-full flex items-center justify-center space-x-2 py-3.5 bg-coffee-red text-linen-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-coffee-red/90 transition-all duration-300"
                        >
                          <span>{currentLang === 'en' ? 'Continue' : 'ቀጥል'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Cooking experience */}
                  {formStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.experienceYears}</label>
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.specialties} *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Doro Wat, Organic Injera, Coffee Ceremony"
                          value={formData.specialties}
                          onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">{t.aboutYou} *</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.about}
                          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                          }`}
                        />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className={`px-4 py-3.5 rounded-xl text-xs font-sans font-bold uppercase tracking-widest border transition-all ${
                            isGlobalDark ? 'border-linen-white/15 hover:bg-white/5 text-linen-white' : 'border-teal/15 hover:bg-black/5 text-teal'
                          }`}
                        >
                          {currentLang === 'en' ? 'Back' : 'ተመለስ'}
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3.5 bg-gold text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-all duration-300"
                        >
                          {t.submitBtn}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                /* SUCCESS VIEW */
                <div className="text-center py-6 space-y-6 animate-scaleIn">
                  <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-coffee-red">
                      {t.successTitle}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-85 max-w-md mx-auto">
                      {t.successDesc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-current/10">
                    <div className="text-left text-xs space-y-1 opacity-70 bg-sandstone/25 p-4 rounded-xl border border-current/5">
                      <div><strong className="font-sans font-bold">{t.fullName}:</strong> {formData.name}</div>
                      <div><strong className="font-sans font-bold">{t.emailAddress}:</strong> {formData.email}</div>
                      <div><strong className="font-sans font-bold">{t.neighborhood}:</strong> {formData.neighborhood}</div>
                      <div><strong className="font-sans font-bold">{t.specialties}:</strong> {formData.specialties}</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={closeApplyModal}
                      className="px-8 py-3 bg-teal text-linen-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal/90 transition-all"
                    >
                      {t.closeBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* --- INTERACTIVE MODAL: ASK SUPER HOST Mimi --- */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${
            isGlobalDark ? 'bg-dark-bg text-linen-white border-linen-white/15' : 'bg-linen-white text-teal border-teal/10'
          }`}>
            {/* Close */}
            <button
              onClick={closeAskModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img
                    src="/src/assets/images/addis_cooking_class_1782233734033.jpg"
                    alt="Mimi Super Host"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-linen-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-coffee-red leading-tight">
                    {t.askTitle}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                    Super Host (150+ Sessions)
                  </p>
                </div>
              </div>

              <p className="text-xs opacity-75 mb-6">
                {t.askSub}
              </p>

              {!isQuestionSent ? (
                <form onSubmit={handleAskSubmit} className="space-y-4">
                  <textarea
                    required
                    rows={4}
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder={t.askPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                      isGlobalDark ? 'bg-white/5 border-linen-white/10 text-linen-white' : 'bg-sandstone/10 border-teal/10 text-teal'
                    }`}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-teal font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold/90 transition-all duration-300"
                  >
                    {t.sendMsg}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Sent Question */}
                  <div className="flex justify-end animate-fadeIn">
                    <div className="bg-coffee-red text-linen-white px-4 py-2.5 rounded-2xl rounded-tr-none text-xs max-w-[85%] shadow">
                      {userQuestion}
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  {!showReply && (
                    <div className="flex items-center space-x-2 animate-pulse mt-2 pl-2 text-gold">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold pl-1">Mimi is typing...</span>
                    </div>
                  )}

                  {/* Mimi's Response */}
                  {showReply && (
                    <div className="space-y-4 pt-2 border-t border-current/10 animate-scaleIn">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-bold">
                        {t.replyTitle}
                      </h4>
                      <div className={`p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed shadow border ${
                        isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/20 border-teal/5'
                      }`}>
                        {t.replyText}
                      </div>
                      <div className="pt-2 text-center">
                        <button
                          onClick={closeAskModal}
                          className="px-6 py-2 bg-teal text-linen-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal/90 transition-all"
                        >
                          {t.closeBtn}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
