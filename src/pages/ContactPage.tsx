import { MapPin, Phone, Mail, Send, ChevronRight } from 'lucide-react';
import contactData from '../content/contact.json';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            Have questions about our tours? Want to customize your itinerary? We're here to help. WhatsApp, call, or email us—we respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-teal mb-6">
                Get in Touch
              </h2>
              <p className="text-teal/70 mb-8">
                {contactData.contactInfo.headline}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold font-bold">Address</p>
                    <p className="text-teal/70">{contactData.contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold font-bold">Phone / WhatsApp</p>
                    <a href={`tel:${contactData.contactInfo.phone.replace(/\D/g, '')}`} className="text-teal/70 hover:text-gold transition-colors font-mono font-bold">{contactData.contactInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold font-bold">Email</p>
                    <a href={`mailto:${contactData.contactInfo.email}`} className="text-teal/70 hover:text-gold transition-colors break-all font-mono font-semibold">{contactData.contactInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold font-bold">Office Hours</p>
                    <p className="text-teal/70 font-mono">{contactData.contactInfo.officeHours}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${contactData.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md mt-8 inline-flex">
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-2xl font-serif font-bold text-teal mb-2">
                Send Us a Message
              </h3>
              <p className="text-teal/70 mb-6">We'll get back to you within 24 hours.</p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Full Name *</label>
                    <input type="text" id="name" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Email Address *</label>
                    <input type="email" id="email" required placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                </div>

                <div>
                  <label htmlFor="topic" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Topic *</label>
                  <select id="topic" required className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                    <option value="" disabled>Select inquiry topic...</option>
                    {contactData.contactForm.fields.find(f => f.name === 'topic')?.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">Your Message *</label>
                  <textarea id="message" required rows={4} placeholder="How can we help you?" className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold" />
                </div>

                <button type="submit" className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Custom Tour & Travel Agent Inquiry */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">
                Custom Tour Inquiry
              </h3>
              <p className="text-teal/70 mb-6">Want a fully customized itinerary? Tell us your interests, travel dates, and group size, and we'll create a personalized tour just for you.</p>
              <a href="/custom-tour/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-teal font-mono text-xs uppercase font-extrabold tracking-wider transition-all duration-300">
                Request Custom Tour
              </a>
            </div>

            <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10 mt-8">
              <h3 className="text-xl font-serif font-bold text-teal mb-2">
                Travel Agent Partnerships
              </h3>
              <p className="text-teal/70 mb-6">Are you a travel agent or tour operator? We offer competitive commissions, reliable service, and local expertise for your clients visiting Addis Ababa.</p>
              <a href="/travel-agents/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-coffee-red mx-auto mb-4 rounded-full" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {contactData.faqs.items.map((faq, idx) => (
              <details key={idx} className="group bg-linen-white rounded-xl p-6 border border-teal/10">
                <summary className="flex items-center justify-between cursor-pointer list-none font-serif font-bold text-teal group-hover:text-coffee-red transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-gold transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="mt-4 text-teal/80 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal text-center mb-8">
            Our Location
          </h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-teal/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.5!2d38.7469!3d9.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c1c1c1c1c1%3A0xc1c1c1c1c1c1c1c1!2sNational%20Tower%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;