import { Briefcase, MapPin } from 'lucide-react';

interface CareersSectionProps {
  content: {
    title: string;
    subtitle: string;
    c1Title: string;
    c1Desc: string;
    c2Title: string;
    c2Desc: string;
    applyBtn: string;
  };
  isGlobalDark: boolean;
  onBackToHome: () => void;
}

export default function CareersSection({
  content,
  isGlobalDark,
  onBackToHome,
}: CareersSectionProps) {
  const cardStyles = isGlobalDark
    ? 'bg-white/5 border-linen-white/10'
    : 'bg-sandstone/15 border-teal/5';

  const headOfficeStyles = isGlobalDark
    ? 'bg-white/5 border-linen-white/10'
    : 'bg-sandstone/15 border-teal/5';

  return (
    <section
      id="story-section-careers"
      className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          <Briefcase className="w-4 h-4 text-coffee-red" />
          <span>CAREERS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {content.title}
        </h3>
        <p className="text-sm opacity-75 leading-relaxed font-sans">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className={`p-8 rounded-3xl border ${cardStyles} flex flex-col justify-between`}>
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold uppercase">{content.c1Title}</h4>
            <p className="text-sm opacity-75 leading-relaxed font-sans">{content.c1Desc}</p>
          </div>
          <div className="pt-6">
            <button
              onClick={onBackToHome}
              className="px-6 py-2.5 bg-gold hover:bg-coffee-red text-teal hover:text-linen-white font-mono text-xs font-extrabold uppercase rounded-full shadow transition-all duration-300"
            >
              Register Now
            </button>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${cardStyles} flex flex-col justify-between`}>
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold uppercase">{content.c2Title}</h4>
            <p className="text-sm opacity-75 leading-relaxed font-sans">{content.c2Desc}</p>
          </div>
          <div className="pt-6">
            <a
              href="mailto:info@addisababacitytours.com"
              className="inline-block px-6 py-2.5 border border-gold hover:bg-gold text-gold hover:text-teal font-mono text-xs font-extrabold uppercase rounded-full transition-all duration-300 text-center"
            >
              {content.applyBtn}
            </a>
          </div>
        </div>
      </div>

      <div className={`p-8 rounded-3xl border ${headOfficeStyles} max-w-4xl mx-auto space-y-6`}>
        <div className="flex items-center space-x-3 text-gold">
          <MapPin className="w-5 h-5 text-coffee-red" />
          <h4 className="text-base sm:text-lg font-serif font-bold uppercase">
            Sphere Tour & Travel Head Office
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-sans">
          <div className="space-y-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
              OFFICE ADDRESS
            </span>
            <p className="opacity-80 text-xs sm:text-sm">
              Ras Abebe Dumtew Street National Tower, 3rd Floor, Office N° 220, Addis Ababa
            </p>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
              DIRECT PHONE
            </span>
            <p className="opacity-80 font-mono text-xs sm:text-sm">091 120 9882</p>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
              EMAIL SUPPORT
            </span>
            <a
              href="mailto:info@addisababacitytours.com"
              className="block opacity-80 hover:text-gold transition-colors break-all text-xs sm:text-sm font-mono"
            >
              info@addisababacitytours.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
