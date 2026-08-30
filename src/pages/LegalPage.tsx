import { Shield, FileText, Cookie, RefreshCw } from 'lucide-react';
import bookingData from '../content/booking.json';

export interface LegalPageProps {
  type: 'terms' | 'privacy' | 'cancellation' | 'cookies';
}

const LEGAL_CONFIG: Record<LegalPageProps['type'], {
  title: string;
  icon: React.ReactNode;
  lastUpdated: string;
  intro: string;
  sections: { headline: string; content: string; points?: string[] }[];
}> = {
  terms: {
    title: 'Terms & Conditions',
    icon: <FileText className="w-8 h-8 text-gold" />,
    lastUpdated: 'August 28, 2026',
    intro: 'Please read these terms and conditions carefully before booking a tour with Addis Ababa City Tour.',
    sections: [
      bookingData.policies.booking,
      bookingData.policies.pricing,
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <Shield className="w-8 h-8 text-gold" />,
    lastUpdated: 'August 28, 2026',
    intro: 'We respect your privacy and are committed to protecting your personal data. This policy explains what information we collect and how we use it.',
    sections: [
      {
        headline: 'Information We Collect',
        content: 'We collect information you provide when booking a tour, contacting us, or subscribing to our newsletter. This includes your name, email address, phone number, and travel preferences.',
        points: [
          'Name and contact details provided via booking forms',
          'Email address for confirmations and newsletter (with consent)',
          'Tour preferences and special requests',
          'Payment information processed securely by our payment providers',
        ],
      },
      {
        headline: 'How We Use Your Information',
        content: 'We use your information solely to provide and improve our tour services, communicate with you about your booking, and send occasional updates (only if you opt in).',
        points: [
          'Process and confirm your tour bookings',
          'Send booking confirmations and important tour updates',
          'Improve our tours and website experience',
          'Send marketing emails only with your explicit consent',
        ],
      },
      {
        headline: 'Data Sharing & Security',
        content: 'We never sell your personal data. We share information only with service providers necessary to deliver your tour (e.g., guides, transport). All data is stored securely.',
        points: [
          'No sale of personal data to third parties',
          'Encrypted storage and secure payment processing',
          'Access limited to staff who need it to serve you',
        ],
      },
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    icon: <RefreshCw className="w-8 h-8 text-gold" />,
    lastUpdated: 'August 28, 2026',
    intro: 'We understand plans change. Our cancellation policy is designed to be fair and transparent.',
    sections: [bookingData.policies.cancellation],
  },
  cookies: {
    title: 'Cookie Policy',
    icon: <Cookie className="w-8 h-8 text-gold" />,
    lastUpdated: 'August 28, 2026',
    intro: 'This website uses cookies to enhance your browsing experience and analyze site traffic.',
    sections: [
      {
        headline: 'What Are Cookies',
        content: 'Cookies are small text files stored on your device that help websites remember your preferences and understand how you use the site.',
        points: [
          'Essential cookies: required for the site to function',
          'Analytics cookies: help us understand site usage',
          'Preference cookies: remember your settings',
        ],
      },
      {
        headline: 'Managing Cookies',
        content: 'You can control and delete cookies through your browser settings. Disabling some cookies may affect site functionality.',
        points: [
          'Manage cookies in your browser settings',
          'Opt out of analytics where available',
          'Clear cookies at any time',
        ],
      },
    ],
  },
};

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const config = LEGAL_CONFIG[type];

  return (
    <div className="min-h-screen bg-linen-white">
      <section className="py-16 bg-sandstone/10 border-b border-teal/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">{config.icon}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-teal tracking-tight">
              {config.title}
            </h1>
          </div>
          <p className="text-teal/60 font-mono text-xs uppercase tracking-widest">
            Last updated: {config.lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-teal/80 leading-relaxed mb-10">
            {config.intro}
          </p>

          <div className="space-y-10">
            {config.sections.map((section, idx) => (
              <div key={idx} className="bg-sandstone/30 rounded-2xl p-8 border border-teal/10">
                <h2 className="text-2xl font-serif font-bold text-teal mb-4">
                  {section.headline}
                </h2>
                {section.content && (
                  <p className="text-teal/80 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}
                {section.points && section.points.length > 0 && (
                  <ul className="space-y-2">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-teal/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-teal/5 border border-teal/10 rounded-2xl text-center">
            <p className="text-teal/70 mb-4">
              Questions about our {config.title.toLowerCase()}? We're happy to help.
            </p>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coffee-red hover:bg-coffee-red/90 text-linen-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
