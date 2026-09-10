import { useState, FormEvent } from 'react';
import {
  MapPin, Phone, Mail, Send, MessageCircle, Clock,
  Star, ChevronRight, CheckCircle,
} from 'lucide-react';
import contactData from '../content/contact.json';

interface ContactData {
  hero: { headline: string; subheadline: string; image: string };
  contactInfo: { headline: string; phone: string; whatsapp: string; email: string; address: string; officeHours: string };
  contactForm: { headline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  customTourInquiry: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  travelAgentPartnership: { headline: string; subheadline: string; fields: Array<{ name: string; label: string; type: string; required: boolean; placeholder: string; options?: string[] }>; submitText: string; successMessage: string };
  faqs: { headline: string; items: Array<{ question: string; answer: string }> };
  map: { headline: string; address: string; coordinates: { lat: number; lng: number }; embedCode: string };
  page: {
    hero: { headline: string; subheadline: string; responseTime: string };
    quickContact: { headline: string; channels: { type: string; label: string; responseTime: string; description: string; primary?: boolean }[] };
    socialProof: { rating: string; reviewCount: string; source: string; badge: string };
    form: { headline: string; subheadline: string; successTitle: string; successNext: string; successSteps: string[] };
  };
}

const cj = contactData as unknown as ContactData;

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setIsSuccess(true); }, 1500);
  };

  const p = cj.page;
  const channelIcons: Record<string, typeof Phone> = { whatsapp: MessageCircle, phone: Phone, email: Mail };

  return (
    <div className="min-h-screen bg-linen-white">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-teal tracking-tight mb-4">{p.hero.headline}</h1>
          <p className="text-base sm:text-lg text-teal/70 max-w-2xl mx-auto mb-4">{p.hero.subheadline}</p>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" /> {p.hero.responseTime}
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Info + Social Proof */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal mb-3">{cj.contactInfo.headline}</h2>
                <p className="text-teal/70 text-sm sm:text-base">{cj.contactInfo.headline}</p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: cj.contactInfo.address },
                  { icon: Phone, label: 'Phone / WhatsApp', value: cj.contactInfo.phone, href: `tel:${cj.contactInfo.phone.replace(/\D/g, '')}` },
                  { icon: Mail, label: 'Email', value: cj.contactInfo.email, href: `mailto:${cj.contactInfo.email}` },
                  { icon: Clock, label: 'Office Hours', value: cj.contactInfo.officeHours },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-teal/80 hover:text-gold transition-colors font-mono font-semibold text-sm">{item.value}</a>
                      ) : (
                        <p className="text-teal/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              {/* Social Proof */}
              <div className="bg-sandstone/30 rounded-2xl p-5 border border-teal/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-lg font-bold text-teal">{p.socialProof.rating}</span>
                  <span className="text-sm text-teal/60">on {p.socialProof.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-teal/80">{p.socialProof.reviewCount} verified reviews</span>
                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-mono uppercase rounded-full">{p.socialProof.badge}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-sandstone/30 rounded-2xl p-6 sm:p-8 border border-teal/10">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-teal">{p.form.successTitle}</h3>
                  <p className="text-teal/70 text-sm">{cj.contactForm.successMessage}</p>
                  <div className="bg-linen-white rounded-xl p-4 border border-teal/10 text-left max-w-sm mx-auto">
                    <p className="text-xs font-mono uppercase text-teal/60 mb-2">{p.form.successNext}</p>
                    <ul className="space-y-1.5">
                      {p.form.successSteps.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-teal/80">
                          <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-teal mb-1">{p.form.headline}</h3>
                  <p className="text-sm text-teal/60 mb-6">{p.form.subheadline}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251-911-XXX-XXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Topic *</label>
                      <select required value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                        <option value="" disabled>Select inquiry topic...</option>
                        {cj.contactForm.fields.find((f) => f.name === 'topic')?.options?.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?"
                        className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <button type="submit" disabled={isSending}
                      className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                      <Send className="w-4 h-4" />
                      <span>{isSending ? 'Sending...' : cj.contactForm.submitText}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-teal text-center mb-8">{p.quickContact.headline}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {p.quickContact.channels.map((ch, i) => {
              const Icon = channelIcons[ch.type] || Phone;
              const href = ch.type === 'whatsapp' ? `https://wa.me/${cj.contactInfo.whatsapp.replace(/\D/g, '')}`
                : ch.type === 'phone' ? `tel:${cj.contactInfo.phone.replace(/\D/g, '')}`
                : `mailto:${cj.contactInfo.email}`;
              return (
                <a key={i} href={href} target={ch.type === 'whatsapp' ? '_blank' : undefined} rel="noopener noreferrer"
                  className={`rounded-2xl p-6 border text-center space-y-3 transition-all hover:shadow-lg ${
                    ch.primary ? 'bg-emerald-600 text-linen-white border-emerald-700' : 'bg-linen-white border-teal/10 hover:border-coffee-red/30'
                  }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    ch.primary ? 'bg-linen-white/20' : 'bg-gold/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${ch.primary ? 'text-linen-white' : 'text-gold'}`} />
                  </div>
                  <h3 className="font-serif font-bold">{ch.label}</h3>
                  <p className={`text-xs ${ch.primary ? 'text-linen-white/80' : 'text-teal/60'}`}>{ch.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase ${
                    ch.primary ? 'bg-linen-white/20 text-linen-white' : 'bg-gold/10 text-gold'
                  }`}>{ch.responseTime}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Tour & Travel Agent CTAs */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sandstone/30 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">{cj.customTourInquiry.headline}</h3>
              <p className="text-sm text-teal/70 mb-5">{cj.customTourInquiry.subheadline}</p>
              <a href="/custom-tour/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-wider transition-all">
                Request Custom Tour <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-sandstone/30 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">{cj.travelAgentPartnership.headline}</h3>
              <p className="text-sm text-teal/70 mb-5">{cj.travelAgentPartnership.subheadline}</p>
              <a href="/travel-agents/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all">
                Become a Partner <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{cj.faqs.headline}</h2>
          <div className="space-y-3">
            {cj.faqs.items.map((faq, idx) => (
              <details key={idx} className="bg-linen-white rounded-xl border border-teal/10">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-serif font-bold text-teal hover:text-coffee-red transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-teal/80 leading-relaxed animate-fade-in">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 sm:py-16 bg-linen-white border-t border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teal text-center mb-8">{cj.map.headline}</h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-teal/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.5!2d38.7469!3d9.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c1c1c1c1c1%3A0xc1c1c1c1c1c1c1c1!2sNational%20Tower%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
