import { ShieldCheck, Heart, MapPin } from 'lucide-react';

interface SafetySectionProps {
  content: {
    title: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
  };
  isGlobalDark: boolean;
}

export default function SafetySection({ content, isGlobalDark }: SafetySectionProps) {
  return (
    <section
      id="story-section-safety"
      className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          <ShieldCheck className="w-4 h-4 text-coffee-red" />
          <span>Safety</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {content.title}
        </h3>
        <p className="text-sm opacity-75 leading-relaxed font-sans">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className={`p-6 rounded-2xl border ${
            isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
          } space-y-3`}
        >
          <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-serif font-bold uppercase">{content.point1Title}</h4>
          <p className="text-xs opacity-75 leading-relaxed font-sans">{content.point1Desc}</p>
        </div>

        <div
          className={`p-6 rounded-2xl border ${
            isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
          } space-y-3`}
        >
          <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="text-base font-serif font-bold uppercase">{content.point2Title}</h4>
          <p className="text-xs opacity-75 leading-relaxed font-sans">{content.point2Desc}</p>
        </div>

        <div
          className={`p-6 rounded-2xl border ${
            isGlobalDark ? 'bg-white/5 border-linen-white/10' : 'bg-sandstone/15 border-teal/5'
          } space-y-3`}
        >
          <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-gold">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="text-base font-serif font-bold uppercase">{content.point3Title}</h4>
          <p className="text-xs opacity-75 leading-relaxed font-sans">{content.point3Desc}</p>
        </div>
      </div>
    </section>
  );
}
