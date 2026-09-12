import { useState } from 'react';
import { Car, CheckCircle, Users, Luggage, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FAQJSONLD } from '../components/JSONLD';
import carHireData from '../content/car-hire.json';

const initialFormData = { fullName: '', email: '', whatsapp: '', pickupDate: '', pickupLocation: '', destination: '', passengers: '', luggage: '', vehiclePreference: '', tripType: '', message: '', botField: '' };

export function CarHirePage() {
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
          'form-name': 'car-hire-enquiry',
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          pickupDate: formData.pickupDate,
          pickupLocation: formData.pickupLocation,
          destination: formData.destination,
          passengers: formData.passengers,
          luggage: formData.luggage,
          tripType: formData.tripType,
          vehiclePreference: formData.vehiclePreference,
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
          <h2 className="text-2xl font-serif font-bold text-teal mb-3">Quote Request Received!</h2>
          <p className="text-teal/70 mb-6">Our team will send you a detailed quote within 24 hours.</p>
          <button onClick={() => { setIsSuccess(false); setFormData(initialFormData); }} className="px-6 py-3 bg-coffee-red text-linen-white rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-coffee-red/90 transition-colors">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linen-white">
      <SEO
        title="Car Hire & Private Driver in Addis Ababa"
        description="Request a vehicle and private driver for airport pickup, city travel, day trips, or multi-day itineraries. We provide quotes after reviewing your request."
        canonical="/car-hire/"
      />
      <FAQJSONLD faqs={carHireData.faqs} />
      <section className="relative bg-teal text-linen-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-dark-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm font-mono text-linen-white/60 mb-6">
            <a href="/" className="hover:text-gold transition-colors">Home</a><span className="mx-2">/</span>
            <a href="/car-hire/" className="hover:text-gold transition-colors">Getting Around</a><span className="mx-2">/</span>
            <span className="text-linen-white">Car Hire</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold mt-6 mb-4">{carHireData.hero.headline}</h1>
          <p className="text-lg md:text-xl text-linen-white/80 max-w-3xl">{carHireData.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-12 text-center">{carHireData.vehicleTypes.headline}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carHireData.vehicleTypes.options.map((vehicle) => (
              <div key={vehicle.name} className="bg-linen-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow border border-teal/5">
                <div className="w-14 h-14 bg-coffee-red/10 text-coffee-red rounded-2xl flex items-center justify-center mx-auto mb-4"><Car className="w-7 h-7" /></div>
                <h3 className="font-serif font-bold text-teal mb-2">{vehicle.name}</h3>
                <p className="text-sm text-teal/70 mb-3">{vehicle.description}</p>
                <div className="flex justify-center gap-4 text-xs text-teal/60 font-mono">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {vehicle.passengers}</span>
                  <span className="flex items-center gap-1"><Luggage className="w-3 h-3" /> {vehicle.luggage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sandstone" id="quote">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-4 text-center">{carHireData.form.headline}</h2>
          <p className="text-teal/70 text-center mb-4">{carHireData.form.subheadline}</p>
          <p className="text-sm text-coffee-red font-mono text-center mb-8">{carHireData.form.disclosure}</p>
          <form onSubmit={handleSubmit} data-netlify="true" method="POST" className="space-y-6">
            <input type="hidden" name="form-name" value="car-hire-enquiry" />
            <p className="hidden"><label>Don't fill this out: <input name="bot-field" value={formData.botField || ''} onChange={(e) => setFormData({ ...formData, botField: e.target.value })} /></label></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Full Name *</label><input name="fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Email *</label><input name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">WhatsApp or Phone *</label><input name="whatsapp" type="tel" required value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Pickup Date *</label><input name="pickupDate" type="date" required value={formData.pickupDate} onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Pickup Location *</label><input name="pickupLocation" type="text" required placeholder="e.g., Bole Airport" value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Destination / Itinerary</label><input name="destination" type="text" placeholder="e.g., City tour" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Passengers *</label><input name="passengers" type="number" min="1" required value={formData.passengers} onChange={(e) => setFormData({ ...formData, passengers: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Luggage</label><input name="luggage" type="number" min="0" value={formData.luggage} onChange={(e) => setFormData({ ...formData, luggage: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white" /></div>
              <div><label className="block text-sm font-mono text-teal/80 mb-2">Trip Type</label>
                <select name="tripType" value={formData.tripType} onChange={(e) => setFormData({ ...formData, tripType: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white">
                  <option value="">Select</option><option value="one-way">One Way</option><option value="round-trip">Round Trip</option><option value="multi-day">Multi-Day</option>
                </select>
              </div>
            </div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Vehicle Preference</label>
              <select name="vehiclePreference" value={formData.vehiclePreference} onChange={(e) => setFormData({ ...formData, vehiclePreference: e.target.value })} className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white">
                <option value="">No preference</option><option value="sedan">Sedan</option><option value="suv">SUV</option><option value="minivan">Minivan</option>
              </select>
            </div>
            <div><label className="block text-sm font-mono text-teal/80 mb-2">Message</label><textarea name="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Additional details..." className="w-full px-4 py-3 border border-teal/20 rounded-lg focus:ring-2 focus:ring-coffee-red focus:border-transparent bg-linen-white resize-none" /></div>
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-coffee-red text-linen-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-coffee-red/90 transition-colors shadow-lg disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Request a Quote'}</button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-sandstone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-teal mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {carHireData.faqs.map((faq, i) => (
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
