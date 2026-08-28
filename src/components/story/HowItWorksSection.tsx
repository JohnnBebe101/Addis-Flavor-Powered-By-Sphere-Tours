import { Compass } from 'lucide-react';

interface HowItWorksContent {
  title: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
}

interface HowItWorksSectionProps {
  content: HowItWorksContent;
}

export default function HowItWorksSection({ content }: HowItWorksSectionProps) {
  return (
    <section
      id="story-section-how-it-works"
      className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          <Compass className="w-4 h-4 text-coffee-red" />
          <span>How It Works</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {content.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
            1
          </div>
          <h4 className="text-lg font-serif font-bold uppercase">{content.step1Title}</h4>
          <p className="text-sm opacity-75 leading-relaxed font-sans">
            {content.step1Desc}
          </p>
        </div>

        <div className="space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
            2
          </div>
          <h4 className="text-lg font-serif font-bold uppercase">{content.step2Title}</h4>
          <p className="text-sm opacity-75 leading-relaxed font-sans">
            {content.step2Desc}
          </p>
        </div>

        <div className="space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-gold text-teal font-mono font-extrabold flex items-center justify-center mx-auto sm:mx-0 shadow-md">
            3
          </div>
          <h4 className="text-lg font-serif font-bold uppercase">{content.step3Title}</h4>
          <p className="text-sm opacity-75 leading-relaxed font-sans">
            {content.step3Desc}
          </p>
        </div>
      </div>
    </section>
  );
}