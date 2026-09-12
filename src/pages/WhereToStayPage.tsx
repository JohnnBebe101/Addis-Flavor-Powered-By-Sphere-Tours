import { useState } from 'react';
import { MapPin, Home, Users, Building, CheckCircle, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FAQJSONLD } from '../components/JSONLD';
import whereToStayData from '../content/where-to-stay.json';

export function WhereToStayPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', whatsapp: '', area: '', stayType: '', dates: '', guests: '', message: '', botField: '' });
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
          'form-name': 'where-to-stay-enquiry',
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          area: formData.area,
          stayType: formData.stayType,
          message: formData.message,
        }).toString(),
      });
      if (response.ok) { setIsSuccess(true); }
    } catch {
      // Handle error silently for now
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linen-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
          <h2 className="text-2xl font-serif font-bold text-teal mb-3">Thank You!</h2>
          <p className="text-teal/70 mb-6">We've received your accommodation enquiry. Our team will respond within 24 hours.</p>
          <button onClick={() => { setIsSuccess(false); setFormData({ fullName: '', email: '', whatsapp: '', area: '', stayType: '', dates: '', guests: '', message: '', botField: '' }); }} className="px-6 py-3 bg-coffee-red text-linen-white rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red/90 transition-colors">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linen-white">
      <SEO
        title="Where to Stay in Addis Ababa"
        description="Explore Addis Ababa's neighbourhoods and find the right area for your stay. Personalised accommodation recommendations — not hotel inventory."
        canonical="/where-to-stay/"
      />
      <FAQJSONLD faqs={whereToStayData.faqs} />
      <section className="relative bg-teal text-linen-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm font-mono text-linen-white/60 mb-6">
            <a href="/" className="hover:text-gold transition-colors">Home</a><span className="mx-2">/</span>
            <span className="text-linen-white">Plan Your Visit</span><span className="mx-2">/</span>
            <span className="text-linen-white">Where to Stay</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold mt-6 mb-4">{whereToStayData.hero.headline}</h1>
          <p className="text-lg md:text-xl text-linen-white/80 max-w-3xl">{whereToStayData.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">Explore Neighbourhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whereToStayData.areas.map((area) => (
              <div key={area.name} className="bg-linen-white p-6 rounded-xl border border-teal/10 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3"><MapPin className="w-5 h-5 text-coffee-red mt-0.5" /><div><h3 className="font-serif font-bold text-teal">{area.name}</h3><p className="text-xs text-teal/60 font-mono">{area.type}</p></div></div>
                <p className="text-sm text-teal/70">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">What Kind of Stay Are You Looking For?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whereToStayData.stayTypes.map((type) => (
              <div key={type.title} className="bg-linen-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-coffee-red/10 text-coffee-red rounded-xl flex items-center justify-center mx-auto mb-4">
                  {type.icon === 'home' && <Home className="w-6 h-6" />}{type.icon === 'building' && <Building className="w-6 h-6" />}{type.icon === 'users' && <Users className="w-6 h-6" />}
                </div>
                <h3 className="font-serif font-bold text-teal mb-2">{type.title}</h3>
                <p className="text-sm text-teal/70">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-4 text-center">{whereToStayData.howWeHelp.headline}</h2>
          <p className="text-teal/70 text-center mb-10 max-w-2xl mx-auto">{whereToStayData.howWeHelp.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whereToStayData.howWeHelp.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-coffee-red/10 text-coffee-red rounded-full flex items-center justify-center mx-auto mb-4 font-mono font-bold text-lg">{i + 1}</div>
                <h3 className="font-serif font-bold text-teal mb-2">{step.title}</h3>
                <p className="text-sm text-teal/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone" id="enquiry">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-4 text-center">{whereToStayData.form.headline}</h2>
          <p className="text-teal/70 text-center mb-8">{whereToStayData.form.subheadline}</p>
          <p className="text-sm text-coffee-red font-mono text-center mb-8">{whereToStayData.form.disclosure}</p>
          <form onSubmit={handleSubmit} data-netlify="true" method="POST" className="space-y-6">
            <input type="hidden" name="form-name" value="where-to-stay-enquiry" />
            <p className="hidden"><label>Don't fill this out: <input name="botField" value={formData.botField} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} /></label></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Full Name *</label><input name="fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Email *</label><input name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">WhatsApp or Phone</label><input name="whatsapp" type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Preferred Area</label>
                <select name="area" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white">
                  <option value="">Select an area</option>{whereToStayData.areas.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}<option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Stay Type</label>
                <select name="stayType" value={formData.stayType} onChange={(e) => setFormData({ ...formData, stayType: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white">
                  <option value="">Select stay type</option>
                  <option value="Short Stay">Short Stay</option>
                  <option value="Business Travel">Business Travel</option>
                  <option value="Family Stay">Family Stay</option>
                  <option value="Longer Stays">Longer Stays</option>
                </select>
              </div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Preferred Dates</label><input name="dates" type="text" value={formData.dates} onChange={(e) => setFormData({ ...formData, dates: e.target.value })} placeholder="e.g. 15-20 Oct 2026" className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Additional Requirements</label><textarea name="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Budget range, preferences..." className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white resize-none" /></div>
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {whereToStayData.faqs.map((faq, i) => (
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
