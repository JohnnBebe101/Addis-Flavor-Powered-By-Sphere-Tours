/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, Mail } from 'lucide-react';
import contactContent from '../content/contact.json';
import { SuccessMessage } from './ui/SuccessMessage';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobalDark?: boolean;
}

// Type for the new contact.json structure
interface ContactData {
  hero: { headline: string; subheadline: string; image: string };
  contactInfo: { headline: string; phone: string; whatsapp: string; email: string; address: string; officeHours: string };
  contactForm: { headline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  customTourInquiry: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  travelAgentPartnership: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  faqs: { headline: string; items: Array<{ question: string; answer: string }> };
  map: { headline: string; address: string; coordinates: { lat: number; lng: number }; embedCode: string };
  metadata: { lastUpdated: string; version: string };
}

const contactJson = contactContent as unknown as ContactData;

export default function ContactModal({ isOpen, onClose, isGlobalDark = false }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = contactJson.contactForm;

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
                  {t.headline}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                  {contactJson.contactInfo.headline}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.fields
                    .filter((f) => f.name === 'fullName' || f.name === 'email')
                    .map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={`contact-${field.name}`}
                          className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                        >
                          {field.label} {field.required ? '*' : ''}
                        </label>
                        <input
                          id={`contact-${field.name}`}
                          type={field.type}
                          required={field.required}
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                            isGlobalDark
                              ? 'bg-white/5 border-linen-white/10 text-linen-white'
                              : 'bg-teal/5 border-teal/10 text-teal'
                          }`}
                        />
                      </div>
                    ))}
                </div>

                {t.fields
                  .filter((f) => f.name === 'topic')
                  .map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`contact-${field.name}`}
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                      >
                        {field.label} {field.required ? '*' : ''}
                      </label>
                      <select
                        id={`contact-${field.name}`}
                        required={field.required}
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer ${
                          isGlobalDark
                            ? 'bg-dark-bg border-linen-white/10 text-linen-white'
                            : 'bg-linen-white border-teal/10 text-teal'
                        }`}
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options?.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                {t.fields
                  .filter((f) => f.name === 'message')
                  .map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`contact-${field.name}`}
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                      >
                        {field.label} {field.required ? '*' : ''}
                      </label>
                      <textarea
                        id={`contact-${field.name}`}
                        required={field.required}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                          isGlobalDark
                            ? 'bg-white/5 border-linen-white/10 text-linen-white'
                            : 'bg-teal/5 border-teal/10 text-teal'
                        }`}
                      />
                    </div>
                  ))}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Sending...' : t.submitText}</span>
                </button>
              </form>

              {/* Grounded Contact Info Block */}
              <div
                className={`p-5 rounded-2xl border text-xs sm:text-sm font-sans space-y-3 ${
                  isGlobalDark ? 'bg-white/5 border-linen-white/5' : 'bg-sandstone/15 border-teal/5'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="opacity-80">{contactJson.contactInfo.address}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                    <a
                      href={`tel:${contactJson.contactInfo.phone.replace(/\s/g, '')}`}
                      className="opacity-80 hover:text-gold transition-colors font-mono font-bold"
                    >
                      {contactJson.contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    <a
                      href={`mailto:${contactJson.contactInfo.email}`}
                      className="opacity-80 hover:text-gold transition-colors break-all font-mono font-semibold"
                    >
                      {contactJson.contactInfo.email}
                    </a>
                  </div>
                </div>
                <p className="text-[10px] font-mono opacity-60 italic pt-1 border-t border-current/10">
                  {contactJson.contactInfo.officeHours}
                </p>
              </div>
            </div>
          ) : (
            <SuccessMessage
              title="Message Sent!"
              description={t.successMessage}
              closeBtnText="Close"
              onClose={resetForm}
              isGlobalDark={isGlobalDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}