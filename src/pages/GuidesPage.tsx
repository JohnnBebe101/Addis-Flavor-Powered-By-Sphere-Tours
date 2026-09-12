import { useState } from 'react';
import { Users, CheckCircle, Globe, Heart, Calendar, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FAQJSONLD } from '../components/JSONLD';
import guidesData from '../content/guides.json';

const initialFormData = { fullName: '', email: '', whatsapp: '', date: '', guests: '', language: '', interests: '', mobility: '', message: '', botField: '' };

export function GuidesPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField) { setIsSuccess(true); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'guide-request',
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          preferredDate: formData.date,
          guests: formData.guests,
          language: formData.language,
          interests: formData.interests,
          mobility: formData.mobility,
          message: formData.message,
        }).toString(),
      });
      if (response.ok) { setIsSuccess(true); }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linen-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
          <h2 className="text-2xl font-serif font-bold text-teal mb-3">Request Received!</h2>
          <p className="text-teal/70 mb-6">Our team will match you with the right local guide and respond within 24 hours.</p>
          <button onClick={() => { setIsSuccess(false); setFormData(initialFormData); }} className="px-6 py-3 bg-coffee-red text-linen-white rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red/90 transition-colors">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linen-white">
      <SEO
        title="Find a Local Guide in Addis Ababa"
        description="Connect with experienced local guides who know Addis Ababa's history, culture, and hidden gems. Request a guide match."
        canonical="/guides/"
      />
      <FAQJSONLD faqs={guidesData.faqs} />
      <section className="relative bg-teal text-linen-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm font-mono text-linen-white/60 mb-6">
            <a href="/" className="hover:text-gold transition-colors">Home</a><span className="mx-2">/</span>
            <a href="/car-hire/" className="hover:text-gold transition-colors">Getting Around</a><span className="mx-2">/</span>
            <span className="text-linen-white">Local Guides</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold mt-6 mb-4">{guidesData.hero.headline}</h1>
          <p className="text-lg md:text-xl text-linen-white/80 max-w-3xl">{guidesData.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-12 text-center">How Guide Matching Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guidesData.howItWorks.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-coffee-red/10 text-coffee-red rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {i === 0 && <Calendar className="w-7 h-7" />}{i === 1 && <Users className="w-7 h-7" />}{i === 2 && <Heart className="w-7 h-7" />}
                </div>
                <h3 className="font-serif font-bold text-teal mb-2">{step.title}</h3>
                <p className="text-sm text-teal/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">{guidesData.languages.headline}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {guidesData.languages.available.map((lang) => (
              <div key={lang} className="flex items-center gap-2 px-4 py-2 bg-linen-white rounded-full border border-teal/10"><Globe className="w-4 h-4 text-coffee-red" /><span className="text-sm text-teal">{lang}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="request">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-4 text-center">{guidesData.form.headline}</h2>
          <p className="text-teal/70 text-center mb-4">{guidesData.form.subheadline}</p>
          <p className="text-sm text-coffee-red font-mono text-center mb-8">{guidesData.form.disclosure}</p>
          <form onSubmit={handleSubmit} className="space-y-6" data-netlify="true" method="POST" name="guide-request">
            <input type="hidden" name="form-name" value="guide-request" />
            <p className="hidden"><label>Don't fill this out: <input name="botField" value={formData.botField} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} /></label></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Full Name *</label><input type="text" name="fullName" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Email *</label><input type="email" name="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">WhatsApp or Phone *</label><input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Preferred Date *</label><input type="date" name="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Number of Guests *</label><input type="number" name="guests" min="1" required value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Preferred Language</label>
                <select name="language" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white">
                  <option value="">Select language</option>{guidesData.languages.available.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
            </div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Interests</label><input type="text" name="interests" placeholder="History, culture, photography, food..." value={formData.interests} onChange={(e) => setFormData({ ...formData, interests: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Mobility or Access Requirements</label><input type="text" name="mobility" placeholder="Wheelchair access, walking aids, etc." value={formData.mobility} onChange={(e) => setFormData({ ...formData, mobility: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Message</label><textarea rows={4} name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your plans..." className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white resize-none" /></div>
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Request a Guide'}</button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {guidesData.faqs.map((faq, i) => (
              <div key={i} className="bg-linen-white rounded-xl border border-teal/10 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-serif font-bold text-teal text-sm pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-coffee-red shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-teal/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
