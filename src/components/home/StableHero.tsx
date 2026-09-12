import { Camera, Mountain, Users, Car } from 'lucide-react';
import { HeroIntentRouter } from './HeroIntentRouter';
import homeData from '../../content/home.json';

const BADGE_ICONS: Record<string, React.ReactNode> = {
  camera: <Camera className="w-4 h-4" />,
  mountain: <Mountain className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  car: <Car className="w-4 h-4" />,
};

export function StableHero() {
  const hero = homeData.hero;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 1. Full-width background image */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt="Addis Ababa cityscape at golden hour"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* 2. Centered content — eyebrow + headline + supporting copy + intent widget + support cue */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3 font-semibold">
          {hero.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-4 drop-shadow-lg">
          {hero.headline}
        </h1>
        <p className="text-base sm:text-lg text-white/85 text-center max-w-2xl mb-8 leading-relaxed drop-shadow">
          {hero.supportingCopy}
        </p>
        <div className="w-full max-w-3xl">
          <HeroIntentRouter />
        </div>
        <a
          href={hero.supportCueLink}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-xs font-mono hover:bg-white/20 transition-colors"
        >
          {hero.supportCue}
        </a>
      </div>

      {/* 3. Bottom service badges bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-coffee-red/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hero.badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-2 text-linen-white"
              >
                <span>{BADGE_ICONS[badge.icon]}</span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
