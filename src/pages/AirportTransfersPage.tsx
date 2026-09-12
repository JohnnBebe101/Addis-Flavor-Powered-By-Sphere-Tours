import { useState } from 'react';
import { Plane, CheckCircle, Clock, Users, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FAQJSONLD } from '../components/JSONLD';
import airportTransfersData from '../content/airport-transfers.json';

const initialFormData = { transferType: '', fullName: '', email: '', flightNumber: '', date: '', time: '', passengers: '', luggage: '', hotelOrDestination: '', whatsapp: '', specialRequirements: '', botField: '', state: '' };

export function AirportTransfersPage() {
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
          'form-name': 'airport-transfer-enquiry',
          transferType: formData.transferType,
          fullName: formData.fullName,
          email: formData.email,
          flightNumber: formData.flightNumber,
          whatsapp: formData.whatsapp,
          date: formData.date,
          time: formData.time,
          passengers: formData.passengers,
          luggage: formData.luggage,
          hotelOrDestination: formData.hotelOrDestination,
          specialRequirements: formData.specialRequirements,
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
          <h2 className="text-2xl font-serif font-bold text-teal mb-3">Transfer Request Received!</h2>
          <p className="text-teal/70 mb-6">Our team will confirm availability and pricing within 24 hours.</p>
          <button onClick={() => { setFormData(initialFormData); setIsSuccess(false); }} className="px-6 py-3 bg-coffee-red text-linen-white rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red/90 transition-colors">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linen-white">
      <SEO
        title="Airport Transfers in Addis Ababa"
        description="Arrange a reliable transfer between Bole International Airport and your hotel. We confirm availability and pricing after your request."
        canonical="/airport-transfers/"
      />
      <FAQJSONLD faqs={airportTransfersData.faqs} />
      <section className="relative bg-teal text-linen-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm font-mono text-linen-white/60 mb-6">
            <a href="/" className="hover:text-gold transition-colors">Home</a><span className="mx-2">/</span>
            <a href="/car-hire/" className="hover:text-gold transition-colors">Getting Around</a><span className="mx-2">/</span>
            <span className="text-linen-white">Airport Transfers</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold mt-6 mb-4">{airportTransfersData.hero.headline}</h1>
          <p className="text-lg md:text-xl text-linen-white/80 max-w-3xl">{airportTransfersData.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {airportTransfersData.howItWorks.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-coffee-red/10 text-coffee-red rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {i === 0 && <Plane className="w-7 h-7" />}{i === 1 && <Clock className="w-7 h-7" />}{i === 2 && <Users className="w-7 h-7" />}
                </div>
                <h3 className="font-serif font-bold text-teal mb-2">{step.title}</h3>
                <p className="text-sm text-teal/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone" id="book">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-4 text-center">{airportTransfersData.form.headline}</h2>
          <p className="text-teal/70 text-center mb-8">{airportTransfersData.form.subheadline}</p>
          <p className="text-sm text-coffee-red font-mono text-center mb-8">{airportTransfersData.form.disclosure}</p>
          <form onSubmit={handleSubmit} data-netlify="true" method="POST" className="space-y-6">
            <input type="hidden" name="form-name" value="airport-transfer-enquiry" />
            <p className="hidden"><label>Don't fill this out: <input name="bot-field" value={formData.botField} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} /></label></p>
            <input type="hidden" name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            <div>
              <label className="block text-sm font-mono text-teal/80 mb-3">Transfer Type *</label>
              <div className="grid grid-cols-2 gap-4">
                {['Arrival', 'Departure'].map((type) => (
                  <label key={type} className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.transferType === type ? 'border-coffee-red bg-coffee-red/5 text-coffee-red' : 'border-teal/20 hover:border-teal/40'}`}>
                    <input type="radio" name="transferType" value={type} checked={formData.transferType === type} onChange={(e) => setFormData({ ...formData, transferType: e.target.value })} className="sr-only" required />
                    <span className="font-mono text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Full Name *</label><input type="text" name="fullName" required placeholder="e.g., Abebe Kebede" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Email *</label><input type="email" name="email" required placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Flight Number *</label><input type="text" name="flightNumber" required placeholder="e.g., ET 302" value={formData.flightNumber} onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">WhatsApp or Phone *</label><input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Date *</label><input type="date" name="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Time *</label><input type="time" name="time" required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Passengers *</label><input type="number" name="passengers" min="1" required value={formData.passengers} onChange={(e) => setFormData({ ...formData, passengers: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Luggage</label><input type="number" name="luggage" min="0" value={formData.luggage} onChange={(e) => setFormData({ ...formData, luggage: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Hotel or Destination *</label><input type="text" name="hotelOrDestination" required placeholder="e.g., Sheraton Addis" value={formData.hotelOrDestination} onChange={(e) => setFormData({ ...formData, hotelOrDestination: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Special Requirements</label><textarea rows={3} name="specialRequirements" value={formData.specialRequirements} onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })} placeholder="Child seat, wheelchair access..." className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white resize-none" /></div>
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Request Transfer'}</button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {airportTransfersData.faqs.map((faq, i) => (
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
