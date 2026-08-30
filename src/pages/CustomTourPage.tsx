import { useState, FormEvent } from 'react';
import { Calendar, Users, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import contactData from '../content/contact.json';

export const CustomTourPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-teal tracking-tight mb-4">
            {contactData.customTourInquiry.headline}
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            {contactData.customTourInquiry.subheadline}
          </p>
        </div>
      </section>

      <section className="py-16 bg-linen-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-sandstone/50 rounded-2xl p-12 border border-gold/30 text-center">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-teal mb-2">Inquiry Sent!</h2>
              <p className="text-teal/70">{contactData.customTourInquiry.successMessage}</p>
              <a
                href="/tours/"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
              >
                Browse Our Tours
              </a>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="travelDates" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      {contactData.customTourInquiry.fields[0].label} *
                    </label>
                    <input
                      type="text"
                      id="travelDates"
                      required
                      placeholder={contactData.customTourInquiry.fields[0].placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="groupSize" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold" />
                      {contactData.customTourInquiry.fields[1].label} *
                    </label>
                    <input
                      type="number"
                      id="groupSize"
                      required
                      min={1}
                      max={16}
                      defaultValue={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      {contactData.customTourInquiry.fields[2].label} *
                    </label>
                    <textarea
                      id="interests"
                      required
                      rows={4}
                      placeholder={contactData.customTourInquiry.fields[2].placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {contactData.customTourInquiry.fields[3].label}
                    </label>
                    <select
                      id="budget"
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-linen-white text-teal focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                    >
                      <option value="">Select a budget range</option>
                      {contactData.customTourInquiry.fields[3].options?.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactData.customTourInquiry.submitText}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="py-16 bg-teal text-linen-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-linen-white/80 mb-8 max-w-2xl mx-auto">
            Browse our most popular tours for inspiration, or chat with us on WhatsApp for instant help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/tours/" className="px-8 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md">
              Browse All Tours
            </a>
            <a href={`https://wa.me/${contactData.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-transparent border-2 border-gold hover:bg-gold/10 text-gold font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomTourPage;
