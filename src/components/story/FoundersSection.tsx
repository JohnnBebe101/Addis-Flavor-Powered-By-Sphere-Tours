import { Users } from 'lucide-react';

interface Founder {
  initial: string;
  name: string;
  title: string;
  description: string;
}

interface FoundersContent {
  title: string;
  subtitle: string;
  f1Title: string;
  f1Desc: string;
  f2Title: string;
  f2Desc: string;
}

interface FoundersSectionProps {
  content: FoundersContent;
  isGlobalDark: boolean;
}

export default function FoundersSection({ content, isGlobalDark }: FoundersSectionProps) {
  const founders: Founder[] = [
    {
      initial: 'H',
      name: 'Hareg',
      title: content.f1Title,
      description: content.f1Desc,
    },
    {
      initial: 'S',
      name: 'Seifegebiel Shifferaw',
      title: content.f2Title,
      description: content.f2Desc,
    },
  ];

  const cardStyle = isGlobalDark
    ? 'bg-white/5 border-linen-white/10'
    : 'bg-sandstone/15 border-teal/5';

  return (
    <section
      id="story-section-founders"
      className="scroll-mt-36 border-t border-current/10 pt-16 space-y-12"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-gold font-mono uppercase tracking-widest text-xs">
          <Users className="w-4 h-4 text-coffee-red" />
          <span>{content.title}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-extrabold uppercase tracking-tight">
          {content.title}
        </h3>
        <p className="text-sm opacity-75 leading-relaxed font-sans">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className={`p-8 rounded-3xl border ${cardStyle} flex flex-col space-y-4`}
          >
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl font-serif font-bold">
              {founder.initial}
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold uppercase">{founder.name}</h4>
              <p className="text-xs font-mono text-gold font-bold uppercase tracking-wider">
                {founder.title}
              </p>
            </div>
            <p className="text-sm opacity-75 leading-relaxed font-sans">{founder.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}