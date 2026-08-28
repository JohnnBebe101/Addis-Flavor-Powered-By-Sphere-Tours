/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, Mail } from 'lucide-react';
import content from '../content/contact.json';
import { SuccessMessage } from './ui/SuccessMessage';
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark?: boolean;
}

export default function ContactModal({ isOpen, onClose, isGlobalDark = false }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = content;

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
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={resetForm}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border animate-scale-in ${
          isGlobalDark
            ? 'bg-dark-bg text-linen-white border-linen-white/10'
            : 'bg-linen-white text-teal border-teal/10'
        } z-10 max-h-[90vh] flex flex-col`}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-current/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
              SPHERE INQUIRY DESK
            </span>
          </div>
          <button
            onClick={resetForm}
            className={`p-2 rounded-full transition-colors ${
              isGlobalDark
                ? 'bg-white/5 hover:bg-white/10 text-linen-white'
                : 'bg-black/5 hover:bg-black/10 text-teal'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1">
          {!isSuccess ? (
            <div key="form" className="space-y-6 animate-slide-up">
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
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                    >
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
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                    >
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
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                  >
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
                    <option value="" disabled>
                      {t.subjectPlaceholder}
                    </option>
                    {t.topics.map((topic, i) => (
                      <option key={i} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                  >
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
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm font-sans space-y-3 ${
                  isGlobalDark ? 'bg-white/5 border-linen-white/5' : 'bg-sandstone/15 border-teal/5'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="opacity-80">{t.officeAddress}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <a
                      href="tel:0911209882"
                      className="opacity-80 hover:text-gold transition-colors font-mono font-bold"
                    >
                      091 120 9882
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <a
                      href="mailto:info@addisababacitytours.com"
                      className="opacity-80 hover:text-gold transition-colors break-all font-mono font-semibold"
                    >
                      info@addisababacitytours.com
                    </a>
                  </div>
                </div>
                <p className="text-[10px] font-mono opacity-60 italic pt-1 border-t border-current/10">
                  {t.officeHours}
                </p>
              </div>
            </div>
          ) : (
            <SuccessMessage
              title={t.successTitle}
              description={t.successDesc}
              closeBtnText={t.closeBtn}
              onClose={resetForm}
              isGlobalDark={isGlobalDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}
