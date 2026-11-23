import { Award } from 'lucide-react';
interface PressContent {
  title: string;
  quote: string;
  featuredIn: string;
  logos: string[];
}
interface PressSectionProps {
  content: PressContent;
}
export default function PressSection({ content }: PressSectionProps) {
  return (
    <section
      id="story-section-press"
      className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12"
    >
      {' '}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {' '}
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          {' '}
          <Award className="w-4 h-4 text-coffee-red" /> <span>{content.title}</span>{' '}
        </div>{' '}
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {' '}
          {content.title}{' '}
        </h3>{' '}
      </div>{' '}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl border bg-teal text-linen-white border-gold/30 text-center space-y-6 shadow-xl relative overflow-hidden">
        {' '}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />{' '}
        <span className="font-serif text-5xl text-gold/30 block">"</span>{' '}
        <p className="text-xl sm:text-2xl font-serif leading-relaxed text-linen-white/95 italic max-w-2xl mx-auto -mt-6">
          {' '}
          {content.quote}{' '}
        </p>{' '}
        <div className="w-12 h-1 bg-gold mx-auto rounded-full" />{' '}
        <span className="block font-mono text-xs uppercase tracking-widest text-gold font-bold">
          {' '}
          &mdash; Forbes Magazine{' '}
        </span>{' '}
      </div>{' '}
      <div className="pt-6">
        {' '}
        <p className="text-center text-xs font-mono uppercase tracking-widest text-gold font-bold mb-8">
          {' '}
          {content.featuredIn}{' '}
        </p>{' '}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {' '}
          {content.logos.map((logo, index) => (
            <div key={index} className="font-serif text-xl font-bold tracking-tight">
              {' '}
              {logo}{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
}
