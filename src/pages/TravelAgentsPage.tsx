import { useState, FormEvent } from 'react';
import { Building2, Globe, Users, Send, CheckCircle2 } from 'lucide-react';
import contactData from '../content/contact.json';

export const TravelAgentsPage: React.FC = () => {
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
            {contactData.travelAgentPartnership.headline}
          </h1>
          <p className="text-lg text-teal/70 max-w-3xl mx-auto">
            {contactData.travelAgentPartnership.subheadline}
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-linen-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Building2 className="w-8 h-8 text-gold" />, title: 'Competitive Commissions', desc: 'Industry-leading commission rates paid promptly on every booking.' },
              { icon: <Globe className="w-8 h-8 text-gold" />, title: 'Local Expertise', desc: 'Licensed Ethiopian guides with deep knowledge of Addis Ababa and beyond.' },
              { icon: <Users className="w-8 h-8 text-gold" />, title: 'Reliable Service', desc: '5.0/5 on TripAdvisor. Your clients are in safe, professional hands.' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-sandstone/50 rounded-2xl p-8 border border-teal/10 text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-serif font-bold text-teal mb-2">{benefit.title}</h3>
                <p className="text-teal/70">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 bg-sandstone/10 border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-linen-white rounded-2xl p-12 border border-gold/30 text-center">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-teal mb-2">Partnership Request Sent!</h2>
              <p className="text-teal/70">{contactData.travelAgentPartnership.successMessage}</p>
              <a
                href="/tours/"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
              >
                Explore Our Tours
              </a>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-linen-white rounded-2xl p-8 border border-teal/10">
                <h2 className="text-2xl font-serif font-bold text-teal mb-6">
                  Become a Partner
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {contactData.travelAgentPartnership.fields[0].label} *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      required
                      placeholder={contactData.travelAgentPartnership.fields[0].placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-sandstone/30 text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {contactData.travelAgentPartnership.fields[1].label}
                    </label>
                    <input
                      type="url"
                      id="website"
                      placeholder={contactData.travelAgentPartnership.fields[1].placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-sandstone/30 text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="clientVolume" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {contactData.travelAgentPartnership.fields[2].label} *
                    </label>
                    <select
                      id="clientVolume"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-sandstone/30 text-teal focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                    >
                      <option value="">Select client volume</option>
                      {contactData.travelAgentPartnership.fields[2].options?.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold">
                      {contactData.travelAgentPartnership.fields[3].label} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder={contactData.travelAgentPartnership.fields[3].placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-teal/10 bg-sandstone/30 text-teal focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-coffee-red text-linen-white text-xs uppercase tracking-wider font-bold hover:bg-coffee-red/90 transition-all flex items-center justify-center gap-2 shadow-md mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactData.travelAgentPartnership.submitText}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default TravelAgentsPage;
