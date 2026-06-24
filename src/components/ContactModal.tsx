/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark?: boolean;
}

const LOCAL_TRANSLATIONS = {
  en: {
    modalTitle: "Contact Our Experience Team",
    modalSub: "Powered and operated by Sphere Tour & Travel. Send us a message and we'll reply within 2 hours.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    subject: "Subject / Topic",
    message: "Your Message",
    subjectPlaceholder: "Select inquiry topic...",
    topics: [
      "Custom Private Culinary Tour",
      "Special Dietary Request",
      "Large Group Booking Inquiry",
      "Become a Host Partner",
      "Other Inquiries"
    ],
    sendBtn: "Send Message",
    sending: "Sending...",
    successTitle: "Message Received! Amesegenalehu!",
    successDesc: "Your message has been safely delivered to our Sphere Tour & Travel customer experience desk in Addis Ababa. We will reach out to you within the next 2 hours via email or phone.",
    closeBtn: "Close Window",
    officeAddress: "Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220, Addis Ababa",
    officeHours: "Office Hours: Mon - Sat, 8:30 AM - 6:00 PM (EAT)",
  },
  am: {
    modalTitle: "የልምድ ቡድናችንን ያግኙ",
    modalSub: "በስፌር ቱር ኤንድ ትራቭል የተዘጋጀ እና የሚተዳደር። መልዕክት ይላኩልን በ2 ሰዓታት ውስጥ እንመልሳለን።",
    fullName: "ሙሉ ስም",
    emailAddress: "የኢሜል አድራሻ",
    subject: "ርዕስ / ጉዳይ",
    message: "የእርስዎ መልዕክት",
    subjectPlaceholder: "የጥያቄ ርዕስ ይምረጡ...",
    topics: [
      "የተለየ የግል የምግብ ጉብኝት",
      "ልዩ የምግብ ፍላጎት ጥያቄ",
      "ለግዙፍ ቡድን ማስያዝ ጥያቄ",
      "አስተናጋጅ አጋር ለመሆን",
      "ሌሎች ጥያቄዎች"
    ],
    sendBtn: "መልዕክት ላክ",
    sending: "በመላክ ላይ...",
    successTitle: "መልዕክትዎ ደርሶናል! አመሰግናለሁ!",
    successDesc: "መልዕክትዎ በአዲስ አበባ ለሚገኘው የ'ስፌር ቱር ኤንድ ትራቭል' ደንበኞች አገልግሎት ክፍል በተሳካ ሁኔታ ደርሷል። በ2 ሰዓት ውስጥ በኢሜል ወይም በስልክ እናገኝዎታለን።",
    closeBtn: "መስኮቱን ዝጋ",
    officeAddress: "ራስ አበበ ደምተው ጎዳና፣ ናሽናል ታወር፣ 3ኛ ፎቅ፣ ቢሮ ቁጥር 220፣ አዲስ አበባ",
    officeHours: "የስራ ሰዓት: ሰኞ - ቅዳሜ፣ ከጠዋቱ 2:30 እስከ ማታ 12:00",
  },
  fr: {
    modalTitle: "Contactez notre équipe",
    modalSub: "Opéré et propulsé par Sphere Tour & Travel. Envoyez-nous un message, nous répondons sous 2 heures.",
    fullName: "Nom complet",
    emailAddress: "Adresse e-mail",
    subject: "Sujet / Motif",
    message: "Votre message",
    subjectPlaceholder: "Sélectionnez le sujet...",
    topics: [
      "Tour culinaire privé sur mesure",
      "Demande de régime alimentaire spécial",
      "Réservation de grand groupe",
      "Devenir partenaire hôte",
      "Autre demande"
    ],
    sendBtn: "Envoyer le message",
    sending: "Envoi...",
    successTitle: "Message reçu ! Amesegenalehu !",
    successDesc: "Votre message a bien été transmis à notre service client Sphere Tour & Travel à Addis-Abeba. Nous vous recontacterons sous 2 heures par e-mail ou téléphone.",
    closeBtn: "Fermer la fenêtre",
    officeAddress: "Ras Abebe Dumtew Street National Tower, 3e étage, Bureau N° 220, Addis-Abeba",
    officeHours: "Heures d'ouverture: Lun - Sam, 8h30 - 18h00 (EAT)",
  }
};

export default function ContactModal({
  currentLang,
  isOpen,
  onClose,
  isGlobalDark = false
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = LOCAL_TRANSLATIONS[currentLang];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', topic: '', message: '' });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={resetForm}
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border ${
        isGlobalDark 
          ? 'bg-dark-bg text-linen-white border-linen-white/10' 
          : 'bg-linen-white text-teal border-teal/10'
      } z-10 max-h-[90vh] flex flex-col`}>
        
        {/* Top Header */}
        <div className="p-6 border-b border-current/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
              {currentLang === 'en' ? 'SPHERE INQUIRY DESK' : currentLang === 'fr' ? 'BUREAU D’ENQUÊTE SPHERE' : 'ስፌር የጥያቄ ዴስክ'}
            </span>
          </div>
          <button 
            onClick={resetForm}
            className={`p-2 rounded-full transition-colors ${
              isGlobalDark ? 'bg-white/5 hover:bg-white/10 text-linen-white' : 'bg-black/5 hover:bg-black/10 text-teal'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold tracking-tight uppercase mb-2 text-gold">
                    {t.modalTitle}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                    {t.modalSub}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                        {t.fullName} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                          isGlobalDark 
                            ? 'bg-white/5 border-linen-white/10 text-linen-white' 
                            : 'bg-teal/5 border-teal/10 text-teal'
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                        {t.emailAddress} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                          isGlobalDark 
                            ? 'bg-white/5 border-linen-white/10 text-linen-white' 
                            : 'bg-teal/5 border-teal/10 text-teal'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {t.subject} *
                    </label>
                    <select
                      id="contact-topic"
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer ${
                        isGlobalDark 
                          ? 'bg-dark-bg border-linen-white/10 text-linen-white' 
                          : 'bg-linen-white border-teal/10 text-teal'
                      }`}
                    >
                      <option value="" disabled>{t.subjectPlaceholder}</option>
                      {t.topics.map((topic, i) => (
                        <option key={i} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {t.message} *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                        isGlobalDark 
                          ? 'bg-white/5 border-linen-white/10 text-linen-white' 
                          : 'bg-teal/5 border-teal/10 text-teal'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? t.sending : t.sendBtn}</span>
                  </button>
                </form>

                {/* Grounded Sphere Contact Info Block */}
                <div className={`p-5 rounded-2xl border text-xs sm:text-sm font-sans space-y-3 ${
                  isGlobalDark ? 'bg-white/5 border-linen-white/5' : 'bg-sandstone/15 border-teal/5'
                }`}>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span className="opacity-80">{t.officeAddress}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      <a href="tel:0911209882" className="opacity-80 hover:text-gold transition-colors font-mono font-bold">091 120 9882</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                      <a href="mailto:info@sphere-voyage-ethiopie.com" className="opacity-80 hover:text-gold transition-colors break-all font-mono font-semibold">info@sphere-voyage-ethiopie.com</a>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono opacity-60 italic pt-1 border-t border-current/10">
                    {t.officeHours}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 px-4 space-y-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <CheckCircle className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-tight text-gold">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-85 leading-relaxed font-sans">
                    {t.successDesc}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 bg-gold/10 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Sphere Customer Support Active' : currentLang === 'fr' ? 'Support client Sphere actif' : 'የስፌር ደንበኛ ድጋፍ ንቁ ነው'}</span>
                </div>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-teal text-linen-white hover:bg-teal/95 text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
                >
                  {t.closeBtn}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
